const database = require('../lb/connection')

module.exports.GetProfile = async (id) => {
    const sql = `SELECT *, CONCAT(firstname,' ',lastname) as fullname FROM users WHERE id = ?`
    const result = await database.GetQuery(sql, [id])
    return result
}

module.exports.UpdateProfile = async (firstname, lastname, username, password, email, role, id) => {
    const sql = `UPDATE users SET firstname = ?, lastname = ?, username = ?, password = ?, email = ?, role = ? WHERE id = ?`
    const result = await database.GetQuery(sql, [firstname, lastname, username, password, email, role, id])
    return result
}