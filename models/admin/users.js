const database = require('../../lb/connection')

module.exports.GetStudents = async () => {
    const sql = `SELECT * FROM users WHERE role = ? ORDER BY id`
    const role = 1
    const result = await database.GetQuery(sql, [role])
    return result
}

module.exports.GetTeachers = async () => {
    const sql = `SELECT * FROM users WHERE role = ? ORDER BY id`
    const role = 2
    const result = await database.GetQuery(sql, [role])
    return result 
}



module.exports.InsertUsers = async (firstname, lastname, username, password, email, role, filename) => {
    const sql = `INSERT INTO users (firstname, lastname, username, password, email, role, images, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    const status = 3
    const result = await database.GetQuery(sql,[firstname, lastname, username, password, email, role, filename, status])
    return result
}

module.exports.CheckUsername = async (username) => {
    const sql = `SELECT * FROM users WHERE username = ?`
    const result = await database.GetQuery(sql, [username])
    return result
}


module.exports.CheckEmail = async (email) => {
    const sql = `SELECT * FROM users WHERE email = ?`
    const result = await database.GetQuery(sql, [email])
    return result
}

module.exports.UpdateUsers = async ( firstname, lastname, username, password, email, role, id) => {
    const sql = `UPDATE users SET firstname = ?, lastname = ?, username = ?, password = ?, email = ?  WHERE id = ?`
    const result = await database.GetQuery(sql, [ firstname, lastname, username, password, email, role, id])
    return result
}

module.exports.DeleteUsers = async (id) => {
    const sql = `DELETE FROM users WHERE id = ?`
    const result = await database.GetQuery(sql, [id])
    return result
}