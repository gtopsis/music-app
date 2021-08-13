const Sequelize = require("sequelize");

const Area = Sequelize.define("area", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  address: Sequelize.STRING,
  zipCode: Sequelize.STRING,
  city: Sequelize.STRING,
  country: Sequelize.STRING,
});

module.exports = Area;
