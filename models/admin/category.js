const database = require('../../lb/connection')


module.exports.GetCategory = async () => {
    const sql = `SELECT * FROM books_category ORDER BY id`
    const result = await database.GetQuery(sql)
    return result
}

module.exports.InsertCategory = async (category) => {
    const sql = `INSERT INTO books_category (name, status) VALUES (?, ?)`
    const status = 1
    const result = await database.GetQuery(sql, [category,status])
    return result
}

module.exports.CheckCategory = async (category) => {
    const sql = `SELECT * FROM books_category WHERE name = ?`
    const result = await database.GetQuery(sql, category) 
    return result
}

module.exports.UpdateCategory = async (edit_category, edit_id) => {
    const sql = `UPDATE books_category SET name = ? WHERE id = ? `
    const result = await database.GetQuery(sql, [edit_category, edit_id])
    return result
}

module.exports.DeleteCategory = async (id) => {
    const sql = `DELETE FROM books_category WHERE id = ?`
    const result = await database.GetQuery(sql, [id])
    return result
}