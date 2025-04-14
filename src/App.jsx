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

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseSignup = () => setShowSignup(false);
  const handleShowSignup = () => setShowSignup(true);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar 
          onLoginClick={handleShowLogin} 
          onSignupClick={handleShowSignup} 
        />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
        <Footer />
        <LoginModal show={showLogin} onHide={handleCloseLogin} />
        <SignupModal show={showSignup} onHide={handleCloseSignup} />
      </div>
    </Router>
  );
}

export default App;
