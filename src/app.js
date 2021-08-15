const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const OpenApiValidator = require("express-openapi-validator");

const config = require("./config");
const openapiFormats = require("./utils/openapi-data-formats");

const ResponseSuccess = require("./middlewares/response-success");
const ResponseError = require("./middlewares/response-error");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({limit: config.BODY_SIZE}));
app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "public")));

// OpenAPI - express validator
app.use(
  OpenApiValidator.middleware({
    apiSpec: "./openapi.yaml",
    validateRequests: true, // (default)
    validateResponses: false, // false by default
    validateFormats: "full",
    formats: openapiFormats.formats, // custom data formats
    operationHandlers: path.join(__dirname, "controllers"),
  })
);

// middlewares for response
app.use(ResponseSuccess);
app.use(ResponseError);

module.exports = app;
