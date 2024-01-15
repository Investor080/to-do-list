const mongoose = require("mongoose")
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
    }
});


const userModel = model("user", userSchema)

module.exports = userModel;