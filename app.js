const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan')

const flash = require('express-flash')
const session = require('express-session');
const app = express();

const Profile = require('./models/profile')

const authRouter = require('./router/auth')
const profileRouter = require('./router/profile')

const categoryAdminRouter = require('./router/admin/category')
const booksAdminRouter = require('./router/admin/books')
const usersRouter = require('./router/admin/users')
const borrowsAdminRouter = require('./router/admin/borrows')

const borrowsStudentsRouter = require('./router/students/borrows')
const booksStudentsRouter = require('./router/students/books');


app.use(flash());
app.use(session({
    cookie: {maxAge:3600000},
    saveUninitialized:true,
    resave:true,
    secret:'secret'
}));

// view engine setup 

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

function checkLogin (req, res, next) {
    if(typeof req.session.userId === 'undefined') {
        return res.redirect('/login')
    }

    next()
}

async function getProfile (req, res, next) {
    const id = req.session.userId
    const getProfile = await Profile.GetProfile(id)
    
    req.getProfile = getProfile[0]
    next()
}


app.use('/login', authRouter)
app.use('/usersProfile', checkLogin, getProfile, profileRouter)

app.use('/admin/category', checkLogin, getProfile, categoryAdminRouter)
app.use('/admin/books', checkLogin, getProfile, booksAdminRouter)
app.use('/admin/users', checkLogin, getProfile,  usersRouter)
app.use('/admin/borrow_books', checkLogin, getProfile, borrowsAdminRouter)


app.use('/students/books' , checkLogin, getProfile, booksStudentsRouter)
app.use('/students/borrow_books' , checkLogin, getProfile, borrowsStudentsRouter)


// catch 404 and forward to error handler

app.use((req,res,next) => {
    next(createError(404));
});

//error handler
app.use((err,req,res,next) => {
    //set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
 
    // render the error page
    res.status(err.status || 500);
    res.render('error'); 
})


app.listen (2000, () => {
    console.log(`server started at http://localhost:${2000}`);
})