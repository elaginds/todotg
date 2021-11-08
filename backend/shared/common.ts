const tagsCommon = require('../tags/tags.ts');

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

module.exports.filterByUserId = (data, userId) => {
  if (data && data.filter && userId) {
    return data.filter(item => {
      return item.userId === userId;
    });
  } else {
    return [];
  }
};

module.exports.filter = (data, options) => {
  if (data && data.filter && options && options.userId) {
    return data.filter(item => {

      if (!item.userId) {
        return false;
      }

      if (options.userId && item.userId !== options.userId) {
        return false;
      }

      if (options.priority && options.priority.indexOf(item.priority) === -1) {
        return false;
      }

      return true;
      // return item.userId === userId;
    });
  } else {
    return [];
  }
};

module.exports.createFilterOptions = (userId, msg) => {
  return new Promise((resolve, reject) => {
    tagsCommon.getTagsTG(userId).then(tags => {
      resolve(msgToOptions(userId, msg, tags));
    }, err => {
      reject(err);
    });
  });
};

const msgToOptions = (userId, msg, tags) => {
  const result = {
    userId,
    tags: [],
    priority: []
  };

  if (msg.toLowerCase().indexOf('высокая') !== -1){
    result.priority.push(1);
  }

  if (msg.toLowerCase().indexOf('средняя') !== -1){
    result.priority.push(2);
  }

  if (msg.toLowerCase().indexOf('низкая') !== -1){
    result.priority.push(3);
  }

  if (tags && tags.length && tags.forEach) {
    tags.forEach(item => {
      if (msg.toLowerCase().indexOf(item.toLowerCase()) !== -1) {
        result.tags.push(item);
      }
    });
  }

  return result;
};
