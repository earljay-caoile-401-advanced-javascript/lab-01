module.exports = (input) => {
  const minimistArgs = require('minimist')(input);
  // console.log('reg input:', input);
  // console.log('minimistArgs:', minimistArgs);
  // if (input[0] !== '-a') throw 'error: invalid flag';
  // if (!input[1]) throw 'error: no text';

  if (!(minimistArgs.hasOwnProperty('a'))) { throw 'error: invalid flag' };
  if (!minimistArgs.a) { throw 'error: no text' };
  const resObj = {
    action: 'add',
    payload: minimistArgs.a,
  }

  // console.log('here is the payload', resObj);
  return resObj;
}
