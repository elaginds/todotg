const tagsBase = require('./tags-base.ts');

module.exports.getTags = (req, res, userId) => {
  tagsBase.getData(userId).then(data => {
    res.status(200).json(data);
  }, err => {
    res.status(403).json(err);
  });
};

module.exports.addTag = (req, res, userId) => {
  tagsBase.createTodo(req.body.text, userId).then(data => {
    res.status(200).json(data);
  }, err => {
    res.status(403).json(err);
  });
};

/*module.exports.getTags = userid => {
  return new Promise((resolve, reject) => {
    tagsBase.getData().then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

module.exports.addTag = (tag) => {
  return new Promise((resolve, reject) => {
    tagsBase.createTodo(tag).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};*/
