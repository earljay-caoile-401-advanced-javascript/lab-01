'use strict';

/**
 * Takes user input and returns an object
 * @param   {object} input     user input from process.argv.slice(2)
 * @returns {number} the sum of a and b
 */
module.exports = input => {
  const minimistArgs = require('minimist')(input);

  if (!minimistArgs.hasOwnProperty('a')) {
    throw 'error: invalid flag';
  }
  if (!minimistArgs.a || !minimistArgs.a.length) {
    throw 'error: no text';
  }
  const resObj = {
    action: 'add',
    payload: minimistArgs.a,
  };

  return resObj;
};
