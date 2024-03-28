require("dotenv").config();

const config = {
  port: process.env.PORT,
  key: process.env.JWTSECRET,
  mongoUrl: process.env.MONGO_URI,
  dbName: process.env.DATABASE,
};

module.exports = config;
