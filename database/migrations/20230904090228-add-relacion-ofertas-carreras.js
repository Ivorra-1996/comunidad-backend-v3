'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'ofertas', 
      'fk_id_carrera', 
      {
        type: Sequelize.INTEGER,
        //allowNull: false,
      references: {
        model: 'carreras', // Nombre de la tabla que se referencia (en minúsculas y en plural)
        key: 'id',       // Columna que se referencia en la tabla "grupos"
      },
      onUpdate: 'CASCADE', // Opcional: Define el comportamiento de actualización en cascada
      onDelete: 'CASCADE', // Opcional: Define el comportamiento de eliminación en cascada
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ofertas', 'fk_id_carrera');
  }
};

