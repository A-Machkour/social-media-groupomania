const mysql = require('mysql');
require('dotenv').config();

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'groupomania'
});

module.exports = database;