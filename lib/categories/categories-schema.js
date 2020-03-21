'use strict';

const mongoose = require('mongoose');

const category = mongoose.Schema({
  name: { type: 'string', required: true },
});

module.exports = mongoose.model('category', category);
