// test-setup.js
const appConfig = require("../src/config");
const logger = require("../src/logger");
const dbService = require("../src/services/dbService");

async function dropAllCollections() {}

module.exports = {
  setUpTestEnv(app) {
    // Connect to Mongoose
    beforeAll(async () => {
      process.env.NODE_ENV = "test";

      dbService.getDBConnection();
    });

    // // Cleans up database between each test
    afterEach(async () => {
      //   await removeAllCollections();
    });

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections();
    });
  },
};
