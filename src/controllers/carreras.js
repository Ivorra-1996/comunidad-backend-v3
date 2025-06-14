const models = require("../../database/models");

// Obtener todas las carreras
export const getAll = async (req, res) => {
  try {
    const carreras = await models.carreras.findAll({
      attributes: ["id", "nombre_carrera"],
    });
    res.send({ carreras });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Obtener una carrera por ID
export const getCarreraById = async (req, res) => {
  const { id } = req.params;

  try {
    const carrera = await models.carreras.findOne({
      where: { id },
      attributes: ["id", "nombre_carrera"],
    });

    if (carrera) {
      res.send({ carrera });
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Crear una nueva carrera
export const createCarrera = async (req, res) => {
  const nombre_carrera = req.body.nombre_carrera;

  try {
    const nuevaCarrera = await models.carreras.create({ nombre_carrera });
    res.status(201).send({ carrera: nuevaCarrera });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Actualizar una carrera por ID
export const updateCarreraById = async (req, res) => {
  const id = req.params.id;
  const nombre_carrera = req.body.nombre_carrera;

  try {
    const carrera = await models.carreras.findOne({ where: { id } });

    if (carrera) {
      await carrera.update({ nombre_carrera });
      res.send({ carrera });
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    res.sendStatus(500).send(error);
  }
};

// Eliminar una carrera por ID
export const deleteCarreraById = async (req, res) => {
  const id = req.params.id;

  try {
    const carrera = await models.carreras.findOne({ where: { id } });

    if (carrera) {
      await carrera.destroy();
      res.status(200).send("Carrera eliminada correctamente");
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
