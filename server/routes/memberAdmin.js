var express = require('express');
var when = require('when');
var pgQuery = require('pg-query');
var pg = require('pg');
var router = express.Router();
var makeFamily = require('../modules/makeFamily.js');

/*jshint multistr: true */

router.route('/')
.post(function (req, res) {
  var user = req.body;
  useremail = req.body.email;
  console.log("req.user", req.user);

  //write to user table and get PIN, then write to address table with PIN.
  pgQuery("INSERT INTO people (email, first_name, last_name, age, gender, electronic_newsletter, \
    primary_phone_number, secondary_phone_number, tenant_id, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 1) RETURNING *",
  [user.email, user.firstName, user.lastName, user.age, user.gender, user.electronic_newsletter,
    user.primary_phone_number, user.secondary_phone_number, req.user.tenant_id],
    function (err, rows, results) {
        if(err) {
          console.log(err);
          res.json(err);
        }
        console.log(user.firstName + " " + user.lastName + ", PIN ", rows[0].pin + ", was written to the people table");
        res.json(rows[0]);
     }
  );
})

.put(function (req,res){
  var param1 = req.body.column,
      param2 = req.body.value,
      param3 = req.body.pin;

  pgQuery ("UPDATE people SET first_name = $1, \
      last_name = $2, \
      email = $3, \
      gender = $4, \
      electronic_newsletter = $5, \
      admin_notes = $6, \
      age = $7, \
      primary_phone_number = $9, \
      secondary_phone_number = $10 \
      WHERE pin = $8 RETURNING pin",
    [req.body.first_name, req.body.last_name, req.body.email, req.body.gender,
      req.body.electronic_newsletter, req.body.admin_notes, req.body.age, req.body.pin,
      req.body.primary_phone_number, req.body.secondary_phone_number],
    function (err, rows, results) {
      if (err){
        console.log(err);
        res.json(err);
      }
      res.json(results);
  });

})

.get(function (req,res) {
  var firstName = req.body.first_name ? req.body.first_name : '%';
  var lastName = req.body.last_name ? req.body.last_name : '%';

  pgQuery("SELECT first_name, last_name, email, gender, age, \
    electronic_newsletter, pin, admin_notes, primary_phone_number, secondary_phone_number from people \
    where first_name ILIKE $1 AND last_name ILIKE $2", [firstName, lastName],
    function (err, rows, results) {
      if (err){
        console.log(err);
        res.json(err);
      }
      res.json(rows);
  });

})

.delete(function (req, res) {
  var pin = req.query.id;
  when.all(getDeletePromises(pin))
  .spread(deleteCallback)
  .catch(function (errors) {
    when.all(getDeletePromises(pin)) //if it fails try it again
    .spread(deleteCallback)
    .catch(function (errors) {
      res.json(errors);
    });
  });
  function deleteCallback(people, addresses, families) {
    console.log('family ids ', families[0]);
    var familiesArray = families[0];
    for (var i = 0; i < familiesArray.length; i++) {
      makeFamily.updateFamilyName(familiesArray[i].family_id);
    }
    res.json(people);
  }
});

function getDeletePromises(pin) {
  return [
    pgQuery("DELETE FROM people where pin = $1 RETURNING pin", [pin]),
    pgQuery("DELETE FROM people_and_addresses where pin = $1", [pin]),
    pgQuery("DELETE FROM people_and_families where pin = $1 RETURNING family_id", [pin])
  ];
}

module.exports = router;
