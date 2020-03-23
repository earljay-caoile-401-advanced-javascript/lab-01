'use strict';

const Collection = require('../collection.js');
const schema = require('./notes-schema.js');

/**
 * Represents a note.
 * @constructor
 * @param {object} input - object payload received from input.js
 */
class Notes extends Collection {
  constructor() {
    super();
    this.schema = schema;
  }

  /**
   * Helper method that takes in an input object and chooses which CRUD operation (if any) to perform
   * This allows our "Notes" collection to take multiple input objects as opposed to only taking one input
   *
   * @method
   * @param {object} input - object payload
   * @return a Promise which differs depending on the command (calls CRUD methods from collection class)
   */
  handleInput(input) {
    // let foundAction = false;
    switch (input.action) {
      case 'add':
        return this.add(input);
      case 'list':
        return this.get();
      case 'delete':
        return this.delete(input.idToDelete);
      default:
        throw 'error: invalid action';
    }
  }

  /**
   * "Adds a note by giving it id and text properties followed by a console log of the text property"
   *
   * @method
   * @param {object} input - object payload
   * @return a Promise containing the Note object added to the database
   */
  add(input) {
    const noteObj = {
      text: input.payload,
      category: input.category,
    };
    return this.create(noteObj);
  }
}

module.exports = new Notes();
