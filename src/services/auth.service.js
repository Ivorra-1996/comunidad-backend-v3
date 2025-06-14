const models = require("../../database/models");
const sendEmail = require("../../database/utils/sendEmail.js");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;
const puerto = process.env.PORT;

const findUsuarioPorEmail = (email) => {
  return models.usuarios
    .findOne({ where: { usuario: email } })
    .then((usuario) => (usuario ? usuario : false));
};

const findTokenId = (id) => {
  return models.tokens
    .findOne({ where: { userId: id } })
    .then((token) => (token ? token : false));
};

export const requestPasswordReset = async (usuario, res) => {
  const user = await findUsuarioPorEmail(usuario);
  if (!user) {
    res.status(404).send("El correo electrónico no existe.");
    return;
  }

  let token = await findTokenId(user.id);
  if (token) await token.destroy();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  try {
    const createdToken = await models.tokens.create({
      userId: user.id,
      token: hash,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    console.log('Token creado con ID:', createdToken.id);
  } catch (error) {
    console.error('Error al crear el token:', error);
    res.status(500).send("Error al crear el token.");
    return;
  }

  const link = `${clientURL}:${puerto}/passwordReset?token=${resetToken}&id=${user.id}`;

  try {
    console.log("Esto es lo que se envia como token", resetToken)
    sendEmail(
      user.usuario,
      "Solicitud de restablecimiento de contraseña",
      {
        //usuario: user.usuario,
        token: resetToken,
      },
      '../../database/utils/template/requestResetPassword.handlebars'
    );
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).send("Error al enviar el correo electrónico.");
    return;
  }

  res.send({ link });
};

const findUsuarioPorId = async (id) => {
  try {
    const usuario = await models.usuarios.findOne({ where: { id } });
    return usuario;
  } catch (error) {
    console.error(`Error al buscar usuario por ID: ${error}`);
    throw error;
  }
};

export const resetPassword = async (userId, token, password, res) => {
  try {
    const passwordResetToken = await findTokenId(userId);
    if (!passwordResetToken) {
      res.status(404).send("Token de restablecimiento de contraseña no válido o caducado");
      return;
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      res.status(403).send("Token de restablecimiento de contraseña no válido o caducado");
      return;
    }

    const hashPassword = await bcrypt.hash(password, Number(bcryptSalt));
    const usuario = await findUsuarioPorId(userId);
    if (!usuario) {
      res.status(404).send("Usuario no encontrado");
      return;
    }

    await usuario.update({ password: hashPassword });
    console.log(`Contraseña actualizada para el usuario: ${usuario.usuario}`);
    
    await sendEmail(
      usuario.usuario,
      "Restablecimiento de contraseña exitoso",
      {
        usuario: usuario.usuario,
      },
      '../../database/utils/template/resetPassword.handlebars',
    );

    await passwordResetToken.destroy();

    res.send({ message: "El restablecimiento de contraseña fue exitoso" });
    return;
  } catch (error) {
    console.error(`Error en resetPassword: ${error.message}`);
    res.status(500).send("Error en el restablecimiento de contraseña");
    return;
  }
};

