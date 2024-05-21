import {useContext} from 'react';
import NoteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const{deleteNote} = context

    const{note,updateNote}= props;
  return (
    <div className='col-md-3'>
    <div className="card my-3">
    <div className="card-body">
    <button type="button" className="btn btn-success mx-1" onClick={()=>{updateNote(note)}}>Edit</button>
    <button type="button" className="btn btn-danger" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Sucessfully","sucess")}}>Delete</button>
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
  </div>
</div>

     
</div>

    
  )
}

export default Noteitem