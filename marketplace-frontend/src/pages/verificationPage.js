import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifiedPage = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("Verifying...");
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get("token");

            if (!token) {
                setStatus("Invalid verification link.");
                return;
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verify?token=${token}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    setStatus("Email verified successfully!");
                    setTimeout(() => {
                        navigate("/dashboard"); // Redirect to the dashboard after 5 seconds
                    }, 5000);
                } else {
                    setStatus("Verification failed. The token may have expired.");
                }
            } catch (error) {
                setStatus("An error occurred during verification.");
            }
        };

        verifyEmail();
    }, [searchParams, navigate]);

    return (
        <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f9", margin: 0, padding: 0, height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div
                style={{
                    maxWidth: "600px",
                    padding: "20px",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                }}
            >
                <h2 style={{ color: "#fcb900" }}>Welcome to SellAm9ja!</h2>
                <p style={{ fontSize: "16px", color: "#555" }}>{status}</p>
                {status === "Email verified successfully!" && (
                    <p style={{ fontSize: "14px", color: "#555", marginTop: "20px" }}>
                        You will be redirected shortly. If it doesn't happen automatically, <a href="/dashboard">click here</a>.
                    </p>
                )}
                <footer style={{ marginTop: "30px", fontSize: "12px", color: "#888" }}>
                    &copy; {new Date().getFullYear()} SellAm9ja. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default VerifiedPage;
