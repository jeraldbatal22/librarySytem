const database = require('../././lb/connection')



module.exports.CheckUsername = async (username) => {
    const sql = `SELECT * FROM users WHERE username = ?`
    const result = await database.GetQuery(sql,[username])
    return result
}