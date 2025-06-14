'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('aptitudes_postulantes', [
      {
        id:4,
        createdAt: '2022-06-05 12:00:00+00',
        updatedAt : '2022-06-05 12:00:00+00',
        fk_id_aptitud: 1,
        fk_id_usuario: 41744111,
      },
      {
        id:5,
        createdAt: '2022-06-05 12:00:00+00',
        updatedAt : '2022-06-05 12:00:00+00',
        fk_id_aptitud: 2,
        fk_id_usuario: 41744111,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('aptitudes_postulantes', null, {});
  }
};
