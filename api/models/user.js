'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
  	User.hasMany(models.title,{
  		as:'titles',
  		foreignKey:'userId',
  	});
  } 
    //   User.hasMany(models.productseller,{
    //     as:'productsellers',
    //     foreignKey:'userId',
    //   })
    // };
  return User;
};