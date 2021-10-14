const io = require('./io.ts');
const common = require('./common.ts');

module.exports.getData = () => {
  return new Promise((resolve, reject) => {
    io.readFile('todos').then(data => {
        resolve(data);
      },
      err => {
        reject(err);
      });
  });
};

module.exports.createTodo = (todo) => {
  return new Promise((resolve, reject) => {
    io.readFile('todos').then(data => {
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

module.exports.removeTodo = (id) => {
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
};

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
