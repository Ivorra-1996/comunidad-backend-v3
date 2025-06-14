const models = require("../../database/models");
const { Op } = require("sequelize");

//get de provincias
export const getConFiltros = async (req, res) => {
  let nombreProvincia = req.query.nombreProvincia;


  if (typeof nombreProvincia === "undefined") {
    nombreProvincia = "_";
  } else {
    nombreProvincia = req.query.nombreProvincia.replace(/\s/g, "%");
  }

  models.provincias
    .findAll({
      attributes: ["id","nombre"],
      where: {
        [Op.or]: [
          {
            nombre: {
              [Op.iLike]: `%${nombreProvincia}%`,
            },
          },
        ],
      },
      order: ["nombre"],
    })
    .then((provincias) =>
      res.send({
        provincias
      })
    )
    .catch(() => res.sendStatus(500));
};

// Obtener provincia por ID
export const getProvinciaById = async (req, res) => {
  const provinciaId = req.params.id;

  try {
    const provincia = await models.provincias.findOne({
      where: { id: provinciaId },
      attributes: ["id", "nombre"],
    });

    if (provincia) {
      res.status(200).json({ provincia });
    } else {
      res.status(404).json({ error: "Provincia no encontrada." });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};