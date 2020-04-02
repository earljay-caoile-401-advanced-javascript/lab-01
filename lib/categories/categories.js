'use strict';

const Collection = require('../collection.js');
const schema = require('./categories-schema.js');

class Categories extends Collection {
  constructor() {
    super();
    this.schema = schema;
  }
}

module.exports = new Categories();
