var mongoose = require('mongoose');

var shareSchema = new mongoose.Schema({
  purchasePrice: {
  	type: Number,
  	require: true
  }
  stock: {
  	type: ObjectId,
  	require: true
  }
});

module.exports = mongoose.model('Share', shareSchema);
