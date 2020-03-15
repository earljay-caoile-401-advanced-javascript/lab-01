const notesHandler = require('../lib/notes.js');

describe('notesHandler', () => {
  it('console logs', () => {
    jest.spyOn(global.console, 'log');
    console.log = jest.fn();

    const inputObj = {
      action: 'add',
      payload: 'I like green eggs and ham!'
    };

    notesHandler(inputObj);
    expect(console.log).toHaveBeenCalled();
  });
});