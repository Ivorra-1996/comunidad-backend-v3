'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ciudades extends Model {
    static associate(models) {
      ciudades.belongsTo(models.provincias// modelo al que pertenece
      ,{
        as : 'Provincia',  // nombre de mi relacion
        foreignKey: 'fk_id_provincia'     // campo con el que voy a igualar
      })
    }
  }
  ciudades.init({
    nombre: DataTypes.STRING,
    fk_id_provincia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ciudades',
  });
  return ciudades;
};