const Sequelize = require("sequelize");
const dbService = require("../services/dbService");
const Artist = require("./Artist");

const dbConnection = dbService.getDBConnection();

const Area = dbConnection.define("area", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  address: {type: Sequelize.STRING},
  zipCode: {type: Sequelize.STRING},
  city: {type: Sequelize.STRING},
  country: {type: Sequelize.STRING},
});

// Area.belongsTo(Artist);

// dbConnection.sync();
module.exports = Area;
