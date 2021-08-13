// test-setup.js
const appConfig = require("../src/config");
const request = require("supertest");
const logger = require("../src/logger");
const dbService = require("../src/services/dbService");

async function dropAllCollections() {}

async function DBConnect() {
  dbService.init();

  // if (USERNAME) {
  //   if (USER_PWD) {
  //     USER_CREDENTIALS = `${USERNAME}:${USER_PWD}`;
  //   } else {
  //     USER_CREDENTIALS = `${USERNAME}`;
  //   }
  //   USER_CREDENTIALS_URI_PART = `${USER_CREDENTIALS}@`;
  // }
}

module.exports = {
  setUpTestEnv(app) {
    // Connect to Mongoose
    beforeAll(async () => {
      process.env.NODE_ENV = "test";

      try {
        await DBConnect();
      } catch (error) {
        logger.error(error);
      }
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
