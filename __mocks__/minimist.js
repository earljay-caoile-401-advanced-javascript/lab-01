'use strict';

const inputSchema = {
  action: { type: 'string', required: true },
  payload: { type: 'string' },
  idToDelete: { type: 'string' },
  category: { type: 'string' },
};

const valObj = require('../lib/validator.js')(inputSchema);

const minimist = input => {
  let resObj = { _: new Array() };
  let key;
  let val;
  for (let i in input) {
    if (i % 2 === 0) {
      key = input[i];
      switch (key) {
        case '-a':
        case '--add':
          key = 'a';
          break;
        case '-l':
        case '--list':
          key = 'l';
          break;
        case '-c':
        case '--category':
          key = 'c';
          break;
        case '-d':
        case '--delete':
          key = 'd';
          break;
        default:
          break;
      }
    } else {
      val = input[i];
      if (!val) {
        val = true;
      }
      if (valObj.isString(val)) {
        resObj[key] = val;
        key = null;
      }
    }
  }

  if (key) {
    resObj[key] = val;
  }
  Object.keys(resObj).forEach(key => {
    if (!resObj[key]) {
      resObj[key] = true;
    }
  });

  return resObj;
};

module.exports = minimist;
