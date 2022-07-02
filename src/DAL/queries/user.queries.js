exports.createUser = `INSERT INTO users (email,password) VALUES (?,?)`
exports.updateUserById = (data) => {
    let buildQuery = `
    UPDATE users
    SET  
    `
    if (data.email) {
        buildQuery = buildQuery.concat(`email = ?`)
    }
    if (data.password) {
        if (data.email) {
            buildQuery = buildQuery.concat(` , password = ? `)
        } else {
            buildQuery = buildQuery.concat(`password = ? `)
        }
    }
    buildQuery = buildQuery.concat(`\n WHERE id = ?`)
    return buildQuery
}
exports.findUserByEmail = `SELECT * FROM users WHERE email = ?`
exports.findUserById = `SELECT * FROM users WHERE id  = ?`
exports.findAll = `SELECT * FROM users`
exports.deleteUserById = `DELETE FROM users WHERE id = ?`

