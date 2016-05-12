var express = require('express');
var when = require('when');
var pgQuery = require('pg-query');
var router = express.Router();

/*jshint multistr: true */
router.route('/people_and_addresses').
  get(function (req, res) {

    pgQuery("SELECT pin, address_id FROM people_and_addresses WHERE pin=$1",
    [req.query.pin], function (err, rows) {
      console.log('select addresses response, rows, ', rows);
      if(err){
        console.log('select persons addresses', err);
        res.json(err);
      }
      else res.json(rows);
    });
  }).
  post(function (req, res) {
    console.log('people_and_addresses post req.body, ', req.body);
    pgQuery("INSERT INTO people_and_addresses (pin, address_id) \
            VALUES ($1, $2) RETURNING *",
    [req.body.pin, req.body.address_id], function (err, rows) {
        if (err){
          console.log('address route: ', err);
          res.json(err);
        }
        res.json(rows);
    });

  });

router.route('/').post(function (req, res) {
  pgQuery("INSERT INTO addresses (house_number, street, city, county, state, zip) \
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING address_id",
        [req.body.house_number, req.body.street, req.body.city,
          req.body.county, req.body.state, req.body.zip],
        function (err, rows, results) {
          if (err){
            console.log('address route: ', err);
            res.json(err);
          }
          console.log('pin, rows, ', rows);
          pgQuery("INSERT INTO people_and_addresses (pin, address_id) \
                  VALUES ($1, $2) RETURNING *",
                [req.body.pin, rows[0].address_id],
                function (err, rows, results) {
                  if (err){
                    console.log('address and people route: ', err);
                    return err;
                  }
                  return rows;
                });
          res.json(rows);
        });
}).put(function (req, res) {
  console.log('re.body', req.body);
  pgQuery ("UPDATE addresses SET house_number = $1, \
      street = $2, \
      city = $3, \
      county = $4, \
      state = $5, \
      zip = $6 \
      WHERE address_id = $7 RETURNING address_id",
    [req.body.house_number, req.body.street, req.body.city,
      req.body.county, req.body.state, req.body.zip, req.body.address_id],
    function (err, rows, results) {
      if (err){
        console.log('address route: ', err);
        res.json(err);
      }
      res.json(results);
    });
});





module.exports = router;
