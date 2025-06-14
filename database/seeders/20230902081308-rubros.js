"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const rubros = [
      {
        id: 1,
        nombre_rubro: "desarrollo",
        createdAt: "2022-06-05 12:00:00+00",
        updatedAt: "2022-06-05 12:00:00+00",
      },
      {
        id: 2,
        nombre_rubro: "automotriz",
        createdAt: "2022-06-05 12:00:00+00",
        updatedAt: "2022-06-05 12:00:00+00",
      },
      {
        id: 3,
        nombre_rubro: "farmacéutica",
        createdAt: "2022-06-05 12:00:00+00",
        updatedAt: "2022-06-05 12:00:00+00",
      },
      {
        id: 4,
        nombre_rubro: "telecomunicaciones",
        createdAt: "2022-06-05 12:00:00+00",
        updatedAt: "2022-06-05 12:00:00+00",
      },
    ];

    await queryInterface.bulkInsert("rubros", rubros, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rubros", null, {});
  },
};
