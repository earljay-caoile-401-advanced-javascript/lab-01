#!/usr/bin/env node
'use strict';

const inputObj = require('./lib/input.js')(process.argv.slice(2));
console.log(inputObj.isValid());
const notesObj = require('./lib/notes.js')(inputObj);
