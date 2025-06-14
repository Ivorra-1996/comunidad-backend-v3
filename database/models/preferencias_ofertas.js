'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class preferencias_ofertas extends Model {

    static associate(models) {
      preferencias_ofertas.belongsTo(models.ofertas, {
        as: 'Oferta',
        foreignKey: 'fk_id_oferta',
      });
      preferencias_ofertas.belongsTo(models.idiomas ,{
        as : 'Preferencia de oferta',  // nombre de mi relacion
        foreignKey: 'fk_id_preferencia'     // campo con el que voy a igualar
      });
    }
  }
  preferencias_ofertas.init({
    fk_id_preferencia: DataTypes.INTEGER,
    fk_id_oferta: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'preferencias_ofertas',
  });
  return preferencias_ofertas;
};