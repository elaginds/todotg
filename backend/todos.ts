const todosBase = require('./todos-base.ts');

module.exports.getTodo = userid => {
  return new Promise((resolve, reject) => {
    todosBase.getData().then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

module.exports.postTodo = todo => {
  return new Promise((resolve, reject) => {
    todosBase.createTodo(todo).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

module.exports.removeTodo = id => {
  return new Promise((resolve, reject) => {
    todosBase.removeTodo(id).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

module.exports.editTodo = todo => {
  return new Promise((resolve, reject) => {
    todosBase.editTodo(todo).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};
