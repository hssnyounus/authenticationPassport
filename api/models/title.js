'use strict';
module.exports = (sequelize, DataTypes) => {
  const title = sequelize.define('title', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  title.associate = function(models) {
   title.belongsTo(models.User,{
  		as:'usres',
  		foreignKey:'userId',
  	})
  };
  return title;
};