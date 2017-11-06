var passport = require('./passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const config = require('./config.js')
const google = require('./google.js')
const local = require('./localStrategy.js')

passport.serializeUser(function (userFromStrategy, done) {
    done(null, userFromStrategy.username);
});

passport.deserializeUser(function (userFromSerializer, done) { // this puts things onto req.user.
    pgQuery("select email, first_name, tenant_id, role, last_name from people where email = $1", [userFromSerializer],
        function (err, rows) {
            const user = rows[0];
            done(null, user); // must be object
        });
});

passport.use(new LocalStrategy, config.local, local);
passport.use(new GoogleStrategy, config.google, google);
passport.use(new FacebookStrategy, config.facebook, facebook);

module.exports = passport;

