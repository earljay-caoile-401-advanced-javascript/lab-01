#!/usr/bin/env node
'use strict';
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const runProgram = async () => {
  const inputObj = require('./lib/input.js')(process.argv.slice(2));
  const notesObj = require('./lib/notes/notes.js');
  const catObj = require('./lib/categories/categories.js');

  if (inputObj.action && inputObj.category) {
    const newCat = {
      name: inputObj.category,
    };
    const createdCat = await catObj.create(newCat);
    const noteInput = {
      action: inputObj.action,
      payload: inputObj.payload,
      category: [createdCat._id],
    };

    await notesObj.handleInput(noteInput);
  }
  mongoose.disconnect();
};

runProgram();
// const inputObj = require('./lib/input.js')([
//   '-a',
//   'testing 1-2-3',
//   '-c',
//   'school',
// ]);

// mongoose.disconnect();
