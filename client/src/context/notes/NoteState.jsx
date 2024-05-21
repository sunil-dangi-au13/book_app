import  { useEffect, useState } from "react";
import NoteContext from "../notes/NoteContext/";
const NoteState = (props) => {
    const [acessToken, setAcessToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'):null )
    // console.log('token', acessToken);
    useEffect(()=>{
 if(acessToken){
   localStorage.setItem('token', acessToken)
 }
 else{localStorage.removeItem('token')}
    },[acessToken])
    const host = "http://localhost:3000"
    const notesintial = [
        // {
        //     "_id": "6478380098c3b339fca35d69",
        //     "userid": "6471cf779077fdc87498722c",
        //     "title": "profiles new",
        //     "description": " frontend backend",
        //     "tag": "developer",
        //     "date": "2023-06-01T06:17:36.484Z",
        //     "__v": 0
        // },
        // {
        //     "_id": "64783e708f36ef2e7f1275dc",
        //     "userid": "6471cf779077fdc87498723c",
        //     "title": "Sucess",
        //     "description": " hard Work is key to Sucess",
        //     "tag": "Motivation",
        //     "date": "2023-06-01T06:45:04.958Z",
        //     "__v": 0
        // },
        // {
        //     "_id": "6478445ef5a233d06fdc9982",
        //     "userid": "647842a56ba352fd30184ae6",
        //     "title": "Intro Updated 17",
        //     "description": " Introduction Updated 17",
        //     "tag": "Personal Updated 17",
        //     "date": "2023-06-01T07:10:22.691Z",
        //     "__v": 0
        // },
    ]
    const [notes, setNotes] = useState(notesintial)

    //Fetch All Notes---->>>>>>//
    const getnotes = async () => {
        const response = await fetch(`${host}/api/books/fetchbooks`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "auth-token":localStorage.getItem("token")
                 //"auth-token": acessToken
            }
        })
        const json = await response.json();
        console.log('fetch notes',json);
        setNotes(json)

    }
    //Add Notes------>>>>>>>>>>//
    const addNote = async (title, description, tag,) => {

        //Api Call--->>>>>>>>>//
        const response = await fetch(`${host}/api/books/addbook`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                //"auth-token": localStorage.getItem("token")
                "auth-token": acessToken
                
            },
            body: JSON.stringify({ title, description, tag })

        })
        const json = await response.json();
        console.log(json);

        //   if(addNote=response){alert("Note Added")}
        console.log("Adding a Note");
        // const note = {
        //     "_id": "6478445ef5a233d06fdc9986",
        //     "userid": "647842a56ba352fd30184ae64",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2023-06-01T07:10:22.691Z",
        //     "__v": 0

        // }

        setNotes(notes.concat(json))
        //setNotes(json)

    }

    //Edit Notes------>>>>>>//
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/books/bookupdate/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                //"auth-token": localStorage.getItem("token")
                "auth-token": acessToken
            },
            body: JSON.stringify({ title, description, tag })

        })
        const json = await response.json();
        console.log(json);

        //logic to edit in client--->>>>>>//

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }

    }

    //Delete Note----->>>>>>>//
    const deleteNote = async (id) => {

        //Api Call--->>>>>>>//
        // const deletenotes = async () => {
        const response = await fetch(`${host}/api/books/deletebook/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                //"auth-token": localStorage.getItem("token")
                "auth-token": acessToken
            }
        })
        const json = await response.json();
        console.log(json);


        console.log("Note is Deleted by id" + id);
        const newnotes = notes.filter((note) => { return note._id !== id })
        setNotes(newnotes)

    }
    return (
        <NoteContext.Provider value={{ notes,  acessToken,setAcessToken, addNote, editNote, deleteNote, getnotes, }}>
            {props.children}
        </NoteContext.Provider>
    )
}



export default NoteState;