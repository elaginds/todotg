const todostg = require('../todos/todos.ts');
const tagstg = require('../tags/tags.ts');
const commontg = require('../shared/common.ts');

module.exports.msg = (msg, userId) => {
  return new Promise((resolve, reject) => {
    if (msg.text.indexOf('/tags') === 0) {
      tagstg.getTagsTG(userId).then(tags => {
        resolve(tags.join('\n'));
      }, err => {
        reject(err);
      });
    } else if (msg.text.indexOf('/important') === 0) {
      getTodosByFilterOptions({userId, priority: [1]}).then(todos => {
        resolve(todos);
      }, err => {
        reject(err);
      });
    } else if (msg.text.indexOf('/halfimportant') === 0) {
      getTodosByFilterOptions({userId, priority: [2]}).then(todos => {
        resolve(todos);
      }, err => {
        reject(err);
      });
    } else if (msg.text.indexOf('/unimportant') === 0) {
      getTodosByFilterOptions({userId, priority: [3]}).then(todos => {
        resolve(todos);
      }, err => {
        reject(err);
      });
    } else {
      commontg.createFilterOptions(userId, msg.text).then(filterOptions => {
        getTodosByFilterOptions(filterOptions).then(todos => {
          resolve(todos);
        }, err => {
          reject(err);
        });
      }, err => {
        reject(err);
      });
    }
  });
};

const getTodosByFilterOptions = (filterOptions) => {
  return new Promise((resolve, reject) => {
    todostg.getTodosTG(filterOptions).then(todos => {
      resolve(todos.map(item => {
        return '• ' + item.text;
      }).join('\n'));
    }, err => {
      reject(err);
    });
  });
};
