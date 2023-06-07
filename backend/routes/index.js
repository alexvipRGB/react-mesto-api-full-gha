const express = require('express');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(userRouter);
router.use(cardRouter);
router.use(() => {
  throw new NotFoundError('Маршрут не найден');
});

module.exports = router;
