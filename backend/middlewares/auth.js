const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const UnauthorizedError = require('../errors/UnauthorizedError');
const jwtKey = require('../utils/secretKey');

const { NODE_ENV } = process.env;
const JWT_SECRET_KEY = process.env.REACT_APP_JWT_SECRET;

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new UnauthorizedError('Токен отсутствует');
    }

    req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : jwtKey);

    next();
  } catch (err) {
    const unauthorizedError = new UnauthorizedError('Токен недействителен');
    next(unauthorizedError);
  }
};

module.exports = authMiddleware;
