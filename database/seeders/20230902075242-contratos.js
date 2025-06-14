'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('contratos', [
      {
        id: 1,
        nombre_contrato: 'Temporal',
        tipo_contrato: 'Temporal',
        createdAt: '2022-06-05 12:00:00+00',
        updatedAt: '2022-06-05 12:00:00+00',
      },
      {
        id: 2,
        nombre_contrato: 'Freelance',
        tipo_contrato: 'Temporal',
        createdAt: '2022-06-05 12:00:00+00',
        updatedAt: '2022-06-05 12:00:00+00',
      },
      {
        id: 3,
        nombre_contrato: 'Relación de dependencia',
        tipo_contrato: 'Temporal',
        createdAt: '2022-06-05 12:00:00+00',
        updatedAt: '2022-06-05 12:00:00+00',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contratos', null, {});
  }
};
