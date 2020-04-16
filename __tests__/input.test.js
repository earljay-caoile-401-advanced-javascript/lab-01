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
    const input4 = ['--list', '360noscope'];

    const inputList = [input1, input2, input3, input4];
    inputList.forEach(arr => {
      expect(inputParser(arr)).toEqual({
        action: 'list',
        category: arr[1],
      });
    });
  });

  it('handle objects with the proper -d flag', () => {
    const input1 = ['-d', '5e798d779de2842b2c606be4'];
    const input2 = ['-d', '5e798d779de2842b2c606be3'];
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
    const input6 = ['-l', '555'];
    const input7 = ['-d'];
    const input8 = ['-d', '360'];

    const invalidFlag = 'error: invalid flag';
    const noTextAdd = 'error: missing param for add';
    const invalidTextAdd =
      'error: invalid param type for add (must be a string)';
    const noTextDelete = 'error: missing param for delete';
    const invalidTextDelete =
      'error: invalid param type for delete (must be a string)';

    const invalidCategory =
      'error: invalid param type for list (must be a string)';

    expect(() => inputParser(input1)).toThrowError(invalidFlag);
    expect(() => inputParser(input2)).toThrowError(noTextAdd);
    expect(() => inputParser(input3)).toThrowError(noTextAdd);
    expect(() => inputParser(input4)).toThrowError(invalidTextAdd);
    expect(() => inputParser(input5)).toThrowError(invalidTextAdd);
    expect(() => inputParser(input6)).toThrowError(invalidCategory);
    expect(() => inputParser(input7)).toThrowError(noTextDelete);
    expect(() => inputParser(input8)).toThrowError(invalidTextDelete);
  });
});
