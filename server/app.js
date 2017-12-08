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
var passport = require('./strategies')
var login = require('./routes/login.js');
var logout = require('./routes/logout.js');
var userRegistration = require('./routes/userRegistration');
var authenticate = require('./routes/authenticate.js');
var session = require('express-session');
var googleAuth = require('./routes/googleAuth.js');
const passwordManagement = require('./routes/passwordManagement/');
const checkReadWritePermissions = require('./middleware/checkReadWritePermissions');

/*jshint multistr: true */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/***DB connection string for any DB calls throughout the app***/
// pgQuery.connectionParameters = process.env.DATABASE_URL;  //heroku
pgQuery.connectionParameters = 'postgres://localhost:5432/noraChurch'; //local



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

app.get('/auth/google/callback',
           passport.authenticate('google', {
                   successRedirect : '/',
                   failureRedirect : '/'
           }));

app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  }));


app.use( (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.use('/profile', authenticate, checkReadWritePermissions, profile); // is this used?
app.use('/register', authenticate, checkReadWritePermissions, userRegistration); //checkReadWritePermissions
app.use('/data/family', authenticate, family);
app.use('/address', authenticate, address);
app.use('/memberAdmin', authenticate, checkReadWritePermissions, memberAdmin);
app.use('/data', authenticate, checkReadWritePermissions, data);
app.use('/passwordManagement', authenticate, checkReadWritePermissions, passwordManagement);  //checkReadWritePermissions

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
