const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host:"127.0.0.1",
  port:"3306", 
  user:"root",
  password:"0000",
  database: "miniplan",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;