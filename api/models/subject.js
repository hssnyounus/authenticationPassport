'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
     	Subject.belongsToMany(models.Student,{
   		 as: 'students', 
   		 through: 'StudentSubject', 
   		 foreignKey: 'subjectId',
       otherKey: 'studentId'
   	})
  };
  return Subject;
};