import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const LoginModal = ({ show, onHide }) => {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Login to Your Account</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="loginEmail" />
          </div>
          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="loginPassword" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default LoginModal;
