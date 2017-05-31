var express = require('express');
let path = require('path');
var app = express();
var bodyParser = require('body-parser');
let router = require('./router');
let collector = require('./collector');
let user = require('./user');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use('/api/v1', router);
app.use(express.static('src/public'));
app.use('/user', user);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

collector.start('BTC');
