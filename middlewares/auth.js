const jwt = require('jsonwebtoken'); // Make sure to use require
const { JWT_SECRET } = require('../utils/config');
const { UNAUTHORIZED_ERROR } = require('../utils/errors');

// We must export a function directly using module.exports
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED_ERROR).send({ message: 'Authorization required' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(UNAUTHORIZED_ERROR).send({ message: 'Authorization required' });
  }

  req.user = payload;
  next();
};