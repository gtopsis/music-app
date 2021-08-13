const Sequelize = require("sequelize");
const config = require("../config");
const logger = require("../logger");

const init = () => {
  const connectionToDatabase = new Sequelize({
    username: config.DB.USERNAME,
    password: config.DB.PASSWORD,
    database: config.DB.DB_NAME,
    dialect: "postgres",
    operatorsAliases: Sequelize.Op,
    logging: msg => logger.debug(msg),
  });
  return connectionToDatabase;
};

module.exports = {
  init,
};
