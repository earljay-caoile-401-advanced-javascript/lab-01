const inputParser = require('./lib/input.js');
const notesHandler = require('./lib/notes.js');

const inputPayload = inputParser(process.argv.slice(2));
notesHandler(inputPayload);