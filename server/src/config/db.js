import mysql from "mysql2/promise";

const con = mysql.createPool({
  host: process.env["DB_HOST"],
  user: process.env["DB_USER"],
  password: process.env["DB_PWD"],
  database: "tarock-version2-test",
});

export default con;
