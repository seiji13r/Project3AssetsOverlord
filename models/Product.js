module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define("Product", {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    sku: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
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
    }
  });

  return Product;
};
