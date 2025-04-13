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

// FETCH TRAINS BETWEEN STATIONS WITH CLASSES, FARES AND AVAILABILITY
router.post('/station', async function (req, res) {
  const { fromStation, toStation, date } = req.body;

  try {
    const dayOfWeek = new Date(date).toLocaleString('en-US', { weekday: 'long' });

    // Get basic train info - removed DISTINCT and added DepartureTime to SELECT
    const [trains] = await pool.query(`
      SELECT
        t.TrainID,
        t.TrainNumber,
        t.TrainName,
        src.StationName AS FromStation,
        dest.StationName AS ToStation,
        TIME_FORMAT(sch1.DepartureTime, '%H:%i') AS DepartureTime,
        TIME_FORMAT(sch2.ArrivalTime, '%H:%i') AS ArrivalTime,
        r.Distance AS DistanceKm,
        sch1.DepartureTime AS SortDepartureTime  -- Added for sorting
      FROM Train t
      JOIN Route r ON t.TrainID = r.TrainID
      JOIN Station src ON r.SourceStationID = src.StationID
      JOIN Station dest ON r.DestinationStationID = dest.StationID
      JOIN Schedule sch1 ON t.TrainID = sch1.TrainID AND sch1.DayOfWeek = ?
      JOIN Schedule sch2 ON t.TrainID = sch2.TrainID AND sch2.DayOfWeek = ?
      WHERE r.SourceStationID = ?
        AND r.DestinationStationID = ?
      ORDER BY SortDepartureTime ASC  -- Now using a column in SELECT
    `, [dayOfWeek, dayOfWeek, fromStation, toStation]);

    // Get classes and availability for each train
    for (const train of trains) {
      const [classes] = await pool.query(`
        SELECT 
          c.ClassType,
          ROUND(c.BaseFarePerKM * ? * c.FareMultiplier, 2) AS Fare,
          (
            SELECT COUNT(*) 
            FROM Seat 
            WHERE TrainID = ? 
            AND ClassID = c.ClassID
            AND AvailabilityStatus = 'Available'
          ) AS AvailableSeats
        FROM Class c
        WHERE c.TrainID = ?
      `, [train.DistanceKm, train.TrainID, train.TrainID]);

      train.classes = classes;
      delete train.SortDepartureTime;  // Remove the temporary sorting column
    }

    res.json({
      success: true,
      date: date,
      fromStation: trains[0]?.FromStation || '',
      toStation: trains[0]?.ToStation || '',
      totalTrains: trains.length,
      trains: trains
    });

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching train data',
      error: error.message
    });
  }
});


router.post('/train', async function (req, res) {
  const { trainNumber, date } = req.body;
  res.status(500).json("to do");
});


// FOR CANCELLING TICKET
router.post('/cancel_ticket', async function (req, res) {

  try {
    const { pnr } = req.body;
    const [result] = await pool.query(`CALL cancel_ticket(?)`, [pnr]);
    res.json({ success: true, message: result[0]?.Message || 'Cancelled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }

});


// FOR LISTING PASSENGERS IN A TRAIN ON DATE
router.post('/list_passengers_on_train', async function (req, res) {

  try {
    const { trainName, journeyDate } = req.query;

    const [passengers] = await pool.query(
      `CALL list_passengers_on_train(?, ?)`,
      [trainName, journeyDate]
    );

    res.json({ success: true, data: passengers[0] });
  } catch (err) {
    console.error('Error fetching passengers:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }

});




// FETCH LIST OF ALL STATIONS AND TRAINS IN THE DB
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


// GET /api/bookings/:userId
router.get('/bookings/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const [results] = await pool.query('CALL get_user_bookings(?)', [userId]);
    res.json(results[0]); // assuming the result set is in results[0]
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});


module.exports = router;
