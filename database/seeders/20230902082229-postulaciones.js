'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('postulaciones', [
      {
        id: 162,
        fk_id_postulante: 41744111,
        fk_id_oferta: 61,
        createdAt: new Date('2022-12-07 14:15:23.354+00'),
        updatedAt: new Date('2022-12-07 14:15:23.354+00'),
        fk_id_empresa: 3010203041,
        contactado: 'f',
        estado_postulacion: 't',
      },
      {
        id: 165,
        fk_id_postulante: 25647424,
        fk_id_oferta: 62,
        createdAt: new Date('2022-12-07 18:57:52.45+00'),
        updatedAt: new Date('2022-12-07 18:57:52.45+00'),
        fk_id_empresa: 30182432120,
        contactado: 'f',
        estado_postulacion: 't',
      },
      {
        id: 166,
        fk_id_postulante: 42781646,
        fk_id_oferta: 62,
        createdAt: new Date('2022-12-07 20:50:19.547+00'),
        updatedAt: new Date('2022-12-07 20:50:19.547+00'),
        fk_id_empresa: 30182432120,
        contactado: 'f',
        estado_postulacion: 't',
      },
      {
        id: 167,
        fk_id_postulante: 41744111,
        fk_id_oferta: 63,
        createdAt: new Date('2022-12-07 23:54:55.759+00'),
        updatedAt: new Date('2022-12-08 00:00:55.037+00'),
        fk_id_empresa: 30182432120,
        contactado: 't',
        estado_postulacion: 'f',
      },
      {
        id: 168,
        fk_id_postulante: 25647424,
        fk_id_oferta: 67,
        createdAt: new Date('2022-12-08 18:01:00.024+00'),
        updatedAt: new Date('2022-12-08 18:01:00.024+00'),
        fk_id_empresa: 3010203041,
        contactado: 'f',
        estado_postulacion: 'f',
      },
      // Agregar más objetos aquí...
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('postulaciones', null, {});
  },
};
