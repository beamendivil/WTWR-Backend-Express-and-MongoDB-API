const DEFAULT_ERROR = 500;
const BadRequestError = require('./errors/BadRequestError.js');
const UnauthorizedError = require('./errors/UnauthorizedError.js');
const ForbiddenError = require('./errors/ForbiddenError.js');
const NotFoundError = require('./errors/NotFoundError.js');
const ConflictError = require('./errors/ConflictError.js');

module.exports = {
  DEFAULT_ERROR,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
