const Book = require('../models/book');
const{body,validationResult} = require('express-validator');

// Create a new book//

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
    
     // check Book with alredy exist same title----->>>>>//

     let bookval = await Book.findOne({ title: req.body.title });
         if (bookval) {
            return res.status(400).json({ error: 'Book is already exist with this title' })
         }
    
    const book = new Book({title,description,author,userid: req.user})
    const savedbook = await book.save()
    res.json(savedbook)
    console.log('----...',savedbook)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send(' Internal server error')
    }
    
}


// Fetch all books--------//

exports.fetchbooks =async(req,res)=>{
    const userid = req.user 
    console.log('userid',userid);
    try {
        const books = await Book.find({userid})
        res.json(books)  
    } catch (error) {
        console.error(error.message);
        res.status(500).send(' Internal server error')
    }
}



// Update the book by id--------//

exports.updatebook =async(req,res)=>{
    const{title,description,author}= req.body;
    const id = req.params._id
    trimmed_id = id?.trim()
    console.log("id",id)
    //Create a new book object------//
    const newbook = {};
    if(title){newbook.title = title}
    if(description){newbook.description = description}
    if(author){newbook.author = author}

    //find the book and update it----->>>>//
    const book = await Book.findById(req.params.id);
    console.log(book,'----->>>>>');
    if(!book){return res.status(404).send("book not found")}
    if(book?.userid?.toString()!== req?.user){return res.status(401).send("Acess denied")}

    const updatebook = await Book.findByIdAndUpdate(req.params.id, {$set:newbook},{new:true});
    console.log(updatebook,'----->>>>');
    res.json({updatebook});

}



//    Delete Book by Id --------//

exports.deletebook =async(req,res)=>{
    const{title,description,author}= req.body;

    //find the note and Delete it----->>>>//
    const book = await Book.findById(req.params.id);
    //console.log(book,'----->>>>>');
    if(!book){return res.status(404).send("book not found")}
    const deletebook = await Book.findByIdAndDelete(req.params.id);
    res.json({"Sucess":"Book deleted Sucessfully"});

}
