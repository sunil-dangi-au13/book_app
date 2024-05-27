import React, { useState,useContext } from 'react';
import bookContext from '../context/books/BookContext';
 


const AddBook = (props) => {
    
    
    const[book,setBook] = useState({title:"",description:"",author:""})
    const validatefields = ()=>{
        if(book.title == ""){
            alert("Enter your title here")
            return
        }
        if(book.description == ""){
            alert("Enter your description here")
            return
        }
        if(book.author == ""){
            alert("Enter your author here")
            return
        }
        return true;
    }
    const context = useContext(bookContext);
   const{addBook} = context
   const handleClick = (e)=>{
    if(!validatefields()){
        return
    }
    e.preventDefault()
    
  addBook(book.title, book.description, book.author)
  props.showAlert("Note Added Sucessfully","sucess")
  setBook({title:"",description:"",author:""})
   }
   const onChange = (e)=>{
    setBook({...book,[e.target.name]:e.target.value})

   }
  return (
    <div className="container my-3">
    <h2>Add a Book</h2>
    <form className='my-3'>
<div className="mb-3">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={book
  .title} onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <input type="text" className="form-control" id="description" name='description' value={book.description} onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="author" className="form-label">Author</label>
  <input type="text" className="form-control" id="author" name='author' value={book.author} onChange={onChange}/>
</div>
<button disabled ={book.title.length<5 ||book.description.length<5 || book.author.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Book</button>
</form>
</div>
  )
}


export default AddBook