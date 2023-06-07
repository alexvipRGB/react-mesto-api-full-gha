const express = require('express');

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

module.exports = router;
