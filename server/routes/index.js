var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/*', function (req, res) {
  //var file = req.params[0] || "assets/views/index.html";
  console.log('index route');
  res.sendFile(path.join(__dirname, "../public/assets/views/index.html"));

});

module.exports = router;
