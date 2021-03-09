const database = require('./../../lb/connection')


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

module.exports.GetCategory = async () => {
    const sql = `SELECT * FROM books_category ORDER BY id`
    const result = await database.GetQuery(sql)
    return result
}

module.exports.GetBorrowBooks = async (userId) => {
    const sql = `SELECT a.*, b.firstname , b.lastname , c.name, d.name as category_name FROM books_borrow as a 
        INNER JOIN users as b ON a.user_id = b.id
        INNER JOIN books as c ON a.book_id = c.id
        INNER JOIN books_category as d ON a.category_id = d.id
		WHERE user_id = ?`
    const result = await database.GetQuery(sql, [userId])
    return result

} 
