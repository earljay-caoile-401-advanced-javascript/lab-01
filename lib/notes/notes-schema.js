'use strict';

const mongoose = require('mongoose');

const note = mongoose.Schema({
  text: { type: 'string', required: true },
  category: { type: 'array' },
});

module.exports = mongoose.model('note', note);
