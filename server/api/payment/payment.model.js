'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PaymentSchema = new Schema({
  name: String,
  month: Number,
  year: Number
});

module.exports = mongoose.model('Payment', PaymentSchema);
