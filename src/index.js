const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = require("./app");
const config = require("./config");
const logger = require("./logger");

app.listen(config.PORT, () => {
  logger.info(`Music app is running on port ${config.PORT}.`);
});

app.use(helmet);
app.use(cors);
app.use(express.json());
app.use(bodyParser.json({limit: config.BODY_SIZE}));

process.on("uncaughtException", err => {
  logger.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node.js docs)
});
