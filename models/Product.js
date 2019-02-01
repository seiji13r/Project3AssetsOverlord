module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    epc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
    
  });
  return Product;
};