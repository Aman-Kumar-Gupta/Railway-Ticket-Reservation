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



// FETCH STATION1 TO STATION2 ALL TRAINS
router.post('/station', async function (req, res) {

  const { fromStation, toStation, date } = req.body;
  const dayOfWeek = new Date(date).toLocaleString('en-US', { weekday: 'long' });
  const [results] = await pool.query(`
    SELECT 
      t.TrainID,
      t.TrainNumber,
      t.TrainName,
      src.StationName AS FromStation,
      dest.StationName AS ToStation,
      TIME_FORMAT(sch1.DepartureTime, '%H:%i') AS DepartureTime,
      TIME_FORMAT(sch2.ArrivalTime, '%H:%i') AS ArrivalTime,
      TIMESTAMPDIFF(MINUTE, sch1.DepartureTime, sch2.ArrivalTime) AS DurationMinutes,
      CONCAT(
        FLOOR(TIMESTAMPDIFF(MINUTE, sch1.DepartureTime, sch2.ArrivalTime)/60),
        'h ',
        MOD(TIMESTAMPDIFF(MINUTE, sch1.DepartureTime, sch2.ArrivalTime),60),
        'm'
      ) AS DurationFormatted,
      r.Distance AS DistanceKm,
      c.ClassType,
      c.BaseFarePerKM * r.Distance * c.FareMultiplier AS ClassFare,
      (
        SELECT COUNT(*) 
        FROM Seat 
        WHERE TrainID = t.TrainID 
        AND ClassID = c.ClassID
        AND AvailabilityStatus = 'Available'
      ) AS AvailableSeats
    FROM Train t
    JOIN Route r ON t.TrainID = r.TrainID
    JOIN Station src ON r.SourceStationID = src.StationID
    JOIN Station dest ON r.DestinationStationID = dest.StationID
    JOIN Schedule sch1 ON t.TrainID = sch1.TrainID AND sch1.DayOfWeek = ?
    JOIN Schedule sch2 ON t.TrainID = sch2.TrainID AND sch2.DayOfWeek = ?
    JOIN Class c ON t.TrainID = c.TrainID
    WHERE r.SourceStationID = ?
      AND r.DestinationStationID = ?
    ORDER BY sch1.DepartureTime ASC, c.ClassType
  `, [dayOfWeek, dayOfWeek, fromStation, toStation]);

  console.log(results);
  res.status(200).json(results);

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

module.exports = router;
