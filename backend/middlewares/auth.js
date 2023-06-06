const token = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('../errors/UnauthorizedError');
const { NODE_ENV, JWT_SECRET } = require('../utils/secretKey');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  let payload;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const jwt = authorization.replace('Bearer ', '');
  try {
    payload = token.verify(
      jwt,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;

  return next();
};

module.exports = authMiddleware;
