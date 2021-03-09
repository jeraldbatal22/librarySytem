const database = require('../../lb/connection')
const {encode} = require('html-entities')


module.exports.GetBooks = async () => {
    const sql = `SELECT a.*, a.id as book_id, a.name, b.name as category_name FROM books as a
    INNER JOIN books_category as b ON b.id = a.category_id`
    const result = await database.GetQuery(sql)
    return result
}

module.exports.SelectCategory = async () => {
    const sql = `SELECT * FROM books_category ORDER BY id`
    const result = await database.GetQuery(sql)
    return result
}

module.exports.CheckBooks = async (category) => {
    const sql = `SELECT * FROM books WHERE name = ?`
    const result = await database.GetQuery(sql, category) 
    return result
}

module.exports.InsertBooks = async (name, category_name, stocks) => {
    const sql = `INSERT INTO books (name, category_id, stocks, status) VALUES (?, ?, ?, ?)`
    const status = 1
    const result = await database.GetQuery(sql, [encode(name), category_name, stocks, status])
    return result 
}

module.exports.DeleteBooks = async (id) => {
    const sql = `DELETE FROM books WHERE id = ?`
    const result = await database.GetQuery(sql, [id])
    return result
}

module.exports.UpdateBooks = async (edit_name, edit_category, edit_stocks, id) => {
    const sql = `UPDATE books SET name = ?, category_id = ?, stocks =? WHERE id = ?`
    const result = await database.GetQuery(sql, [edit_name, edit_category, edit_stocks, id])
    return result
} 

