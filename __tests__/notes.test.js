'use strict';

const notesHandler = require('../lib/notes.js');

beforeEach(() => {
  jest.spyOn(global.console, 'log');
  console.log = jest.fn();
});

describe('notesHandler', () => {
  it('console logs', () => {
    const inputObj = {
      action: 'add',
      payload: 'I like green eggs and ham!',
    };
    expect(() => notesHandler(inputObj)).not.toThrow();
    expect(console.log).toHaveBeenCalled();
  });

  it('does not console log for a non-add', () => {
    const inputObj = {
      action: 'subtract',
      payload: 'I like green eggs and ham!',
    };

    expect(() => notesHandler(inputObj)).toThrowError(
      'error: action not found',
    );
    expect(console.log).not.toHaveBeenCalled();
  });
});
