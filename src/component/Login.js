import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
 const handleSubmit = async(e) => {
    e.preventDefault();
   
    const response = await fetch(`https://thinkpad.onrender.com/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credentials.email,password:credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/"); // Replaces history.push("/")
      props.showAlert("Logged In Successfully","success")
    } 
    else{
      props.showAlert("Invalid Credentials","danger")
    }
  }
  const onChange =(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
}
  return (
    <>
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="p-4 rounded shadow-sm"
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#f8f9fa",
          marginTop: "-50px", // Move the form upwards
        }}
      >
        {/* Heading */}
        <h1 className="bold text-3xl text-center mb-4">Log In to ThinkPad</h1>
  
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              value={credentials.email}
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={credentials.password}
              placeholder="Password"
              name="password"
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-[45%] ml-[25%] mt-4"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  </>
  
  );
};

export default Login;
