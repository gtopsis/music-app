const Sequelize = require("sequelize");
const config = require("../config");
const logger = require("../logger");

const init = () => {
  let dbConnection;
  return () => {
    if (dbConnection == undefined) {
      logger.info("INIT DB CONNECTION");
      dbConnection = new Sequelize({
        username: config.DB.USERNAME,
        password: config.DB.PASSWORD,
        database: config.DB.DB_NAME,
        dialect: "postgres",
        operatorsAliases: Sequelize.Op,
        logging: msg => logger.debug(msg),
      });
    } else {
      logger.info("REUSED DB CONNECTION");
    }
    return dbConnection;
  };
};

let getDBConnection = init();
module.exports = {getDBConnection};
