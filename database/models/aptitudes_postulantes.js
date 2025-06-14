'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class aptitudes_postulantes extends Model {
    
    static associate(models) {
      aptitudes_postulantes.belongsTo(models.aptitudes ,{
          as : 'Aptitudes del postulante',  // nombre de mi relacion
          foreignKey: 'fk_id_aptitud'     // campo con el que voy a igualar
        });
      aptitudes_postulantes.belongsTo(models.postulantes, {
        as: 'Postulante',
        foreignKey: 'fk_id_usuario',
      });
    }
  }
  aptitudes_postulantes.init({
    fk_id_aptitud: DataTypes.INTEGER,
    fk_id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'aptitudes_postulantes',
  });
  return aptitudes_postulantes;
};