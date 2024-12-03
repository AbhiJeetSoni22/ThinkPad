import React from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
const Noteitem = (props) => {
  const context = useContext(NoteContext)
  const{deleteNote}= context
  const { note , updateNote} = props;
  
  return (
    <div className="col-md-3 ">
      <div className="card  my-4 py-1 px-3 border shadow bg-gray-200 rounded-lg">
        <div className="card-body ">
          <div className="d-flex align-item-center justify-normal">
            <h2 className="card-title text-xl font-semibold cursor-pointer">
              {" "}
              {note.title}
            </h2>
            <div>
            <i className="fa-solid fa-trash mx-3 cursor-pointer" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-solid fa-file-pen cursor-pointer" onClick={()=>{updateNote(note)}}></i>

            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
