require("dotenv").config();
// * NOTE: Do not store credentials directly in this file.
// * Always load them into the environment and use environment variables.
const config: any = {
  "development": {
    dbConnectionUrl: process.env.MONGO_DB_URL
  },
  "test": {
    dbConnectionUrl: process.env.MONGO_DB_URL
  },
  "staging": {
    dbConnectionUrl: process.env.MONGO_DB_URL
  },
  "production": {
    dbConnectionUrl: process.env.MONGO_DB_URL
  },
  "preprod": {
    dbConnectionUrl: process.env.MONGO_DB_URL
  }
};
export default config;
