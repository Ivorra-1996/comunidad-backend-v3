const models = require("../../database/models");

export const createGrupo = async (req, res) => {
  const descripcion = req.body.descripcion;

  try {
    const newGroup = await models.grupos.create({
            descripcion: descripcion
        }   
    );
    res.status(201).send({ grupo: newGroup });
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getAll = async (req, res) => {
  models.grupos
    .findAll({
        attributes: ["id","descripcion"]
    }).then(grupo => res.send({
      grupo
      
    })).catch(() => res.sendStatus(500));
};

export const getGrupoById = async (req, res) => {
  const groupId = req.params.id;

  try {
    const grupo = await models.grupos.findOne({
      attributes: ["id", "descripcion"],
      where: {
        id: groupId,
      },
    });

    if (grupo) {
      res.send({ grupo });
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

export const updateGrupo = async (req, res) => {
  const groupId = req.params.id;
  const descripcion = req.body.descripcion;

  try {
    const updatedGroup = await models.grupos.update(
      { descripcion: descripcion },
      {
        where: {
          id: groupId,
        },
      }
    );

    if (updatedGroup[0]) {
      res.status(200).send("OK");
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

export const deleteGrupo = async (req, res) => {
  const grupoId = req.params.id;
  try {
    const deletedGroup = await models.grupos.destroy({
      where: {
        id: grupoId,
      },
    });

    if (deletedGroup) {
      res.status(200).send("OK");
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
