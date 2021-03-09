const express = require('express')
const router = express.Router()
const Category = require('../../models/admin/category')


// Category  //

router.get('/list', async (req, res) => {
    const books = await Category.GetCategory()
    res.render('admin/category', {
        books,
        fullname:req.session.fullname,
        role:req.session.role,
        getProfile: req.getProfile,

    })

})
 

router.post('/add', async (req, res) => {
    const {category} = req.body
    const checkCategory = await Category.CheckCategory(category)

    if(category === '') {
        req.flash ('error', 'BOOK CATEGORY IS REQUIRED')
        return res.redirect('')

    }

    if(checkCategory.length >= 1) {
        req.flash('error','CATEGORY ALREADY EXIST')
        return res.redirect('')
    }


    const result =  await Category.InsertCategory(category)
    if(result) {
        req.flash('success','SUCCESSFULLY INSERTED CATEGORY')
    } else {
        req.flash('error','ERROR INSERTED CATEGORY')
    }
    res.redirect('/admin/category/list')

})

router.post('/update', async (req, res) => {
    const { edit_category, edit_id} = req.body
    const checkCategory = await Category.CheckCategory(edit_category)


    if(edit_category === '') {
        req.flash ('error', 'BOOK CATEGORY IS REQUIRED')
        return res.redirect('/admin/category/list')

    }

    if(checkCategory.length >= 1) {
        req.flash('error','CATEGORY ALREADY EXIST')
        return res.redirect('/admin/category/list')
    }

    const result = await Category.UpdateCategory(edit_category, edit_id)


    if(result) {
        req.flash('success','SUCCESSFULLY UPDATED CATEGORY')
    } else {
        req.flash('error','ERROR UPDATED CATEGORY')
    }

    res.redirect('/admin/category/list')
})


router.get('/delete', async (req, res) => {
    const id = req.query.id
    const result = await Category.DeleteCategory(id)

    if(result) {
        req.flash('success','SUCCESSFULLY DELETED CATEGORY')
    } else {
        req.flash('error','ERROR DELETED CATEGORY')
    }

    res.redirect('/admin/category/list')
})




module.exports = router