var pgQuery = require('pg-query')
const database = require('./dbQueries')

function errorHandler (message, done){
    return err => {
        console.log(message, err);
        return done(err);
    }
}

module.exports = function (req, token, refreshToken, profile, done) {
    var objectSentToSerializer = {
        username: profile.emails[0].value,
        randomFunMessage: 'chickenButt',
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
    };

    if (req.user){
        database.addGoogleAuthToAccount(profile, token, req.user.username)
        .then(res => {
            return done(null, req.user)
        })
        .catch(err => {
            return done(err)
        });
    } else {
        pgQuery('SELECT email, pin from people where google_id = $1', [profile.id])
        .then(response => {
                var username = response[0][0];
                if (username.pin) return done(null, Object.assign({}, objectSentToSerializer, {pin: username.pin}));
                else { // create a new account
                    // get pin and email from db.  if you get one login. If not, fail.
    
                    return done(false);
    
                    // pgQuery('insert into people (first_name, last_name, google_id, google_token, email, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING email',
                    //     [profile.name.givenName, profile.name.familyName, profile.id, token, profile.emails[0].value, profile.gender])
                    // .then(response => done(null, objectSentToSerializer))
                    // .catch(errorHandler('error adding new google profile', done));
                }
        })
        .catch(errorHandler('google db lookup', done))
    }

    //fetch profile from DB
    
}