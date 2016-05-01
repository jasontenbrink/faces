var express = require('express');
var when = require('when');
var pgQuery = require('pg-query');
var router = express.Router();

/*jshint multistr: true */
router.route('/').post(function (req, res) {

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
