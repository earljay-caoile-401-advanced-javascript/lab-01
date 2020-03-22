#!/usr/bin/env node
'use strict';

const inputPayload = require('./lib/input.js')(process.argv.slice(2));
require('./lib/notes.js')(inputPayload);
