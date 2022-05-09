const mysql = require("mysql");
require("dotenv").config();

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "social_groupomania",
});

module.exports = database;
