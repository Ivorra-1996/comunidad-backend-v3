'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class preferencias extends Model {
  }
  preferencias.init({
    nombre_preferencia: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'preferencias',
  });
  return preferencias;
};