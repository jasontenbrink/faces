//I think the /update and /addPeople routes are dupes.

var express = require('express');
var when = require('when');
var pgQuery = require('pg-query');
var router = express.Router();
var makeFamily = require('../modules/makeFamily');

const middleware =(req, res, next) => {
  console.log('middleware!');
  next();
}
//new person gets added to the family
router.route('/update', middleware).post(function (req, res) {
    var people = req.body.people;
    var familyId = req.body.family.family_id;
    // console.log('/family/update, people: ', people);
    console.log('/family/update, familyId: ', familyId);

    //update family name
    pgQuery("UPDATE families set family_name = $1 where family_id = $2",
      [makeFamily.makeFamilyName(people), familyId],
      function (err, rows, results) {
          if(err) res.json(err);
      }
    );

    //delete everyone from the family with family ID === familyId
    pgQuery("DELETE FROM people_and_families WHERE family_id = $1",
     [req.body.family.family_id]).

     //add everyone from 'people' into the family
     then(function(response){
       if (people.length > 0) return pgQuery(makeFamily.makeQueryString(people, familyId));
       else res.json(response);
     })
     .then(function(response){
        res.json(response[0]);
     })
     .catch(function(err){
       console.log('err', err);
       res.status(500).send('something went wrong with the family update!');
     });
});

router.route('/addPeople').post(function (req, res) {
  console.log('pinArray, ', req.body.pinArray);
  console.log('req.body.family_id, ', req.body.familyId);
  pgQuery(makeFamily.makeQueryString(req.body.pinArray, req.body.familyId))
  .then(function(){
    return makeFamily.updateFamilyName(req.body.familyId)
  })
  .then(function(response){
    res.json(response);
  })
  .catch(function(err){
    console.log('err', err);
    res.status(500).send('something went wrong with the family update!');
  });
});

router.route('/getFamilies').get(function (req, res) {
  console.log('on getFamilies route, ', req.query);
  pgQuery("SELECT family_id FROM people_and_families WHERE pin = $1", [req.query.pin],
   function (err, rows) {
      if (err) {
        res.json(err);
        console.log(err);
      }
      console.log(rows);
      res.json(rows);
    });

});

router.route('/getFamilyMembers').get(function (req, res) {
  console.log('/getFamilyMembers route, params', req.query);
  makeFamily.getFamilyMembers(req.query.family_id)
  .then(function (results) {
    console.log('get family members results', results[0]);
    res.json(results[0]);
  },
  function (err) {
    res.json(err);
  });
});

router.route('/')
  .get(function (req, res) {
    //two queries, get family name, get people
    var responseObject = {};
    var family_id = req.query.family_id;
    when.all([
      pgQuery('SELECT family_name, family_id FROM families WHERE family_id = $1', [family_id]),

      pgQuery('select first_name, last_name, email, p.pin from people p join people_and_families pf ' +
        'on p.pin=pf.pin ' +
        'where pf.family_id = $1', [family_id]
      )
    ]).
      spread(function (family, people) {
        console.log('from /data/family to client family: ', family[0][0]);
        console.log('from /data/family to client people: ', people[0]);
        responseObject.family = family[0][0];
        responseObject.people = people[0];
        res.json(responseObject);
      });
  })

  .post(function (req, res) {
      pgQuery("INSERT INTO families (family_name) values ($1) RETURNING family_name, family_id",
        [makeFamily.makeFamilyName(req.body)],
        function (err, rows, results) {
          var family = {
            familyId: rows[0].family_id,
            familyName: rows[0].family_name
          };
          console.log('Inserting family name', family.familyName + ' with family id',
            family.familyId + ' into families table');

          if (err) res.json(err);
          pgQuery(makeFamily.makeQueryString(req.body, rows[0].family_id),
            function (err, rows, results) {
              if(err) res.json (err);
              res.json(family);
            });
        });
  });

module.exports = router;