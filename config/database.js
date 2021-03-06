const mysql = require("mysql2");

const {
  AWAKS_MYSQL_HOST,
  AWAKS_MYSQL_USER,
  AWAKS_MYSQL_PASSWORD,
  AWAKS_MYSQL_DATABASE,
  AWAKS_MYSQL_PORT
} = process.env;

/**
 * Create pool connection with the MySQL database
 * Using environment variables to dynamically set credentials
 */

const pool = mysql.createPool({
  host: AWAKS_MYSQL_HOST,
  user: AWAKS_MYSQL_USER,
  port: AWAKS_MYSQL_PORT,
  password: AWAKS_MYSQL_PASSWORD,
  database: AWAKS_MYSQL_DATABASE,
  connectionLimit: 5
});

/**
 * Add queryAsync method in pool.
 * Just create a Promise when calling a MySQL query
 */

pool.queryAsync = (...args) =>
  new Promise((resolve, reject) =>
    pool.query(...args, function(err, result) {
      if (err) reject(err);

      resolve(result);
    })
  );

module.exports = pool;
