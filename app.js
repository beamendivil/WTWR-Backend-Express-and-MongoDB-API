const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users.js');
const { getClothingItems } = require('./controllers/clothingItems.js');
const auth = require('./middlewares/auth.js');
const errorHandler = require('./middlewares/error-handler.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const usersRouter = require('./routes/users.js');
const clothingItemsRouter = require('./routes/clothingItems.js');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wtwr_db')
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

// --- PUBLIC ROUTES (Must be BEFORE auth) ---
app.post('/signin', login);
app.post('/signup', createUser);
app.get('/items', getClothingItems);

// --- AUTHORIZATION MIDDLEWARE ---
// This protects everything below it
app.use(auth);

// --- PROTECTED ROUTES ---
app.use('/users', usersRouter);
app.use('/items', clothingItemsRouter);

// error logger
app.use(errorLogger);

// celebrate error handler
app.use(errors());

// our centralized handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});