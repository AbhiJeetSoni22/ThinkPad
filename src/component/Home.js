import React from "react";
import Notes from "./Notes";
import { useContext,useState } from "react";
import NoteContext from "../context/notes/NoteContext";
const Home = (props) => {
  const context = useContext(NoteContext)
  const{addNote}= context

  const [note, setnote] = useState({title:"", description:"",tag:"default"})
  const handleClick = (e)=>{
    e.preventDefault()
     addNote(note.title,note.description,note.tag);
     setnote({title:"", description:"",tag:"default"})
    }
    const onChange =(e)=>{
      setnote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <div className="container my-4">
        <h1 className="text-3xl font-semibold my-4">Add Notes</h1>
        <form className="container">
          <div className="mb-3 ">
            <label
              htmlFor="title"
              className="form-label text-lg font-semibold "
            >
              Title 
            </label>
            <input
              type="email"
              className="form-control"
              value={note.title}
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={3}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              value={note.description}
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3 ">
            <label
              htmlFor="tag"
              className="form-label text-lg font-semibold "
            >
              Tag (optional) 
            </label>
            <input
              type="email"
              className="form-control"
              value={note.tag}
              id="tag"
              name="tag"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
        <Notes showAlert={props.showAlert}/>
      </div>
    </div>
  );
};

export default Home;
