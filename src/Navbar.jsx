import React from "react";
import "../src/styles/navbar.css";
import "./custom-colors.css";
import ranmiLogo from "./assets/delivery_bike.png";
import { Link } from "react-router-dom";

const Navbar = ({ onLoginClick, onSignupClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold" to="/">
            <img
              src={ranmiLogo}
              alt="Logo"
              width="100"
              height="100"
              className="d-inline-block align-text-top me-2"
              style={{ flexShrink: 0 }}
            />
            {/* <span className="text-primary">Ranmi</span> App */}
          </Link>

          <div
            className="d-flex justify-content-center flex-grow-1"
            id="nav-links"
          >
            <Link className="nav-link mx-3" to="/about">
              About
            </Link>
            <Link className="nav-link mx-3" to="/contact">
              Contact
            </Link>
            <Link className="nav-link mx-3" to="/reviews">
              Reviews
            </Link>
          </div>

          <div className="d-flex">
            <button
              className="btn btn-outline-primary me-2 px-3"
              onClick={onLoginClick}
            >
              Login
            </button>
            <button className="btn btn-primary px-4" onClick={onSignupClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
