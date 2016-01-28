var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.post('/',
        passport.authenticate('local'), function(req, res){
          console.log('req.user after successful login, ', req.user);
          res.send(req.user);
        }
);

module.exports = router;
