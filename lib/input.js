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
    this.assignProps(minimistArgs);

    if (!this.isValid()) {
      this.handleInvalid(minimistArgs);
    }
  }

  /**
   * Helper method that assigns properties to Input object based on user input
   *
   * @method
   * @name assignProps
   * @returns {void}
   */
  assignProps(minimistArgs) {
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
  }

  /**
   * Helper method that handles invalid objects and decides which error to throw
   *
   * @method
   * @name handleInvalid
   * @returns {error} throws an error with a string statement
   */
  handleInvalid(minimistArgs) {
    switch (this.action) {
      case 'list':
        // throw 'error: invalid category';
        this.paramFilter(this.category, this.action, minimistArgs._[0]);
      case 'add':
        this.paramFilter(this.payload, this.action, minimistArgs._[0]);
      case 'delete':
        this.paramFilter(this.idToDelete, this.action, minimistArgs._[0]);
      default:
        throw 'error: invalid flag';
    }
  }

  /**
   * Helper method for the helper method handleInvalid that helps throw an error
   *
   * @method
   * @name paramFilter
   * @param {string} param - string that determines parameter to evaluate
   * @param {string} action - string that determines action to evaluate
   * @param {string} action - string from the 0 index of the minimist array for uncategorized inputs
   * @returns {error} throws an error with a string statement
   */
  paramFilter(param, action, uncatArrZeroIndex) {
    if (param === true && !uncatArrZeroIndex) {
      throw `error: missing param for ${action}`;
    } else {
      throw `error: invalid param type for ${action} (must be a string)`;
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
