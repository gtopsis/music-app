const app = require("./app");
const config = require("./config");
const logger = require("./logger");

const models = require("./models");

// After load all models, syn database and start server
models.sequelize
  // .sync({force: true})
  .sync()
  .then(() => {
    logger.info("Connection has been established successfully.");
    app.listen(config.PORT, () => {
      logger.info(`Server is running on port ${config.PORT} and mode: ${config.ENVIRONMENT}`);
    });
  })
  .catch(error => {
    logger.error("Unable to connect to the database:", error);
  });

process.on("uncaughtException", err => {
  logger.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node.js docs)
});

process.once("SIGUSR2", function () {
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, "SIGINT");
});
