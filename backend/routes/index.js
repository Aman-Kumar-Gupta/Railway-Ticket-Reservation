var express = require('express');
var router = express.Router();
const { register, login } = require("../controllers/authController");
const { pool } = require('../database');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Register Route
router.post(
  "/SignUp", register
);


// Login Route
router.post("/Login", login);


//OTP VALIDATION
router.post('/validate-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // OTP Verification
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE (email = ?) AND otp = ? AND otp_expiry > NOW()',
      [email, otp]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Clear OTP after successful verification
    await pool.query(
      'UPDATE users SET otp = NULL, otp_expiry = NULL WHERE email = ?',
      [email]
    );

    res.json({ message: 'OTP validated successfully' });
    const token = jwt.sign({ email: email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token: token });  // ALSO SENDING USER DATA

  } catch (error) {
    res.status(500).send({ error: 'Error during OTP validation' });
  }

});

module.exports = router;
