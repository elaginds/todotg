const todosBase = require('./todos-base.ts');

module.exports.getAllTodos = (req, res, userId) => {
  todosBase.getTodos({userId}).then(data => {
    res.status(200).json(data);
  }, err => {
    res.status(403).json(err);
  });
};

module.exports.createTodo = (req, res, userId) => {
  todosBase.createTodo(req.body.todo, userId).then(data => {
    res.status(200).json(data);
  }, err => {
    res.status(403).json(err);
  });
};

module.exports.editTodo = (req, res, userId) => {
  todosBase.editTodo(req.body.todo, userId).then(data => {
    res.status(200).json(data);
  }, err => {
    res.status(403).json(err);
  });
};

module.exports.getTodosTG = (filterOptions) => {
  return new Promise((resolve, reject) => {
    todosBase.getTodos(filterOptions).then(data => {
      if (data && data.length) {
        resolve(data);
      } else {
        reject(null);
      }
    }, err => {
      reject(err);
    });
  });
};

/*module.exports.getTodo = () => {
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
};*/
