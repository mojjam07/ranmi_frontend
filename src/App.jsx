import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import MainContent from "./MainContent";
import Footer from "./Footer.jsx";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import About from "./About";
import Contact from "./Contact";
import Reviews from "./Reviews";
// import "./App.css";

import { useEffect } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedProfilePicture = localStorage.getItem("profilePicture");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
    }
  }, []);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseSignup = () => setShowSignup(false);
  const handleShowSignup = () => setShowSignup(true);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setProfilePicture(null);
    localStorage.removeItem("user");
    localStorage.removeItem("profilePicture");
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar 
          onLoginClick={handleShowLogin} 
          onSignupClick={handleShowSignup} 
          user={user}
          profilePicture={profilePicture}
          setProfilePicture={(pic) => {
            setProfilePicture(pic);
            localStorage.setItem("profilePicture", pic);
          }}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
        <Footer />
        <LoginModal show={showLogin} onHide={handleCloseLogin} onLogin={handleLogin} />
        <SignupModal show={showSignup} onHide={handleCloseSignup} onShowSignup={handleShowSignup} />
      </div>
    </Router>
  );
}

export default App;
