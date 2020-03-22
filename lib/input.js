'use strict';

/**
 * Represents an input.
 * @constructor
 * @param {object} input - user input from process.argv.slice(2)
 */
function Input(input) {
  const minimistArgs = require('minimist')(input);

  let objKeyArr = Object.keys(minimistArgs);
  for (let i = 0; i < objKeyArr.length; i++) {
    let key = objKeyArr[i];
    let val = minimistArgs[key];

    switch (key) {
      case 'a':
      case 'add':
        this.action = 'add';
        if (!val || !val.length) {
          throw 'error: no text';
        }
        this.payload = val;
        return;
      default:
        break;
    }
  }

  if (!this.action) {
    throw 'error: invalid flag';
  }
}

module.exports = input => new Input(input);
