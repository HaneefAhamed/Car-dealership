'user strict';

var mysql = require('mysql');

//local mysql db connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'ecommerce'
});

connection.connect((err) => {
  if (err) {
    throw (err);
  }
  console.log('connected to db');
});

module.exports = connection;