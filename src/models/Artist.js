const Sequelize = require("sequelize");
const Area = require("./Area");

const Artist = Sequelize.define("artist", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  shortName: {type: Sequelize.STRING, unique: true},
  gender: Sequelize.STRING,
});

Artist.hasOne(Area, {as: "area"});

module.exports = Artist;
