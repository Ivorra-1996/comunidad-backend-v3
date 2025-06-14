const models = require("../../database/models");

export const createAptitud = async (req, res) => {
    models.aptitudes.create({
        nombre_aptitud: req.body.nombre_aptitud,     
        descripcion: req.body.descripcion     
      })
      .then(
        (aptitudes) => res.status(201).send({ id: aptitudes.id }))
  
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
      const aptitudes = await models.aptitudes.findAll({
        attributes: ["id", "nombre_aptitud", "descripcion"]
      });
      res.send({ aptitudes });
    } catch (error) {
      console.error("Error al buscar aptitudes:", error);
      res.status(500).send("Error interno del servidor");
    }
};

const findAptitudesId = (id, { onSuccess, onNotFound, onError }) => {
  models.aptitudes.findOne(
        { 
            where: 
            { 
                id: id 
            } 
        }
    )
    .then((aptitud) => (aptitud ? onSuccess(aptitud) : onNotFound()))
    .catch(() => onError());
};

export const getAptitud = async (req, res) => {
  findAptitudesId(req.params.id, {
    onSuccess: (aptitud) => res.send(aptitud),
    onNotFound: () => res.status(404).send("NOT FOUND"),
    onError: () => res.sendStatus(500),
  });
};

export const updateAptitud = async (req, res) => {
  const aptitudId = req.params.id;
  try {
    const [updatedRows] = await models.aptitudes.update(
      {
        nombre_aptitud: req.body.nombre_aptitud,     
        descripcion: req.body.descripcion
      },
      {
        where: { id: aptitudId },
      }
    );

    if (updatedRows === 0) {
      res.status(404).send("NOT FOUND");
    } else {
      res.status(200).send("OK");
    }
  } catch (error) {
    console.error(`Error al actualizar aptitud: ${error}`);
    res.sendStatus(500);
  }
};

export const deleteAptitud = async (req, res) => {
  const aptitudId = req.params.id;

  try {
    const result = await models.aptitudes.destroy({
      where: { id: aptitudId },
    });

    if (result === 0) {
      res.status(404).send("NOT FOUND");
    } else {
      res.status(200).send("DESTROYED");
    }
  } catch (error) {
    console.error(`Error al eliminar aptitud: ${error}`);
    res.sendStatus(500);
  }
};
