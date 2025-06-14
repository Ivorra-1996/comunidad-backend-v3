const models = require("../../database/models");

export const createAptitudPostulante = async (req, res) => {
    models.aptitudes_postulantes
      .create({
        fk_id_aptitud: req.body.idAptitud,     
        fk_id_usuario: req.body.idPostulante,
        fk_id_idioma: req.body.idIdioma, 
        fk_id_nivel: req.body.idNivel,      
      })
      .then(
        (aptitudes_postulantes) => res.status(201).send({ id: aptitudes_postulantes.id }))
  
      .catch((error) => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(401).send("Bad request: Algun tipo de error de validacion de campos");
        } else {
          console.log(`Error al intentar insertar en la base de datos: ${error}`);
          res.sendStatus(500);
        }
      });
};

export const getAll = async (req, res) => {
    try {
      const aptitudes_postulantes = await models.aptitudes_postulantes.findAll({
        attributes: ["id", "fk_id_aptitud", "fk_id_usuario","fk_id_idioma","fk_id_nivel"],
        include: [
            {
                model: models.postulantes,
                as: "Postulante",
                attributes: ["id","nombre","apellido","nacionalidad", "estado", "fecha_nac","pais","fk_id_provincia","fk_id_ciudad",
                "calle","nro","piso","depto","cp","telefono","cant_materias","alumno_unahur","presentacion","cv","foto",
                "fk_id_usuario","fk_id_estudios","fk_id_carrera", "tipo_documento"],
                include:[
                    {
                        model: models.usuarios,
                        as: "Usuario",  
                        attributes: ["id","usuario","password","estado","fk_id_grupo"],
                    }
                ,]
            },
            {
                as: "Aptitudes del postulante",
                model: models.aptitudes,
                attributes: ["id", "nombre_aptitud", "descripcion"],
            },
            {
              as: "Idioma del postulante",
              model: models.idiomas,
              attributes: ["id", "nombre_idioma"],
            },
            {
              as: "Nivel del postulante",
              model: models.niveles_idiomas,
              attributes: ["id", "nivel"],
            },
        ],
      });
      res.send({ aptitudes_postulantes });
    } catch (error) {
      console.error("Error al buscar aptitudes_postulantes:", error);
      res.status(500).send("Error interno del servidor");
    }
};


const findAptitudesPorIdUsuario = (fk_id_usuario, { onSuccess, onNotFound, onError }) => {
  models.aptitudes_postulantes
    .findOne({
      include: [
        {
            model: models.postulantes,
            as: "Postulante",
            attributes: ["id","nombre","apellido","nacionalidad", "estado", "fecha_nac","pais","fk_id_provincia","fk_id_ciudad",
            "calle","nro","piso","depto","cp","telefono","cant_materias","alumno_unahur","presentacion","cv","foto",
            "fk_id_usuario","fk_id_estudios","fk_id_carrera","tipo_documento"],
            include:[
                {
                    model: models.usuarios,
                    as: "Usuario",  
                    attributes: ["id","usuario","password","estado","fk_id_grupo"],
                }
            ,]
        },
        {
            as: "Aptitudes del postulante",
            model: models.aptitudes,
            attributes: ["id", "nombre_aptitud", "descripcion"],
        },
        {
          as: "Idioma del postulante",
          model: models.idiomas,
          attributes: ["id", "nombre_idioma"],
        },
        {
          as: "Nivel del postulante",
          model: models.niveles_idiomas,
          attributes: ["id", "nivel"],
        },
    ],
      where: { fk_id_usuario },
    })
    .then((empresas) => (empresas ? onSuccess(empresas) : onNotFound()))
    .catch(() => onError());
};

export const getIdUsuario = async (req, res) => {
  findAptitudesPorIdUsuario(req.params.id, {
    onSuccess: (aptitudes) => res.send(aptitudes),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

export const updateAptitudPostulante = async (req, res) => {
  const aptitudPostulanteId = req.params.id;

  try {
    const [updatedRows] = await models.aptitudes_postulantes.update(
      {
        fk_id_aptitud: req.body.idAptitud,
        fk_id_usuario: req.body.idPostulante,
        fk_id_idioma: req.body.idIdioma,
        fk_id_nivel: req.body.idNivel,
      },
      {
        where: { id: aptitudPostulanteId },
      }
    );

    if (updatedRows === 0) {
      res.status(404).send("NOT FOUND");
    } else {
      res.status(200).send("OK");
    }
  } catch (error) {
    console.error(`Error al actualizar aptitud_postulante: ${error}`);
    res.sendStatus(500);
  }
};

export const deleteByIdAptitudPostulante = async (req, res) => {
  const idaptitudPostulante = req.params.id;

  try {
    const result = await models.aptitudes_postulantes.destroy({
      where: { id: idaptitudPostulante },
    });

    if (result === 0) {
      res.status(404).send("NOT FOUND");
    } else {
      res.status(200).send("DESTROYED");
    }
  } catch (error) {
    console.error(`Error al eliminar aptitud_postulante: ${error}`);
    res.sendStatus(500);
  }
};

export const deleteAptitudByIdPostulante = async (req, res) => {
  const aptitudPostulanteId = req.params.id;

  try {
    const result = await models.aptitudes_postulantes.destroy({
      where: { fk_id_usuario: aptitudPostulanteId },
    });

    if (result === 0) {
      res.status(404).send("NOT FOUND");
    } else {
      res.status(200).send("DESTROYED");
    }
  } catch (error) {
    console.error(`Error al eliminar aptitud_postulante: ${error}`);
    res.sendStatus(500);
  }
};
