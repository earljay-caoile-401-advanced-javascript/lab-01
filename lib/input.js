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
