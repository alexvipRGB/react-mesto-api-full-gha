const express = require('express');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/api', userRouter);
router.use('/api', cardRouter);
router.use(() => {
  throw new NotFoundError('Маршрут не найден');
});

module.exports = router;
