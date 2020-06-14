const express = require('express');
const UsersService = require('./users-service');
const { requireAuth } = require('../middleware/jwt-auth');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter
  .route('/')
  .get(requireAuth, jsonBodyParser, (req, res, next) => {

    UsersService.getUserData(
      req.app.get('db'),
      req.user.id
    )
      .then(userData => {
        res.json(userData);
      })
      .catch(next);
  });

module.exports = usersRouter;