require('dotenv').config();
const mongoose = require('mongoose')

const password = process.env.pass

connectionString = `mongodb+srv://Alawal:${password}@cluster0.3nguyre.mongodb.net/?retryWrites=true&w=majority`


// mongoose.set("strictQuery", true)
// const connectdb = () => {
//     mongoose.connect(connectionString, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then((_) => console.log("DB connected"));
// };

const connectdb = async()=>{
    await mongoose.connect(connectionString)
    return console.log ("DB connected")
}


module.exports = connectdb
