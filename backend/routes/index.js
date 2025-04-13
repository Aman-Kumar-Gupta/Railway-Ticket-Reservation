var express = require('express');
var router = express.Router();
const { register, login } = require("../controllers/authController");
const { pool } = require('../database');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


/* GET home page. */

router.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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

router.get('/pnr-enquiry', async (req, res) => {
  const { pnr } = req.query;


  try {
    if (!pnr) {
      return res.status(400).json({ error: 'PNR number is required' });
    }

    // Validate PNR format (must start with PNR followed by 6 digits)
    if (!/^PNR\d{6}$/.test(pnr)) {
      return res.status(400).json({ error: 'Invalid PNR format' });
    }

    // Get a connection from the pool


    // Execute the stored procedure
    const [rows] = await pool.query('CALL GetTicketSummaryByPNR(?)', [pnr]);

    // Check if we have valid results
    if (!rows || !Array.isArray(rows) || rows.length === 0 || rows[0].length === 0) {
      return res.status(404).json({ error: 'No data found for this PNR' });
    }

    // The first result set should contain the ticket details
    const ticketDetails = rows[0];

    // Return the formatted ticket details
    return res.json(ticketDetails);

  } catch (error) {
    console.error('Error in /pnr-enquiry:', error);
    return res.status(500).json({ error: 'Failed to retrieve PNR details' });
  }
});

router.get('/busiest-routes', async (req, res) => {
  try {
    const [results] = await pool.query('CALL find_busiest_route()');
    res.json(results[0]); // returning the first result set
  } catch (err) {
    console.error('Error fetching busiest routes:', err);
    res.status(500).json({ error: 'Error fetching busiest routes' });
  }
});

router.get('/revenue', async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    const [rows] = await pool.query('SELECT calculate_revenue(?, ?) AS totalRevenue', [start_date, end_date]);
    res.json({ revenue: rows[0].totalRevenue });
  } catch (error) {
    console.error('Error calculating revenue:', error);
    res.status(500).json({ message: 'Failed to calculate revenue' });
  }
});


// Endpoint to get trains by source and destination stations
router.get('/find-trains', async (req, res) => {
  const { stationsrc, stationout } = req.query;

  console.log(stationsrc, stationout);
  if (!stationsrc || !stationout) {
    return res.status(400).json({ error: 'Both source and destination stations are required' });
  }

  try {
    // Call the stored procedure with the source and destination station names
    const [rows] = await pool.query('CALL findtrain_bystations(?, ?)', [stationsrc, stationout]);

    console.log(rows[0]);
    // Check if any trains were found
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'No trains found for the specified stations' });
    }

    // Send the result back to the client
    res.json(rows[0]); // Assuming the result set is in rows[0]
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching train data' });
  }
});

router.get('/find-train-by-number', async (req, res) => {
  const { trainNumber } = req.query;

  if (!trainNumber) {
    return res.status(400).json({ error: 'Train number is required' });
  }

  try {
    const [rows] = await pool.query('CALL findtrain_bytrainnumber(?)', [trainNumber]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching train by number:', err);
    res.status(500).json({ error: 'Server error while fetching train data' });
  }
});

module.exports = router;
