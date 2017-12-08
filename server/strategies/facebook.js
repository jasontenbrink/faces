const pgQuery = require('pg-query')
const database = require('./dbQueries')

// need to go off of pin instead of email
module.exports = (req, accessToken, refreshToken, profile, done) => {
    if(req.user){
        database.addFacebookAuthToAccount(profile, accessToken, req.user.username)
        .then(res => {
            return done(null, req.user)
        })
        .catch(err => {
            return done(err)
        });
    } else {
        database.getEmailWithFacebookId(profile.id)
        .then(user => {
            if (user.pin) return done(null, {username: user.email, pin: user.pin});
            else return done(false);
        })
        .catch(err => {
            return done(err)
        });
    }
}