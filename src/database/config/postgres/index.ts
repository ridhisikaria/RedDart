require("dotenv").config();

// * NOTE: Do not store credentials directly in this file.
// * Always load them into the environment and use environment variables.

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
};
