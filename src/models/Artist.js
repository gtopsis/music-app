const Sequelize = require("sequelize");
const dbService = require("../services/dbService");
const Area = require("./Area");

const dbConnection = dbService.getDBConnection();
const Artist = dbConnection.define("artist", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {type: Sequelize.STRING, allowNull: false},
  shortName: {type: Sequelize.STRING, allowNull: false, unique: true},
  gender: Sequelize.STRING,
});

Artist.hasOne(Area, {as: "area"});
dbConnection.sync();

module.exports = Artist;
