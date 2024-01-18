const User = require("../model/user");
const bcrypt = require ('bcrypt');
const jwt = require ("jsonwebtoken");
const passport = require("passport");
const crypto = require ("crypto");
const nodemailer = require ("nodemailer");
require('dotenv').config();

const SignUp = async(req, res)=>{
    try {
        const {username, email, password} = req.body
        if(!username){
            return res.json({error:"Username is required"})
        }
        if(!email){
            return res.json({error:"Email is required"})
        }
        if(!password){
            return res.json({error:"Password is required"})
        }
        if(!username || !email || !password){
            return res.status(400).json({error:"All fields are required"})
        }
        const existingUser = await User.findOne ({username});
        if(existingUser){
            return res.json({error:"Username is aleady taken "})
        }
        // Generate password
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(req.body.password, salt)

        // Create new user
        const newUser = new User({
            username:username,
            email:email,
            password:hashpassword
        })
        const user = await newUser.save();
        res.status(200).json({message:"Account Created Successfully"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
};


const Login = async(req, res)=>{
    try {
        const {username, password} = req.body
        if(!username){
           return res.json({error:"Username is required"})
        }
        if(!password){
            returnres.json({error:"Password is required"})
        }
        const existingUser = await User.findOne({ username })
        if(!existingUser){
            return res.status(404).json({error:"User Not Found"})
        }
        const passwordMatch = await bcrypt.compare(req.body.password, existingUser)
        if(!passwordMatch){
            return res.status(403).json({error:"Incorrect credentials"})
        }
        const user = new User({
            username,
            password
        })
        
        req.login(user, function(err){
            if(err){
                return res.json(err)
            }
            passport.authenticate("local")(req, res, function(){
                return res.status(200).json({message:" You have logged in successfully "})
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
};


const forgotPassword = async (req, res)=>{
    try {
        const {email} = req.body
        const user = await User.findOne({email});
        if(user){
            return res.status(404).json({message: "User not found"});
        }
        // Generate a reset token
        const restToken = crypto.randomBytes(20).toString('hex');
        
        // Save the token and expiration time in the user's document
        user.resetPasswordToken = restToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        const transport = await nodemailer.createTransport({
            service: "Gmail",
            auth:{
                user: process.env.my_email,
                password: process.env.my_password,
            },
        });

        const mailOptions = {
            from: process.env.my_email, // Replace with your email
            to: email,
            subject: "Password Reset",
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process:\n` +
                `http://localhost:4000/reset-password/${resetToken}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transport.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
};


const changePassword = async (req, res)=>{
    try {
        const {resetToken, newPassword} = req.body;
        const user = await User.findOne({ resetPasswordToken: resetToken, resetPasswordExpires: { $gt: Date.now()}});
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }


        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return res.status(200).json({ message: 'Password changed successfully' });

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
};


const Logout = async(req, res)=>{
    req.logout(function(err){
        if(err){
            return res.json(err)
        }
        return res.json({message:"You have Sucessfully logout"})
    })
};

module.exports = {
    SignUp,
    Login,
    forgotPassword,
    changePassword,
    Logout
}