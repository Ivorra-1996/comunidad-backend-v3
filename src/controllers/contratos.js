const models = require("../../database/models");

// Obtener todos los contratos
export const getAll = async (req, res) => {
  try {
    const contratos = await models.contratos.findAll({
      attributes: ["id", "nombre_contrato","tipo_contrato"],
    });
    res.send({ contratos });
  } catch (error) {
    res.sendStatus(500).send(error);
  }
};

// Obtener un contrato por ID
export const getContratoById = async (req, res) => {
  const id = req.params.id;

  try {
    const contrato = await models.contratos.findOne({
      where: { id },
      attributes: ["id", "nombre_contrato","tipo_contrato"],
    });

    if (contrato) {
      res.send({ contrato });
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Crear un nuevo contrato
export const createContrato = async (req, res) => {
  const nombre = req.body.contrato;
  const tipo = req.body.tipo;
  try {
    const nuevoContrato = await models.contratos.create({ 
      nombre_contrato: nombre, 
      tipo_contrato: tipo
    });
    res.status(201).send({ contrato: nuevoContrato });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Actualizar un contrato por ID
export const updateContratoById = async (req, res) => {
  const id = req.params.id;
  const nombre = req.body.contrato;
  const tipo = req.body.tipo;

  try {
    const contrato = await models.contratos.findOne({ where: { id } });

    if (contrato) {
      await contrato.update(
        {
          nombre_contrato: nombre, 
          tipo_contrato: tipo 
        }
      );
      res.send({ contrato });
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    res.sendStatus(500).send(error);
  }
};

// Eliminar un contrato por ID
export const deleteContratoById = async (req, res) => {
  const id = req.params.id;

  try {
    const contrato = await models.contratos.findOne({ where: { id } });

    if (contrato) {
      await contrato.destroy();
      res.send({ message: "Contrato eliminado correctamente" });
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    res.sendStatus(500).send(error);
  }
};
