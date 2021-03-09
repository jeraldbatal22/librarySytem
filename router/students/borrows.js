const express = require('express')
const router = express.Router()
const Borrows = require('../../models/students/borrows')

router.get('/list', async (req, res) => {
    const userId = req.session.userId
    
    const borrows = await Borrows.GetBorrowBooks(userId)
    const students = await Borrows.GetStudents()
    const books = await Borrows.GetBooks()
    const category = await Borrows.GetCategory()
    
    res.render('students/borrow_books', {
        borrows,
        students,
        books,
        category,
        fullname:req.session.fullname,
        role:req.session.role,
        getProfile: req.getProfile,
        
    })
})
 
module.exports = router