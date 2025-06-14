const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  try {
    // Crea un objeto transportador reutilizable utilizando el transporte SMTP predeterminado.
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        // Naturalmente, reemplace ambas con sus credenciales reales o una contraseña específica de la aplicación.
        user: process.env.EMAIL_USERNAME,
        //pass: 'dyqr fowb hfem jwvr',
        pass: 'ygnw vtlu zqmm ogew',
      },
    });

    // Parece que el payload y el template estan mal...
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
        //text: 'Solicitó restablecer su contraseña.'
      };
    };

    // Envia el email..
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;