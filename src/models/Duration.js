const Sequelize = require("sequelize");

const Duration = Sequelize.define("duration", {
  hours: Sequelize.INTEGER,
  minutes: Sequelize.INTEGER,
  seconds: Sequelize.INTEGER,
});

module.exports = Duration;
