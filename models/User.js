const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
  });

  // Define Schema Methods
  User.prototype.checkPassword = function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  };

  // Define a Hook to save the hashed password
  User.beforeSave((user, options) => {
    if (!user.password || user.password === ""){
      console.log('models/user.js =======NO PASSWORD PROVIDED=======')
    } else {
      console.log('models/user.js hashPassword in pre save');
      user.password = bcrypt.hashSync(user.password, 10);
    }
  });

  return User;
};