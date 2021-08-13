const Sequelize = require("sequelize");
const dbService = require("../services/dbService");

const Duration = require("./Duration");

const Track = dbService.getDBConnection().define("track", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {type: Sequelize.STRING, allowNull: false},
  position: {type: Sequelize.INTEGER, allowNull: false, validate: {min: 0}},
});

Track.hasOne(Duration, {as: "duration"});
module.exports = Track;
