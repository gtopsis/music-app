const Sequelize = require("sequelize");
const Duration = require("./Duration");

const Track = Sequelize.define("track", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  position: Sequelize.INTEGER,
});

Track.hasOne(Duration, {as: "duration"});
module.exports = Track;
