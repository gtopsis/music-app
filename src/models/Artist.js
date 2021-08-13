const Sequelize = require("sequelize");

const Artist = Sequelize.define("artist", {
  name: Sequelize.STRING,
  shortName: Sequelize.STRING,
  gender: Sequelize.STRING,
  area: Sequelize.STRING,
});

module.exports = Artist;
