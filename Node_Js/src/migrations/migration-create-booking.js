'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      StatusId: {
        type: Sequelize.STRING, //vì statusId là key của allcode, key allcode là string
      }, 
      doctorId: {
        type: Sequelize.INTEGER,
      }, 
      patientId: {
        type: Sequelize.INTEGER,
      }, 
      date: {
        type: Sequelize.DATE,
      }, 
      timeType: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }
};

