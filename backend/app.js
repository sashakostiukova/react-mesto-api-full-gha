const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { config } = require('./config');
const { router } = require('./routes');
const { handleError } = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// "start": "node app.js",
const app = express();

mongoose.connect(config.MONGO_URL);

app.use(cors({ origin: ['http://localhost:3000', 'https://sashakostiukova.nomoredomainsmonster.ru'], maxAge: 30 }));
// app.use(cors());

app.use(json());
app.use(helmet());

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(handleError);

// app.listen(config.PORT);

module.exports = { app };
