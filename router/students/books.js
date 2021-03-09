const express = require('express')
const router = express.Router()
const Books = require('../../models/students/books')

router.get('/list', async (req, res) => {
    if(req.session.role === 2) {
        return res.redirect('/admin/books/list')

    }
    const books = await Books.GetBooks()
    const category = await Books.SelectCategory()
   
    res.render('students/books', {
        books,
        category,
        fullname:req.session.fullname,
        role:req.session.role,
        getProfile: req.getProfile,

    })
     
}) 

router.post('/borrow', async (req, res) => {
    const {book_id, category_id, stocks, id} = req.body
    const userId = req.session.userId
    const result = await Books.UpdateBorrow(stocks, id)
    const insert = await Books.InsertBorrowBooks(userId, book_id, category_id, stocks)

    
    if(result) {
        req.flash('success', '')
    } else {
        req.flash('error', 'ERROR BORROW BOOKS')
    }

    if(insert) {

        req.flash('success', 'Successfully send your borrow books to the admin , wait for the approval.')
        
    }

    res.redirect('/students/books/list')
})
 

 
module.exports = router