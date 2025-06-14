'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('idiomas', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,       
        type: Sequelize.INTEGER,
      },
      nombre_idioma: {
        type: Sequelize.STRING,
      },
      nivel_oral: {
        type: Sequelize.STRING,
      },
      nivel_escrito: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('idiomas');
  },
};