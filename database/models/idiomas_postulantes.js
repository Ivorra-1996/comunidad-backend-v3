'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class idiomas_postulantes extends Model {
    
    static associate(models) {
      idiomas_postulantes.belongsTo(models.idiomas ,{
          as : 'Idiomas del postulante',  // nombre de mi relacion
          foreignKey: 'fk_id_idioma'     // campo con el que voy a igualar
        });
        idiomas_postulantes.belongsTo(models.postulantes, {
        as: 'Postulante',
        foreignKey: 'fk_id_postulante',
      });
    }
  }
  idiomas_postulantes.init({
    fk_id_idioma: DataTypes.INTEGER,
    fk_id_postulante: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'idiomas_postulantes',
  });
  return idiomas_postulantes;
};