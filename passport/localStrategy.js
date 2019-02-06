const db = require("../models");
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
  {
    usernameField: 'email' // not necessary, DEFAULT
  },
  (email, password, done) => {
    db.User.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if (!user) {
        return done(null, false, {
          message: "Unknown User"
        });
      }

      if (!user.checkPassword(password)) {
        return done(null, false, { message: 'Incorrect password' })
      }
      
      return done(null, user);
    });
  }
)

module.exports = strategy