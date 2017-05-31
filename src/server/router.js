var express = require('express');
var router = express.Router();
let lowdb = require('lowdb');
let db = lowdb('src/data/prices.json');
let userDb = lowdb('src/data/user.json');

/* GET home page. */
router.get('/:vcType/data', function(req, res) {
  let vcType = req.params.vcType;
  let result = db.value();
  console.log(result);
  res.json(result);
});

router.get('/trade/history/:id', function (req, res) {
  let id = req.params.id;
  let user = userDb.get('users').find({ id: Number(id) }).value();
  res.json(user);
});

router.post('/trade', function (req, res) {

  let id = req.body.userId;
  let user = userDb.get('users').find({ id: Number(id) }).value();

  if(user.history == undefined){
      user.history = [];
  }

  let list = db.get('bithumb').value();
  let last = list[list.length - 1];

  if(req.body.tradeType == 'buy'){
    let _money = (req.body.amount * last.price);
    user.money = user.money - _money;
  } else {
    let _money = (req.body.amount * last.price);
    user.money = user.money + _money;
  }

  var history = {
    'vcType' : req.body.vcType,
    'tradeType' : req.body.tradeType,
    'price' : last.price,
    'priceId' : last.uuid,
    'amount' : req.body.amount,
    'money' : (req.body.amount * last.price),
    'date' : new Date().getTime()
  }
  user.history.push(history);

  userDb.get('users').find({id : Number(id)}).set(user).write();
  res.send(200);
});

module.exports = router;
