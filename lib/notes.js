const uuid = require('uuid').v4;

function Notes(input) {
  const action = input.action.toLowerCase();
  switch(action) {
    case 'add':
      console.log('we got an add!');
      this.add(input);
      break;
      default:
        console.log('you get nothing, sir');
        break;
  }
}

Notes.prototype.add = (input) => {
  const addObj = {
    id: uuid(),
    text: input.payload,
  };

  console.log('adding the following:', addObj.text);
}

module.exports = input => new Notes(input);