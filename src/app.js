require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const videosRouter = require('./videos/videos-router');
const interactionsRouter = require('./interactions/interactions-router');
const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');


const app = express();

const morganOption = NODE_ENV === 'production'
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.use('/api/videos', videosRouter);
app.use('/api/interactions', interactionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  let message; // eslint-disable-line no-unused-vars
  if (NODE_ENV === 'production') {
    message = 'Server error';
  } else {
    message = error.message;
  }
  res.status(500).json({ error: error.message });
});

// if no route matches, return 404 with HTML page - Express default route

module.exports = app;