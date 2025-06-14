const models = require("../../database/models");
const { Op } = require("sequelize");
// ... (importaciones)

export const getConFiltros = async (req, res) => {
  try {
    const paginaComoNumero = Number.parseInt(req.query.pagina);
    const limiteComoNumero = Number.parseInt(req.query.limite);
    let ordenarPor = req.query.ordenar;
    let buscarPostulante = req.query.buscarPostulante;

    // Validar ordenarPor
    const camposValidos = ["createdAt", "otroCampoValido"];
    ordenarPor = camposValidos.includes(ordenarPor) ? ordenarPor : "createdAt";

    const pagina = !Number.isNaN(paginaComoNumero) && paginaComoNumero > 0 ? paginaComoNumero : 0;
    const limite = !Number.isNaN(limiteComoNumero) && limiteComoNumero > 0 ? limiteComoNumero : 30;

    let [buscarNombre = "_", buscarApellido = "_"] = (buscarPostulante || "").split(" ", 2);

    if (typeof buscarApellido === "undefined") {
      buscarApellido = buscarNombre;
    }

    const postulantes = await models.postulantes.findAndCountAll({
      limit: limite,
      offset: pagina * limite,
      include: [
        {
          as: "Usuario",
          model: models.usuarios,
          attributes: ["id", "usuario", "estado", "createdAt"],
        },
        // ... (otros includes)
      ],
      where: {
        [Op.or]: [
          {
            nombre: {
              [Op.iLike]: `%${buscarNombre}%`,
            },
          },
          {
            apellido: {
              [Op.iLike]: `%${buscarApellido}%`,
            },
          },
        ],
      },
      order: [ordenarPor],
    });

    res.send({
      postulantes,
      totalPaginas: Math.ceil(postulantes.count / limite),
    });
  } catch (error) {
    console.error('Error al buscar postulantes:', error);
    res.sendStatus(400);
  }
};

const findPostulantesPorIdUsuario = (
  fk_id_usuario,
  { onSuccess, onNotFound, onError }
) => {
  console.log('Buscando postulantes por ID de usuario:', fk_id_usuario);
  models.postulantes
    .findOne({
      include: [
        {
          as: "Usuario",
          model: models.usuarios,
          attributes: ["id", "usuario", "estado", "createdAt"],
        },
        {
          as: "Estudios",
          model: models.estudios,
          attributes: ["id", "nombre_estudio_estado"],
        },
        {
          as: "Carrera",
          model: models.carreras,
          attributes: ["id", "nombre_carrera"],
        },
        {
          as: "Provincia",
          model: models.provincias,
          attributes: ["id", "nombre"],
        },
        {
          as: "Ciudad",
          model: models.ciudades,
          attributes: ["id", "nombre", "fk_id_provincia"],
        },
        {
          as: "Idiomas",
          model: models.idiomas_postulantes,
          include: [
            {
              as: "Idiomas del postulante",
              model: models.idiomas,
              attributes: ["id", "nombre_idioma", "nivel_oral", "nivel_escrito"],
            },
          ],
        }
      ],

      where: { fk_id_usuario },
    })
    .then((postulantes) =>
      postulantes ? onSuccess(postulantes) : onNotFound()
    )
    .catch((error) => {
      console.error('Error al buscar postulantes:', error);
      onError();
    });
};

