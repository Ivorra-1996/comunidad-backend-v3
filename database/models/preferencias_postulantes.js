'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class preferencias_postulantes extends Model {
    
    static associate(models) {
      preferencias_postulantes.belongsTo(models.idiomas ,{
          as : 'Preferencias del postulante',  // nombre de mi relacion
          foreignKey: 'fk_id_preferencia'     // campo con el que voy a igualar
        });
        preferencias_postulantes.belongsTo(models.postulantes, {
        as: 'Postulante',
        foreignKey: 'fk_id_postulantes',
      });
    }
  }
  preferencias_postulantes.init({
    fk_id_preferencia: DataTypes.INTEGER,
    fk_id_postulante: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'preferencias_postulantes',
  });
  return preferencias_postulantes;
};