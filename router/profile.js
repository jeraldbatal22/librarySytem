const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')

router.get('/myProfile', async (req, res) => {
    
    res.render('usersProfile', {
        role: req.session.role,
        fullname: req.session.fullname,
        getProfile: req.getProfile,
    })
})

router.post('/update' , async (req, res) => {
    const {firstname, lastname, username, password, email, role, id} =req.body
    const result = await Profile.UpdateProfile(firstname, lastname, username, password, email, role, id)

    if(result) {
        req.flash(`success`, ` SUCCESSFULLY UPDATED PROFILE`)
    } else {
        req.flash('error', 'ERROR UPDATED PROFILE')
    }

    res.redirect('/usersProfile/myProfile')
})


module.exports = router