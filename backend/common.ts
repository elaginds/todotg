module.exports.createId = () => {
  return parseInt(Math.random().toString(10).substr(2, 9), 10);
};

module.exports.removeFromArray = (originalArray, id) => {
  const result = [];
  originalArray.forEach(item => {
    if (parseInt(item.id, 10) !== parseInt(id, 10)) {
      result.push(item);
    }
  });

  return result;
};

module.exports.changeInArray = (originalArray, newItem) => {
  const result = [];
  originalArray.forEach(item => {
    if (parseInt(item.id, 10) === parseInt(newItem.id, 10)) {
      result.push(newItem);
    } else {
      result.push(item);
    }
  });

  return result;
};

module.exports.match = (originalArray, value, name) => {
  let result = false;

  if (originalArray && originalArray.forEach) {
    originalArray.forEach(item => {
      if (item[name].toLowerCase() === value.toLowerCase()) {
        result = true;
      }
    });
  }

  return result;
};
