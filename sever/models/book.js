const mongoose = require('mongoose');
 const {Schema} = mongoose;
 const BooksSchema = new Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    // _id:{
    //     type:Schema.Types.ObjectId,
    // },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now,
    }
 })

 module.exports = mongoose.model('books',BooksSchema);