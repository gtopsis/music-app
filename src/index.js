const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require("./logger");

const app = require('./app');
const config  = require("./config");

app.use(helmet);
app.use(cors);
app.use(express.json());

app.listen(config.PORT, () => {
  logger.info(`Music app is running on port ${config.PORT}.`);
});