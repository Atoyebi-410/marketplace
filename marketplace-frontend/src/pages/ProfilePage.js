import React from "react";
import { Form, Button } from "react-bootstrap";

const ProfilePage = ({ user, setUser, profilePic, setProfilePic }) => {
  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePic(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFieldChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/me`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-4">
      <div className="text-center">
        <img
          src={profilePic || "../assets/images/image-icon.png"}
          alt="Profile"
          className="rounded-circle mb-3"
          style={{ width: "150px", height: "150px", cursor: "pointer" }}
          onClick={() => document.getElementById("profilePicInput").click()}
        />
        <input
          id="profilePicInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleProfileUpload}
        />
      </div>
      <h2>Profile</h2>
      <Form>
        {Object.entries(user).map(([key, value]) =>
          key !== "password" ? (
            <Form.Group className="mb-3" controlId={key} key={key}>
              <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
              <Form.Control
                type="text"
                value={value}
                onChange={(e) => handleFieldChange(key, e.target.value)}
              />
            </Form.Group>
          ) : null
        )}
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default ProfilePage;
