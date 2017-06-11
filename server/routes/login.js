var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.post('/',
        passport.authenticate('local'), function(req, res){
          console.log('req.user after successful login, ', req.user);
          res.sendFile(path.join(__dirname, "../public/assets/views/index.html"));
          // res.send(req.user);
        }
);

//router.post('/',
//    passport.authenticate('local', {
//      successRedirect: '/assets/views/index.html',
//      failureRedirect: '/assets/views/index.html'
//    })
//);

module.exports = router;


