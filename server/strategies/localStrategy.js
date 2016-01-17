var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var pgQuery = require('pg-query');
var pg = require('pg');

var Promise = require('bluebird');
var bcrypt = require('bcrypt');

pg.connectionParameters = process.env.DATABASE_URL   || 'postgres://localhost:5432/church';

var connectionString = process.env.DATABASE_URL   || 'postgres://localhost:5432/church';

//It runs after the local strategy.  Creates session.
passport.serializeUser(function(user, done){

  // user parameter comes from the successful "done" in the bcrypt.compare method
  // in the strategy
  //console.log('Serializer, what is the value of user', user);
  done(null, user.username);//this value (the second one) is passed into the deserializer 'id' parameter
});

// this puts things onto req.user.  Will put things on the req during
// preprocessing/middleware
passport.deserializeUser(function(id, done){
  //console.log('deserialize id is: ', id);

  //a DB call isn't necessary here.  I'm leaving it in in case we want to stick some stuff
  //from the DB onto the req.user.

  // pgQuery("select email from people where email = $1", [id])
  //   .then(function (err, response) {
  //     console.log('deserializer, response', response.rows[0]);
  //     username = response.rows[0];
  //     done(null, username);
  //   });
  pg.connect(connectionString, function (err, client) {
    client.query("select email from people where email = $1", [id],
      function (err, response) {
      //  client.end();
        console.log('deserializer, response', response.rows[0]);
        username = response.rows[0];

        //at this point we put whatever we want into the req.user property (second argument
        // of done).
        //req.user will automatically get added to all requests coming from this client
        //(determined by the cookie the client gives us).  It gets added on by Passport
        //during the middleware part of processing the request.
        done(null, username);
        //username must be an object, that is what passport expects in order to
        //do several things, such as set up isAuthenticated(). I had been passing
        //in a string object and isAuthenticated wasn't showing up
      }
    );
});

});

passport.use('local', new localStrategy({
    passReqToCallback: true,

    //this needs to be whatever property the client is
    //sending the username in as under req.body
    usernameField: 'username'

    }, function(req, username, password, done) {
      //make DB call to get userspassword. on the post body.
    console.log('right before the DB call, req.body', req.body);

    //don't add in 'done' as the third parameter, it will eat the 'done' that
    //the callback strategy needs.
    pg.connect(connectionString, function (err,client) {
      //get hashed password to compare
      client.query("select password from people where email = $1", [req.body.username],
      function (err, response) {
        if (err) return err;
        if (response.rows[0] === undefined){
          done(null, false, {message: 'no email found'});
        }
        console.log('response',response);

        var dbPassword = response.rows[0].password;
        client.end();
        console.log('the password from the DB', dbPassword);

          //compare passwords, bcrypt.compare hashes the first argument using
          //the salt factor that was already set up (set up in register.js for now)
            bcrypt.compare(req.body.password, dbPassword, function(err, isMatch){
                if(err) return err;
                console.log('isMatch value from compare', isMatch);

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
    });
}));

module.exports = passport;
