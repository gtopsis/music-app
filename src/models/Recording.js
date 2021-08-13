const Sequelize = require("sequelize");
const Artist = require("./Artist");
const Track = require("./Track");

const Recording = Sequelize.define("recording", {
  title: Sequelize.STRING,
  duration: Sequelize.STRING,
});

// Model associations
Recording.belongsTo(Artist, {as: "artist"});
Recording.hasMany(Track, {as: "tracks"});

module.exports = Recording;
