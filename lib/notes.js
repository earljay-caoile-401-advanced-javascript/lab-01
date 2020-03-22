'use strict';

const uuid = require('uuid').v4;

/**
 * Represents a note.
 * @constructor
 * @param {object} input - object payload received from input.js
 */
function Notes(input) {
  const action = input.action.toLowerCase();
  switch (action) {
    case 'add':
      this.add(input);
      break;
    default:
      break;
  }
}

/**
 * Prototype method for a note object
 * @param {object} input - object payload received from constructor
 * @return {void}
 */
Notes.prototype.add = input => {
  this.id = uuid();
  this.text = input.payload;
  console.log('adding the following:', this.text);
};

module.exports = input => new Notes(input);
