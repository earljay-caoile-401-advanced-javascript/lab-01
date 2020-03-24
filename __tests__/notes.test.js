'use strict';

const notesObj = require('../lib/notes/notes.js');
require('@code-fellows/supergoose');

describe('Notes collection', () => {
  const inputObj1 = {
    action: 'add',
    payload: 'here is a test object',
    category: 'abc1234',
  };

  const inputObj2 = {
    action: 'add',
    payload: 'got another test object',
    category: 'abc123',
  };

  const inputObj3 = {
    action: 'list',
    category: 'abc123',
  };

  const inputObj4 = {
    action: 'grableh!',
    category: 'vomit',
  };

  const inputObj5 = {
    action: 'delete',
    idToDelete: 'abc123',
  };

  beforeEach(() => {
    jest.spyOn(global.console, 'log');
  });

  afterEach(async () => {
    await notesObj.schema.deleteMany({}).exec();
  });

  it('can create a note and add it to the database', async () => {
    let createRes = await notesObj.handleInput(inputObj1);

    expect(inputObj1.payload).toEqual(createRes.text);
    expect(inputObj1.category).toEqual(createRes.category[0]);
  });

  it('can get notes from the database', async () => {
    const createdObj1 = await notesObj.handleInput(inputObj1);
    const createdObj2 = await notesObj.handleInput(inputObj2);
    const getRes = await notesObj.handleInput(inputObj3);

    expect(getRes.length).toBe(2);
    expect(getRes[0].toJSON()).toEqual(createdObj1.toJSON());
    expect(getRes[1].toJSON()).toEqual(createdObj2.toJSON());
  });

  it('can delete a note', async () => {
    const createdObj1 = await notesObj.handleInput(inputObj1);
    const createdObj2 = await notesObj.handleInput(inputObj2);
    const deleteObj = {
      action: 'delete',
      idToDelete: createdObj1._id,
    };

    const deleteRes = await notesObj.handleInput(deleteObj);
    expect(deleteRes.toJSON()).toEqual(createdObj1.toJSON());
    const getRes = await notesObj.handleInput(inputObj3);
    expect(getRes.length).toBe(1);
    expect(getRes[0].toJSON()).toEqual(createdObj2.toJSON());
  });

  it('can handle invalid actions', async () => {
    expect(() => notesObj.handleInput(inputObj4)).toThrowError(
      'error: invalid action',
    );
  });

  it('can handle invalid IDs for delete', async () => {
    expect(() => notesObj.handleInput(inputObj5)).toThrowError(
      'error: invalid ID format',
    );
  });
});
