const mysql = require('mysql');

const con = mysql.createConnection({
  host: "34.173.211.162",
  user: "zane",
  password: "wz86135573",
  database: "tarock"
});

module.exports = con;
