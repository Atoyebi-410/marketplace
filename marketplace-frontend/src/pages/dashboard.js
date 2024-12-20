import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup, Offcanvas, Spinner } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProfilePage from "./ProfilePage";

function UserDashboard() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [user, setUser] = useState(null); // User data from backend
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/me`, {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setProfilePic(userData.profilePicture || null); // Assuming `profilePicture` is a field
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!user) {
    return <h1>User not found or not authenticated.</h1>;
  }

  return (
    <Container fluid>
      <Row>
        {/* Left Menu */}
        <Col md={3} className="d-none d-md-flex flex-column bg-light vh-100 p-3">
          <div className="text-center my-4">
            <img
              src={profilePic || "../assets/images/image-icon.png"}
              alt="User Profile"
              className="rounded-circle mb-3"
              style={{ width: "80px", height: "80px", cursor: "pointer" }}
              onClick={() => document.getElementById("profilePicInput").click()}
            />
            <input
              id="profilePicInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setProfilePic(URL.createObjectURL(e.target.files[0]))}
            />
            <h5>{user.firstName} {user.lastName}</h5>
          </div>
          <ListGroup>
            <ListGroup.Item action onClick={() => navigate("/")}>
              Dashboard
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => navigate("/profile")}>
              Profile
            </ListGroup.Item>
          </ListGroup>
          <Button variant="danger" className="mt-auto w-100">
            Logout
          </Button>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          <Routes>
            <Route path="/" element={<div><h1>Hi {user.firstName}</h1></div>} />
            <Route path="/profile" element={
              <ProfilePage
                user={user}
                setUser={setUser}
                profilePic={profilePic}
                setProfilePic={setProfilePic}
              />
            } />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default UserDashboard;
