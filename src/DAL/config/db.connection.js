const mysql = require('mysql2');

const mysqlConnection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10
});

mysqlConnection.getConnection((err) => {
    if (!err) {
        console.log('Connected to Database Successfully');
    }
    else {
        // logger.error('Database Connection Failed!' + JSON.stringify(err, undefined, 2))
        console.log('Database Connection Failed!' + JSON.stringify(err, undefined, 2));
    }
});

function execute(sql) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, (err, result) => {
            if (err) reject(err.message);
            else {
                resolve(result);
            }
        })
    });
}

function executeWithParameters(sql, parameters) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, parameters, (err, result) => {
            if (err) reject(err.message);
            else {
                resolve(result);
            };
        })
    })
}

module.exports = { execute, executeWithParameters };
