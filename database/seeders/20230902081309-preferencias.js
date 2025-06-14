"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const rubros = [
      {
        id: 1,
        nombre_preferencia: "desarrollo",
        createdAt: "2022-06-05 12:00:00+00",
        updatedAt: "2022-06-05 12:00:00+00",
      },
      {
        id: 2,
        nombre_preferencia: "automotriz",
        createdAt: "2022-06-05 12:00:00+00",
        updatedAt: "2022-06-05 12:00:00+00",
      },
      {
        id: 3,
        nombre_preferencia: "farmacéutica",
        createdAt: "2022-06-05 12:00:00+00",
        updatedAt: "2022-06-05 12:00:00+00",
      },
      {
        id: 4,
        nombre_preferencia: "telecomunicaciones",
        createdAt: "2022-06-05 12:00:00+00",
        updatedAt: "2022-06-05 12:00:00+00",
      },
    ];

    await queryInterface.bulkInsert("preferencias", rubros, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("preferencias", null, {});
  },
};
