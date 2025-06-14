const models = require("../../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config("../../.env");

//Esta config es para el JWT
const secret = process.env.SECRET;
const expireTime = process.env.EXPIRE;

//Creamos un usuario
export const signUp = async (req, res) => {
  //Nos traemos el usuario desde el body
  const usuario = await req.body.usuario;
  const password = await req.body.password;
  const tipoGrupo = await req.body.grupo;

  //Obtenemos el largo de la password
  const passwordLength = password.length;

  //Con bcrypt generamos el salt y hasheamos la contraseña.
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  //largo de contraseña
  const minPasswordLength = 6;

  //Buscamos si existe el usuario en la base
  const findUsuarioHabilitado = await models.usuarios.findOne({
    where: { usuario: usuario, estado: true },
  });
  if (findUsuarioHabilitado !== null) {
    return (res.status(402).send("Bad request: El usuario ya existe"));
  };


  const findUsuarioInhabilitado = await models.usuarios.findOne({
    where: { usuario: usuario, estado: false },
  });

  if (findUsuarioInhabilitado !== null) {
    return (res.status(200).send({id : findUsuarioInhabilitado.id}));
  };
  
  //Luego de algunas validaciones insertamos el usuario en la tabla o devolvemos un error.
  if (passwordLength >= minPasswordLength) {
    models.usuarios
      .create({
        usuario: usuario,
        password: hashPassword,
        fk_id_grupo: tipoGrupo,
        estado: "0",
      })
      .then((usuarios) => res.status(201).send({ id: usuarios.id }))
      .catch((error) => {
        //El usuario es unico y esta definido en el modelo
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(402).send("Bad request: el usuario ya existe");
        } else {
          res.sendStatus(400);
        }
      });
  } else {
    res
      .status(401)
      .send("Bad request: el usuario o la contraseña no son validos");
  }
};

//Consultamos un usuario
export const signIn = async (req, res) => {
  //Nos traemos el usuario desde el body
  const usuario = await req.body.usuario;
  const password = await req.body.password;

  //Buscamos si existe el usuario en la base
  const findUsuario = await models.usuarios.findOne({
    where: { usuario: usuario },
  });
  
  //Si el usuario existe validamos, sino devolvemos error
  if (findUsuario !== null) {
    //Si el hash de la password matchea con la que paso el usuario damos ok, sino error.
    if (await bcrypt.compare(password, findUsuario.password)) {
      //HORRIBLE pero es lo mas rapido. Refactorizar en cuanto se pueda.
      if (findUsuario.estado) {
        //Aca se llama a la funcion para generar la apikey
        const accessToken = generateAccessToken(usuario);
        res.header("authotization", accessToken).json({
          message: "Usuario autenticado",
          id: findUsuario.id,
          grupo: findUsuario.fk_id_grupo,
          token: accessToken,
        });
      } else {
        res.header("authotization").json({
          message: "Usuario no completo formulario postulante",
          id: findUsuario.id,
          grupo: findUsuario.fk_id_grupo,
          estado: findUsuario.estado,
        });
      }
    } else {
      res.status(400).send("Usuario o password invalidos");
    }
  } else {
    res.status(400).send("Debe especificar usuario y password validos");
  }

  function generateAccessToken(usuario) {
    return jwt.sign({ uid: usuario }, secret, { expiresIn: expireTime });
  }
};

export const getAll = async (req, res) => {
  models.usuarios
    .findAll({
      attributes: ["id", "usuario", "fk_id_grupo", "estado", "createdAt"],
      include: [
        {
          as: "Grupos",
          model: models.grupos,
          attributes: ["id", "descripcion"],
        },
      ],
    })
    .then((usuarios) =>
      res.send({
        usuarios,
      })
    )
    .catch(() => res.sendStatus(400));
};

const findUsuarioPorId = (id, { onSuccess, onNotFound, onError }) => {
  models.usuarios
    .findOne({
      where: { id },
    })
    .then((usuarios) => (usuarios ? onSuccess(usuarios) : onNotFound()))
    .catch(() => onError());
};

export const getUserId = (req, res) => {
  const onSuccess = (usuario) => res.json(usuario);

  findUsuarioPorId(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};


export const deleteUsuario = async (req, res) => {
  const onSuccess = usuarios =>
  usuarios
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
      findUsuarioPorId(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
};

export const updateUsuariobyId = async (req, res) => {
  const onSuccess = (usuario) =>
    usuario
      .update({
        usuario: req.body.usuario,
      })
      .then(() => res.sendStatus(200))
      .catch((error) => {
        if (error.name === "SequelizeUniqueConstraintError") {
          res.status(400).send("Bad request: Algun tipo de error de validacion de campos");
        } else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`);
          res.sendStatus(500);
        }
      });

  findUsuarioPorId(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

const findUsuarioPorEmail = (usuario, { onSuccess, onNotFound, onError }) => {
  models.usuarios
    .findOne({
      where: { usuario: usuario },
    })
    .then((usuarios) => (usuarios ? onSuccess(usuarios) : onNotFound()))
    .catch(() => onError());
};

export const updateUsuarioByMail = async (req, res) => {
  const onSuccess = (usuario) =>
    usuario
      .update({
        usuario: req.body.usuario,
      })
      .then(() => res.sendStatus(200))
      .catch((error) => {
        if (error.name === "SequelizeUniqueConstraintError") {
          res.status(400).send("Bad request: Algun tipo de error de validacion de campos");
        } else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`);
          res.sendStatus(500);
        }
      });

    findUsuarioPorEmail(req.params.usuario, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};
