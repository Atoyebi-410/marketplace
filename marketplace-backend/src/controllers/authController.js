import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    // send verification mail
    await transporter.sendMail({
        to: email,
        subject: "Verify your email",
        html: `<div>
                    <h3>SellAm9ja</h3>
                    <p>Click <a href="${verificationLink}">here</a> to verify your email.</p>
                </div>`,
    });

};

const signup = async (req, res) => {
    const { firstname, middlename, lastname, telephone, email, password } = req.body;

    try {
        // Check password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error: "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
            });
        }

        // Create verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        const user = await User.create({
            firstname,
            middlename,
            lastname,
            telephone,
            email,
            password,
            verificationToken,
        });

        // Send verification email
        await sendVerificationEmail(email, verificationToken);

        res.status(201).json({
            message: "User registered successfully! Please verify your email.",
            user: { id: user.id, email: user.email },
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
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
};

const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ where: { verificationToken: token } });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        user.emailVerified = true;
        user.verificationToken = null; // Clear the token after verification
        await user.save();

        res.json({ message: "Email verified successfully! You can now log in." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export {sendVerificationEmail, signup, login, verifyEmail }