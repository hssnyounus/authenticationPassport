'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StudentSubjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      StudentId: {
        type: Sequelize.INTEGER,
         references:{
          model:'students',
          key:'id'
        },
        onDelete:"CASCADE", 
        onUpdate:"CASCADE", 
      },
      SubjectId: {
        type: Sequelize.INTEGER,
          references:{
          model:'subjects',
          key:'id'
        },
        onDelete:"CASCADE", 
        onUpdate:"CASCADE", 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('StudentSubjects');
  }
};