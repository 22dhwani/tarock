const mysql = require('mysql');

const con = mysql.createPool({
  host: "34.173.211.162",
  user: process.env['DB_USER'],
  password: process.env['DB_PWD'],
  database: "tarock"
});

module.exports = con;
