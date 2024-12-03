import './App.css';
import React, { useState } from'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import Login from './component/Login';
import Signup from './component/Signup';
import NoteState from './context/notes/NoteTempState';
import Alert from './component/Alert';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
  <NoteState showAlert={showAlert}>
    <Router> {/* BrowserRouter wrapper around all routes */}
      <Navbar />
    <Alert alert={alert}/>
      <div className="container">

      
      <Routes >
        <Route path="/" element={<Home showAlert={showAlert} />}  />
        <Route path="/about" element={<About />} />
        <Route path='/login' element={<Login showAlert={showAlert} />}/>
        <Route path='/signup' element={<Signup showAlert={showAlert} />}/>
      </Routes>
      </div>
    </Router>
    </NoteState >
  );
}

export default App;