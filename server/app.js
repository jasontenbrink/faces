require('dotenv').load({silent: true});
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var util = require ('util');
var pgQuery = require('pg-query');
var index = require('./routes/index.js');
const profile = require('./routes/profile.js');
var data = require('./routes/data.js');
var family = require('./routes/family.js');
var address = require('./routes/address.js');
var memberAdmin = require('./routes/memberAdmin.js');
var passport = require('./strategies/localStrategy.js');
var login = require('./routes/login.js');
var logout = require('./routes/logout.js');
var userRegistration = require('./routes/userRegistration');
var authenticate = require('./routes/authenticate.js');
var session = require('express-session');
var googleAuth = require('./routes/googleAuth.js');
var Strategy = require('passport-facebook').Strategy;  //this still needs to be npm installed

/*jshint multistr: true */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/***DB connection string for any DB calls throughout the app***/
pgQuery.connectionParameters = process.env.DATABASE_URL;  //heroku
// pgQuery.connectionParameters = 'postgres://localhost:5432/noraChurch'; //local

//facbook strategy
passport.use(new Strategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL  //'http://localhost:8000/login/facebook/return'
},(accessToken, refreshToken, profile, cb) => {
  // In this example, the user's Facebook profile is supplied as the user
  // record.  In a production-quality application, the Facebook profile should
  // be associated with a user record in the application's database, which
  // allows for account linking and authentication with other identity
  // providers.
  return cb(null, profile);
}));

//Passport Session Configuration
app.use(session({
   secret: process.env.SECRET,
   key: 'user', //this is the name of the key that will be attached to req.session or maybe req.user, can't remember
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 600000, secure: false}
}));

//this has to go before the passport session gets initialized, otherwise
//static files will disappear once a session ends (breaks on login > logout > login)
app.use(express.static (path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

//routes

app.use('/login', login);
app.use('/logout', logout);
//app.use('/auth/google', googleAuth);
app.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));

// app.get('/auth/google/callback', passport.authenticate('google'), function (res, req) {
//   console.log('req.user after successful google login, ');  //maybe we want req.user here
//   //res.redirect('hi');
//
// });

app.get('/auth/google/callback',
           passport.authenticate('google', {
                   successRedirect : '/',
                   failureRedirect : '/'
           }));

app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

app.get('/auth/facebook/callback',
passport.authenticate('facebook', function (err, user, info){
  console.log('facebook', err, user);
}));


app.use('/profile', authenticate, profile);
app.use('/register', authenticate, userRegistration);
app.use('/data/family', authenticate, family);
app.use('/address', authenticate, address);
app.use('/memberAdmin', authenticate, memberAdmin);
app.use('/data', authenticate, data);

// app.use('/register', userRegistration);
// app.use('/data/family', family);
// app.use('/address', address);
// app.use('/memberAdmin', memberAdmin);
// app.use('/data', data);

app.use('/', index);
app.set('port', process.env.PORT || 8000);


app.listen(app.get('port'), function () {
  util.log(' listening on port ', app.get('port'));
});
