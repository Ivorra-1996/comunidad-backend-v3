const models = require("../../database/models/tipos_documentos.json");
const { saveToDatabase } = require("../../database/utils/utils.js");

export const createTipoDocumento = async (req, res) => {
  try {
    const { tipo_documento } = req.body;

    // Verificar si el tipo de documento ya existe
    const existingTipoDocumento = models.tipos_documentos.find(
      (doc) => doc.tipo_documento.toLowerCase() === tipo_documento.toLowerCase()
    );

    if (existingTipoDocumento) {
      return res.status(400).send({ message: 'El tipo de documento ya existe.' });
    }

    // Crear un nuevo tipo de documento
    const newTipoDocumento = {
      id: models.tipos_documentos.length + 1,
      tipo_documento,
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: null, // No hay una fecha de actualización al crearlo
    };

    // Agregar el nuevo tipo de documento al array
    models.tipos_documentos.push(newTipoDocumento);

    // Guardar los cambios en el archivo JSON
    saveToDatabase({ tipos_documentos: models.tipos_documentos });

    res.status(201).send({ newTipoDocumento });
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Internal Server Error
  }
};

export const getAll = (req, res) => {
  const tipos_documentos = models.tipos_documentos.map((tipo_documento) => {
    return {
      id: tipo_documento.id,
      tipo_documento: tipo_documento.tipo_documento,
    };
  });

  res.send({ tipos_documentos });
};

export const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const tipoDocumento = models.tipos_documentos.find((doc) => doc.id === parseInt(id, 10));

    if (tipoDocumento) {
      res.send({ tipoDocumento });
    } else {
      res.sendStatus(404); // Not Found
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Internal Server Error
  }
};

export const updateById = (id, data) => {
  try {
    const indexForUpdate = models.tipos_documentos.findIndex((doc) => doc.id === parseInt(id, 10));
    // Verifica si no existe...
    if (indexForUpdate === -1) {
      res.status(404).send(`NOT FOUND: ${id}`);
    }
    const updateTipoDoc = {
      ...models.tipos_documentos[indexForUpdate].data,
      ...data,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    models.tipos_documentos[indexForUpdate] = updateTipoDoc;
    saveToDatabase({ tipos_documentos: models.tipos_documentos });
    return updateTipoDoc;
  } catch (error) {
    res.status(500).send(error);
  }
};

// En tu controlador o ruta
export const updateByIdController = (req, res) => {
  const id = req.body.id;
  const data = req.body; // Asume que los datos a actualizar están en el cuerpo de la solicitud

  try {
    const updatedData = updateById(id, data);
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, message: error.message || error });
  }
};

export const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const tipoDocumentoIndex = models.tipos_documentos.findIndex((doc) => doc.id === parseInt(id, 10));

    if (tipoDocumentoIndex !== -1) {
      // Eliminar el tipo de documento
      const deletedTipoDocumento = models.tipos_documentos.splice(tipoDocumentoIndex, 1);

      // Guardar los cambios en el archivo JSON
      saveToDatabase({ tipos_documentos: models.tipos_documentos });

      res.send({ deletedTipoDocumento: deletedTipoDocumento[0] });
    } else {
      res.sendStatus(404); // Not Found
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Internal Server Error
  }
};
