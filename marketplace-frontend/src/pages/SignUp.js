import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import Btn from "../components/Button";



const SignUp = ({ show, handleClose, isSignUp }) => {
    const [formData, setFormData] = useState({
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const [successMessage, setSuccessMessge] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();


     // Determine API endpoint
     const apiUrl = isSignUp
     ? "http://localhost:5000/api/auth/signup" 
     : "http://localhost:5000/api/auth/login";  

     // prepare request payload
     const requestData = isSignUp
      ? {
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }
      : {
          email: formData.email,
          password: formData.password,
        };
    if (isSignUp) {
      // Call signup API
      if (formData.password !== formData.confirmPassword) {
        alert("Paasword do not match")
        return;
      }

      //check password strength
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        alert(
          "Password must have at least 8 characters, including one uppercase, one lowercase, one number, and one special character."
        );
        return;
      }
    } 

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body:JSON.stringify(requestData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong!");
      }

      const data = await response.json();
      // alert(`${isSignUp ? "Sign Up" : "Log In"} successful!`);

      setSuccessMessge(data.message || "Signup successful!");
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      console.log("Form Data before submit:", formData);
      if (!isSignUp) {
        localStorage.setItem("token", data.token);
      }

      setTimeout(() => {
        handleClose()
      }, 5000);

       //close modal
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
   
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="auth-modal-body">
        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>

        {successMessage && <p className="text-success mt-3">{successMessage}</p>}
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
                  type="text"
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
              <p>Password must contain:</p>
                <ul>
                    <li>At least 8 characters</li>
                    <li>One uppercase letter</li>
                    <li>One lowercase letter</li>
                    <li>One number</li>
                    <li>One special character (e.g., @, $, !, etc.)</li>
                </ul>
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
