import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/styles.css";
import HomePage from "./pages/HomePage";
import VerifiedPage from "./pages/verificationPage";
import UserDashboard from "./pages/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/verify" element={<VerifiedPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
    // <div>
    //   <HomePage />
    // </div>
  ) 
}

export default App;
