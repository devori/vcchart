var express = require('express');
let path = require('path');
var app = express();

app.get('/', function (req, res) {
  res.sendfile(path.resolve(__dirname, '../html/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
