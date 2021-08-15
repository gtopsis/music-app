// test-setup.js
const appConfig = require("../src/config");
const logger = require("../src/logger");
const models = require("../src/models");

async function dropAllCollections() {}

let dbConnection;
module.exports = {
  setUpTestEnv(app) {
    // Connect to Database
    beforeAll(() => {
      process.env.NODE_ENV = "test";

      return (
        models.sequelize
          // .sync({force: true})
          .sync()
          .then(data => {
            dbConnection = data;
          })
      );
    });

    // // Cleans up database between each test
    afterEach(async () => {
      //   await removeAllCollections();
    });

    // Disconnect Database
    afterAll(async () => {
      await dbConnection.close();
      // await dropAllCollections();
    });
  },
};
