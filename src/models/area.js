"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Artist}) {
      // define association here
      this.belongsTo(Artist, {
        foreignKey: "artistUUID",
        as: "artist",
      });
    }

    toJSON() {
      return {...this.get(), id: undefined, artistUUID: undefined};
    }
  }
  Area.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      address: {type: DataTypes.STRING},
      zipCode: {type: DataTypes.STRING},
      city: {type: DataTypes.STRING},
      country: {type: DataTypes.STRING},
    },
    {
      sequelize,
      modelName: "Area",
    }
  );
  return Area;
};
