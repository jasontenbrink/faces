require('dotenv').load({silent: true});
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var util = require ('util');
var index = require('./routes/index.js');
var data = require('./routes/data.js');
var family = require('./routes/family.js');
var passport = require('./strategies/localStrategy.js');
var login = require('./routes/login.js');
var logout = require('./routes/logout.js');
var userRegistration = require('./routes/userRegistration');
var authenticate = require('./routes/authenticate.js');
var session = require('express-session');
var googleAuth = require('./routes/googleAuth.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
app.use('/register', userRegistration);
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

app.use('/data/family', authenticate, family);
app.use('/data', authenticate, data);    
app.use('/',index);
app.set('port', process.env.PORT || 8000);


app.listen(app.get('port'), function () {
  util.log(' listening on port ', app.get('port'));
});
