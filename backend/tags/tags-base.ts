const iot = require('../shared/io.ts');
// import * as common from '../shared/common';
const commont = require('../shared/common.ts');
const filename = 'tags';

module.exports.getData = (userId) => {
  return new Promise((resolve, reject) => {
    iot.readFile(filename).then(data => {
        // resolve(data);
        resolve(commont.filterByUserId(data, userId));
      },
      err => {
        reject(err);
      });
  });
};

module.exports.createTodo = (text, userId) => {
  return new Promise((resolve, reject) => {
    iot.readFile(filename).then(data => {
        const match = commont.match(data, text, 'value');

        if (!match) {
          const tag = {
            id: commont.createId(),
            userId,
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



/*const filterTagsByUserId = (tags, userId) => {
  if (tags && tags.filter) {
    return tags.filter(item => {
      return item.userId === userId;
    });
  } else {
    return [];
  }
};*/
