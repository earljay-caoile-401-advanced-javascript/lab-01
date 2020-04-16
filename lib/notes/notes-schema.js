'use strict';

const mongoose = require('mongoose');

const note = mongoose.Schema({
  text: { type: String, required: true },
  category: { type: Array },
});

note.pre('save', function() {
  console.log('Adding a note...');
});

note.post('save', function() {
  console.log('Successfully added the following:', this);
});

note.pre('findOneAndDelete', function() {
  console.log('Deleting a record...');
});

module.exports = mongoose.model('note', note);
