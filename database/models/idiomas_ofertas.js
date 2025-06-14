'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class idioma_ofertas extends Model {

    static associate(models) {
      idioma_ofertas.belongsTo(models.ofertas, {
        as: 'Oferta',
        foreignKey: 'fk_id_oferta',
      });
      idioma_ofertas.belongsTo(models.idiomas ,{
        as : 'Idiomas de oferta',  // nombre de mi relacion
        foreignKey: 'fk_id_idioma'     // campo con el que voy a igualar
      });
    }
  }
  idioma_ofertas.init({
    fk_id_idioma: DataTypes.INTEGER,
    fk_id_oferta: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'idiomas_ofertas',
  });
  return idioma_ofertas;
};