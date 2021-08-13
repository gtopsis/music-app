const dbConfig = {
  DB: {
    USERNAME: process.env.DB_USERNAME || "fairlo",
    PASSWORD: process.env.DB_PASSWORD || "fairlo",
  },
};

if (process.env.NODE_ENV === "development") {
  dbConfig.DB_NAME = process.env.DB_NAME || "musicapp";
} else if (process.env.NODE_ENV === "test") {
  dbConfig.DB_NAME = process.env.DB_NAME_TEST || "musicapp-test";
} else if (process.env.NODE_ENV === "production") {
  dbConfig.DB_NAME = process.env.DB_NAME_PROD || "musicapp";
}

module.exports = dbConfig;
