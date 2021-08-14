"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Recording, Area}) {
      // define association
      this.hasOne(Area, {
        foreignKey: "artistUUID",
        as: "area",
        onDelete: "cascade",
      });

      this.hasMany(Recording, {
        foreignKey: "artistUUID",
        as: "recordings",
        onDelete: "cascade",
      });
    }

    toJSON() {
      return {...this.get(), id: undefined};
    }
  }
  Artist.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {type: DataTypes.STRING, allowNull: false},
      shortName: {type: DataTypes.STRING, allowNull: false, unique: true},
      gender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Artist",
    }
  );
  return Artist;
};
