var pgQuery = require('pg-query')

module.exports = function (token, refreshToken, profile, done) {
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
  }