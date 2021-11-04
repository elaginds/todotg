const io = require('../shared/io.ts');
const common = require('../shared/common.ts');

module.exports.getTodos = (userId) => {
  return new Promise((resolve, reject) => {
    io.readFile('todos').then(data => {
        // resolve(data);
        // resolve(filterTodosByUserId(data, userId));
        resolve(common.filterByUserId(data, userId));
      },
      err => {
        reject(err);
      });
  });
};

module.exports.createTodo = (todo, userId) => {
  return new Promise((resolve, reject) => {
    io.readFile('todos').then(data => {
        todo.userId = userId;
        todo.id = common.createId();

        if (data) {
          data.push(todo);
        } else {
          data = [todo];
        }

        io.writeFile('todos', data).then(() => {
          io.readFile('todos').then(todos => {
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

/*module.exports.removeTodo = (id) => {
  console.log('REMOVE');
  return new Promise((resolve, reject) => {
    io.readFile('todos').then(data => {
      data = common.removeFromArray(data, id);

      io.writeFile('todos', data).then(() => {
        io.readFile('todos').then(todos => {
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
};*/

module.exports.editTodo = (todo) => {
  return new Promise((resolve, reject) => {
    io.readFile('todos').then(data => {
      data = common.changeInArray(data, todo);

      io.writeFile('todos', data).then(() => {
        io.readFile('todos').then(todos => {
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

const filterTodosByUserId = (todos, userId) => {
  if (todos && todos.filter) {
    return todos.filter(item => {
      return item.userId === userId;
    });
  } else {
    return [];
  }
};
