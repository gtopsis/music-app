const Sequelize = require("sequelize");

const Duration = Sequelize.define("duration", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  hours: Sequelize.INTEGER,
  minutes: Sequelize.INTEGER,
  seconds: Sequelize.INTEGER,
});

module.exports = Duration;
