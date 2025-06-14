const models = require("../../database/models");

export const createAptitudOferta = async (req, res) => {
    models.aptitudes_ofertas
      .create({
        fk_id_oferta: req.body.idOferta,     
        fk_id_aptitud: req.body.idAptitud,
        fk_id_idioma: req.body.idIdioma, 
        fk_id_nivel: req.body.idNivel,      
      })
      .then(
        (aptitud_oferta) => res.status(201).send({ id: aptitud_oferta.id }))
  
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
        const aptitudes_ofertas = await models.aptitudes_ofertas.findAll({
            attributes: ["id", "fk_id_oferta", "fk_id_aptitud", "fk_id_idioma", "fk_id_nivel"],
            include: [
                {
                    model: models.ofertas,
                    as: "Oferta",
                    attributes: [
                        "id", "titulo_oferta", "estado", "fecha_vigencia", "descripcion", "horario_laboral_desde", "horario_laboral_hasta", "edad_desde", "edad_hasta",
                        "experiencia_previa_desc", "zona_trabajo", "areas_estudio", "otros_detalles", "beneficios", "remuneracion", "fk_id_empresa", "fk_id_jornada",
                        "fk_id_contrato","fk_id_carrera", "fk_id_estudio",],
                    include: [
                        {
                            model: models.empresas,
                            as: "Empresa",
                            attributes: [
                                "id", "nombre_empresa", "estado", "descripcion", "pais", "fk_id_provincia",
                                "fk_id_ciudad", "calle", "nro", "piso", "depto", "cp", "telefono", "web", "nombre_representante",
                                "email_representante", "logo", "fk_id_rubro", "fk_id_usuario"
                            ],
                        }
                    ],
                },
                {
                    as: "Aptitudes de oferta",
                    model: models.aptitudes,
                    attributes: ["id", "nombre_aptitud", "descripcion"],
                },
                {
                    as: "Idioma",
                    model: models.idiomas,
                    attributes: ["id", "nombre_idioma"],
                },
                {
                    as: "Nivel de idioma",
                    model: models.niveles_idiomas,
                    attributes: ["id", "nivel"],
                },

            ],
        });

        res.send({ aptitudes_ofertas });
    } catch (error) {
        console.error("Error al buscar aptitudes_ofertas:", error);
        res.status(500).send({ error: "Error interno del servidor", details: error });
    }
};

const findAptitudesPorIOferta = (idOferta, { onSuccess, onNotFound, onError }) => {
  models.aptitudes_ofertas
    .findOne({
      attributes: ["id", "fk_id_oferta", "fk_id_aptitud", "fk_id_idioma", "fk_id_nivel"],
        include: [
                {
                  model: models.ofertas,
                  as: "Oferta",
                  attributes: [
                  "id", "titulo_oferta", "estado", "fecha_vigencia", "descripcion", "horario_laboral_desde", "horario_laboral_hasta", 
                  "edad_desde", "edad_hasta", "experiencia_previa_desc", "zona_trabajo", "areas_estudio", "otros_detalles",
                  "beneficios", "remuneracion", "fk_id_empresa", "fk_id_jornada", "fk_id_contrato", "fk_id_carrera", "fk_id_estudio"
                  ],
                  include: [
                    {
                      model: models.empresas,
                      as: "Empresa",
                      attributes: [
                      "id", "nombre_empresa", "estado", "descripcion", "pais", "fk_id_provincia",
                      "fk_id_ciudad", "calle", "nro", "piso", "depto", "cp", "telefono", "web", 
                      "nombre_representante","email_representante", "logo", "fk_id_rubro", "fk_id_usuario"
                      ],
                    }
                  ],
                },
                {
                  as: "Aptitudes de oferta",
                  model: models.aptitudes,
                  attributes: ["id", "nombre_aptitud", "descripcion"],
                },
                {
                  as: "Idioma",
                  model: models.idiomas,
                  attributes: ["id", "nombre_idioma"],
                },
                {
                  as: "Nivel de idioma",
                  model: models.niveles_idiomas,
                  attributes: ["id", "nivel"],
                },

            ],
      where: { fk_id_oferta: idOferta },
    })
    .then((aptitud_oferta) => (aptitud_oferta ? onSuccess(aptitud_oferta) : onNotFound()))
    .catch(() => onError());
};

export const getIdOferta = async (req, res) => {
  findAptitudesPorIOferta(req.params.id, {
    onSuccess: (aptitudes) => res.send(aptitudes),
    onNotFound: () => res.status(404).send("NOT FOUND"),
    onError: () => res.sendStatus(500),
  });
};

export const updateAptitudOferta = async (req, res) => {
  const aptitudOfertaId = req.params.id;

  try {
    const [updatedRows] = await models.aptitudes_ofertas.update(
      {
        fk_id_aptitud: req.body.idAptitud,
        fk_id_oferta: req.body.idOferta,
        fk_id_idioma: req.body.idIdioma,
        fk_id_nivel: req.body.idNivel,
      },
      {
        where: { id : aptitudOfertaId },
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

export const deleteAptitudIdOferta = async (req, res) => {
  const aptitudOfertaId = req.params.id;

  try {
    const result = await models.aptitudes_ofertas.destroy({
      where: { fk_id_oferta: aptitudOfertaId },
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

export const deleteAptitudId = async (req, res) => {
  const idAptitud = req.params.id;

  try {
    const result = await models.aptitudes_ofertas.destroy({
      where: { id: idAptitud },
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
