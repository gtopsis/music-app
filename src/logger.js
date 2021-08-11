const {transports, createLogger, format} = require("winston");
const config = require("./config");

const logger = createLogger({
  level: "info",
  format: format.combine(format.colorize(), format.timestamp(), format.json()),
  defaultMeta: {service: "user-service"},
  transports: [
    new transports.File({
      filename: config.LOGGER.FILENAME_ERROR,
      level: "error",
      timestamp: true,
    }),
    new transports.File({
      filename: config.LOGGER.FILENAME_COMBINED,
      maxsize: config.LOGGER.MAXSIZE,
      maxFiles: config.LOGGER.MAXFILES,
      timestamp: true,
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      handleExceptions: true,
      colorize: true,
      prettyPrint: true,
      timestamp: true,
    })
  );
}

module.exports = logger;
