module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    sku: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
      validate: {
        len: [1]
      }
    },
    epc: {
      type: DataTypes.NUMBER,
      allowNull: false
      validate: {
        len: [1]
      }
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
    
  });
  return Product;
};