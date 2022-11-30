'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      password: '123456', 
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      address: "Viet Nam",
      gender: "Male",
      typeRole: "Role",
      keyRole: "R1",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

// up: chạy khi dòng này chạy bình thường, down: chạy khi dùng rollback, vd: cancel việc thêm dữ liệu
