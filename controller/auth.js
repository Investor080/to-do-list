const userModel = require("../model/user")


const SignUp = async(req, res)=>{
    try {
        const {username, email, password} = req.body
        if(!username){
            res.json({error:"Username is required"})
        }
        if(!email){
            res.json({error:"Email is required"})
        }
        if(!password){
            res.json({error:"Password is required"})
        }
        if(!username || !email || !password){
            return res.status(400).json({error:"All fields are required"})
        }
        const existingUser = await userModel.findOne(email)
        if(existingUser){
            res.json({error:"User Already exist"})
        }
        // Generate password
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(req.body.password, salt)

        // Create new user
        const newUser = new userModel({
            username:username,
            email:email,
            password:hashpassword
        })
        const user = await newUser.save();
        res.status(200).json({message:"Account Created Succefully"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
};


const Login = async(req, res)=>{
    try {
        const {username, password} = req.body
        if(!username){
            res.json({error:"Username is required"})
        }
        if(!password){
            res.json({error:"Password is required"})
        }
        const existingUser = await userModel.findOne({ username })
        if(!existingUser){
            return res.status(404).json({error:"User Not Found"})
        }
        const passwordMatch = await bcrypt.compare(req.body.password, existingUser)
        if(!passwordMatch){
            res.json({error:"Incorrect Password"})
        }
        const user = new userModel({
            username,
            password
        })

        req.login(user, function(err){
            if(err){
                return res.json(err)
            }
            passport.authenticate("local")(req, res, function(){
                return res.status(200).json({message:""})
            })
        })
    } catch (error) {
        
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
    Logout
}