'use strict';

const inputSchema = {
  action: { type: 'string', required: true },
  payload: { type: 'string' },
  idToDelete: { type: 'string' },
  category: { type: 'string' },
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

    for (let i = 0; i < objKeyArr.length; i++) {
      let key = objKeyArr[i];
      let val = minimistArgs[key];

      switch (key) {
        case 'a':
        case 'add':
          this.action = 'add';
          this.payload = val;
          break;
        case 'c':
        case 'category':
          this.category = val;
          break;
        case 'l':
        case 'list':
          this.action = 'list';
          if (val === true && !minimistArgs._[0]) {
            break;
          }
          this.category = val;
          break;
        case 'd':
        case 'delete':
          this.action = 'delete';
          this.idToDelete = val;
          break;
        default:
          break;
      }
    }

    if (!this.isValid()) {
      this.handleInvalid(minimistArgs);
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

  /**
   * Validates the object to ensure that it's in the proper format and contains required fields
   *
   * @method
   * @name handleInvalid
   * @returns {error} throws an error with a string statement
   */
  handleInvalid(minimistArgs) {
    switch (this.action) {
      case 'list':
        throw 'error: invalid category';
      case 'add':
        if (
          !this.payload ||
          (this.payload === true && !minimistArgs._[0]) ||
          (typeof this.payload === 'string' && !this.payload.trim())
        ) {
          throw 'error: add is missing payload';
        } else {
          throw 'error: invalid payload type';
        }
      case 'delete':
        throw 'error: delete is missing id';
      default:
        throw 'error: invalid flag';
    }
  }
}

module.exports = input => new Input(input);
