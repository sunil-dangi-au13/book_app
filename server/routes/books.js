const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const bookcontroller = require('../controller/bookController')



// Route No----- 1    Add Book:-- Post method----- api/books/addbook--------//
router.post('/addbook',fetchuser,bookcontroller.createbook)

  

//Route No-----2    Get all books----- Get method---- api/books/fetchbooks----->>>>//
router.get('/fetchbooks',fetchuser,bookcontroller.fetchbooks)

 

//Route No-----3  Book update by id------>>>> Put method------ api/books/bookupdate------   //
router.put('/bookupdate/:id',fetchuser,bookcontroller.updatebook)

//Rout no -4 Book delete by id-----> delete method------api/books/deletebook//
router.delete('/deletebook/:id',fetchuser,bookcontroller.deletebook)


 
 



module.exports = router;