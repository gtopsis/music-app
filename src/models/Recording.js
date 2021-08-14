const Sequelize = require("sequelize");
const dbService = require("../services/dbService");

const Artist = require("./Artist");
const Track = require("./Track");
const Duration = require("./Duration");
const dbConnection = dbService.getDBConnection();

const Recording = dbService.getDBConnection().define("recording", {
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

// dbConnection.sync();
module.exports = Recording;
