'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('aptitudes', [
      {
        id: 1,
        nombre_aptitud: 'Python',
        descripcion: 'Desarrollo en Python',
        createdAt: '2022-06-05 12:00:00+00',
        updatedAt: '2022-06-05 12:00:00+00',
      },
      {
        id: 2,
        nombre_aptitud: 'NodeJS',
        descripcion: 'Desarrollo en NodeJS',
        createdAt: '2022-06-05 12:00:00+00',
        updatedAt: '2022-06-05 12:00:00+00',
      },
      {
        id: 3,
        nombre_aptitud: 'ReactJS',
        descripcion: 'Desarrollo en ReactJS',
        createdAt: '2022-06-05 12:00:00+00',
        updatedAt: '2022-06-05 12:00:00+00',
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('aptitudes', null, {});
  }
};
