require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const mainRouter = require('./routes/index.js');
const errorHandler = require('./middlewares/error-handler.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const { NotFoundError } = require('./utils/errors.js');

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/wtwr_db')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(console.error);

const app = express();
const { PORT = 3001 } = process.env;

// Enable CORS
app.use(cors());
app.use(express.json());

// request logger
app.use(requestLogger);

app.use((req, res, next) => {
  req.user = { _id: '5d8b8592978f8bd833ca8133' };
  next();
});

app.use('/', mainRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

// error logger
app.use(errorLogger);

// celebrate error handler
app.use(errors());

// our centralized handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
