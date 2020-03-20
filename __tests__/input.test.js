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
    const input4 = ['-a', '1337'];
    const input5 = ['-a', 'false']

    const invalidFlag = 'error: invalid flag';
    const noText = 'error: no text';
    const invalidType = 'error: invalid payload type';

    expect(() => inputParser(input1)).toThrowError(invalidFlag);
    expect(() => inputParser(input2)).toThrowError(noText);
    expect(() => inputParser(input3)).toThrowError(noText);
    expect(() => inputParser(input4)).toThrowError(invalidType);
    expect(() => inputParser(input5)).toThrowError(invalidType);
  });
});
