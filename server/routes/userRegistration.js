var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

var pg  = require('pg');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var SALT_WORK_FACTOR = 10;


var connectionString = process.env.DATABASE_URL   || 'postgres://localhost:5432/church';

// router.get('/', function (req, res, next){
//     res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
// });

router.post('/', function(req,res,next){
  var user = req.body;
  console.log('req.body in post', req.body);

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
            pg.connect(connectionString, function (err, client, done) {
              if (err) console.log(err);
              console.log('pwd from just before DB write', user);
              client.query(
                'insert into people (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)',
                  [req.body.username, req.body.password, req.body.firstName, req.body.lastName],
                  function (err, res) {
                    if (err) console.log(err);

                  });
                  res.redirect('/');  //this redirect should probably go away
                  // probably just send a 200 status or something
            });
      });
});

module.exports = router;
