'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPechaser = sequelize.define('UserPechaser', {
    name: DataTypes.STRING,
    title: DataTypes.STRING
  }, {});
  UserPechaser.associate = function(models) {
    // associations can be defined here
  };
  return UserPechaser;
};