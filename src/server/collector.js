let request = require('request');
let lowdb = require('lowdb');
let uuidV1 = require('uuid/v1');
let db = lowdb('src/data/prices.json');

db.defaults({ bithumb: [], poloniex: [] }).write()

let intervalId;

function start(vcType) {
  intervalId = setInterval(() => {
    getBithumb(vcType).then((priceData) => {
      db.get('bithumb').push({
        uuid: uuidV1(),
        price: Number(Math.trunc(priceData.closing_price / 1118)),
        timestamp: Number(priceData.date)
      }).write();
    });
    getPoloniex(vcType).then((priceData) => {
      db.get('poloniex').push({
        uuid: uuidV1(),
        price: Number(Math.trunc(priceData.last)),
        timestamp: new Date().getTime()
      }).write();
    })
  }, 1000 * 60)
}

function stop() {
  clearInterval(intervalId);
  intervalId = 0;
}

function getBithumb(vcType) {
  return new Promise((resolve, reject) => {
    request(`https://api.bithumb.com/public/ticker/${vcType}`, (err, res, body) => {
      resolve(JSON.parse(body).data);
    });
  });
}

function getPoloniex(vcType) {
  return new Promise((resolve, reject) => {
    request(`https://poloniex.com/public?command=returnTicker`, (err, res, body) => {
      resolve(JSON.parse(body).USDT_BTC);
    });
  });
}

module.exports = {
  start: start,
  stop: stop
}
