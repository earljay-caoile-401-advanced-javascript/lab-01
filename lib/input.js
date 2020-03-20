'use strict';

const inputSchema = {
  action: { type: 'string', required: true },
  payload: { type: 'string', required: true },
};

const valObj = require('./validator.js')(inputSchema);

/**
 * Represents an input.
 * @constructor
 * @param {object} input - user input from process.argv.slice(2)
 * @throws {error: invalid flag} - does not have an approved flag (no action assigned to it)
 * @throws {error: no text} - does not have an approved flag (no action assigned to it)
 */
class Input {
  constructor(input) {
    const minimistArgs = require('minimist')(input);
    let objKeyArr = Object.keys(minimistArgs);
    let isValObj = false;
    for (let i = 0; i < objKeyArr.length; i++) {
      let key = objKeyArr[i];
      let val = minimistArgs[key];
      switch (key) {
        case 'a':
        case 'add':
          this.action = 'add';
          this.payload = val;
          isValObj = this.isValid();
          break;
        default:
          break;
      }

      if (isValObj) {
        return;
      }
    }

    if (!isValObj) {
      if (!this.action) {
        throw 'error: invalid flag';
      } else if (
        !this.payload ||
        (this.payload === true && !minimistArgs._[0])
      ) {
        throw 'error: no text';
      } else {
        throw 'error: invalid payload type';
      }
    }
  }

  /**
   * Validates the object to ensure that it's in the proper format and contains required fields
   *
   * @method
   * @name isValid
   * @returns {boolean} boolean determining whether object meets schema requirements
   */
  isValid() {
    return valObj.validate(this);
  }
}

module.exports = input => new Input(input);
