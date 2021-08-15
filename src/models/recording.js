"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recording extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Artist, Track, Duration}) {
      // define association here
      this.belongsTo(Artist, {
        foreignKey: "artistUUID",
        as: "artist",
      });

      this.hasMany(Track, {
        foreignKey: "recordingUUID",
        as: "tracks",
        onDelete: "cascade",
      });

      this.hasOne(Duration, {
        foreignKey: "recordingUUID",
        as: "duration",
        onDelete: "cascade",
      });
    }
  }
  Recording.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: "Recording must have a title"},
          notEmpty: {msg: "Title must not be empty"},
        },
      },
    },
    {
      sequelize,
      modelName: "Recording",
    }
  );
  return Recording;
};
