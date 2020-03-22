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
  try {
    const inputObj = require('./lib/input.js')(process.argv.slice(2));
    const notesObj = require('./lib/notes/notes.js');
    const catObj = require('./lib/categories/categories.js');

    console.log('inputObj before the switch:', inputObj);
    switch (inputObj.action) {
      case 'add':
        let oneCat = await catObj.schema.findOne({ name: inputObj.category });
        if (oneCat) {
          console.log('Cat exists!', oneCat);
        } else {
          console.log('no cat present! creating a new one');
          const newCat = {
            name: inputObj.category,
          };
          oneCat = await catObj.create(newCat);
        }
        const createInput = {
          action: inputObj.action,
          payload: inputObj.payload,
          category: [oneCat._id],
        };

        await notesObj.handleInput(createInput);
        break;
      case 'list':
        let notesList;

        if (inputObj.category) {
          console.log(`listing notes under the ${inputObj.category} category:`);
          const oneCat = await catObj.schema.findOne({
            name: inputObj.category,
          });

          if (oneCat) {
            notesList = await notesObj
              .handleInput(inputObj)
              .then(allNotes =>
                allNotes.filter(note => note.category.includes(oneCat._id)),
              );
          }
        } else {
          console.log('listing all notes:');
          notesList = await notesObj.handleInput(inputObj);
        }

        if (notesList) {
          notesList.forEach(item => {
            console.log(item);
          });
        } else {
          console.log('no notes to list');
        }
        break;
      case 'delete':
        const deleted = await notesObj.handleInput(inputObj);
        if (deleted) {
          console.log('successfully deleted the following:', deleted);
        } else {
          throw 'error: note with the given ID does not exist';
        }
        break;
      default:
        throw 'error: no flag';
    }
  } catch (e) {
    console.error(e);
  } finally {
    mongoose.disconnect();
  }
};

runProgram();
