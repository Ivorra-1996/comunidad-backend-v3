'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tokens', [
      {
        id:1,
        userId: 518,
        token: 'postulanteasdasdasdas@asd//%$',
        createdAt: '2022-06-05 12:00:00+00',
        updatedAt : '2022-06-05 12:00:00+00'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tokens', null, {});
  }
};
