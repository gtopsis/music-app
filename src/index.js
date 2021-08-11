const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = require("./app");
const config = require("./config");
const logger = require("./logger");
const ResponseError = require("./middlewares/response-error");

app.listen(config.PORT, () => {
  logger.info(`Music app is running on port ${config.PORT}.`);
});

app.use(helmet);
app.use(cors);
app.use(express.json());
app.use(bodyParser.json({limit: config.BODY_SIZE}));
app.use(morgan("dev"));

// routes

// error response
app.use(ResponseError);

process.on("uncaughtException", err => {
  logger.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node.js docs)
});
