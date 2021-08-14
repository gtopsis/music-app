const Sequelize = require("sequelize");
const config = require("../config");
const logger = require("../logger");

// Sigleton pattern + closure characteristic of JS
const init = () => {
  let dbConnection;
  return () => {
    if (dbConnection == undefined) {
      logger.debug("INIT DB CONNECTION");

      dbConnection = new Sequelize({
        username: config.DB.USERNAME,
        password: config.DB.PASSWORD,
        database: config.DB.DB_NAME,
        host: config.DB.HOST,
        port: config.DB.PORT,
        dialect: "postgres",
        operatorsAliases: Sequelize.Op,
        logging: msg => logger.debug(msg),
      });
    }

    return dbConnection;
  };
};

const loadModels = () => {};

let getDBConnection = init();
module.exports = {getDBConnection, loadModels};
