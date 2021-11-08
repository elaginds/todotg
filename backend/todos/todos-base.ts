const io = require('../shared/io.ts');
const common = require('../shared/common.ts');

module.exports.getTodos = (filterOptions) => {
  return new Promise((resolve, reject) => {
    io.readFile('todos').then(data => {
        // resolve(data);
        // resolve(filterTodosByUserId(data, userId));
        // data = common.filterByUserId(data, userId);

        resolve(common.filter(data, filterOptions));
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
              resolve(common.filter(data, {userId}));
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

module.exports.editTodo = (todo, userId) => {
  return new Promise((resolve, reject) => {
    todo.userId = userId;
    io.readFile('todos').then(data => {
      data = common.changeInArray(data, todo);

      io.writeFile('todos', data).then(() => {
        io.readFile('todos').then(todos => {
            resolve(common.filter(todos, {userId}));
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
