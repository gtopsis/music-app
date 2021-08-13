const Sequelize = require("sequelize");

const Track = Sequelize.define("track", {
  title: Sequelize.STRING,
  position: Sequelize.INTEGER,
  duration: Sequelize.STRING,
});

module.exports = Track;
