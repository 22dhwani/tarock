const mysql = require('mysql');

const con = mysql.createConnection({
  host: "34.173.211.162",
  user: "testuser",
  password: "password",
  database: "tarock"
});

module.exports = con;
