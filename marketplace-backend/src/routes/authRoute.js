import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import asyncHandler from "../middleware/asyncHandler.js"

dotenv.config();
const router = express.Router();

function sendVerificationEmail(firstName, lastName, email, token) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${token}`;
    
    const emailHTML = `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #fcb900; text-align: center;">Welcome to SellAm9ja!</h2>
          <h3>Dear ${firstName} ${lastName}</h3>
          <p style="font-size: 16px; color: #555; text-align: center;">
            To complete your registration, please click the link below to verify your email address.
          </p>
          <div style="text-align: center;">
            <a href="${verificationLink}" style="background-color: #fcb900; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 4px; display: inline-block; margin-top: 20px;">
              Verify Email
            </a>
          </div>
          <p style="font-size: 14px; color: #555; text-align: center; margin-top: 30px;">
            If you didn't sign up for SellAm9ja, you can safely ignore this email.
          </p>
          <footer style="text-align: center; margin-top: 40px; font-size: 12px; color: #888;">
            <p>&copy; ${new Date().getFullYear()} SellAm9ja. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  `;
    
    // send verification mail
    transporter.sendMail({
        to: email,
        subject: "Verify your email",
        html: emailHTML,
    });

};

// const mockusers = []
// register a new user

router.post(
    "/signup",
    asyncHandler(async (req, res) => {
        const { firstName, middleName, lastName, phone, email, password } = req.body;

        console.log("Request body:", req.body);


        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new Error(
                "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character."
            );
        }

        // Create verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Payload:", req.body);

        const user = await User.create({
            firstName,
            middleName,
            lastName,
            phone,
            email,
            password: hashedPassword,
            verificationToken,
        });

        console.log("User created:", user);

        // Send verification email
        await sendVerificationEmail(firstName, lastName, email, verificationToken);

        res.status(201).json({
            message: `User registered successfully! Verification email sent to: ${email}`,
            user: { id: user.id, email: user.email },
        });
    })
);
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        if (!user.emailVerified) {
            return res.status(401).json({
                error: "Email not verified. Please check your email for verification instructions.",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/verify", asyncHandler(async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({Error: "Token is required for verification"});
    }

    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
        return res.status(400).json({Error:"Invalid or expired token"});
    }

    user.emailVerified = true;
    user.verificationToken = null; // Clear the token after verification
    await user.save();

    return res.status(200).json({message: "Email verified successfully"})

    // res.redirect(`${process.env.FRONTEND_URL}/verificationPage`);
}));

// get loggedin user data and send it to the frontend
router.get("/me", authenticateUser, async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password"] }, // Exclude sensitive fields
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user data" });
    }
  });

export default router;