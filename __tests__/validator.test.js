'use strict';

describe('validator module performs basic validation of', () => {
  const personRules = {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    age: { type: 'number', required: true },
    children: { type: 'array', valueType: 'string' },
  };

  const valObj = require('../lib/validator.js')(personRules);

  let str = 'yes';
  let num = 1;
  let arr = ['a'];
  let obj = { x: 'y' };
  let func = () => {
    return 'this is a function';
  };
  let bool = false;

  const varTypes = {
    string: str,
    number: num,
    array: arr,
    object: obj,
    function: func,
    boolean: bool,
  };

  it('strings', () => {
    for (var key in varTypes) {
      if (key === 'string') {
        expect(valObj.isString(varTypes[key])).toBeTruthy();
      } else {
        expect(valObj.isString(varTypes[key])).toBeFalsy();
      }
    }
  });

  it('numbers', () => {
    for (var key in varTypes) {
      if (key === 'number') {
        expect(valObj.isNumber(varTypes[key])).toBeTruthy();
      } else {
        expect(valObj.isNumber(varTypes[key])).toBeFalsy();
      }
    }
  });

  it('arrays', () => {
    for (var key in varTypes) {
      if (key === 'array') {
        expect(valObj.isArray(varTypes[key])).toBeTruthy();
      } else {
        expect(valObj.isArray(varTypes[key])).toBeFalsy();
      }
    }
  });

  it('objects', () => {
    for (var key in varTypes) {
      if (key === 'object') {
        expect(valObj.isObject(varTypes[key])).toBeTruthy();
      } else {
        expect(valObj.isObject(varTypes[key])).toBeFalsy();
      }
    }
  });

  it('booleans', () => {
    for (var key in varTypes) {
      if (key === 'boolean') {
        expect(valObj.isBoolean(varTypes[key])).toBeTruthy();
      } else {
        expect(valObj.isBoolean(varTypes[key])).toBeFalsy();
      }
    }
  });

  it('functions', () => {
    for (var key in varTypes) {
      if (key === 'function') {
        expect(valObj.isFunction(varTypes[key])).toBeTruthy();
      } else {
        expect(valObj.isFunction(varTypes[key])).toBeFalsy();
      }
    }
  });
});

describe('valObj module performs complex validations', () => {
  const personRules = {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    age: { type: 'number', required: true },
    hair: {
      type: 'object',
      required: true,
      color: { type: 'string', required: true },
      style: { type: 'string', required: true },
    },
    children: { type: 'array', valueType: 'string' },
  };

  const valObj = require('../lib/validator.js')(personRules);

  const susan = {
    id: '123-45-6789',
    name: 'Susan McDeveloperson',
    age: 37,
    hair: {
      color: 'brown',
      style: 'long',
    },
    children: [],
  };

  const noDeclHairSusan = {
    id: '123-45-6789',
    name: 'Susan Nullhair',
    age: 66,
    hair: {},
    children: [],
  };

  const noColorSusan = {
    id: '123-45-6789',
    name: 'Susan Baldie',
    age: 66,
    hair: {
      style: 'bald',
    },
    children: [],
  };

  const fred = {
    id: 38,
    name: 'Freddy McCoder',
    hair: {
      style: 'short',
      color: 'black',
    },
    children: [],
  };

  const fredWithProperChildren = {
    id: '321-94-9843',
    name: 'Freddy McCoder',
    age: 44,
    hair: {
      style: 'short',
      color: 'black',
    },
    children: ['Bob', 'Tom', 'Sue'],
  };

  const fredWithInvalidChildren = {
    id: '321-94-9843',
    name: 'Freddy McCoder',
    age: 44,
    hair: {
      style: 'short',
      color: 'black',
    },
    children: ['Bob', 123, 'Sue'],
  };

  it('validates object contains all fields based on rules', () => {
    expect(valObj.validate(susan)).toBeTruthy();
    expect(valObj.validate(noDeclHairSusan)).toBeFalsy();
    expect(valObj.validate(noColorSusan)).toBeFalsy();
    expect(valObj.validate(fred)).toBeFalsy();
    expect(valObj.validate(fredWithProperChildren)).toBeTruthy();
    expect(valObj.validate(fredWithInvalidChildren)).toBeFalsy();
  });
});
