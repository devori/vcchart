var express = require('express');
var router = express.Router();
let path = require('path');
let lowdb = require('lowdb');
let db = lowdb('src/data/user.json');
let uuidV1 = require('uuid/v1');

router.get('/create', function (req, res) {
  res.sendfile(path.resolve(__dirname, '../public/createUser.html'));
});

router.get('/:id', function (req, res) {
  res.sendfile(path.resolve(__dirname, '../public/user.html'));
});

router.post('/add', function (req, res) {


  if(db.get('users').value() == undefined){
    db.defaults({ users: [], seq: 0 }).write();
  }

  let user = req.body.user;
  let seq = db.get('seq').value() + 1;

  user.id = seq;
  user.history = new Array();
  user.money = 1000000;

  db.get('users').push(user).write();
  db.set('seq', seq).write();
  res.redirect('/user/'+ user.id);
});

module.exports = router;
