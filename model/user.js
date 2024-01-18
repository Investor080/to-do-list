const mongoose = require("mongoose")
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const {Schema, model} = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 5
    },
    resetPasswordToken:{
        type: String
    },
    resetPasswordExpires:{
        type: String
    },
},  
     { timestamps: true}

);

userSchema.plugin(passportLocalMongoose)
const User = model("user", userSchema)
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
module.exports = User;