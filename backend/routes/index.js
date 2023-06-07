const express = require('express');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();
const crashTest = require('./crashTest');
const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/crash-test', crashTest);
router.use(userRouter);
router.use(cardRouter);
router.use(() => {
  throw new NotFoundError('Маршрут не найден');
});

module.exports = router;
