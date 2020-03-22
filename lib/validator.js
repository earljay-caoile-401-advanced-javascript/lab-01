'use strict';

class Validator {
  constructor(schema) {
    this.schema = schema;
  }

  isString(input) {
    const rightType = typeof input === 'string';
    const notBool = input !== 'true' && input !== 'false';
    const notNum = isNaN(input);
    return rightType && notBool && notNum;
  }

  isNumber(input) {
    return typeof input === 'number';
  }

  isArray(input) {
    return Array.isArray(input);
  }

  isObject(input) {
    return typeof input === 'object' && !Array.isArray(input);
  }

  isFunction(input) {
    return typeof input === 'function';
  }

  isBoolean(input) {
    return typeof input === 'boolean';
  }

  isCorrectType(value, type) {
    switch (type) {
      case 'string':
        return this.isString(value);
      case 'number':
        return this.isNumber(value);
      case 'array':
        return this.isArray(value);
      case 'object':
        return this.isObject(value);
      case 'function':
        return this.isFunction(value);
    }
  }

  isTruthy(value) {
    return !!value || value === 0 || value === false;
  }

  validate(input) {
    for (let fieldName in this.schema) {
      let field = this.schema[fieldName];
      let required = field.required ? this.isTruthy(input[fieldName]) : true;
      let type =
        field.type && input[fieldName]
          ? this.isCorrectType(input[fieldName], field.type)
          : true;
      let hasApprovedArr = field.approvedVals
        ? field.approvedVals.includes(input[fieldName])
        : true;

      if (field.type === 'object') {
        if (Object.keys(input[fieldName]).length === 0) return false;

        for (let subField in field) {
          let subReq = field[subField].required
            ? this.isTruthy(subField)
            : true;
          let subType = field[subField].type
            ? this.isCorrectType(
                input[fieldName][subField],
                field[subField].type,
              )
            : true;
          if (!(subReq && subType)) return false;
        }
      }

      if (field.type == 'array') {
        let arrChild = input[fieldName];
        for (let i in arrChild) {
          if (!this.isCorrectType(arrChild[i], field.valueType)) {
            return false;
          }
        }
      }

      if (!(required && type && hasApprovedArr)) return false;
    }
    return true;
  }
}

module.exports = schema => new Validator(schema);
