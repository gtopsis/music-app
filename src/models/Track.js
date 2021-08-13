const Sequelize = require("sequelize");

const Track = Sequelize.define("track", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  position: Sequelize.INTEGER,
  duration: Sequelize.STRING,
});

module.exports = Track;
