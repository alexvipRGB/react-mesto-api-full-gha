const express = require('express');

const crashTest = express.Router();
crashTest.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

module.exports = crashTest;
