const express = require('express')
const router = express.Router()
const Borrows = require('../../models/admin/borrows')

router.get('/list', async (req, res) => {
    const borrows = await Borrows.GetBorrows()
    const students = await Borrows.GetStudents()
    const books = await Borrows.GetBooks()
    const category = await Borrows.GetCategory()
    
    res.render('admin/borrow_books', {
        borrows,
        students,
        books,
        category,
        fullname:req.session.fullname,
        role:req.session.role,
        getProfile: req.getProfile,


    })
})


router.get('/approve', async (req, res) => {
    const id = req.query.id
    const result = await Borrows.ApprovedBorrows(id)

    if(result) {
        req.flash('success', 'SUCCESSFULLY APPROVED BORROWERS')
    } else {
        req.flash('error', 'ERROR APPROVED BORROWS')
    }

    res.redirect('/admin/borrow_books/list')
})


router.get('/notApprove', async (req, res) => {
    const id = req.query.id
    const result = await Borrows.RevokedBorrows(id)

    if(result) {
        req.flash('error', 'NOT APPROVED BORROWERS')
    } else {
        req.flash('error', 'ERROR BORROWS')
    }

    res.redirect('/admin/borrow_books/list')
})






module.exports = router
