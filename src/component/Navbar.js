import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = (props) => {
  let navigate = useNavigate();
  let location = useLocation();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    const menu = document.getElementById("mobile-menu");
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
    } else {
      menu.classList.add("open");
    }
  };

  return (
    <nav className="bg-gray-700 p-4">
      <div className="container mx-auto flex items-center justify-between md:justify-between">
        {/* Logo */}
        <Link to="/" className="text-white no-underline text-3xl font-bold hover:no-underline">
          ThinkPad
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="text-gray-300 md:hidden"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 text-xl">
          <Link
            to="/"
            className={`text-gray-300 hover:text-white hover:no-underline hover:scale-90 py-1 px-3 block ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-gray-300 hover:text-white hover:no-underline hover:scale-90 py-1 px-3 block ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            About
          </Link>
        </div>

        {/* Login and Sign Up Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!localStorage.getItem('token') ? (
            <>
              <Link
                to="/login"
                className="text-gray-300 bg-blue-500 hover:bg-blue-700 hover:no-underline hover:text-white py-1 px-3 block rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white bg-gray-500 hover:bg-gray-600 hover:no-underline py-1 px-3 block rounded"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              className="text-white bg-red-500 hover:no-underline hover:bg-red-700 py-2 px-4 rounded transition-all"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="pt-2 md:hidden flex flex-col items-center space-y-2"
      >
        <Link
          to="/"
          className="text-gray-300 bg-gray-600 hover:text-white py-1 px-3 hover:no-underline block"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-gray-300 bg-gray-600 hover:text-white py-1 px-3 hover:no-underline block"
        >
          About
        </Link>
        {!localStorage.getItem('token') ? (
          <>
            <Link
              to="/login"
              className="text-gray-300 bg-blue-500 py-1 px-3 block hover:no-underline rounded"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white bg-gray-500 hover:bg-gray-500 py-1 px-3 block rounded hover:no-underline"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            className="text-white bg-red-500 hover:no-underline hover:bg-red-700 py-2 px-4 rounded transition-all"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
