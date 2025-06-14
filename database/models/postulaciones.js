'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postulaciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        // define association here
        postulaciones.belongsTo(models.postulantes// modelo al que pertenece
        ,{
          as : 'Postulante',  // nombre de mi relacion
          foreignKey: 'fk_id_postulante'     // campo con el que voy a igualar
        }),
        postulaciones.belongsTo(models.ofertas// modelo al que pertenece
        ,{
          as : 'Oferta',  // nombre de mi relacion
          foreignKey: 'fk_id_oferta'     // campo con el que voy a igualar
        }),
        postulaciones.belongsTo(models.empresas// modelo al que pertenece
        ,{
          as : 'Empresa',  // nombre de mi relacion
          foreignKey: 'fk_id_empresa'     // campo con el que voy a igualar
        })
    }
  }
  postulaciones.init({
    fk_id_postulante: DataTypes.INTEGER,
    fk_id_oferta: DataTypes.INTEGER,
    fk_id_empresa: DataTypes.BIGINT,
    contactado: DataTypes.BOOLEAN,
    estado_postulacion: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'postulaciones',
  });
  return postulaciones;
};