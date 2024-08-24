'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER.UNSIGNED,
    SubjectId: DataTypes.INTEGER.UNSIGNED,
  }, {});
  StudentSubject.associate = function(models) {
    // associations can be defined here
  };
  return StudentSubject;
};