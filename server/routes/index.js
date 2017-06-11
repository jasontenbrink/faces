var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

// router.post('/',
//         passport.authenticate('local'), function(req, res){
//           console.log('req.user after successful login, ', req.user);
//           res.sendFile(path.join(__dirname, "../public/assets/views/index.html"))
//         }
// );

router.post('/',
   passport.authenticate('local', {
     successRedirect: '/',
     failureRedirect: '/sign-on'
   })
);

router.get('/sign-on', function(req, res){
  res.sendFile(path.join(__dirname, "../public/assets/views/sign-on.html"));
})
router.get('/*', checkIfSignedOn, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/assets/views/index.html"));
});

module.exports = router;

//////////////////////////////

function checkIfSignedOn(req, res, next){
  if(req.isAuthenticated()) next();
  else res.sendFile(path.join(__dirname, "../public/assets/views/sign-on.html"));
}