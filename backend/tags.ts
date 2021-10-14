const tagsBase = require('./tags-base.ts');

module.exports.getTags = userid => {
  return new Promise((resolve, reject) => {
    tagsBase.getData().then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

module.exports.addTag = (tag) => {
  return new Promise((resolve, reject) => {
    tagsBase.createTodo(tag).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};
