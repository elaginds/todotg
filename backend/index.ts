const express = require('express');
const app = express();
const port = 3000;
const todos = require('./todos.ts');
const tags = require('./tags.ts');
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/* USER */

app.get('/export/user', (req, res) => {
  res.send({
    userid: 1,
    username: 'username',
    tgid: 'tgid'
  });
});


/* TODOS */

app.get('/export/todo', (req, res) => {
  todos.getTodo(req.query.userid).then(data => {
    res.send(data);
  }, err => {
    res.send(err);
  });
});

app.post('/export/todo', (req, res) => {
  todos.postTodo(req.body.todo).then(data => {
    res.send(data);
  }, err => {
    res.send(err);
  });
});

app.delete('/export/todo', (req, res) => {
  todos.removeTodo(req.body.id).then(data => {
    res.send(data);
  }, err => {
    res.send(err);
  });
});

app.put('/export/todo', (req, res) => {
  todos.editTodo(req.body.todo).then(data => {
    res.send(data);
  }, err => {
    res.send(err);
  });
});


/* TAGS */

app.get('/export/tags', (req, res) => {
  tags.getTags().then(data => {
    res.send(data);
  });
});

app.post('/export/tag/add', (req, res) => {
  tags.addTag(req.body.text).then(data => {
    res.send(data);
  }, err => {
    res.send(err);
  });
});


/* LISTEN */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
