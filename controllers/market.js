var _ = require('lodash');
var async = require('async');
var Market = require('../models/Market');
var Stocks = require('./stock');

function urlSafe(string) {
	return string.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

/**
 * GET /markets
 * Markets page
 */
exports.getMarkets = function(req, res) {
	if (!req.user) {
		return res.redirect('/');
	}
	res.render('market/list', {
		title: 'Markets'
	});
};

/**
 * GET /markets/new
 * Create new market page
 */
exports.newMarket = function(req, res) {
	if (!req.user) {
		return res.redirect('/');
	}
	res.render('market/new', {
		title: 'Create Market'
	});
};

exports.createNewMarket = function(req, res, market) {
	return Market.findOne(
		{ name: req.body.name },
		function(err, existingMarket) {
			if (existingMarket) {
				req.flash('errors', { msg: 'Market with that name already exists' });
				return res.redirect('/markets/new');
			}

			market.save(function(err, savedMarket) {
				if (err) {
					return next(err);
				}
				res.redirect('/markets/' + savedMarket.id);
			})
		}
	)
}

/**
 * POST /markets/new
 * Post to createnew market
 */
exports.postNewMarket = function(req, res, next) {
	req.assert('name', 'Name is not valid').len(1);

	var errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors);
		return res.redirect('/markets/new');
	}

	var name = req.body.name;
	var users = req.body.users.replace(/\s+/g, '').split(',');

	Stocks.generateStocks(req, res, name, users);
};

/**
 * GET /markets/:id
 * Gets and displays a market page by id
 */
exports.getMarket = function(req, res) {
	if (!req.user) {
		return res.redirect('/');
	}
	res.render('market/dashboard', {
		title: 'Market Dashboard'
	});
};

/**
 * POST /markets/:id
 * Updates a market by id
 */
exports.updateMarket = function(req, res, next) {
	req.assert('name', 'Name is not valid').len(1);
	req.assert('stocks', 'Stocks are required').len(1);
	
	var errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors);
		return res.redirect('/markets');
	}

	Market.findById(
		req.market.id,
		function(err, market) {
			if (err) {
				return next(err);
			}
			market.name = req.body.name || '';
			market.url = market.name ? urlSafe(market.name) : '';
			market.stocks = (req.body.stocks) ?
				req.body.stocks.replace(/\s+/g, '').split(',')
				: '';
			market.users = (req.body.users) ? 
				req.body.stocks.replace(/\s+/g, '').split(',')
				: '';
			market.save(function(err) {
				if (err) {
					return next(err);
				}
				req.flash('success', { msg: 'Market successfully updated' });
				res.redirect('/market/' + market.id)
			})
		}
	)
};
