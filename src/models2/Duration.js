const Sequelize = require("sequelize");
const dbService = require("../services/dbService");

const dbConnection = dbService.getDBConnection();

const Duration = dbService.getDBConnection().define(
  "duration",
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    hours: {type: Sequelize.INTEGER, validate: {min: 0}},
    minutes: {type: Sequelize.INTEGER, validate: {min: 0, max: 59}},
    seconds: {type: Sequelize.INTEGER, validate: {min: 0, max: 59}, allowNull: false},
  },
  {
    validate: {
      completeDuration() {
        let isIncomplete = false;
        if (this.hours !== null && (this.minutes == null || this.seconds == null)) {
          isIncomplete = true;
        } else if (this.minutes !== null && this.seconds == null) {
          isIncomplete = true;
        } else if (this.seconds !== null && (this.hours == null || this.seconds == null)) {
          isIncomplete = true;
        }

        if (isIncomplete == true) {
          throw new Error("Not valid format of field duration");
        }
      },
    },
  }
);

// dbConnection.sync();
module.exports = Duration;
