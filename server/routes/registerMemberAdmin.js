var express = require('express');
var when = require('when');
var pgQuery = require('pg-query');
var pg = require('pg');
var router = express.Router();

/*jshint multistr: true */

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
}).put(function (req,res){
  var param1 = req.body.column,
      param2 = req.body.value,
      param3 = req.body.pin;

  // var connectionString = 'postgres://localhost:5432/church';
  // pg.connect(connectionString,function (err, client) {
  //   client.query("UPDATE people SET 'last_name' = $1 WHERE pin = $2 RETURNING pin",
  //     [param2, param3], function(err, result){
  //       if(err) {
  //           console.log("Error updating data: ", err);
  //           res.send(false);
  //       }else{
  //         res.send(true);
  //       }
  //     });
  // });

  console.log('put route: ', param1 + ' ' + param2 + ' ' + param3);

  var queryString = "UPDATE people SET " + param1 + " = '" +
    param2 + "' WHERE pin = " + param3 + " RETURNING pin";
  // pgQuery (queryString,
  pgQuery ("UPDATE people SET first_name = $1, \
      last_name = $2, \
      email = $3, \
      gender = $4, \
      electronic_newsletter = $5, \
      admin_notes = $6, \
      age = $7 \
      WHERE pin = $8 RETURNING pin",
    [req.body.first_name, req.body.last_name, req.body.email,
      req.body.gender, req.body.electronic_newsletter, req.body.admin_notes, req.body.age, req.body.pin],
    function (err, rows, results) {
      if (err){
        console.log(err);
        res.json(err);
      }
      res.json(results);
    });
});



module.exports = router;
