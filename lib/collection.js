'use strict';
let ObjectId = require('mongoose').Types.ObjectId;

class Collection {
  constructor() {}

  get(id) {
    return id ? this.schema.findOne({ _id: id }) : this.schema.find({});
  }

  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  update(id, newRecord) {
    return this.schema.findByIdAndUpdate(id, newRecord, { new: true });
  }

  delete(id) {
    if (id && !ObjectId.isValid(id)) {
      throw 'error: invalid ID format (not an ObjectId)';
    }
    return this.schema.findByIdAndDelete(id);
  }
}

module.exports = Collection;
