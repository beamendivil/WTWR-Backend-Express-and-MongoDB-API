const { DEFAULT_ERROR } = require("../utils/errors.js");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || DEFAULT_ERROR;
  const message =
    statusCode === DEFAULT_ERROR
      ? "An error occurred"
      : err.message || "An error occurred";

  res.status(statusCode).send({ message });
};

module.exports = errorHandler;
