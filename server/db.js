//var Bookshelf = require('bookshelf');

// var config = {
//    host: 'localhost',  // your host
//    user: 'root', // your database user
//    password: '', // your database password
//    database: 'dbUsers',
//    charset: 'UTF8_GENERAL_CI'
// };
//
// var DB = Bookshelf.initialize({
//    client: 'postgres',
//    connection: config
// });


var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : 'localhost',
  //user     : '',
  //password : '',
    database : 'church',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'people'
});

new User({'first_name':'Tom'})
  .fetch()
  .then(function(model) {
    console.log(model.get('first_name'));
  });


module.exports = bookshelf;
