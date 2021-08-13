const Sequelize = require("sequelize");

const Area = Sequelize.define("area", {
  address: Sequelize.STRING,
  zipCode: Sequelize.STRING,
  city: Sequelize.STRING,
  country: Sequelize.STRING,
});

module.exports = Area;
