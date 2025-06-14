'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accesos extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  accesos.init({
    fk_id_grupo: DataTypes.INTEGER,
    usuario_mail: DataTypes.STRING,
    password: DataTypes.STRING,
    hash: DataTypes.STRING,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'accesos',
  });
  return accesos;
};