module.exports = function(sequelize, DataTypes) {
  var Tracking = sequelize.define("Tracking", {
    antenna_port: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    epc: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    trackedAt: DataTypes.DATE
  });
  return Tracking;
};
