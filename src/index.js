const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const OpenApiValidator = require("express-openapi-validator");

const app = require("./app");
const config = require("./config");
const logger = require("./logger");
const ResponseSuccess = require("./middlewares/response-success");
const ResponseError = require("./middlewares/response-error");

app.listen(config.PORT, () => {
  logger.info(`Music app is running on port ${config.PORT}.`);
  logger.info("Running server in mode: " + config.ENVIRONMENT);
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({limit: config.BODY_SIZE}));
app.use(morgan("dev"));

//OpenAPI file
app.get("/api-doc", (req, res) => res.sendFile(path.join(__dirname, "../public/openapi.json")));

// OpenAPI - express validator
app.use(
  OpenApiValidator.middleware({
    apiSpec: "./openapi.yaml",
    validateRequests: true, // (default)
    validateResponses: false, // false by default
    validateFormats: "full",
    // formats: openapiFormats.formats,
    operationHandlers: path.join(__dirname, "controllers"),
  })
);

// error response
app.use(ResponseSuccess);
app.use(ResponseError);

process.on("uncaughtException", err => {
  logger.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node.js docs)
});
