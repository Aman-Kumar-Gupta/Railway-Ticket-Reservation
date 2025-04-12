const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const JWT_SECRET = process.env.JWT_SECRET;
const nodemailer = require('nodemailer');
const { pool } = require('../database');

// User Registration
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, mobile_number } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const [result] = await pool.query(
            'INSERT INTO users (name, email, hashed_password, mobile_number, otp, otp_expiry) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, hashedPassword, mobile_number, otp, otpExpiry]
        );
        console.log(result);

        await sendOtp(email, otp);

        res.status(201).send({ message: 'Signup successful. OTP sent.' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "User registration failed." });
    }
};

// User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email]
        );

        if (users.length === 0) return res.status(400).json({ error: "Invalid credentials" });
        const isMatch = await bcrypt.compare(password, users[0].hashed_password);
        if (!isMatch) return res.status(400).json({ error: "Incorrect Password" });

        const token = jwt.sign({ email: users[0].email }, JWT_SECRET, {
            expiresIn: "2h",
        });
        // console.log(token);

        res.json({ token: token });  // ALSO SENDING USER DATA
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Login failed" });
    }
};

// Helper function to send OTP
const sendOtp = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_password',
        },
    });

    const message = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };
    try {
        await transporter.sendMail(message);
        console.log('OTP sent');
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};