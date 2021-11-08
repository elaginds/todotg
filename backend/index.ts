const express = require('express');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const cors = require('cors');
const app = express();
const port = 3000;

const todos = require('./todos/todos.ts');
const tags = require('./tags/tags.ts');
const auth = require('./auth/auth.ts');
const tg = require('./telegram/telegram.ts');


app.options('*', cors());
app.use(bodyParser.json({
  limit: '10mb',
  extended: true
}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.use(expressJwt({ secret: auth.secret, algorithms: ['HS256']})
  .unless( // This allows access to /token/sign without token authentication
    { path: [
        '/api/login'
      ]}
  ));


/* LOGIN */

/* Create token to be used */
app.route('/api/login').post(auth.login);


/* TODOS */

app.route('/api/todo').get((req, res) => {
  const userId = auth.getUserId(req, res);

  if (userId) {
    todos.getAllTodos(req, res, userId);
  }
});

app.route('/api/todo').post((req, res) => {
  const userId = auth.getUserId(req, res);

  if (userId) {
    todos.createTodo(req, res, userId);
  }
});

app.route('/api/todo').put((req, res) => {
  const userId = auth.getUserId(req, res);

  if (userId) {
    todos.editTodo(req, res, userId);
  }
});

/*app.route('/api/todo').put((req, res) => {
  const userId = auth.getUserId(req, res);

  if (userId) {
    todos.editTodo(req, res, userId);
  }
});*/

// app.route('/api/todo').post(todos.createTodo);

// app.route('/api/todo').put(todos.editTodo);


/* TAGS */

app.route('/api/tags').get((req, res) => {
  const userId = auth.getUserId(req, res);

  if (userId) {
    tags.getTags(req, res, userId);
  }
});

app.route('/api/tag/add').post((req, res) => {
  const userId = auth.getUserId(req, res);

  if (userId) {
    tags.addTag(req, res, userId);
  }
});

// app.route('/api/tags').get(tags.getTags);

// app.route('/api/tag/add').post(tags.addTag);




/* LISTEN */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);

  tg.createTelegramBot();
});

/*
app.get('/api/todo', (req, res) => {
  todos.getTodo().then(data => {
    res.send(data);
  }, err => {
    res.send(err);
  });
});

app.post('/api/todo', (req, res) => {
  todos.postTodo(req.body.todo).then(data => {
    res.send(data);
  }, err => {
    res.send(err);
  });
});

app.delete('/api/todo', (req, res) => {
  todos.removeTodo(req.body.id).then(data => {
    res.send(data);
  }, err => {
    res.send(err);
  });
});

app.put('/api/todo', (req, res) => {
  todos.editTodo(req.body.todo).then(data => {
    res.send(data);
  }, err => {
    res.send(err);
  });
});

app.get('/api/tags', (req, res) => {
  tags.getTags().then(data => {
    res.send(data);
  });
});

app.post('/api/tag/add', (req, res) => {
  tags.addTag(req.body.text).then(data => {
    res.send(data);
  }, err => {
    res.send(err);
  });
});*/
