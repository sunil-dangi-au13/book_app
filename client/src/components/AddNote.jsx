import React, { useState,useContext } from 'react';
import noteContext from '../context/notes/noteContext';
 


const AddNote = (props) => {
    
    
    const[note,setNote] = useState({title:"",description:"",tag:""})
    const validatefields = ()=>{
        if(note.title == ""){
            alert("Enter your title here")
            return
        }
        if(note.description == ""){
            alert("Enter your description here")
            return
        }
        if(note.tag == ""){
            alert("Enter your tag here")
            return
        }
        return true;
    }
    const context = useContext(noteContext);
   const{addNote} = context
   const handleClick = (e)=>{
    if(!validatefields()){
        return
    }
    e.preventDefault()
    
  addNote(note.title, note.description, note.tag)
  props.showAlert("Note Added Sucessfully","sucess")
  setNote({title:"",description:"",tag:""})
   }
   const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})

   }
  return (
    <div className="container my-3">
    <h2>Add a Book</h2>
    <form className='my-3'>
<div className="mb-3">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note
  .title} onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="author" className="form-label">Author</label>
  <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
</div>
<button disabled ={note.title.length<5 ||note.description.length<5 || note.tag.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>
  )
}


export default AddNote