var express = require('express');
var when = require('when');
var pgQuery = require('pg-query');
var router = express.Router();
const getMemberQueries = require('../modules/getMemberQueries.js')

router.route('/individual').get(function (req, res) {
  //make 3 calls to DB.  1 for singular data on peoples table, 1 for fam, 1 for address, 1 for phone #
  console.log('/individual query parameters from client, req.query.pin:', req.query.pin);
  var responseObject = {};
  var pin = req.query.pin;
  when.all([
      getMemberQueries.getOnePerson(pin, req.user),
      getMemberQueries.getOnePersonsFamilies(pin, req.user),
      getMemberQueries.getOnePersonsAddresses(pin, req.user)
    ]).
    spread(function (individual, families, addresses) {
      console.log('data individual', individual[0])
        responseObject.individual= formatIndividual(individual[0][0]);
        responseObject.families = families[0];
        responseObject.addresses = addresses[0];

        res.json(responseObject);
    });

    function formatIndividual(member){
      const google_id = member.google_id ? true : false;
      const facebook_id = member.google_id ? true : false;
      return Object.assign(member, {google_id}, {facebook_id});
    }
});

router.route('/').get(function (req, res) {
  var firstNameParam = req.query.first_name || "" + '%';
  var lastNameParam = req.query.last_name || ""  + '%';
  var emailParam = req.query.email || ""  + '%';

  //get one address per person
  var paramsArray = [firstNameParam, lastNameParam, req.user.tenant_id];
  getMemberQueries.getManyPeople(paramsArray, req.user.role===3)
  .then(rows => res.json(rows[0]) )
  .catch(err => {
    console.log(err);
    res.json(err);
  });
});

module.exports = router;