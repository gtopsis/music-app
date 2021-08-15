const buildDevLogger = require("./dev-logger");
const buildProdLogger = require("./prod-logger");
let config = require("../config");

let logger = null;
if (config.ENVIRONMENT === "development") {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

module.exports = logger;
