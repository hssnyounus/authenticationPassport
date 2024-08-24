'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    classname: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
   	Student.belongsToMany(models.Subject,{
   		 as: 'subjects', 
   		 through: 'StudentSubject', 
   		 foreignKey: 'studentId',
       otherKey: 'subjectId'
   	})
  };
  return Student;
};