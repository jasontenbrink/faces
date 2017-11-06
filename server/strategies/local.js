module.exports = function(req, username, password, done) {
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
}