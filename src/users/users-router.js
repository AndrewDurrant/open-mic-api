const express = require('express');
const UsersService = require('./users-service');
const { requireAuth } = require('../middleware/basic-auth');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter
  .route('/')
  .get(requireAuth, jsonBodyParser, (req, res, next) => {

    console.log('BIG BOLD BEAUTIFUL', req.user.id);

    UsersService.getUserData(
      req.app.get('db'),
      req.user.id
    )
      .then(userData => {
        console.log('USER ROUTER', userData)
        res.json(userData)
      })
      .catch(next);
  });

module.exports = usersRouter;