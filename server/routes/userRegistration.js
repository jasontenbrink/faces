var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pgQuery = require('pg-query');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var SALT_WORK_FACTOR = 10;

// router.get('/', function (req, res, next){
//     res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
// });

router.post('/', function(req,res,next){
  var user = {
              password: req.body.password,
              username: req.body.username,
              firstName: req.body.firstName || "",
              lastName: req.body.lastName || ""
            };
  console.log('user values, ', user);

//  if(!user.isModified('password')) return next;


    bcrypt.genSaltAsync(SALT_WORK_FACTOR).then(function(salt){
      //  if(err) return next(err);
        console.log('value of salt, before hash', salt);
        console.log('value of pwd before hash', user.password);
        return bcrypt.hashAsync(user.password, salt);
      })
      .then(function(hash){
         user.password = hash;
            console.log('pwd from inside bcrypt after hash', user.password);
            //next();
            pgQuery('insert into people (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)',
                  [user.username, user.password, user.firstName, user.lastName],
                  function (err, rows) {
                    if (err) console.log(err);
                    res.redirect('/');  //this redirect should probably go away
                    // probably just send a 200 status or something
            });
        });
});

module.exports = router;
