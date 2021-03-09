const database = require('../../lb/connection')
const {encode} = require('html-entities')

module.exports.GetBooks = async () => {
    const sql = `SELECT a.*, a.id as book_id, b.name as category_name FROM books as a
    INNER JOIN books_category as b ON b.id = a.category_id`
    const result = await database.GetQuery(sql)
    return result
}

module.exports.SelectCategory = async () => {
    const sql = `SELECT * FROM books_category ORDER BY id`
    const result = await database.GetQuery(sql)
    return result
} 


module.exports.UpdateBorrow = async (stocks, id) => {
    const sql = `UPDATE books SET stocks = stocks - ? WHERE id = ?`
    const result = await database.GetQuery(sql, [stocks, id])
    return result
}



module.exports.InsertBorrowBooks = async (userId, book_id, category_id, stocks) => {
    const sql = `INSERT INTO books_borrow (user_id, book_id, category_id, quantity, book_status) VALUES (?, ?, ?, ?, ?)`
    const status = 0
    const result = await database.GetQuery(sql, [userId, book_id, category_id, stocks, status])
    return result
}
