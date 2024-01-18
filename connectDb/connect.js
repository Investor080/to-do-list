require('dotenv').config();
const mongoose = require('mongoose')

const password = process.env.pass

connectionString = process.env.Connection_String


const connectdb = async()=>{
    await mongoose.connect(connectionString)
    return console.log ("DB connected")
}


module.exports = connectdb
