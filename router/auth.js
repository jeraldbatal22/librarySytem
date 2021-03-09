const express = require('express')
const router = express.Router()
const Auth = require('../././models/auth')

router.get('/', async (req, res) => {
    if (typeof req.session.userId !== 'undefined') {
        return res.redirect('/books/showBooks')
    }
    res.render('login/showLogin', {
    }) 
})
 
router.post('/', async (req, res) => {
    const {login_username, login_password} = req.body
    const checkUsername = await Auth.CheckUsername(login_username, login_password)
    if(checkUsername.length >= 1) {

        if(checkUsername[0].password === login_password) {
            req.session.userId = checkUsername[0].id 
            req.session.role = checkUsername[0].role 
            req.session.fullname = ` Welcome ${checkUsername[0].firstname}  ${checkUsername[0].lastname}`
            if(checkUsername[0].role === 1){
                res.redirect('/students/books/list') 
            } else {
                res.redirect('/admin/books/list') 
            }
        }  
        else {
            req.flash('error', 'ERROR PASSWORD')
            return res.redirect('/login')
        }
    } else {
        req.flash('error', 'Error Login')
        return res.redirect('/login')
    }

})


router.get('/logout', async (req, res) => {
    delete req.session.userId
    
    res.redirect('/login')
})

module.exports = router