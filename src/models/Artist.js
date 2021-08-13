const Sequelize = require("sequelize");

const Artist = Sequelize.define("artist", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  shortName: Sequelize.STRING,
  gender: Sequelize.STRING,
  area: Sequelize.STRING,
});

module.exports = Artist;
