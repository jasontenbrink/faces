var express = require('express');
var when = require('when');
var pgQuery = require('pg-query');
var router = express.Router();

router.route('/').post(function (req, res) {
    var user = req.body;
    useremail = req.body.email;
    //write to user table and get PIN, then write to address table with PIN.
    //console.log('body.email', req.body);
    pgQuery("INSERT INTO people (email, first_name, last_name, age, gender, electronic_newsletter) VALUES ($1, $2, $3, $4, $5, $6) RETURNING pin",
    [user.email, user.firstName, user.lastName, user.age, user.gender, user.electronic_newsletter],
      function (err, rows, results) {
          if(err) {
            console.log(err);
            res.json(err);
          }
             res.json(results);
       }
    );
});



module.exports = router;
