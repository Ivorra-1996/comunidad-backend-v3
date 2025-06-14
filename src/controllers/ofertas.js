const models = require("../../database/models");
const { Op: sequelize } = require("sequelize");

export const getOfertasPorFiltros = async (req, res) => {
  let paginaComoNumero = Number.parseInt(req.query.pagina);
  let limiteComoNumero = Number.parseInt(req.query.limite);
  let ordenarPor = req.query.ordenar;
  let buscarTitulo = req.query.buscarTitulo;
  let estado = req.query.estado;

  let pagina = 0;
  if (!Number.isNaN(paginaComoNumero) && paginaComoNumero > 0) {
    pagina = paginaComoNumero;
  }

  let limite = 30;
  if (!Number.isNaN(limiteComoNumero) && limiteComoNumero > 0) {
    limite = limiteComoNumero;
  }
  if (typeof ordenarPor === "undefined") {
    ordenarPor = "createdAt";
  }

  if (typeof buscarTitulo === "undefined") {
    buscarTitulo = "_";
  } else {
    buscarTitulo = buscarTitulo.replace(/\s/g, "%");
  }

  if (typeof estado === "undefined") {
    estado = "Activo";
 }

  models.ofertas
    .findAndCountAll({
      limit: limite,
      offset: pagina * limite,
      include: [
        {
          as: "Empresa",
          model: models.empresas,
          attributes: ["id", "nombre_empresa", "descripcion", "logo"],
        },
        {
          as: "Estudio",
          model: models.estudios,
          attributes: ["id", "nombre_estudio_estado"],
        },
        {
          as: "Carrera",
          model: models.carreras,
          attributes: ["id", "nombre_carrera"],
        },
        {
          as: "Jornada",
          model: models.jornadas,
          attributes: ["id", "nombre_jornada"],
        },
        {
          as: "Contrato",
          model: models.contratos,
          attributes: ["id", "nombre_contrato"],
        },
        // Aca tambien ...
        {
          as: "Idiomas",
          model: models.idiomas_ofertas,
          attributes: ["id"],
          include: [
            {
            as: "Idiomas de oferta",
            model: models.idiomas,
            attributes: ["id", "nombre_idioma"],
            }
          ],
        }
      ],
      where: {
        [sequelize.and]: [
          {
            titulo_oferta: {
              [sequelize.iLike]: `%${buscarTitulo}%`,
            },
            estado: {
              [sequelize.iLike]: `%${estado}%`
            },
          },
        ],
      },
      order: [[ordenarPor, 'DESC'],],
    })
    .then((ofertas) =>
      res.send({
        ofertas,
        totalPaginas: Math.ceil(ofertas.count / limite),
      })
    )
    .catch(() => res.sendStatus(500));
};

export const getOfertas = async (req, res) => {
  let pagina = Number.parseInt(req.query.pagina);
  let limite = Number.parseInt(req.query.limite);

  if (!pagina){
    pagina = 0;
  }
  if(!limite){
    limite = 1000;
  }
  models.ofertas
    .findAndCountAll({
      limit: limite,
      offset: pagina * limite,
      include: [
        {
          as: "Empresa",
          model: models.empresas,
          attributes: ["id", "nombre_empresa", "descripcion", "logo"],
        },
        {
          as: "Estudio",
          model: models.estudios,
          attributes: ["id", "nombre_estudio_estado"],
        },
        {
          as: "Carrera",
          model: models.carreras,
          attributes: ["id", "nombre_carrera"],
        },
        {
          as: "Jornada",
          model: models.jornadas,
          attributes: ["id", "nombre_jornada"],
        },
        {
          as: "Contrato",
          model: models.contratos,
          attributes: ["id", "nombre_contrato"],
        },
        // Aca Se rompe mal 
        {
          as: "Idiomas",
          model: models.idiomas_ofertas,
          attributes: ["id"],
          include: [
            {
            as: "Idiomas de oferta",
            model: models.idiomas,
            attributes: ["id", "nombre_idioma"],
            }
          ],
        }
      ]
    })
    .then((ofertas) =>
      res.send({
        ofertas,
        totalPaginas: Math.ceil(ofertas.count / limite),
      })
    )
    .catch((error) => res.send(error));
};

const findOferta = (id, { onSuccess, onNotFound, onError }) => {
  models.ofertas
    .findOne({
      include: [
        {
          as: "Empresa",
          model: models.empresas,
          attributes: ["id", "nombre_empresa", "descripcion", "logo"],
        },
        {
          as: "Estudio",
          model: models.estudios,
          attributes: ["id", "nombre_estudio_estado"],
        },
        {
          as: "Carrera",
          model: models.carreras,
          attributes: ["id", "nombre_carrera"],
        },
        {
          as: "Jornada",
          model: models.jornadas,
          attributes: ["id", "nombre_jornada"],
        },
        {
          as: "Contrato",
          model: models.contratos,
          attributes: ["id", "nombre_contrato"],
        },
        // Aca tambien... falla...
        {
          as: "Idiomas",
          model: models.idiomas_ofertas,
          attributes: ["id"],
          include: [
            {
            as: "Idiomas de oferta",
            model: models.idiomas,
            attributes: ["id", "nombre_idioma"],
            }
          ],
        }
      ],
      where: { id },
    })
    .then((ofertas) => (ofertas ? onSuccess(ofertas) : onNotFound()))
    .catch(() => onError());
};

