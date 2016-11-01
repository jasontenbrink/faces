var express = require('express');
var when = require('when');
var pgQuery = require('pg-query');
var router = express.Router();

router.route('/individual').get(function (req, res) {
  //make 3 calls to DB.  1 for singular data on peoples table, 1 for fam, 1 for address, 1 for phone #
  console.log('/individual query parameters from client, req.query.pin:', req.query.pin);
  var responseObject = {};
  var pin = req.query.pin;
  when.all([
      pgQuery('SELECT * FROM people WHERE pin = $1', [pin]),
      pgQuery('select family_name, f.family_id from people p join people_and_families pf '  +
        'on p.pin=pf.pin join families f on pf.family_id=f.family_id ' +
        'where p.pin = $1', [pin]),
      pgQuery('select house_number, street, city, county, state, zip, a.address_id from people p join people_and_addresses pa ' +
      'on (p.pin = pa.pin) join addresses a on (pa.address_id = a.address_id) ' +
        'where p.pin = $1', [pin])
    ]).
    spread(function (individual, families, addresses) {
        responseObject.individual= individual[0][0];
        responseObject.families = families[0];
        responseObject.addresses = addresses[0];

        console.log('/individual responseObject.pin heading back to client: ', responseObject.individual.pin);
        res.json(responseObject);
    });
});

router.route('/').get(function (req, res) {
  var results = [];
  var firstNameParam = req.query.first_name + '%';
  var lastNameParam = req.query.last_name + '%';
  var emailParam = req.query.email + '%';
  console.log('/data query params', firstNameParam, lastNameParam, emailParam);

  if(!req.query.emai){
    var queryString = 'select first_name, last_name, email, gender, age, electronic_newsletter,' +
        ' pin, admin_notes, primary_phone_number, secondary_phone_number ' +
        ' from people ' +
        ' where first_name' +
        ' ILIKE $1 AND last_name ILIKE $2',
        paramsArray = [firstNameParam, lastNameParam];
    }
   else{
    queryString = 'select first_name, last_name, email, gender, age, electronic_newsletter, pin, admin_notes, primary_phone_number, secondary_phone_number ' +
        ' from people ' +
        ' where first_name' +
        ' ILIKE $1 AND last_name ILIKE $2 AND email ILIKE $3';
    paramsArray = [firstNameParam, lastNameParam, emailParam];
  }
  pgQuery(queryString, paramsArray, function (err, rows) {
        if (err){
          console.log('/data.get, ', err);
          res.json(err);
        }
        else{
          console.log("it worked!");
          res.json(rows);
        }
      });
  // pgQuery('select first_name, last_name, email, gender, age, electronic_newsletter, pin, admin_notes, primary_phone_number, secondary_phone_number ' +
  //     ' from people ' +
  //     ' where $4' +
  //     ' ILIKE $1 AND last_name ILIKE $2 AND email ILIKE $3',
  //     [firstNameParam, lastNameParam, emailParam, 'first_name'], function (err, rows) {
  //       if (err){
  //         console.log('/data.get, ', err);
  //         res.json(err);
  //       }
  //       else{
  //         console.log("it worked!");
  //         res.json(rows);
  //       }
  //     });
});


module.exports = router;
