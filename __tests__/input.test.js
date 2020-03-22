'use strict';

const inputParser = require('../lib/input.js');

describe('input', () => {
  it('handle objects with the proper -a flag', () => {
    const input1 = ['-a', 'testing 1-2-3', '--category', 'test'];
    const input2 = [
      '-a',
      'I like green eggs and ham!',
      '--category',
      'Dr. Seuss',
    ];
    const input3 = ['-a', '!@#$%(&'];
    const inputList = [input1, input2, input3];
    inputList.forEach(arr => {
      expect(inputParser(arr)).toEqual({
        action: 'add',
        payload: arr[1],
        category: arr[3],
      });
    });
  });

  it('handle objects with the proper -l flag', () => {
    const input1 = ['-l', 'test notes'];
    const input2 = ['-l', 'Dr. Seuss'];
    const input3 = ['-l'];
    const inputList = [input1, input2, input3];
    inputList.forEach(arr => {
      expect(inputParser(arr)).toEqual({
        action: 'list',
        category: arr[1],
      });
    });
  });

  it('handle objects with the proper -d flag', () => {
    const input1 = ['-d', 'abc123'];
    const input2 = ['-d', 'xyz555'];
    const inputList = [input1, input2];
    inputList.forEach(arr => {
      expect(inputParser(arr)).toEqual({
        action: 'delete',
        idToDelete: arr[1],
      });
    });
  });

  it('throws errors for invalid input', () => {
    const input1 = ['-b', 'testing 1-2-3'];
    const input2 = ['-a'];
    const input3 = ['-a', ''];
    const input4 = ['-a', '1337'];
    const input5 = ['-a', 'false'];
    const input6 = ['l', '555'];

    const invalidFlag = 'error: invalid flag or incorrect input passed';
    const noText = 'error: no text';
    const invalidPayload = 'error: invalid payload type';

    expect(() => inputParser(input1)).toThrowError(invalidFlag);
    expect(() => inputParser(input2)).toThrowError(noText);
    expect(() => inputParser(input3)).toThrowError(noText);
    expect(() => inputParser(input4)).toThrowError(invalidPayload);
    expect(() => inputParser(input5)).toThrowError(invalidPayload);
    expect(() => inputParser(input6)).toThrowError(invalidFlag);
  });
});
