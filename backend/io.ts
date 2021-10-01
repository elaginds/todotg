const fs = require('fs');

exports.readFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./base.json', 'utf8',  (err, data) => {
      if (!data) {
        resolve('');
      }

      try {
        const dataArr = JSON.parse(data);
        resolve(dataArr);
      } catch (e) {
        reject(e);
      }
    });
  });

};

exports.writeFile = (todos) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./base.json', JSON.stringify(todos),  (err) => {
      if (!err) {
        resolve(err);
      } else {
        reject(err);
      }
    });
  });

};
