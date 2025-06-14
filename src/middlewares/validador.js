const jwt = require('jsonwebtoken')
require('dotenv').config('../../.env');
const secret = process.env.SECRET;

export const validateToken = (req, res, next) => {
  if (req.url.includes("signin")|| req.url.includes("signup")){
    next()
  } else {
  const accessToken = req.query.authorization;

  if (!accessToken) {
    return res.status(401).send('Acceso denegado: Falta token de autorización');
  }

  jwt.verify(accessToken, secret, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send('Acceso denegado: Token expirado');
      }
      return res.status(401).send('Acceso denegado: Token no válido');
    }
    req.user = user;
    next();
  })};
};