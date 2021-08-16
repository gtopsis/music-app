module.exports = {
  development: {
    username: process.env.DB_USERNAME || "fairlo",
    password: process.env.DB_PASSWORD || "fairlo",
    database: process.env.DB_NAME || "musicapp_development",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: process.env.DB_TEST_USERNAME || "fairlo",
    password: process.env.DB_TEST_USERNAME || "fairlo",
    database: "musicapp_test",
    host: process.env.DB_TEST_HOST || "127.0.0.1",
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: process.env.DB_PROD_USERNAME || "fairlo",
    password: process.env.DB_PROD_USERNAME || "fairlo",
    database: "musicapp_production",
    host: process.env.DB_PROD_HOST || "127.0.0.1",
    dialect: "postgres",
    logging: true,
  },
};
