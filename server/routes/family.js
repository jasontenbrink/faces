//try to start putting pgQuery statements in makeFamily module.

var express = require('express');
var when = require('when');
var pgQuery = require('pg-query');
var router = express.Router();
var makeFamily = require('../modules/makeFamily');

//new person gets added to the family
router.route('/update').post(function (req, res) {
    var people = req.body.people;
    var familyId = req.body.family.family_id;
    console.log('/family/update, people: ', people);
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
     then(pgQuery(makeFamily.makeQueryString(people, familyId)),
      function (err, rows, results) {
        if(err) res.json(err);
        res.json('success!', rows);
      }
    );
});

router.route('/addPeople').post(function (req, res) {
  console.log('pinArray, ', req.body.pinArray);
  console.log('req.body.family_id, ', req.body.familyId);
  pgQuery(makeFamily.makeQueryString(req.body.pinArray, req.body.familyId),
    function (err, rows) {
       if (err) {
         res.json(err);
         console.log(err);
       }
       console.log(rows);
       res.json(rows);
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
  makeFamily.getFamilyMembers(req.query.family_id)
  .then(function (results) {
    console.log(results[0]);
    res.json(results[0]);
  },
  function (err) {
    res.json(err);
  });
});

router.route('/').get(function (req, res) {
  //two queries, get family name, get people
  var responseObject = {};
  var family_id = req.query.family_id;
   when.all([
     pgQuery('SELECT family_name, family_id FROM families WHERE family_id = $1', [family_id]),

      pgQuery('select first_name, last_name, email, p.pin from people p join people_and_families pf '  +
        'on p.pin=pf.pin ' +
        'where pf.family_id = $1', [family_id]
      )
  //
  //       pgQuery('select house_number, street, city, county, state, zip from people p join people_and_addresses pa ' +
  //       'on (p.pin = pa.pin) join addresses a on (pa.address_id = a.address_id) ' +
  //         'where p.pin = $1', [family_id])
    ]).
  //
     spread(function (family, people) {
          console.log('from /data/family to client family: ', family[0][0]);
          console.log('from /data/family to client people: ', people[0]);
          responseObject.family= family[0][0];
          responseObject.people = people[0];
         res.json(responseObject);
     });

  }).
  post(function (req, res) {
      console.log('re.body: ', req.body);
      pgQuery("INSERT INTO families (family_name) values ($1) RETURNING family_id",
        [makeFamily.makeFamilyName(req.body)],
        function (err, rows, results) {
          console.log('rows response from family name insert: ', rows);
          if (err) res.json(err);
          console.log('query string', makeFamily.makeQueryString(req.body, rows[0].family_id));
          pgQuery(makeFamily.makeQueryString(req.body, rows[0].family_id),
            function (err, rows, results) {
              if(err) res.json (err);
              res.json('success!');
            });
        });
  });





module.exports = router;
