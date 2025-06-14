const models = require("../../database/models");

export const createAbm = async (req, res) => {
  const { id_usuario_mod, motivo, fk_id_usuario } = req.body;

  try {
    const newAbmRecord = await models.abmModels.create({
      id_usuario_mod,
      motivo,
      fk_id_usuario,
    });

    res.status(201).send({ abmRecord: newAbmRecord });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getAll = async (req, res) => {
  try {
    const abmRecords = await models.abmModels.findAll({
      attributes: ['id', 'id_usuario_mod', 'motivo', 'fk_id_usuario'],
    });

    res.send({ abmRecords });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getAbmById = async (req, res) => {
  const abmId = req.params.id;

  try {
    const abmRecord = await models.abmModels.findOne({
      attributes: ['id', 'id_usuario_mod', 'motivo', 'fk_id_usuario'],
      where: {
        id: abmId,
      },
    });

    if (abmRecord) {
      res.send({ abmRecord });
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const updateAbm = async (req, res) => {
  const abmId = req.params.id;
  const { id_usuario_mod, motivo, fk_id_usuario } = req.body;

  try {
    const updatedAbmRecord = await models.abmModels.update(
      { id_usuario_mod, motivo, fk_id_usuario },
      {
        where: {
          id: abmId,
        },
      }
    );

    if (updatedAbmRecord[0]) {
      res.status(200).send("OK");
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const deleteAbm = async (req, res) => {
  const abmId = req.params.id;

  try {
    const deletedAbmRecord = await models.abmModels.destroy({
      where: {
        id: abmId,
      },
    });

    if (deletedAbmRecord) {
      res.status(200).send("OK");
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
