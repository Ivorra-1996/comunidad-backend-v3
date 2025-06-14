'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('empresas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      nombre_empresa: {
        type: Sequelize.STRING
      },
      estado:{
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      pais: {
        type: Sequelize.STRING
      },
      fk_id_provincia: {
        type: Sequelize.INTEGER
      },
      fk_id_ciudad: {
        type: Sequelize.INTEGER
      },
      calle: {
        type: Sequelize.STRING
      },
      nro: {
        type: Sequelize.INTEGER
      },
      piso: {
        type: Sequelize.INTEGER
      },
      depto: {
        type: Sequelize.STRING
      },
      cp: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.INTEGER
      },
      web: {
        type: Sequelize.STRING
      },
      nombre_representante: {
        type: Sequelize.STRING
      },
      email_representante: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.TEXT
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('empresas');
  },
};
