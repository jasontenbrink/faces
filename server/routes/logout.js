var express = require('express');
router = express.Router();

router.get('/', function (req, res) {
  req.logout();
  console.log('logging out...');
  res.send('success');

});

module.exports = router;
