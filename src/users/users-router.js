const express = require('express');
const path = require('path');
const UsersService = require('./users-service');
const { requireAuth } = require('../middleware/jwt-auth');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter
  .route('/')
  .get(requireAuth, jsonBodyParser, (req, res, next) => {
    if (!req.user) res.status(401).json({ error: 'You must be signed in to get that data!' });
    UsersService.getUserData(
      req.app.get('db'),
      req.user.id
    )
      .then(userData => {
        res.json(userData);
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { password, user_name, full_name, email } = req.body;

    for (const field of ['full_name', 'user_name', 'password', 'email'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });

    const passwordError = UsersService.validatePassword(password);
    if (passwordError)
      return res.status(400).json({ error: passwordError });

    UsersService.hasUserWithUserName(
      req.app.get('db'),
      user_name
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: 'Username already taken' });

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              user_name,
              password: hashedPassword,
              full_name,
              email,
              date_created: 'now()',
            };

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user));
              });

          });

      })
      .catch(next);
  });

module.exports = usersRouter;