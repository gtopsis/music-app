const config = require("../config");
const logger = require("../logger");

//logging all http requests
module.exports = (req, res, next) => {
  let payload = {
    url: req.originalUrl,
    method: req.method,
  };
  if (config.ENVIRONMENT === "development") {
    payload.body = req.body;
    payload.query = req.query;
    payload.params = req.params;
  }
  logger.http(`${req.originalUrl} - ${req.method} - ${req.ip}`, payload);
  next();
};
