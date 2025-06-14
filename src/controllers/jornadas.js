const models = require("../../database/models");

// Obtener todas las jornadas
export const getAll = async (req, res) => {
  try {
    const jornadas = await models.jornadas.findAll({
      attributes: ["id", "nombre_jornada", "detalle"]
    });
    res.status(200).json({ jornadas });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Obtener una jornada por su ID
export const getJornadaById = async (req, res) => {
  const jornadaId = req.params.id;

  try {
    const jornada = await models.jornadas.findByPk(jornadaId, {
      attributes: ["id", "nombre_jornada", "detalle"]
    });

    if (!jornada) {
      res.status(404).json({ error: "Jornada no encontrada." });
    } else {
      res.status(200).json({ jornada });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Crear una nueva jornada
export const createJornada = async (req, res) => {
  const nombre = req.body.nombre;
  const detalle  = req.body.detalle;

  try {
    const newJornada = await models.jornadas.create({
      nombre_jornada: nombre,
      detalle: detalle
    });

    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Actualizar una jornada existente
export const updateJornada = async (req, res) => {
  const jornadaId = req.params.id;
  const nombre = req.body.nombre;
  const detalle  = req.body.detalle;

  try {
    const jornada = await models.jornadas.findByPk(jornadaId);

    if (!jornada) {
      res.status(404).send("NOT FOUND");
    } else {
      await jornada.update({
        nombre_jornada: nombre,
        detalle: detalle
      });

      res.status(200).json({ jornada });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Eliminar una jornada por su ID
export const deleteJornada = async (req, res) => {
  const jornadaId = req.params.id;

  try {
    const jornada = await models.jornadas.findByPk(jornadaId);

    if (!jornada) {
      res.status(404).send("NOT FOUND");
    } else {
      await jornada.destroy();
      res.status(200).send("DESTROYED");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
