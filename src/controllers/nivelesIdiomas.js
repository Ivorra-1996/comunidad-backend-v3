const models = require("../../database/models");

// Obtener todos los niveles de idiomas
export const getAll = async (req, res) => {
  try {
    const niveles = await models.niveles_idiomas.findAll({
      attributes: ["id", "nivel"]
    });
    res.status(200).json({ niveles });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Obtener un nivel de idioma por su ID
export const getNivelIdiomaById = async (req, res) => {
  const nivelId = req.params.id;

  try {
    const nivel = await models.niveles_idiomas.findOne({
      where: { id: nivelId },
      attributes: ["id", "nivel"]
    });

    if (nivel) {
      res.status(200).json({ nivel });
    } else {
      res.status(404).json("NOT FOUND");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Crear un nuevo nivel de idioma
export const createNivelIdioma = async (req, res) => {
  const nivel = req.body.nivel;

  try {
    const newNivelIdioma = await models.niveles_idiomas.create({
      nivel: nivel
    });

    res.status(200).json({ nuevoNivel: newNivelIdioma });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Actualizar un nivel de idioma existente
export const updateNivelIdioma = async (req, res) => {
  const nivelId = req.params.id;
  const { nivel } = req.body;

  try {
    const nivelIdioma = await models.niveles_idiomas.findByPk(nivelId);

    if (!nivelIdioma) {
      res.status(404).send("NOT FOUND");
    } else {
      await nivelIdioma.update({
        nivel
      });

      res.status(200).json({ nivelIdioma });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Eliminar un nivel de idioma por su ID
export const deleteNivelIdioma = async (req, res) => {
  const nivelId = req.params.id;

  try {
    const nivelIdioma = await models.niveles_idiomas.findByPk(nivelId);

    if (!nivelIdioma) {
      res.status(404).send("NOT FOUND");
    } else {
      await nivelIdioma.destroy();
      res.status(200).send("OK");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
