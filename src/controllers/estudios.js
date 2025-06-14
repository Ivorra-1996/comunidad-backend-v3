const models = require("../../database/models");

// Obtener todos los estudios
export const getAll = async (req, res) => {
  try {
    const estudios = await models.estudios.findAll({
      attributes: ["id", "nombre_estudio_estado"]
    });
    res.status(200).send({ estudios });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Obtener un estudio por ID
export const getEstudioById = async (req, res) => {
  const id = req.params.id;

  try {
    const estudio = await models.estudios.findByPk(id, {
      attributes: ["id", "nombre_estudio_estado"]
    });

    if (!estudio) {
      return res.status(404).send('NOT FOUND');
    }

    res.status(200).send({ estudio });
  } catch (error) {
    res.sendStatus(500).send(error);
  }
};

// Crear un nuevo estudio
export const createEstudio = async (req, res) => {
  const nombre= req.body.nombre;

  try {
    const nuevoEstudio = await models.estudios.create({
      nombre_estudio_estado: nombre
    });

    res.status(201).send({ estudio: nuevoEstudio });
  } catch (error) {
    res.sendStatus(500).send(error);
  }
};

// Actualizar un estudio existente
export const updateEstudio = async (req, res) => {
  const id = req.params.id;
  const nombre = req.body.nombre;

  try {
    const estudio = await models.estudios.findByPk(id);

    if (!estudio) {
      return res.status(404).send('NOT FOUND');
    }

    await estudio.update({
      nombre_estudio_estado: nombre
    });

    res.status(200).send({ estudio });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Eliminar un estudio
export const deleteEstudio = async (req, res) => {
  const id = req.params.id;

  try {
    const estudio = await models.estudios.findByPk(id);

    if (!estudio) {
      return res.status(404).send('NOT FOUND');
    }

    await estudio.destroy();

    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
