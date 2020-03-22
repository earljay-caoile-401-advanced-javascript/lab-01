'use strict';

// const notesSchema = {
//   id: { type: 'string', required: true },
//   text: { type: 'string', required: true },
//   category: { type: 'array' },
// };

// const valObj = require('../validator.js')(notesSchema);
const Collection = require('../collection.js');
const schema = require('./notes-schema.js');

const uuid = require('uuid').v4;

/**
 * Represents a note.
 * @constructor
 * @param {object} input - object payload received from input.js
 */
class Notes extends Collection {
  constructor() {
    super();
    this.schema = schema;

    // if (!this.isValid()) {
    //   if (!foundAction) {
    //     throw 'error: action not found';
    //   }
    // }
  }

  /**
   * Helper method that takes in an input object and chooses which CRUD operation (if any) to perform
   * This allows our "Notes" collection to take multiple input objects as opposed to only taking one input
   *
   * @method
   * @param {object} input - object payload
   * @return {void}
   */
  handleInput(input) {
    // let foundAction = false;
    switch (input.action) {
      case 'add':
        return this.add(input);
      case 'list':
        return this.get();
      case 'delete':
        return this.delete(input.id);
      default:
        break;
    }
  }

  /**
   * "Adds a note by giving it id and text properties followed by a console log of the text property"
   *
   * @method
   * @param {object} input - object payload
   * @return {void}
   */
  add(input) {
    const noteObj = {
      text: input.payload,
      category: input.category,
    };
    console.log('adding the following:', noteObj.text);
    return this.create(noteObj);
  }

  /**
   * Validates the object to ensure that it's in the proper format and contains required fields
   *
   * @method
   * @name isValid
   * @returns {boolean} boolean determining whether object meets schema requirements
   */
  // isValid(note) {
  //   return valObj.validate(note);
  // }
}

module.exports = new Notes();
