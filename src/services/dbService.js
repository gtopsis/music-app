const Sequelize = require("sequelize");
const config = require("../config");

const database = new Sequelize({
  username: config.DB.USERNAME,
  password: config.DB.PASSWORD,
  database: config.DB.DB_NAME,
  dialect: "postgres",
  operatorsAliases: Sequelize.Op,
});

const init = () => {};

module.exports = {
  init,
  database,
};
