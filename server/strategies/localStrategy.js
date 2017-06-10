var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var pgQuery = require('pg-query');
var Promise = require('bluebird');
var bcrypt = require('bcrypt');

//It runs after the local strategy.  Creates session.
passport.serializeUser(function(user, done){

  // user parameter comes from the successful "done" in the bcrypt.compare method
  // in the strategy
  done(null, user.username);//this value (the second one) is passed into the deserializer 'id' parameter
});

// this puts things onto req.user.  Will put things on the req during
// preprocessing/middleware
passport.deserializeUser(function(id, done){

  //a DB call isn't necessary here.  I'm leaving it in in case we want to stick some stuff
  //from the DB onto the req.user.

  // pgQuery("select email from people where email = $1", [id])
  //   .then(function (err, response) {
  //     console.log('deserializer, response', response.rows[0]);
  //     username = response.rows[0];
  //     done(null, username);
  //   });
  pgQuery("select email, first_name, last_name from people where email = $1", [id],
      function (err, rows) {
        username = rows[0];

        //at this point we put whatever we want into the req.user property (second argument
        // of done).
        //req.user will automatically get added to all requests coming from this client
        //(determined by the cookie the client gives us).  It gets added on by Passport
        //during the middleware part of processing the request.
        done(null, username);
        //username must be an object, that is what passport expects in order to
        //do several things, such as set up isAuthenticated(). I had been passing
        //in a string object and isAuthenticated wasn't showing up
  });
});

passport.use('local', new localStrategy({
    passReqToCallback: true,

    //this needs to be whatever property the client is
    //sending the username in as under req.body
    usernameField: 'username'

    }, function(req, username, password, done) {
      //make DB call to get userspassword. on the post body.
    //don't add in 'done' as the third parameter, it will eat the 'done' that
    //the callback strategy needs.
    console.log('login', req.body)
    pgQuery("select password from people where email = $1", [req.body.username],
      function (err, rows) {
        if (err) return err;
        if (rows === undefined || rows[0] == undefined){
          return done(null, false, {message: 'no email found'});
        }
        console.log('local strat, search DB for password, rows[0], ', rows[0]);
        var dbPassword = rows[0].password;
        //client.end();
          //compare passwords, bcrypt.compare hashes the first argument using
          //the salt factor that was already set up (set up in register.js for now)
            bcrypt.compare(req.body.password, dbPassword, function(err, isMatch){
                if(err) return err;

                //this var gets sent to SerializeUser and is passed in as the
                //user parameter. I think SerializeUser is what actually makes
                //the session.
                var objectSentToSerializer = {
                  username: req.body.username,
                  randomFunMessage: 'chickenButt'
                };

                if (isMatch){
                  //req.login(objectSentToSerializer, done);
                  return done(null, objectSentToSerializer);
                }
                else{
                  console.log('authentication failed');
                  return done(null, false, {message:'failed'});

                }
            });
      });
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL  //putting in .env as a reminder to change it on Heroku
},
function (token, refreshToken, profile, done) {
  console.log('in google strat');
 //if (token) console.log('here is the token error', token);
  //put DB callbacks in the queue after the google info comes back
  process.nextTick(function () {
    var objectSentToSerializer = {
      username: profile.emails[0].value,
      randomFunMessage: 'chickenButt',
      firstName: profile.name.givenName,
      lastName: profile.name.familyName
    };
    console.log('next tick happened.  Profile is ', profile.displayName);
    //fetch profile from DB
    pgQuery('SELECT email from people where google_id = $1', [profile.id])
    .then(
      function (response) {
        var username = response[0][0];
        if (username){

          return done (null, objectSentToSerializer);
        }
        else{
          //can add profile.name.familyName
          //profile.name.givenName
          //profile.gender
          //profile.photos[0].value this is a url
          pgQuery('insert into people (first_name, last_name, google_id, google_token, email, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING email',
            [profile.name.givenName, profile.name.familyName, profile.id, token, profile.emails[0].value, profile.gender])
          .then(function (response) {
              console.log('returning email to Serializer', profile.id);
              return done(null, objectSentToSerializer);
            },
            function (err) {
              console.log('error inserting new person', err);
              return done(err);
            }
          );
        }
      },
      function (error) {
      console.log('error on google db lookup: ', error);
      return done(error);
      }
    );
  });
}));

module.exports = passport;
