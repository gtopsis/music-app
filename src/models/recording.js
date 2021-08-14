"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recording extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recording.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {type: DataTypes.STRING, allowNull: false},
    },
    {
      sequelize,
      modelName: "Recording",
    }
  );
  return Recording;
};
