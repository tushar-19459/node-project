const express = require('express');
const parser = require('cookie-parser');
const app = express()
const path = require('path');

const indexRouter = require('./routes/index')
const AdminsRouter = require('./routes/adminsRouter')
const productsRouter = require('./routes/productsRouter')
const usersRouter = require('./routes/usersRouter')

app.use(express.json())
app.use(parser())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')


const db = require('./config/mongo-connection')
const flash = require('connect-flash');
const expressSession = require('express-session');

require('dotenv').config()

app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET
    })
)
app.use(flash())


app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/admins', AdminsRouter)
app.use('/products', productsRouter)


app.listen(3000)