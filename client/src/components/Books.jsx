import React, { useContext, useEffect, useRef,useState } from 'react';
import BookContext from '../context/books/BookContext';
import Bookitem from './Bookitem';
import AddBook from './AddBook';
import { useNavigate } from 'react-router-dom';


const Books = (props) => {
  const navigate = useNavigate()
  const context = useContext(BookContext);
  const {acessToken}= context
  const { books, addBook, getbooks,editBook } = context
  
  useEffect(() => {
    if(localStorage.getItem("token")){
      getbooks(addBook)
    }
    else{
     navigate("/login")
    }
    
   }, [])
  
  const ref = useRef(null);
  const refclose = useRef(null);
  const[book,setBook] = useState({id:"",etitle:"",edescription:"",eauthor:""})

  const updateBook = (currentbook) => {

    ref.current.click()
    setBook({id:currentbook?._id, etitle:currentbook?.title,edescription:currentbook?.description,eauthor:currentbook?.author})

    
  }
  const handleClick = (e)=>{
    refclose.current.click()
    props.showAlert("Updated Sucessfully", "Sucess")
    editBook(book.id,book.etitle,book.edescription,book.eauthor)
    
   }
   const onChange = (e)=>{
    setBook({...book,[e.target.name]:e.target.value})
   }
  return (
    <>
      <AddBook showAlert={props.showAlert} />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={book.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={book.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Author</label>
                  <input type="text" className="form-control" id="eauthor" name='eauthor' value={book.eauthor} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Book</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-6">
        <h2>Your Books</h2>
        {books.length == 0 && "No Book Availble"}
        {books.map((book) => {
          return <Bookitem key={book._id} updateBook={updateBook} showAlert={props.showAlert} book={book} />
        })}
      </div>
    </>
  )
}

export default Books