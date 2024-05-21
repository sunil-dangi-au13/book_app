const mongoose = require("mongoose")
const mongoURI = 'mongodb://localhost:27017/sunil'
const dbConnect = async()=>{
    try {
        await mongoose.connect(mongoURI,{
        })
        console.log("MongoDB connected sucessfully")
    } catch (error) {
        console.log("Connection Error")
        
    }
 }
module.exports = dbConnect