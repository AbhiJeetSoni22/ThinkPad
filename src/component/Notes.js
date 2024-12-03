import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import { useEffect, useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes ,editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){

      getNotes();
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description,etag:currentNote.etag});
    
  };
  
  

  const [note, setnote] = useState({id:"",etitle:"", edescription:"",etag:"default"})
  //
  const handleClick = (e)=>{
    e.preventDefault()
    editNote(note.id,note.etitle,note.edescription,note.etag)

    refClose.current.click();
  }
  const onChange =(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div className="my-4">
      {/* <!-- Button trigger modal --> */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>
      {/* 
<!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h1 className="text-3xl font-semibold my-4">Update Notes</h1>
              <form className="container">
                <div className="mb-3 ">
                  <label
                    htmlFor="etitle"
                    className="form-label text-lg font-semibold "
                  >
                    Title
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3 ">
                  <label
                    htmlFor="etag"
                    className="form-label text-lg font-semibold "
                  >
                    Tag
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="etag"
                    name="etag"
                    aria-describedby="emailHelp"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
               
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">
                Update changes
              </button>
            </div>
          </div>
        </div>
        
      </div>
      <h1 className="text-3xl font-semibold">Your Notes</h1>
      <div className="row my-2">
      {notes.length === 0 && 'No notes to display'}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
