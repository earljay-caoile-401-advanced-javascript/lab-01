'use strict';

const notesSchema = {
  id: { type: 'string', required: true },
  text: { type: 'string', required: true },
}

const valObj = require('./validator.js')(notesSchema);

const uuid = require('uuid').v4;

/**
 * Represents a note.
 * @constructor
 * @param {object} input - object payload received from input.js
 */
class Notes {
  constructor(input) {
    let foundAction = false;
    switch (input.action) {
      case 'add':
        this.add(input);
        foundAction = true;
        break;
      default:
        break;
    }

    if (!this.isValid()) {
      if (!foundAction) {
        throw 'error: action not found';
      }
    }
  }

/**
 * Prototype method for a note object
 * @param {object} input - object payload received from constructor
 * @return {void}
 */
  add(input) {
    this.id = uuid();
    this.text = input.payload;
    console.log('adding the following:', this.text);
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

module.exports = input => new Notes(input);
