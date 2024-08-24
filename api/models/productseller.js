'use strict';
module.exports = (sequelize, DataTypes) => {
  const Productseller = sequelize.define('Productseller', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Productseller.associate = function(models) {
     Productseller.belongsTo(models.User,{
  		as:'usres',
  		foreignKey:'userId',
  	})
  };
  return Productseller;
};