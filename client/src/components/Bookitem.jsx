import {useContext} from 'react';
import BookContext from '../context/books/BookContext';


const Bookitem = (props) => {
  const context = useContext(BookContext);
  const{deleteBook} = context

    const{book,updateBook}= props;
  return (
    <div className='col-md-6'>
    <div className="card my-2">
    <div className="card-body">
    <button type="button" className="btn btn-success mx-1" onClick={()=>{updateBook(book)}}>Edit</button>
    <button type="button" className="btn btn-danger" onClick={()=>{deleteBook(book._id); props.showAlert("Deleted Sucessfully","sucess")}}>Delete</button>
    <h5 className="card-title">{book?.title}</h5>
    <p className="card-text">{book?.description}</p>
    <p className="card-text">{book?.author}</p>
  </div>
</div>

     
</div>

    
  )
}

export default Bookitem