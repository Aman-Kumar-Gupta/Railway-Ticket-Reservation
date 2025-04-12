var express = require('express');
var router = express.Router();
const { pool } = require('../database');
const cors = require('cors');

router.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/fetch', async function (req, res) {
  try {
    // Execute both queries in parallel
    const [stations] = await pool.query('SELECT StationID, StationName FROM Station');
    const [trains] = await pool.query('SELECT TrainNumber, TrainName FROM Train');

    // Return both datasets in the response
    res.status(200).json({
      stations: stations,
      trains: trains
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;
