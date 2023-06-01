var mysql = require('mysql2');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'for_lpvs',
    password: 'password',
    database: 'lpvs_test'
});
db.connect();

module.exports = db;