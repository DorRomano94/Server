const mysql = require('mysql2');



// initialize
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10
}).promise()


const execute = async (sql) => {
    const connection = await pool.getConnection();
    try {
        const result = await connection.query(sql, (err, result) => {
            if (err) reject(err.message);
            else {
                resolve(result);
            };
        })
        connection.release()
        return result
    } catch (error) {
        connection.release()
        throw error
    }
}

const executeWithParameters = async (sql, parameters) => {
    const connection = await pool.getConnection();
    try {
        const result = await connection.query(sql, parameters, (err, result) => {
            if (err) reject(err.message);
            else {
                resolve(result);
            };
        })
        connection.release()
        return result
    } catch (error) {
        connection.release()
        throw error
    }
}

module.exports = { execute, executeWithParameters };
