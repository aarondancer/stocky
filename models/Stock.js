var mongoose = require('mongoose');

var stockSchema = new mongoose.Schema({
  name: {
  	type: String,
  	required: true
  },
  symbol: {
  	type: String,
  	required: true
  },
  value: {
  	type: Number,
  	required: true
  },
  history: Array,
  totalShares: {
  	type: Number,
  	required: true
  },
  sharesLeft: {
  	type: Number,
  	required: true
  }
});

module.exports = mongoose.model('Stock', stockSchema);
