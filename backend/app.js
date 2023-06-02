const path = require('path');
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const validationErrors = require('./utils/validError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'http://alex.rgb.yandex.nomoredomains.rocks',
      'https://alex.rgb.yandex.nomoredomains.rocks',
    ],
    credentials: true,
    maxAge: 60,
  }),
);
app.use(requestLogger);
app.use(helmet());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(router);
app.use(errorLogger);

app.use(validationErrors);
app.use(errors());

app.listen(PORT);
