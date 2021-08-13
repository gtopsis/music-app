const Sequelize = require("sequelize");
const dbService = require("../services/dbService");

const Area = dbService.getDBConnection().define("area", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  address: Sequelize.STRING,
  zipCode: Sequelize.STRING,
  city: Sequelize.STRING,
  country: Sequelize.STRING,
});

module.exports = Area;
