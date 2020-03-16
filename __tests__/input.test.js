'use strict';

const inputParser = require('../lib/input.js');

describe('input', () => {
  it('handle objects with the proper -a flag', () => {
    const input1 = ['-a', 'testing 1-2-3'];
    const input2 = ['-a', 'I like green eggs and ham!'];
    const input3 = ['-a', '!@#$%(&'];
    const inputList = [input1, input2, input3];
    inputList.forEach(arr => {
      expect(inputParser(arr)).toEqual({
        action: 'add',
        payload: arr[1],
      });
    });
  });

  it('throws errors for invalid input', () => {
    const input1 = ['-b', 'testing 1-2-3'];
    const input2 = ['-a'];
    const input3 = ['-a', ''];
    const inputList = [input1, input2, input3];
    inputList.forEach(arr => {
      if (arr[0] !== '-a') {
        expect(() => inputParser(arr)).toThrowError('error: invalid flag');
      } else if (!arr[1]) {
        expect(() => inputParser(arr)).toThrowError('error: no text');
      }
    });
  });
});
