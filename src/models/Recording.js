const Sequelize = require("sequelize");
const Artist = require("./Artist");
const Track = require("./Track");
const Duration = require("./Duration");

const Recording = Sequelize.define("recording", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {type: Sequelize.STRING, allowNull: false},
});

// Model associations
Recording.belongsTo(Artist, {as: "artist"});
Recording.hasMany(Track, {as: "tracks"});
Recording.hasOne(Duration, {as: "duration"});

module.exports = Recording;
