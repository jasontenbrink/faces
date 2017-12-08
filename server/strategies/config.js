module.exports = {
    local: {
        passReqToCallback: true,

        //this needs to be whatever property the client is
        //sending the username in as under req.body
        usernameField: 'username'
    },
    google: {
        passReqToCallback: true,
        clientID: process.env.GOOGLE_CLIENT,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL  //putting in .env as a reminder to change it on Heroku
    },
    facebook: {
        passReqToCallback: true,
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    }
}