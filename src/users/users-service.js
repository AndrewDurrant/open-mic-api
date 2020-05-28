// const xss = require('xss');

const UsersService = {
  getUserData(db, user_id) {
    return db
      .raw(`SELECT id, user_name FROM openmic_users WHERE openmic_users.id = ${user_id}`).then(data => data.rows);
  }
};

module.exports = UsersService;

