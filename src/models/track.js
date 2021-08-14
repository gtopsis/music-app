"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Recording}) {
      // define association here
      this.belongsTo(Recording, {
        foreignKey: "recordingUUID",
        as: "recording",
      });
    }
  }
  Track.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {type: DataTypes.STRING, allowNull: false},
      position: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 0}},
    },
    {
      sequelize,
      modelName: "Track",
    }
  );
  return Track;
};
