import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import OrdinaryUserSignupModal from "./OrdinaryUserSignupModal";

const SignupModal = ({ show, onHide, onShowSignup }) => {
  const [showOrdinaryModal, setShowOrdinaryModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [service, setService] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleOpenOrdinaryModal = () => {
    setShowOrdinaryModal(true);
    onHide(); // Close the SignupModal when opening the ordinary user modal
  };

  const handleCloseOrdinaryModal = () => {
    setShowOrdinaryModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          service,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      const data = await response.json();
      onHide();
      onShowSignup(); // Show login modal after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Offcanvas show={show} onHide={onHide} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Partner Signup</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="signupFirstName"
                placeholder="Enter Your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="signupOtherName"
                placeholder="Enter Your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="signupEmail"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="signupPhoneNumber"
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <select
                name="service"
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">Select a Service</option>
                <option value="taxi">Taxi/Delivery Service</option>
                <option value="laundry">Laundry Service</option>
                <option value="restaurant">Restaurant Service</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="signupPassword"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="signupConfirmPassword"
                placeholder="Re-Enter Your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <button type="submit" className="btn btn-primary w-100 signup">
              Sign Up as a Partner
            </button>
          </form>
          <div className="mt-3 text-center">
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={handleOpenOrdinaryModal}
              style={{ color: "#ff4d00" }}
            >
              Sign up as an ordinary user
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <OrdinaryUserSignupModal
        show={showOrdinaryModal}
        onHide={handleCloseOrdinaryModal}
        onShowSignup={onShowSignup}
      />
    </>
  );
};

export default SignupModal;
