const Sequelize = require("sequelize");

const Recording = Sequelize.define("recording", {
  title: Sequelize.STRING,
  artist: Sequelize.STRING,
  duration: Sequelize.STRING,
  tracks: Sequelize.STRING,
});

module.exports = Recording;
