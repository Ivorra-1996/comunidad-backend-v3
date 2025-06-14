const models = require("../../database/models/estados.json");
const { saveToDatabase2 } = require("../../database/utils/utils.js");

export const createdEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    
    // Verificar si el tipo de estado ya existe
    const existeEstado = models.estados.find(
      (e) => e.estado.toLowerCase() === estado.toLowerCase()
    );

    if (existeEstado) {
      return res.status(400).send({ message: 'El tipo de ESTADO ya existe.' });
    }

    // Crear un nuevo tipo de estado
    const newTipoEstado = {
      id: models.estados.length + 1,
      estado,
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: null, // No hay una fecha de actualización al crearlo
    };

    // Agregar el nuevo tipo de estado al array
    models.estados.push(newTipoEstado);

    // Guardar los cambios en el archivo JSON
    saveToDatabase2({ estados: models.estados });

    res.status(201).send({ newTipoEstado });
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Internal Server Error
  }
};

export const getAll = (req, res) => {
  const estados = models.estados.map((estado) => {
    return {
      id: estado.id,
      estado: estado,
    };
  });

  res.send({ estados });
};

export const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const tipoEstado = models.estados.find((e) => e.id === parseInt(id, 10));

    if (tipoEstado) {
      res.send({ tipoEstado });
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const updateById = (id, data) => {
  try {
    const indexForUpdate = models.estados.findIndex((e) => e.id === parseInt(id, 10));
    // Verifica si no existe...
    if (indexForUpdate === -1) {
        res.status(404).send(`NOT FOUND ${id}`);
    }
    const updateTipoEstado = {
      ...models.estados[indexForUpdate].data,
      ...data,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    models.estados[indexForUpdate] = updateTipoEstado;
    saveToDatabase2({ estados: models.estados });
    return updateTipoEstado;
  } catch (error) {
    res.status(500).send(error);
  }
};

// En tu controlador o ruta
export const updateByIdController = (req, res) => {
  const  id = req.body.id;
  const data = req.body; // Asume que los datos a actualizar están en el cuerpo de la solicitud

  try {
    const updatedData = updateById(id, data);
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || error });
  }
};

export const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const tipoEstadoIndex = models.estados.findIndex((e) => e.id === parseInt(id, 10));

    if (tipoEstadoIndex !== -1) {
      // Eliminar el tipo de estado
      const deletedTipoEstado = models.estados.splice(tipoEstadoIndex, 1);

      // Guardar los cambios en el archivo JSON
      saveToDatabase2({ estados: models.estados });

      res.send({ deletedTipoEstado: deletedTipoEstado[0] });
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
