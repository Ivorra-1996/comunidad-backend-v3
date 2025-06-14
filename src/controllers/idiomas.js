const models = require("../../database/models");

// Obtener todos los idiomas
export const getAll = async (req, res) => {
  try {
    const idiomas = await models.idiomas.findAll({
      attributes: ["id", "nombre_idioma", "nivel_oral", "nivel_escrito"],
    });
    res.json({ idiomas });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Obtener un idioma por ID
export const getIdiomaById = async (req, res) => {
  const id = req.params.id;

  try {
    const idioma = await models.idiomas.findByPk(id, {
      attributes: ["id", "nombre_idioma", "nivel_oral", "nivel_escrito"],
    });

    if (idioma) {
      res.json({ idioma });
    } else {
      res.status(404).json("NOT FOUND");
    }
  } catch (error) {
    res.sendStatus(500).send(error);
  }
};

// Crear un nuevo idioma
export const createIdioma = async (req, res) => {
  const nombre = req.body.nombre_idioma;
  const nivel_escrito = req.body.nivel_escrito;
  const nivel_oral = req.body.nivel_oral;

  try {
    const newIdioma = await models.idiomas.create({
      nombre_idioma: nombre,
      nivel_escrito: nivel_escrito,
      nivel_oral: nivel_oral,
    });

    res.status(201).json({ idioma: newIdioma });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      // El error es porque ya existe un idioma con ese nombre
      res.status(400).json({ error: 'Ya existe un idioma con ese nombre.' });
    } else {
      console.error(error);
      res.sendStatus(500);
    }
  }
};

// Actualizar un idioma por ID
export const updateIdiomaById = async (req, res) => {
  const id = req.params.id;
  const { nombre_idioma } = req.body;

  try {
    const idioma = await models.idiomas.findByPk(id);

    if (idioma) {
      await idioma.update({ nombre_idioma });
      res.json({ idioma });
    } else {
      res.status(404).json({ message: "Idioma no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Eliminar un idioma por ID
export const deleteIdiomaById = async (req, res) => {
  const id = req.params.id;

  try {
    const idioma = await models.idiomas.findByPk(id);

    if (idioma) {
      await idioma.destroy();
      res.json({ message: "Idioma eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Idioma no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
