var mongoose = require('mongoose');

var marketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stocks: {
    type: Array,
    required: true
  },
  users: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Market', marketSchema);
