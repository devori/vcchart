var express = require('express');
var router = express.Router();
let lowdb = require('lowdb');
let db = lowdb('src/data/prices.json');

/* GET home page. */
router.get('/:vcType/data', function(req, res) {
  let vcType = req.params.vcType;
  let result = db.value();
  res.json(result);
});

module.exports = router;
