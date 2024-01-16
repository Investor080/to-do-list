require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const connectdb  = require('./connectDb/connect')
const router = require('./router/handler')
const session = require('express-session')

port = process.env.port || 4000


//Middlewares
const app = express()
app.use(express)
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(session({
    secret: 'hex',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 24 * 64000}
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(`api/v1`, router)



app.listen(port, ()=>{
    connectdb();
    console.log(`Server started on ${port}`);
})
