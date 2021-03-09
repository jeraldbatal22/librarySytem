const express = require('express')
const router = express.Router()
const Books = require('../../models/admin/books')


router.get('/list', async (req, res) => {   
    if(req.session.role === 1) {
        return res.redirect('/students/books/list')

    }
    const books = await Books.GetBooks()
    const category = await Books.SelectCategory()
    res.render('admin/books', {
        books,
        category,
        fullname:req.session.fullname,
        role:req.session.role,
        getProfile: req.getProfile,
    })
      
})
  
router.post('/add', async (req, res) => {
    const {name, category_name, stocks} = req.body
    const checkName = await Books.CheckBooks(name)

    if(checkName.length >= 1) {
        req.flash('error', 'BOOK NAME IS ALREADY EXIST')
        return res.redirect('/admin/books/list')
    }

    const result = await Books.InsertBooks(name, category_name, stocks)

    if(result) {
        req.flash('success', 'SUCCESSFULLY INSERTED BOOKS')
    } else {
        req.flash('error', 'ERROR INSERTED BOOKS')
    }

    res.redirect('/admin/books/list')
}) 

router.get('/delete', async (req, res) => {
    const id = req.query.id
    const result = await Books.DeleteBooks(id)
    if(result) {
        req.flash('success', 'SUCCESSFULLY DELETED BOOKS')
    } else {
        req.flash('error', 'ERROR DELETED BOOKS')
    }

    res.redirect('/admin/books/list')
}) 

router.post('/update', async (req, res) => {
    const {edit_name, edit_category, edit_stocks, id} = req.body
    const result = await Books.UpdateBooks(edit_name, edit_category, edit_stocks, id)
    if(result) {
        req.flash('success', 'SUCCESSFULLY UPDATED BOOKS')
    } else {
        req.flash('error', 'ERROR UPDATED BOOKS')
    }

    res.redirect('/admin/books/list')

})




module.exports = router