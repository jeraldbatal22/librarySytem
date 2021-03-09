const express = require('express')
const router = express.Router()
const Users = require('../../models/admin/users')
const utils = require('../../utilities/util')

const sizeLimit = 1024 * 1024 * 3
const upload = utils.upload(sizeLimit)


router.get('/createUsers', (req, res) => {

    res.render('admin/users',{
        fullname:req.session.fullname,
        role:req.session.role,
        getProfile: req.getProfile,

    })
})


router.post('/addUsers', upload.single('image'), async (req, res) => {
    const {firstname, lastname, username, password, email, role, filename} = req.body
    const checkUsername = await Users.CheckUsername(username)
    const checkEmail = await Users.CheckEmail(username)

    const locationImg = './public/uploads/images/' + filename
 
    if(checkUsername.length >= 1) {
        req.flash('error', 'USERNAME IS ALREADY EXIST')
        return res.redirect('/admin/users/createUsers')

    }

    if(checkEmail.length >= 1) {
        req.flash('error', 'EMAIL IS ALREADY EXIST')
        return res.redirect('/admin/users/createUsers')

    }

    const result = await Users.InsertUsers(firstname, lastname, username, password, email, role, filename)

    if(result){

        await utils.resizeImage(locationImg, 100, 50)

        req.flash('success', 'SUCCESSFULLY INSERTED STUDENTS')
    } else {
        req.flash('error', 'ERROR INSERTED STUDENTS')
    }

    res.redirect('/admin/users/createUsers')
})

router.get('/students/list', async (req, res) => {
    const students = await Users.GetStudents()

    res.render('admin/users/students', {
        students,
        fullname:req.session.fullname,
        role:req.session.role,
        getProfile: req.getProfile,

 
    })
})


router.post('/updateStudents', async (req, res) => {
    const {firstname, lastname, username, password, email, role, id} = req.body
    const result = await Users.UpdateUsers( firstname, lastname, username, password, email, role, id)
    
    if(result){

        req.flash('success', 'SUCCESSFULLY UPDATED STUDENTS')
    } else {
        req.flash('error', 'ERROR UPDATED STUDENTS')
    }


    res.redirect('/admin/users/students/list')

})

router.get('/deleteStudent', async (req, res) => {
    const id = req.query.id
    const result = await Users.DeleteUsers(id)

    if(result){

        req.flash('success', 'SUCCESSFULLY DELETED STUDENT')
    } else {
        req.flash('error', 'ERROR DELETED STUDENT')
    }


    res.redirect('/admin/users/students/list')

})


router.get('/teachers/list', async (req, res) => {
    const teachers = await Users.GetTeachers()
    res.render('admin/users/teachers', {
        teachers,
        fullname:req.session.fullname,
        role:req.session.role,
        getProfile: req.getProfile,


    })
})


router.post('/updateTeachers', async (req, res) => {
    const {firstname, lastname, username, password, email, role, id} = req.body
    const result = await Users.UpdateUsers(firstname, lastname, username, password, email, role, id)
    if(result){

        req.flash('success', 'SUCCESSFULLY UPDATED TEACHER')
    } else {
        req.flash('error', 'ERROR UPDATED TEACHERS')
    }


    res.redirect('/admin/users/teachers/list')

})

router.get('/deleteTeacher', async (req, res) => {
    const id = req.query.id
    const result = await Users.DeleteUsers(id)

    if(result){

        req.flash('success', 'SUCCESSFULLY DELETED TEACHER')
    } else {
        req.flash('error', 'ERROR DELETED TEACHER')
    }


    res.redirect('/admin/users/teachers/list')

})


module.exports = router