import React, { useState } from "react";
import SignUp from "../pages/SignUp";

function AuthBtns() {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const handleShow = (signup) => {
    setIsSignUp(signup);
    setShowModal(true);
  };

  return (
    <div >
      <button className="Authbtn" onClick={() => handleShow(true)} style={{ marginRight: "15px", marginLeft: "15px" }}>
        Sign Up
      </button>
      <button className="Authbtn" onClick={() => handleShow(false)} >Log In</button>
      <SignUp show={showModal} handleClose={() => setShowModal(false)} isSignUp={isSignUp} />
    </div>
  );
};

export default AuthBtns;
