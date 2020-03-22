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

  try {
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
        const noteInput = {
          action: inputObj.action,
          payload: inputObj.payload,
          category: [oneCat._id],
        };
        await notesObj.handleInput(noteInput);
        break;
      case 'list':
        let notesList;

        if (inputObj.category) {
          console.log(`listing notes under the ${inputObj.category} category:`);
          const oneCat = await catObj.schema.findOne({
            name: inputObj.category,
          });

          if (oneCat) {
            notesList = await notesObj.handleInput(inputObj);
            notesList = notesList.filter(note =>
              note.category.includes(oneCat._id),
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
        break;
      default:
        break;
    }
  } catch (e) {
    console.error('Error:', e);
  } finally {
    mongoose.disconnect();
  }
};

runProgram();
