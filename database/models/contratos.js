'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contratos extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  contratos.init({
    nombre_contrato: DataTypes.STRING,
    tipo_contrato: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'contratos',
  });
  return contratos;
};