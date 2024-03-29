"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Duration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Recording, Track}) {
      // define association here
      this.belongsTo(Recording, {
        foreignKey: "recordingUUID",
        as: "recording",
      });

      this.belongsTo(Track, {
        foreignKey: "trackUUID",
        as: "track",
      });
    }
  }
  Duration.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      hours: {type: DataTypes.INTEGER, validate: {min: 0}},
      minutes: {type: DataTypes.INTEGER, validate: {min: 0, max: 59}},
      seconds: {type: DataTypes.INTEGER, validate: {min: 0, max: 59}, allowNull: false},
    },
    {
      sequelize,
      modelName: "Duration",
      // validate: {
      //   completeDuration() {
      //     let isIncomplete = false;
      //     if (this.hours !== null && (this.minutes == null || this.seconds == null)) {
      //       isIncomplete = true;
      //     } else if (this.minutes !== null && this.seconds == null) {
      //       isIncomplete = true;
      //     } else if (this.seconds !== null && (this.hours == null || this.seconds == null)) {
      //       isIncomplete = true;
      //     }

      //     if (isIncomplete == true) {
      //       throw new Error("Not valid format of field duration");
      //     }
      //   },
      // },
    }
  );
  return Duration;
};
