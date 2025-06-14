const models = require("../../database/models");

export const createJornada = async (req, res) => {
  try {
    const newJornada = await models.jornadas.create({
        nombre_jornada: req.body.nombreJornada,
        detalle: req.body.detalle,
        }   
    );
    res.status(201).send({ Jornada: newJornada });
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getAll = async (req, res) => {
  models.jornadas
    .findAll({
        attributes: ["id", "nombre_jornada", "detalle"]
    }).then(jornada => res.send({
      jornada

    })).catch(() => res.sendStatus(500));
};

export const getJornadaById = async (req, res) => {
  const jornadaId = req.params.id;

  try {
    const jornada = await models.jornadas.findOne({
      attributes: ["id", "nombre_jornada", "detalle"],
      where: {
        id: jornadaId,
      },
    });

    if (jornada) {
      res.send({ jornada });
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

export const updateJornada = async (req, res) => {
  const jornadaId = req.params.id;
  const nombreJornada = req.body.nombreJornada;
  const detalles = req.body.detalle;

  try {
    const updatedJornada = await models.jornadas.update(
      { 
        nombre_jornada: nombreJornada,
        detalle: detalles
      },
      {
        where: {
          id: jornadaId,
        },
      }
    );

    if (updatedJornada[0]) {
      res.status(200).send("OK");
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    res.sendStatus(500);
    return;
  }
};

export const deleteJornada = async (req, res) => {
  const jornadaId = req.params.id;
  try {
    const deletedJornada = await models.jornadas.destroy({
      where: {
        id: jornadaId,
      },
    });

    if (deletedJornada) {
      res.status(200).send("OK");
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
