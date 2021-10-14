const iot = require('./io.ts');
const commont = require('./common.ts');
const filename = 'tags';

module.exports.getData = () => {
  return new Promise((resolve, reject) => {
    iot.readFile(filename).then(data => {
        resolve(data);
      },
      err => {
        reject(err);
      });
  });
};

module.exports.createTodo = (text) => {
  return new Promise((resolve, reject) => {
    iot.readFile(filename).then(data => {
        const match = commont.match(data, text, 'value');

        if (!match) {
          const tag = {
            id: commont.createId(),
            value: text
          };

          if (data) {
            data.push(tag);
          } else {
            data = [tag];
          }
        }

        iot.writeFile(filename, data).then(() => {
          iot.readFile(filename).then(tags => {
              resolve(tags);
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
