var DB = require('./db');

var User = DB.Model.extend({
   tableName: 'people',
   idAttribute: 'email',
});

new User({'first_name':'Tom'})
  .fetch()
  .then(function(model) {
    console.log(model.get('first_name'));
  });


module.exports = {
   User: User
};
