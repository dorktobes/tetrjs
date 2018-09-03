const mysql = require('mysql');

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
};

if (process.env.DB_PASSWORD) {
  options.password = process.env.DB_PASSWORD;
}

const connection = mysql.createConnection(options);

module.exports = { connection };