export const getPorIdUsuario = async (req, res) => {
  findPostulantesPorIdUsuario(req.params.id, {
    onSuccess: (postulantes) => res.send(postulantes),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

const findPostulantesPorDNI = (id,{ onSuccess, onNotFound, onError }) => {
  models.postulantes
    .findOne({
      include: [
        {
          as: "Usuario",
          model: models.usuarios,
          attributes: ["id", "usuario", "estado", "createdAt"],
        },
        {
          as: "Estudios",
          model: models.estudios,
          attributes: ["id", "nombre_estudio_estado"],
        },
        {
          as: "Carrera",
          model: models.carreras,
          attributes: ["id", "nombre_carrera"],
        },
        {
          as: "Provincia",
          model: models.provincias,
          attributes: ["id", "nombre"],
        },
        {
          as: "Ciudad",
          model: models.ciudades,
          attributes: ["id", "nombre", "fk_id_provincia"],
        },
        {
          as: "Idiomas",
          model: models.idiomas_postulantes,
          attributes: ["id"],
          include: [
            {
              as: "Idiomas del postulante",
              model: models.idiomas,
              attributes: ["id", "nombre_idioma", "nivel_oral", "nivel_escrito"],
            },
          ],
        }
      ],

      where: { id },
    })
    .then((postulantes) =>
      postulantes ? onSuccess(postulantes) : onNotFound()
    )
    .catch(() => onError());
};

export const getPorId = async (req, res) => {
  findPostulantesPorDNI(req.params.id, {
    onSuccess: (postulantes) => res.send(postulantes),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(400),
  });
};

export const postPostulante = async (req, res) => {
  models.postulantes
    .create({
      id: req.body.documento,
      tipo_documento: req.body.tipoDocumento,
      fk_id_usuario: req.body.idUsuario,
      fk_id_estudios: req.body.estudios,
      fk_id_carrera: req.body.carrera,
      estado: req.body.estado,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      nacionalidad: req.body.nacionalidad,
      fecha_nac: req.body.fecha_nac,
      pais: req.body.pais,
      fk_id_provincia: req.body.provincia,
      fk_id_ciudad: req.body.ciudad,
      calle: req.body.calle,
      nro: req.body.nro,
      piso: req.body.piso,
      depto: req.body.depto,
      cp: req.body.cp,
      telefono: req.body.telefono,
      cant_materias: req.body.cantMaterias,
      alumno_unahur: req.body.alumnoUnahur,
      presentacion: req.body.presentacion,
      cv: req.body.cv,
      foto: req.body.foto,
    })
    .then(
      (postulantes) => res.status(201).send({ id: postulantes.id }),
      //aca habilitamos el usuario
      enableUser(req.body.idUsuario)
    )
    .catch((error) => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(401).send("Bad request: este dni ya se dio de alta");
      } else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`);
        res.sendStatus(500);
      }
    });
};

//Con esto habilitamos el usuario cuando de el alta en postulantes
const enableUser = (id_usuario) => {
  models.usuarios.update(
    { estado: "t" },
    {
      where: {
        id: id_usuario,
      },
    }
  );
};

export const deletePostulante = async (req, res) => {
  const onSuccess = postulantes =>
  postulantes
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
    findPostulantesPorDNI(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
};

export const updatePostulante = async (req, res) => {
  const onSuccess = (postulantes) =>
  postulantes
      .update(
        {
          tipo_documento: req.body.tipoDocumento,
          fk_id_usuario: req.body.idUsuario,
          fk_id_estudios: req.body.estudios,
          fk_id_carrera: req.body.carrera,
          estado: req.body.estado,
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          nacionalidad: req.body.nacionalidad,
          fecha_nac: req.body.fecha_nac,
          pais: req.body.pais,
          fk_id_provincia: req.body.provincia,
          fk_id_ciudad: req.body.ciudad,
          calle: req.body.calle,
          nro: req.body.nro,
          piso: req.body.piso,
          depto: req.body.depto,
          cp: req.body.cp,
          telefono: req.body.telefono,
          cant_materias: req.body.cantMaterias,
          alumno_unahur: req.body.alumnoUnahur,
          presentacion: req.body.presentacion,
          cv: req.body.cv,
          foto: req.body.foto
        },
          { fields: ["tipo_documento", "fk_id_usuario","fk_id_estudios","fk_id_carrera","estado","nombre","apellido","nacionalidad","fecha_nac","pais","fk_id_provincia","fk_id_ciudad","calle","nro","piso","depto","cp","telefono","cant_materias","alumno_unahur","presentacion","cv","foto"] }
      )
      .then(() => res.sendStatus(200))
      .catch((error) => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res
            .status(400)
            .send("Bad request: Algun tipo de error de validacion de campos");
        } else {
          console.log(
            `Error al intentar actualizar la base de datos: ${error}`
          );
          res.sendStatus(500);
        }
      });
      findPostulantesPorDNI(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};