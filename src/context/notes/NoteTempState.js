import noteContext from "./NoteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "https://thinkpad-backend.onrender.com"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

//get all note
const getNotes = async() => {
  // todo api call
 
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem("token")
    },
  });
 const json = await response.json();
  console.log(json)
  setNotes(json)
};

  //Add a note
  const addNote = async(title, description, tag) => {
    // todo api call
    
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    props.showAlert("Note added successfully","success")
  };

  //Delete a note
  const deleteNote = async (id) => {
    console.log("adding a note")
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    
    });
    const json = await response.json();
    console.log(json)
    
    const newNote =notes.filter((note)=> { return note._id !== id})
    setNotes(newNote)
    props.showAlert("Note deleted successfully","success")
  };

  //Edit a note
  const editNote = async (id, title, description , tag) => {

    //api call
    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json()
    console.log(json)
    // logic to delete code
    for (let index = 0; index <notes.length; index++) {
      const element =notes[index];
      if(element._id === id){
        element.title = title
        element.description = description
        element.tag = tag
        setNotes([...notes])
        break;
      }
      
    }
    props.showAlert("Note updated successfully","success")
  };

  return (
    <noteContext.Provider value={{ notes,getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
