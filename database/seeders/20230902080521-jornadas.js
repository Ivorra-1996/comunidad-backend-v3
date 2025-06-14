'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('jornadas', [
      {
        id: 1,
        nombre_jornada: 'Part-time',
        detalle: 'Trabajas 4 horas',
        createdAt: '2022-06-05 12:00:00+00',
        updatedAt: '2022-06-05 12:00:00+00',
      },
      {
        id: 2,
        nombre_jornada: 'Full-time',
        detalle: 'Trabajas 9 horas',
        createdAt: '2022-06-05 12:00:00+00',
        updatedAt: '2022-06-05 12:00:00+00',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('jornadas', null, {});
  }
};
