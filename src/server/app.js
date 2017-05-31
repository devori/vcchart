var express = require('express');
let path = require('path');
var app = express();
let router = require('./router');
let collector = require('./collector');

app.use('/api/v1', router);
app.use(express.static('src/public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

collector.start('BTC');
