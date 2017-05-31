let request = require('request');
let lowdb = require('lowdb');
let db = lowdb('src/data/prices.json');

let intervalId;

function start(vcType) {
  intervalId = setInterval(() => {
    get(vcType).then((data) => {
      let priceData = JSON.parse(data).data;
      db.push(priceData).write();
    });
  }, 1000 * 60)
}

function stop() {
  clearInterval(intervalId);
  intervalId = 0;
}

function get(vcType) {
  return new Promise((resolve, reject) => {
    request(`https://api.bithumb.com/public/ticker/${vcType}`, (err, res, body) => {
      resolve(body);
    });
  });
}

module.exports = {
  start: start,
  stop: stop
}
