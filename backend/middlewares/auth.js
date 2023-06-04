const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('../errors/UnauthorizedError');
const jwtKey = require('../utils/secretKey');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    if (!token) {
      throw new UnauthorizedError('Токен отсутствует');
    }

    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : jwtKey);
  } catch (err) {
    const unauthorizedError = new UnauthorizedError('Токен недействителен');
    next(unauthorizedError);
  }
  req.user = payload;

  next();
};

module.exports = authMiddleware;
