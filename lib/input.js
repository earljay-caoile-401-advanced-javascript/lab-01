'use strict';

/**
 * Represents an input.
 * @constructor
 * @param {object} input - user input from process.argv.slice(2)
 */
function Input(input) {
  const minimistArgs = require('minimist')(input);

  if (!minimistArgs.hasOwnProperty('a')) {
    throw 'error: invalid flag';
  }
  if (!minimistArgs.a || !minimistArgs.a.length) {
    throw 'error: no text';
  }

  this.action = 'add';
  this.payload = minimistArgs.a;
}

module.exports = input => new Input(input);
