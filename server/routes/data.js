var express = require('express');
var when = require('when');
var pg = require('pg');
var pgQuery = require('pg-query');

//local connects to HEROKU_DB_URL on heroku.  make sure and add the correct string in your .env file
pgQuery.connectionParameters = process.env.DATABASE_URL + "?ssl=true"   || process.env.HEROKU_DB_URL;


var router = express.Router();

//pg connection String
var connectionString = process.env.DATABASE_URL   || process.env.HEROKU_DB_URL;


router.route('/individual').get(function (req, res) {
  //make 3 calls to DB.  1 for singular data on peoples table, 1 for fam, 1 for address, 1 for phone #
  console.log('/individual query parameters from client, req.query.pin:', req.query.pin);
  var responseObject = {};
  var pin = req.query.pin;
  when.all([
      pgQuery('SELECT * FROM people WHERE pin = $1', [pin]),

      pgQuery('select family_name, f.family_id from people p join people_and_families pf '  +
        'on p.pin=pf.pin join families f on pf.family_id=f.family_id ' +
        'where p.pin = $1', [pin]
      ),

        pgQuery('select house_number, street, city, county, state, zip from people p join people_and_addresses pa ' +
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
//  res.json(result);

});



router.route('/').get(function (req, res) {
  //To Do
  //in order to display all users,
  //add if statements to to account for null search fields
  //use case is that a search made when all fields are blank should return all users
  // I think what that means is that if the field is left blank it should be 'OR' instead of 'AND'
  // I don't think that will work.  I think we need to look at the value of each param, if its empty ...
  // I think we need to make sure that we insert empty strings instead of leaving a value null.
  var results = [];
  var firstNameParam = req.query.first_name + '%';
  var lastNameParam = req.query.last_name + '%';
  var emailParam = req.query.email + '%';
  console.log('/data query params', firstNameParam, lastNameParam, emailParam);
  pg.connect(connectionString,function (err, client, done) {
    var query = client.query('select first_name, last_name, email, pin ' +
      ' from people ' +
      ' where first_name' +
      ' ILIKE $1 AND last_name ILIKE $2 AND email ILIKE $3',
      [firstNameParam, lastNameParam, emailParam]);
    query.on('row', function (row) {
      results.push(row);
    });
    query.on('end',function () {
      client.end();
      res.json(results);
    });
  });
});


module.exports = router;
