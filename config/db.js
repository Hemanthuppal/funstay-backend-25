const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost', // Your database host
  user: 'root', // Your database user
  password: '', // Your database password
  database: 'funstay', // Your database name
});

db.promise()
  .connect()
  .then(() => console.log('Connected to MySQL database'))
  .catch((err) => console.error('Database connection error: ', err.message));

module.exports = db;
