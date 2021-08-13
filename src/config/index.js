require("dotenv").config();

let config = {
  PORT: process.env.PORT || 3000,
  LOGGER: {
    FILENAME_ERROR: process.env.LOGGER_FILENAME_ERROR || "error.log",
    FILENAME_COMBINED: process.env.LOGGER_FILENAME_COMBINED || "combined.log",
    MAXSIZE: process.env.LOGGER_MAXSIZE || 5242880,
    MAXFILES: process.env.LOGGER_MAXFILES || 7,
  },
  DB: {
    USERNAME: process.env.DB_USERNAME || "fairlo",
    PASSWORD: process.env.DB_PASSWORD || "fairlo",
    DB_NAME: process.env.DB_NAME || "musicapp",
  },
  BODY_SIZE: process.env.BODY_SIZE || "20MB",
  ENVIRONMENT: process.env.NODE_ENV || "development",
};

module.exports = config;
