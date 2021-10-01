const io = require('./io.ts');

module.exports.getData = () => {
  return new Promise((resolve, reject) => {
    io.readFile().then(data => {
        resolve(data);
      },
      err => {
        reject(err);
      });
  });
};

module.exports.createTodo = (todo) => {
  return new Promise((resolve, reject) => {
    io.readFile().then(data => {
        todo.id = createId();

        if (data) {
          data.push(todo);
        } else {
          data = [todo];
        }

        io.writeFile(data).then(() => {
          io.readFile().then(todos => {
              resolve(todos);
            },
            err => {
              reject(err);
            });
        }, err => {
          console.log(err);
        });
      },
      err => {
        reject(err);
      });
  });
};

module.exports.removeTodo = (id) => {
  console.log('REMOVE');
  return new Promise((resolve, reject) => {
    io.readFile().then(data => {
      data = removeFromArray(data, id);

      io.writeFile(data).then(() => {
        io.readFile().then(todos => {
            resolve(todos);
          },
          err => {
            reject(err);
          });
      }, err => {
        console.log(err);
      });
    });
  });
};

module.exports.editTodo = (todo) => {
  return new Promise((resolve, reject) => {
    io.readFile().then(data => {
      data = changeInArray(data, todo);

      io.writeFile(data).then(() => {
        io.readFile().then(todos => {
            resolve(todos);
          },
          err => {
            reject(err);
          });
      }, err => {
        console.log(err);
      });
    });
  });
};

const createId = () => {
  return parseInt(Math.random().toString(10).substr(2, 9), 10);
};

const removeFromArray = (todos, id) => {
  const result = [];
  todos.forEach(item => {
    if (parseInt(item.id, 10) !== parseInt(id, 10)) {
      result.push(item);
    }
  });

  return result;
};

const changeInArray = (todos, todo) => {
  const result = [];
  todos.forEach(item => {
    if (parseInt(item.id, 10) === parseInt(todo.id, 10)) {
      result.push(todo);
    } else {
      result.push(item);
    }
  });

  return result;
};
