'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('idiomas_ofertas', [
      {
        id:1,
        createdAt: '2022-06-05 12:00:00+00',
        updatedAt : '2022-06-05 12:00:00+00',
        fk_id_idioma: 1,
        fk_id_oferta: 66,
      },
      {
        id:2,
        createdAt: '2022-06-05 12:00:00+00',
        updatedAt : '2022-06-05 12:00:00+00',
        fk_id_idioma: 10,
        fk_id_oferta: 72,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('idiomas_ofertas', null, {});
  }
};
