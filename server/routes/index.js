var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');


//router.post('/',
//    passport.authenticate('local', {
//      successRedirect: '/assets/views/home.html',
//      failureRedirect: '/assets/views/index.html'
//    })
//);

router.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, "../public/assets/views/index.html"));
});

module.exports = router;
