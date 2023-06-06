const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('../errors/UnauthorizedError');
const { NODE_ENV, JWT_SECRET } = require('../utils/secretKey');

console.log(process.env.NODE_ENV);

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;

  next();
};

module.exports = authMiddleware;
