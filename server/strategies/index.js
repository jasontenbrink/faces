var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const pgQuery = require('pg-query')

const config = require('./config.js')
const googleStrategy = require('./google.js')
const localStrategy = require('./local.js')
const facebookStrategy = require('./facebook.js')
const dbQueries = require('./dbQueries.js')

passport.serializeUser(function (userFromStrategy, done) {
    done(null, userFromStrategy);
});

passport.deserializeUser((userFromSerializer, done) => { // this puts things onto req.user.
    dbQueries.getProfile(userFromSerializer.pin)
    .then( user => done(null, user))
    .catch( err => {
        console.log(err)
        return done(false)
    });
});

passport.use('local', new LocalStrategy (config.local, localStrategy));
passport.use(new GoogleStrategy (config.google, googleStrategy));
passport.use(new FacebookStrategy (config.facebook, facebookStrategy));

module.exports = passport;

