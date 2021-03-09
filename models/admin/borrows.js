const database = require('../../lb/connection')


module.exports.GetBorrows = async () => {
    const sql = `SELECT a.*, b.firstname , b.lastname , c.name, d.name as category_name FROM books_borrow as a 
    INNER JOIN users as b ON a.user_id = b.id
    INNER JOIN books as c ON a.book_id = c.id
    INNER JOIN books_category as d ON a.category_id = d.id
    ORDER BY id`
    const result = await database.GetQuery(sql)
    return result
} 

module.exports.GetStudents = async () => {
    const sql = `SELECT * FROM users ORDER BY id`
    const result = await database.GetQuery(sql)
    return result
}

module.exports.GetBooks = async () => {
    const sql = `SELECT * FROM books ORDER BY id`
    const result = await database.GetQuery(sql)
    return result
}

module.exports.GetStocks = async () => {
    const sql = `SELECT * FROM books WHERE stocks = ?`
    const result = await database.GetQuery(sql)
    return result
}

module.exports.GetCategory = async () => {
    const sql = `SELECT * FROM books_category ORDER BY id`
    const result = await database.GetQuery(sql)
    return result
}

module.exports.InsertBorrows = async (user_id, book_id, category_id) => {
    const sql = `INSERT INTO books_borrow (user_id, book_id, category_id, book_status) VALUES (?, ?, ?, ?)`
    const book_status = 1
    const result = await database.GetQuery(sql,[user_id, book_id, category_id, book_status])
    return result
}

module.exports.ApprovedBorrows = async (id) => {
    const sql = `UPDATE books_borrow SET book_status = ? WHERE id = ?`
    const book_status = 3
    const result = await database.GetQuery(sql,[book_status,id])
    return result
}

module.exports.RevokedBorrows = async (id) => {
    const sql = `UPDATE books_borrow SET book_status = ? WHERE id = ?`
    const book_status = 4
    const result = await database.GetQuery(sql,[book_status,id])
    return result
}




