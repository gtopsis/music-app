const logger = require("../logger");
const ServerError = require("../utils/error");

module.exports = (err, req, res, next) => {
  let status = err.status || 500;

  let errorData = {
    status,
    message: err.message,
  };

  let error = new ServerError(errorData);

  let payload = {
    success: false,
    error,
  };

  logger.error(`${error.date} ${error.name}: ${error.status} ${error.message}`);

  res.status(status).json(payload);
};
