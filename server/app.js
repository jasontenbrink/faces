var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var index = require('./routes/index.js');
var data = require('./routes/data.js');
var family = require('./routes/family.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use('/data/family', family);
app.use('/data', data);
app.use('/',index);
app.set('port', process.env.PORT || 8000);


app.listen(app.get('port'), function () {
  console.log(' listening on port ', app.get('port'));
});
