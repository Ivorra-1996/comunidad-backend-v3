'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class idiomas extends Model {
  }
  idiomas.init({
    nombre_idioma: DataTypes.STRING,
    nivel_oral: DataTypes.STRING,
    nivel_escrito: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'idiomas',
  });
  return idiomas;
};