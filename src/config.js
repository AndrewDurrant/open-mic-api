module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8000,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://open_mic@localhost/open-mic',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://open_mic@localhost/open-mic',
};