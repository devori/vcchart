var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:vcType/data', function(req, res) {
  let vcType = req.params.vcType;
  res.json([
    {'price': 100, 'timestamp': new Date().getTime() },
    {'price': 200, 'timestamp': (new Date().getTime() + 1000) }
  ]);
});

module.exports = router;