export const getIdOferta = async (req, res) => {
  findOferta(req.params.id, {
    onSuccess: (ofertas) => res.send(ofertas),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

// Si buscas solo el cuit de la empresa te trae todas las ofertas que tiene con el estado activa.
// Si buscas con el cuit y el titulo, te trae los titulos mas parecidos con el estado activa.
// O buscar con el cuit y el estado, te trae las ofertas con el estado que vos queres.
export const getOfertasPorIdEmpresa = async (req, res) => {
  let buscarTitulo = req.query.buscarTitulo;
  let pagina = req.query.pagina;
  let limite = req.query.limite;
  let fk_id_empresa = req.params.id;

  if (typeof buscarTitulo === "undefined") {
    buscarTitulo = "_";
  } else {
    buscarTitulo = buscarTitulo.replace(/\s/g, "%");
  }

  if (typeof pagina === "undefined") {
    pagina = 0;
  }

  if (typeof limite === "undefined") {
    limite = 30;
  }

  models.ofertas
    .findAndCountAll({
      limit: limite,
      offset: pagina * limite,
      include: [
        {
          as: "Empresa",
          model: models.empresas,
          attributes: ["id", "nombre_empresa", "descripcion", "logo"],
        },
        {
          as: "Estudio",
          model: models.estudios,
          attributes: ["id", "nombre_estudio_estado"],
        },
        {
          as: "Carrera",
          model: models.carreras,
          attributes: ["id", "nombre_carrera"],
        },
        {
          as: "Jornada",
          model: models.jornadas,
          attributes: ["id", "nombre_jornada"],
        },
        {
          as: "Contrato",
          model: models.contratos,
          attributes: ["id", "nombre_contrato"],
        },
        {
          as: "Idiomas",
          model: models.idiomas_ofertas,
          attributes: ["id"],
          include: [
            {
            as: "Idiomas de oferta",
            model: models.idiomas,
            attributes: ["id", "nombre_idioma"],
            }
          ],
        }
      ],
      where: {
        fk_id_empresa,
        titulo_oferta: {
          [sequelize.iLike]: `%${buscarTitulo}%`,
        }
      },
    })
    .then((ofertas) =>
      res.send({
        ofertas,
        totalPaginas: Math.ceil(ofertas.count / limite),
      })
    )
    .catch(() => res.sendStatus(500));
};

export const createOferta = async (req, res) => {
  models.ofertas
    .create({
      fk_id_empresa: req.body.idEmpresa,
      fk_id_jornada: req.body.idJornada,
      fk_id_contrato: req.body.idContrato,
      fk_id_estudio: req.body.idEstudio,
      fk_id_carrera: req.body.idCarrera,
      estado: "Pendiente",
      fecha_vigencia: req.body.fechaVigencia,
      titulo_oferta: req.body.tituloOferta,
      descripcion: req.body.descripcion,
      edad_desde: req.body.edadDesde,
      edad_hasta: req.body.edadHasta,
      experiencia_previa_desc: req.body.experienciaPreviaDesc,
      zona_trabajo: req.body.zonaTrabajo,
      areas_estudio: req.body.areasEstudio,
      otros_detalles: req.body.otrosDetalles,
      beneficios: req.body.beneficios,
      remuneracion: req.body.remuneracion,
      horario_laboral_desde: req.body.horarioLaboralDesde,
      horario_laboral_hasta: req.body.horarioLaboralHasta,
    })
    .then((ofertas) => res.status(201).send({ id: ofertas.id }))
    .catch((error) => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(401).send("Bad request: Algun tipo de error de validacion de campos");
      } else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`);
        res.sendStatus(500);
      }
    });
};

export const deleteOferta = async (req, res) => {
  const onSuccess = (ofertas) =>
    ofertas
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findOferta(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

export const updateOfertas = async (req, res) => {
  const onSuccess = (ofertas) =>
    ofertas
      .update(
        {
          fk_id_jornada: req.body.idJornada,
          fk_id_contrato: req.body.idContrato,
          fk_id_estudio: req.body.idEstudio,
          fk_id_carrera: req.body.idCarrera,
          estado: req.body.estado,
          fecha_vigencia: req.body.fechaVigencia,
          titulo_oferta: req.body.tituloOferta,
          descripcion: req.body.descripcion,
          horario_laboral_desde: req.body.horarioLaboralDesde,
          horario_laboral_hasta: req.body.horarioLaboralHasta,
          edad_desde: req.body.edadDesde,
          edad_hasta: req.body.edadHasta,
          experiencia_previa_desc: req.body.experienciaPreviaDesc,
          zona_trabajo: req.body.zonaTrabajo,
          areas_estudio: req.body.areasEstudio,
          otros_detalles: req.body.otrosDetalles,
          beneficios: req.body.beneficios,
          remuneracion: req.body.remuneracion,
        },
        { fields: ["fk_id_jornada", "fk_id_contrato", "fk_id_estudio","fk_id_carrera","estado","fecha_vigencia","titulo_oferta","descripcion","horario_laboral_desde","horario_laboral_hasta","edad_desde","edad_hasta","experiencia_previa_desc","zona_trabajo","areas_estudio","otros_detalles","beneficios","remuneracion"] }
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
  findOferta(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};
