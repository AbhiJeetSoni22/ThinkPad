import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      props.showAlert("Invalid credentials", "danger");
      return;
    }

    const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/"); // Replaces history.push("/")
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="p-4 rounded shadow-sm"
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#f8f9fa",
          marginTop: "-50px", // Moves form upward
        }}
      >
        {/* Heading */}
        <h1 className="bold text-3xl text-center mb-4">Create an account to use ThinkPad</h1>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Enter Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter User Name"
              value={credentials.name}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              minLength={5}
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              placeholder="Confirm Password"
              minLength={5}
              value={credentials.cpassword}
              onChange={onChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block w-[45%] ml-[25%] mt-4"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
