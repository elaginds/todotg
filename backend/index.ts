const express = require('express');
const app = express();
const port = 3000;
const base = require('./base.ts');
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/export/user', (req, res) => {
  res.send({
    userid: 1,
    username: 'username',
    tgid: 'tgid'
  });
});

app.get('/export/tags', (req, res) => {
  getTags().then(data => {
    res.send(data);
  });
  // res.send(['India', 'USA', 'UK', 'Australia', 'Belgium', 'New Zealand', 'Canada', 'Philippines', 'Russia']);
});

app.get('/export/todo', (req, res) => {
  getTodo(req.query.userid).then(data => {
    res.send(data);
  }, err => {
    res.send(err);
  });
});

app.post('/export/todo', (req, res) => {
  postTodo(req.body.todo).then(data => {
    res.send(data);
  }, err => {
    res.send(err);
  });
});

app.delete('/export/todo', (req, res) => {
  removeTodo(req.body.id).then(data => {
    res.send(data);
  }, err => {
    res.send(err);
  });
});

app.put('/export/todo', (req, res) => {
  editTodo(req.body.todo).then(data => {
    res.send(data);
  }, err => {
    res.send(err);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// tslint:disable-next-line:typedef
function getTodo(userid) {
  return new Promise((resolve, reject) => {
    base.getData().then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
}

// tslint:disable-next-line:typedef
function postTodo(todo) {
  return new Promise((resolve, reject) => {
    base.createTodo(todo).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
}

// tslint:disable-next-line:typedef
function removeTodo(id) {
  return new Promise((resolve, reject) => {
    base.removeTodo(id).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
}

// tslint:disable-next-line:typedef
function editTodo(todo) {
  return new Promise((resolve, reject) => {
    base.editTodo(todo).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
}

// tslint:disable-next-line:typedef
function getTags() {
  return new Promise((resolve, reject) => {
    getTodo(1).then(data => {
      // @ts-ignore
      if (data && data.forEach) {
        const result = [];

        // @ts-ignore
        data.forEach(item => {
          if (item.tags && item.tags.forEach) {
            item.tags.forEach(tag => {
              if (result.indexOf(tag) === -1) {
                result.push(tag);
              }
            });
          }
        });
        console.log(result);
        resolve(result);
      } else {
        resolve([]);
      }
    }, err => {
      reject(err);
    });
  });
}
