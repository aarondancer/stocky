var Stock = require('../models/Stock');
var Market = require('../models/Market');
var market = require('./market');
var faker = require('faker');
var async = require('async');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.generateStocks = function (req, res, name, users) {
  var stocks = [];
  for (var i = 0; i < 5; i++) {
    var name = faker.company.companyName();
    var shares = getRandomInt(5, 10) * 1000;
    var stock = new Stock({
      name: name,
      symbol: String(name.slice(0, 2) + name.slice(-1))
        .toUpperCase(),
      value: getRandomInt(1, 500),
      history: [],
      totalShares: shares,
      sharesLeft: Math.ceil(shares / getRandomInt(2, 4))
    });
    stocks.push(stock);
  }

  Stock.create(stocks, function (err, result) {
    market.createNewMarket(req, res, new Market({
    	name: name,
    	users: users,
    	stocks: result
    }));
  });
}
