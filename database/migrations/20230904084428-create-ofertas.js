'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ofertas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_vigencia: {
        type: Sequelize.DATE
      },
      titulo_oferta: {
        type: Sequelize.STRING
      },
      estado:{
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      horario_laboral_desde: {
        type: Sequelize.STRING
      },
      horario_laboral_hasta: {
        type: Sequelize.STRING
      },
      edad_desde: {
        type: Sequelize.INTEGER
      },
      edad_hasta: {
        type: Sequelize.INTEGER
      },
      experiencia_previa_desc: {
        type: Sequelize.STRING
      },
      zona_trabajo: {
        type: Sequelize.STRING
      },
      areas_estudio: {
        type: Sequelize.STRING
      },
      otros_detalles: {
        type: Sequelize.STRING
      },
      beneficios: {
        type: Sequelize.STRING
      },
      remuneracion: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('ofertas');
  },
};
