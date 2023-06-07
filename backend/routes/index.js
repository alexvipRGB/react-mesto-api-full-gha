const express = require('express');

const router = express.Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

router.use(userRouter);
router.use(cardRouter);

module.exports = router;
