let dbConfig = {
  DB: {
    USERNAME: process.env.DB_USERNAME || "fairlo",
    PASSWORD: process.env.DB_PASSWORD || "fairlo",
    HOST: process.env.DB_HOST || "localhost",
    PORT: process.env.DB_PORT || 5432,
  },
};

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV == undefined) {
  dbConfig.DB.DB_NAME = process.env.DB_NAME || "musicapp";
} else if (process.env.NODE_ENV === "test") {
  dbConfig.DB.DB_NAME = process.env.DB_NAME_TEST || "musicapp-test";
} else if (process.env.NODE_ENV === "production") {
  dbConfig.DB.DB_NAME = process.env.DB_NAME_PROD || "musicapp";
}

module.exports = dbConfig;
