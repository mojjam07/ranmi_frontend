import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const SignupModal = ({ show, onHide }) => {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Create New Account</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="signupName" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="signupName" />
          </div>
          <div className="mb-3">
            <label htmlFor="signupEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="signupEmail" />
          </div>
          <div className="mb-3">
            <label htmlFor="signupPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="signupPassword" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SignupModal;
