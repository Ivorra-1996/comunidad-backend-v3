'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class abmModels extends Model {

    static associate(models) {
      abmModels.belongsTo(models.usuarios, {
        as: 'usuario',
        foreignKey: 'fk_id_usuario',
        sourceKey: 'id',
      });
    }
  }
  abmModels.init({
    fk_id_usuario: DataTypes.INTEGER,
    id_usuario_mod: DataTypes.INTEGER,
    motivo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'abmModels',
  });
  return abmModels;
};