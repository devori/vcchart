var express = require('express');
var router = express.Router();
let lowdb = require('lowdb');
let db = lowdb('src/data/prices.json');
let userDb = lowdb('src/data/user.json');

/* GET home page. */
router.get('/:vcType/data', function(req, res) {
  let vcType = req.params.vcType;
  let result = db.value();
  res.json(result);
});

router.post('/trade', function (req, res) {

  let id = req.body.userId;
  let user = userDb.get('users').find({ id: Number(id) }).value();

  if(user.history == undefined){
      user.history = [];
  }
  
  var history = {
    'vcType' : req.body.vcType,
    'tradeType' : req.body.tradeType,
    'amount' : req.body.amount,
    'date' : new Date().getTime()
  }
  user.history.push(history);
  userDb.get('users').find({id : Number(id)}).set(user).write();
  res.send(200);
});

module.exports = router;
