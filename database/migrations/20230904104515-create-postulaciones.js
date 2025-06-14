'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('postulaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
   
        type: Sequelize.INTEGER,
      },
      fk_id_empresa: {
        type: Sequelize.BIGINT,
      },
      contactado: {
        type: Sequelize.BOOLEAN,
      },
      estado_postulacion: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('postulaciones');
  },
};