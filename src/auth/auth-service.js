const AuthService = {
  getUserWithUserName(db, user_name) {
    // return db
    //   .raw('SELECT openmic_users.user_name FROM openmic_users WHERE user_name = ?', [user_name]);
    
    return db('openmic_users')
      .where({ user_name })
      .first();
  },
  parseBasicToken(token) {
    return Buffer
      .from(token, 'base64')
      .toString()
      .split(':');
  },
};

module.exports = AuthService;