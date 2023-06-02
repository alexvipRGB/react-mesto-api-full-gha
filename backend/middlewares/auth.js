const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const secretKey = require('../utils/secretKey');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : secretKey,
    );
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};

module.exports = authMiddleware;
