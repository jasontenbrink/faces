var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google'), function (res, req) {
  console.log('req.user after successful google login, ', req.user);
  res.send(req.user);
});

module.exports = router;
