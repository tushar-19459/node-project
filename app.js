const express = require('express');
const path = require('path');
const db = require('./config/mongo-connection')
const app = express()
const AdminsRouter = require('./routes/adminsRouter')
const productsRouter = require('./routes/productsRouter')
const usersRouter = require('./routes/usersRouter')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client/dist')))
app.set('view engine', 'ejs')

app.use('/users', usersRouter)
app.use('/admins', AdminsRouter)
app.use('/products', productsRouter)

app.listen(3000)