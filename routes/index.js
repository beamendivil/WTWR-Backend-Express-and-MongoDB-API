const express = require('express');
const { login, createUser } = require('../controllers/users.js');
const { getClothingItems } = require('../controllers/clothingItems.js');
const auth = require('../middlewares/auth.js');
const {
  validateSignup,
  validateLogin,
} = require('../middlewares/validation.js');
const clothingItemsRouter = require('./clothingItems.js');
const usersRouter = require('./users.js');

const router = express.Router();

// Public routes
router.post('/signin', validateLogin, login);
router.post('/signup', validateSignup, createUser);
router.get('/items', getClothingItems);

// Protected routes
router.use(auth);
router.use('/users', usersRouter);
router.use('/items', clothingItemsRouter);

module.exports = router;
