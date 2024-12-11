import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import Btn from "../components/Button";

const SignUp = ({ show, handleClose, isSignUp }) => {
    const [formData, setFormData] = useState({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Call signup API
    } else {
      // Call login API
    }
    alert(`${isSignUp ? "Sign Up" : "Log In"} successful!`);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="auth-modal-body">
        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
        <Form onSubmit={handleSubmit}>
          {/* Render these fields only in Sign Up mode */}
          {isSignUp && (
            <>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your middle name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter Telephone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </>
          )}

          {/* Common fields for both Login and Sign Up */}
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Reconfirm password only in Sign Up mode */}
          {isSignUp && (
            <Form.Group>
              <Form.Label>Reconfirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password again"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          {/* Submit Button */}
          <Btn type="submit" name={isSignUp ? "Sign Up" : "Log In"} />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUp;
