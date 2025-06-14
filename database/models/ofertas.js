'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ofertas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ofertas.belongsTo(models.empresas// modelo al que pertenece
      ,{
        as : 'Empresa',  // nombre de mi relacion
        foreignKey: 'fk_id_empresa'     // campo con el que voy a igualar
      }),
      ofertas.belongsTo(models.estudios// modelo al que pertenece
      ,{
        as : 'Estudio',  // nombre de mi relacion
        foreignKey: 'fk_id_estudio'     // campo con el que voy a igualar
      }),
      ofertas.belongsTo(models.carreras// modelo al que pertenece
      ,{
        as : 'Carrera',  // nombre de mi relacion
        foreignKey: 'fk_id_carrera'     // campo con el que voy a igualar
      }),
      ofertas.belongsTo(models.jornadas// modelo al que pertenece
      ,{
        as : 'Jornada',  // nombre de mi relacion
        foreignKey: 'fk_id_jornada'     // campo con el que voy a igualar
      }),
      ofertas.belongsTo(models.contratos// modelo al que pertenece
      ,{
        as : 'Contrato',  // nombre de mi relacion
        foreignKey: 'fk_id_contrato'     // campo con el que voy a igualar
      }),
      ofertas.hasMany(models.aptitudes_ofertas// modelo al que pertenece
      ,{
        as : 'Aptitudes',  // nombre de mi relacion
        foreignKey: 'fk_id_oferta'     // campo con el que voy a igualar
      }),
      ofertas.hasMany(models.idiomas_ofertas,
         {
          as: 'Idiomas',
          foreignKey: 'fk_id_oferta',
      }// modelo al que pertenece
      )
            
   ///////////
    }
  }
  ofertas.init({
    fk_id_empresa: DataTypes.BIGINT,
    fk_id_jornada: DataTypes.INTEGER,
    fk_id_contrato: DataTypes.INTEGER,
    fk_id_estudio: DataTypes.INTEGER,
    fk_id_carrera: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    fecha_vigencia: DataTypes.DATE,
    titulo_oferta: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    horario_laboral_desde: DataTypes.STRING,
    horario_laboral_hasta: DataTypes.STRING,
    //modalidad_trabajo: DataTypes.STRING,
    edad_desde: DataTypes.INTEGER,
    edad_hasta: DataTypes.INTEGER,
    experiencia_previa_desc: DataTypes.STRING,
    zona_trabajo: DataTypes.STRING,
    areas_estudio: DataTypes.STRING,
    otros_detalles: DataTypes.STRING,
    beneficios: DataTypes.STRING,
    remuneracion: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ofertas',
  });
  return ofertas;
};