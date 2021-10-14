const fs = require('fs');

exports.readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./${filename}-base.json`, 'utf8',  (err, data) => {
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

exports.writeFile = (filename, todos) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`./${filename}-base.json`, JSON.stringify(todos),  (err) => {
      if (!err) {
        resolve(err);
      } else {
        reject(err);
      }
    });
  });

};
