const jwt = require('jsonwebtoken');
const ioa = require('../shared/io.ts');
let globalToken = '';

module.exports.secret = 'some_secret'; // a secret key is set here

module.exports.login = (req, res) => {
  getUser(req).then(user => {
    // @ts-ignore
    const token = jwt.sign({login: user.login, id: user.id}, this.secret, { expiresIn: '5m'});

    globalToken = token;

    // @ts-ignore
    res.status(200).json({
      token
    });
  }, err => {
    // @ts-ignore
    res.status(403).json({
      message: err
    });
  });
};

module.exports.getUserId = (req, res) => {
  const authorization = req.headers.authorization.substring(7);

  if (!authorization) {
    // @ts-ignore
    res.status(403).json('No authorization');
    return null;
  }

  try {
    const decoded = jwt.verify(authorization, this.secret);

    if (decoded && decoded.id) {
      return decoded.id;
    } else {
      // @ts-ignore
      res.status(403).json('Invalid user');
      return null;
    }
  } catch (e) {
    // @ts-ignore
    res.status(403).json('Invalid authorization');
    return null;
  }
};

module.exports.getUserIdByTgId = (id) => {
  return new Promise((resolve, reject) => {
    ioa.readFile('users').then(users => {
      let userId = null;

      users.forEach(item => {
        if (item.telegramId === id) {
          userId = item.id;
        }
      });

      if (userId) {
        resolve(userId);
      } else {
        reject(null);
      }
    }, err => {
      reject(err);
    });
  });
};

const getUser = (req) => {
  const login = req.body.login;
  const password = req.body.password;

  return new Promise((resolve, reject) => {
    ioa.readFile('users').then(users => {
      let result = null;

      if (users && users.forEach) {
        users.forEach(item => {
          if (item.login === login && item.password === password) {
            result = item;
          }
        });
      }

      if (result) {
        resolve(result);
      } else {
        reject('wrong login or password');
      }
    });
  });
};

/*
const jwt = require('jsonwebtoken');
const fs = require('fs');
const expressJwta = require('express-jwt');

const RSA_PRIVATE_KEY = fs.readFileSync('demos/private.key');
const expiresIn = 120;
const RSA_PUBLIC_KEY = fs.readFileSync('demos/public.key');

/!*module.exports.checkIfAuthenticated = (req, res) => {
  console.log(req.get('Authorization'));

  return jwt({
    secret: req.get('Authorization'),
    algorithms: ['RS256'],
    requestProperty: 'auth'
  });
};*!/

module.exports.checkIfAuthenticated = expressJwta({
  secret: RSA_PUBLIC_KEY,
  algorithms: ['RS256']
});


module.exports.loginRoute = (req, res) => {

  console.log(req.body);

  const email = req.body.email;
  const password = req.body.password;

  if (validateEmailAndPassword(email, password)) {
    const userId = findUserIdForEmail(email);

    /!*const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn,
      subject: userId
    });*!/

    // const jwtBearerToken = jwt.sign({ subject: userId }, 'test');

    const jwtBearerToken = jwt({
      secret: 'shhhhhhared-secret',
      algorithms: ['HS256']
    });

    // set it in the HTTP Response body
    res.status(200).json({
      idToken: jwtBearerToken,
      expiresIn
    });
  }
  else {
    // send status 401 Unauthorized
    res.sendStatus(401);
  }
};

const validateEmailAndPassword = (email, password) => {
  console.log('validateEmailAndPassword', email, password);
  return Boolean(email && password);
};

const findUserIdForEmail = (email) => {
  console.log('findUserIdForEmail', email);
  return email;
};
*/
