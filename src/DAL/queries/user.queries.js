exports.createUser = `INSERT INTO users (email,password) VALUES (?,?);`

exports.findUserByEmail = `SELECT * FROM users WHERE email = ?`