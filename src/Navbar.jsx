import React, { useState } from "react";
import "../src/styles/navbar.css";
import "./custom-colors.css";
import ranmiLogo from "./assets/delivery_bike.png";
import { Link } from "react-router-dom";

const Navbar = ({
  onLoginClick,
  onSignupClick,
  user,
  profilePicture,
  setProfilePicture,
  onLogout,
}) => {
  const [newProfilePic, setNewProfilePic] = useState(null);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePic(reader.result);
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getShortEmail = (email) => {
    if (!email) return "";
    return email.split("@")[0];
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
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

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <div className="navbar-nav mx-auto" id="nav-links">
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

          <div className="d-flex align-items-center">
            {user ? (
              <>
                {profilePicture ? (
                  <>
                    <img
                      src={profilePicture}
                      alt="Profile"
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        marginRight: 10,
                        border: ".5 solid black",
                      }}
                    />
                    <div
                      style={{ fontSize: 12, color: "#555", marginRight: 10 }}
                    >
                      Welcome, {getShortEmail(user.email)}
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "#ccc",
                      marginRight: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      color: "#555",
                    }}
                  >
                    {getShortEmail(user.email).charAt(0).toUpperCase()}
                  </div>
                )}
                {!profilePicture && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicChange}
                      style={{ display: "none" }}
                      id="profilePicInput"
                    />
                    <label
                      htmlFor="profilePicInput"
                      className="btn btn-outline-secondary btn-sm me-3"
                      style={{ cursor: "pointer" }}
                    >
                      Set Profile Picture
                    </label>
                    <span className="navbar-text me-3">
                      Hello, {getShortEmail(user.email)}
                    </span>
                  </>
                )}
                {profilePicture && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    {/* <span className="navbar-text">
                      Welcome, {getShortEmail(user.email)}
                    </span> */}
                  </div>
                )}
                <button
                  className="btn btn-outline-danger px-4"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-primary me-2 px-3 login"
                  onClick={onLoginClick}
                >
                  Login
                </button>
                <button
                  className="btn btn-primary px-4 signup"
                  onClick={onSignupClick}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
