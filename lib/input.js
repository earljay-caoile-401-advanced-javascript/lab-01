'use strict';

/**
 * Takes user input and returns an object
 * @param   {object} input     user input from process.argv.slice(2)
 * @returns {object} object containing an action and payload
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
