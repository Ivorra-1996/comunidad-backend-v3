'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class empresas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      empresas.belongsTo(models.usuarios// modelo al que pertenece
      ,{
        as : 'Usuario',  // nombre de mi relacion
        foreignKey: 'fk_id_usuario'     // campo con el que voy a igualar
      }),
      empresas.belongsTo(models.rubros// modelo al que pertenece
      ,{
        as : 'Rubro',  // nombre de mi relacion
        foreignKey: 'fk_id_rubro'     // campo con el que voy a igualar
      }),
      empresas.belongsTo(models.provincias// modelo al que pertenece
      ,{
        as : 'Provincia',  // nombre de mi relacion
        foreignKey: 'fk_id_provincia'     // campo con el que voy a igualar
      }),
      empresas.belongsTo(models.ciudades// modelo al que pertenece
      ,{
        as : 'Ciudad',  // nombre de mi relacion
        foreignKey: 'fk_id_ciudad'     // campo con el que voy a igualar
      })
    }
  }
  empresas.init({
    fk_id_usuario: DataTypes.INTEGER,
    fk_id_rubro: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    nombre_empresa: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    pais: DataTypes.STRING,
    fk_id_provincia: DataTypes.INTEGER,
    fk_id_ciudad: DataTypes.INTEGER,
    calle: DataTypes.STRING,
    nro: DataTypes.INTEGER,
    piso: DataTypes.INTEGER,
    depto: DataTypes.STRING,
    cp: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    web: DataTypes.STRING,
    nombre_representante: DataTypes.STRING,
    email_representante: DataTypes.STRING,
    logo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'empresas',
  });
  return empresas;
};