const Book = require('../models/book');
const{body,validationResult} = require('express-validator');

// Route No----- 1    Add a new Note:-- Post method----- api/notes/addnote--------//

 
exports.createbook =async(req,res)=>{
    [
        body('title','Enter a title name').isLength({min:3}),
        body('description','Description atleast 5 character').isLength({min:5}),
    ]
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    try {
        
        const{title,description,author}= req.body
    
     // check Notes with alredy exist same title----->>>>>//

     let bookval = await Book.findOne({ title: req.body.title });
         if (bookval) {
            return res.status(400).json({ error: 'Book is already exist with this title' })
         }
    //const userid = req.user
    // console.log("userid",req.user);
    
    const book = new Book({title,description,author,userid: req.user})
    const savedbook = await book.save()
    res.json(savedbook)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send(' Internal server error')
    }
    
}


// Route No----- 2    Get All Books:-- Get method----- api/books/fetchbooks--------//

exports.fetchbooks =async(req,res)=>{
    const userid = req.user
     
    console.log('userid',userid);
    //console.log('id', req.user);
    try {
        const books = await Book.find({userid})
        // const notes = await Note.findOne({userId})
        // console.log(notes)
        // if(notes.length !== 0){
        //     console.log("array is not empty");
        // }
        // else{console.log('its empty');}
      
        // console.log(notes,'---->>>');
        res.json(books)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send(' Internal server error')
    }
}



// Route No-----3   Update Book by Id :-- Put method----- api/books/updatenote/:id--------//

exports.updatebook =async(req,res)=>{
    const{title,description,author}= req.body;
    //Create a new book object------//
    const newbook = {};
    if(title){newbook.title = title}
    if(description){newbook.description = description}
    if(author){newbook.author = author}

    //find the note and update it----->>>>//
    
    //const userid = req.user
    const book = await Book.findById(req.params.id);
    console.log(book,'----->>>>>');
    // console.log('note-user-id', note.userid.toString())
    // console.log('req-user-id', req.user)
    if(!book){return res.status(404).send("not found")}
    if(book?.userid?.toString()!== req?.user){return res.status(401).send("Acess denied")}

    const updatebook = await Book.findByIdAndUpdate(req.params.id, {$set:newbook},{new:true});
    console.log(updatebook,'----->>>>');
    res.json({updatebook});

}



// Route No-----4    Delete Book by Id :-- Delete method----- api/books/deletebook/:id--------//

exports.deletebook =async(req,res)=>{
    const{title,description,author}= req.body;

    //find the note and Delete it----->>>>//
    const book = await Book.findById(req.params.id);
    //console.log(book,'----->>>>>');
    if(!book){return res.status(404).send("not found")}
    //if(note.user.toString()!== req.user.id){return res.status(401).send("Acess denied")}

    const deletebook = await Book.findByIdAndDelete(req.params.id);
    res.json({"Sucess":"Book deleted Sucessfully"});

}
