
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const { pool } = require('./database');

async function insertAllData() {         // INSERT ALL DATA INTO TABLES  // RUN THIS FUNCTION ONLY ONCE TO AVOID ERR
  try {
    // 1. Stations (15 records)
    await pool.query(`
      INSERT INTO Station (StationID, StationName, Location) VALUES
      (1, 'Mumbai Central', 'Maharashtra'),
      (2, 'Delhi Junction', 'Delhi'),
      (3, 'Chennai Central', 'Tamil Nadu'),
      (4, 'Howrah Junction', 'West Bengal'),
      (5, 'Bangalore City', 'Karnataka'),
      (6, 'Secunderabad Junction', 'Telangana'),
      (7, 'Ahmedabad Junction', 'Gujarat'),
      (8, 'Pune Junction', 'Maharashtra'),
      (9, 'Jaipur Junction', 'Rajasthan'),
      (10, 'Lucknow Junction', 'Uttar Pradesh'),
      (11, 'Patna Junction', 'Bihar'),
      (12, 'Bhubaneswar Junction', 'Odisha'),
      (13, 'Thiruvananthapuram Central', 'Kerala'),
      (14, 'Guwahati Junction', 'Assam'),
      (15, 'Amritsar Junction', 'Punjab')
    `);

    // 2. Trains (15 records)
    await pool.query(`
      INSERT INTO Train (TrainID, TrainName, TrainNumber, SourceStationID, DestinationStationID) VALUES
      (1, 'Rajdhani Express', '12951', 1, 2),
      (2, 'Shatabdi Express', '12010', 2, 3),
      (3, 'Duronto Express', '12245', 1, 4),
      (4, 'Garib Rath', '12215', 2, 5),
      (5, 'Karnataka Express', '12628', 5, 2),
      (6, 'Kerala Express', '12626', 13, 2),
      (7, 'Goa Express', '12780', 1, 8),
      (8, 'Punjab Mail', '12138', 15, 1),
      (9, 'Howrah Mail', '12302', 4, 2),
      (10, 'Deccan Queen', '12124', 8, 1),
      (11, 'Gujarat Mail', '12902', 7, 2),
      (12, 'Jaipur Superfast', '12956', 9, 2),
      (13, 'Bhubaneswar Rajdhani', '22812', 12, 2),
      (14, 'Patna Express', '12394', 11, 2),
      (15, 'Udyan Express', '11302', 8, 5)
    `);

    // 3. Classes (18 records)
    await pool.query(`
       INSERT INTO Class (ClassID, TrainID, ClassType, TotalSeats, FareMultiplier, BaseFarePerKM) VALUES
      (1, 1, 'AC 2-tier', 50, 1.50, 2.00),
      (2, 1, 'AC 3-tier', 100, 1.20, 2.00),
      (3, 2, 'First Class', 30, 2.00, 2.00),
      (4, 2, 'Second Class', 75, 1.50, 2.00), 
      (5, 3, 'Sleeper', 150, 1.00, 1.50),
      (6, 3, 'AC 3-tier', 80, 1.20, 1.50),
      (7, 4, 'AC 3-tier', 90, 1.20, 1.80),
      (8, 5, 'Sleeper', 120, 1.00, 1.50),
      (9, 5, 'AC 2-tier', 40, 1.50, 1.50),
      (10, 6, 'AC 3-tier', 70, 1.20, 2.00),
      (11, 7, 'Sleeper', 110, 1.00, 1.20),
      (12, 8, 'AC 2-tier', 45, 1.50, 1.80),
      (13, 9, 'Sleeper', 130, 1.00, 1.50),
      (14, 10, 'First Class', 25, 2.00, 2.20),
      (15, 11, 'AC 3-tier', 85, 1.20, 1.70),
      (16, 12, 'Sleeper', 140, 1.00, 1.40),
      (17, 13, 'AC 2-tier', 50, 1.50, 2.10),
      (18, 14, 'AC 3-tier', 75, 1.20, 1.90)
    `);

    // 4. Routes (15 records)
    await pool.query(`
      INSERT INTO Route (RouteID, TrainID, SourceStationID, DestinationStationID, Distance) VALUES
      (1, 1, 1, 2, 1384),
      (2, 2, 2, 3, 2180),
      (3, 3, 1, 4, 1942),
      (4, 4, 2, 5, 2370),
      (5, 5, 5, 2, 2370),
      (6, 6, 13, 2, 2765),
      (7, 7, 1, 8, 180),
      (8, 8, 15, 1, 1896),
      (9, 9, 4, 2, 1448),
      (10, 10, 8, 1, 180),
      (11, 11, 7, 2, 935),
      (12, 12, 9, 2, 304),
      (13, 13, 12, 2, 1700),
      (14, 14, 11, 2, 1005),
      (15, 15, 8, 5, 1135)
    `);

    // 5. Passengers (15 records)
    await pool.query(`
      INSERT INTO Passenger (PassengerID, Name, Age, Gender, ContactNumber, Email, ConcessionCategory) VALUES
      (1, 'Rahul Sharma', 35, 'Male', '9876543210', 'rahul.s@gmail.com', 'None'),
      (2, 'Priya Patel', 28, 'Female', '8765432109', 'priya.p@yahoo.com', 'None'),
      (3, 'Amit Kumar', 65, 'Male', '7654321098', 'amit.k@hotmail.com', 'Senior Citizen'),
      (4, 'Neha Singh', 22, 'Female', '6543210987', 'neha.s@gmail.com', 'Student'),
      (5, 'Vikram Joshi', 40, 'Male', '9432109876', 'vikram.j@yahoo.com', 'None'),
      (6, 'Ananya Reddy', 19, 'Female', '8321098765', 'ananya.r@gmail.com', 'Student'),
      (7, 'Arun Khanna', 72, 'Male', '7210987654', 'arun.k@hotmail.com', 'Senior Citizen'),
      (8, 'Meera Desai', 30, 'Female', '6109876543', 'meera.d@gmail.com', 'None'),
      (9, 'Rajesh Iyer', 45, 'Male', '5098765432', 'rajesh.i@yahoo.com', 'None'),
      (10, 'Sonia Verma', 26, 'Female', '4987654321', 'sonia.v@gmail.com', 'None'),
      (11, 'Aditya Rao', 33, 'Male', '3876543210', 'aditya.r@yahoo.com', 'None'),
      (12, 'Pooja Mehta', 29, 'Female', '2765432109', 'pooja.m@gmail.com', 'None'),
      (13, 'Suresh Nair', 58, 'Male', '1654321098', 'suresh.n@hotmail.com', 'Senior Citizen'),
      (14, 'Kavita Choudhary', 24, 'Female', '9543210987', 'kavita.c@gmail.com', 'Student'),
      (15, 'Alok Mishra', 50, 'Male', '8432109876', 'alok.m@yahoo.com', 'None')
    `);

    // 6. Seats (20 records)
    await pool.query(`
      INSERT INTO Seat (SeatID, TrainID, ClassID, SeatNumber, AvailabilityStatus) VALUES
      (1, 1, 1, 'A1', 'Available'),
      (2, 1, 1, 'A2', 'Booked'),
      (3, 1, 2, 'B1', 'Available'),
      (4, 1, 2, 'B2', 'Reserved'),
      (5, 2, 3, 'C1', 'Available'),
      (6, 2, 4, 'D1', 'Booked'),
      (7, 3, 5, 'E1', 'Available'),
      (8, 3, 6, 'F1', 'Reserved'),
      (9, 4, 7, 'G1', 'Available'),
      (10, 5, 8, 'H1', 'Booked'),
      (11, 5, 9, 'I1', 'Available'),
      (12, 6, 10, 'J1', 'Reserved'),
      (13, 7, 11, 'K1', 'Available'),
      (14, 8, 12, 'L1', 'Booked'),
      (15, 9, 13, 'M1', 'Available'),
      (16, 10, 14, 'N1', 'Reserved'),
      (17, 11, 15, 'O1', 'Available'),
      (18, 12, 16, 'P1', 'Booked'),
      (19, 13, 17, 'Q1', 'Available'),
      (20, 14, 18, 'R1', 'Reserved')
    `);

    // 7. Tickets (15 records)
    await pool.query(`
      INSERT INTO Ticket (TicketID, PassengerID, TrainID, SeatID, ClassID, BookingStatus, PNRNumber, FareAmount) VALUES
      (1, 1, 1, 2, 1, 'Confirmed', 'PNR123456', 2076.00),
      (2, 2, 2, 6, 4, 'Confirmed', 'PNR234567', 3270.00),
      (3, 3, 3, 8, 6, 'RAC', 'PNR345678', 2330.40),
      (4, 4, 4, 9, 7, 'Confirmed', 'PNR456789', 4266.00),
      (5, 5, 5, 10, 8, 'Waitlist', 'PNR567890', 3555.00),
      (6, 6, 6, 12, 10, 'Confirmed', 'PNR678901', 6636.00),
      (7, 7, 7, 13, 11, 'Confirmed', 'PNR789012', 998.40),
      (8, 8, 8, 14, 12, 'RAC', 'PNR890123', 2736.00),
      (9, 9, 9, 15, 13, 'Confirmed', 'PNR901234', 2172.00),
      (10, 10, 10, 16, 14, 'Waitlist', 'PNR012345', 396.00),
      (11, 11, 11, 17, 15, 'Confirmed', 'PNR135792', 1907.40),
      (12, 12, 12, 18, 16, 'Confirmed', 'PNR246802', 425.60),
      (13, 13, 13, 19, 17, 'Confirmed', 'PNR357913', 5355.00),
      (14, 14, 14, 20, 18, 'RAC', 'PNR468024', 2299.50),
      (15, 15, 15, NULL, NULL, 'Waitlist', 'PNR579135', NULL)
    `);

    // 8. Payments (15 records)
    await pool.query(`
      INSERT INTO Payment (PaymentID, TicketID, AmountPaid, PaymentMode, PaymentStatus) VALUES
      (1, 1, 2076.00, 'Credit Card', 'Success'),
      (2, 2, 3270.00, 'Debit Card', 'Success'),
      (3, 3, 2330.40, 'UPI', 'Success'),
      (4, 4, 4266.00, 'Net Banking', 'Success'),
      (5, 5, NULL, 'Cash', 'Pending'),
      (6, 6, 6636.00, 'Credit Card', 'Success'),
      (7, 7, 998.40, 'Debit Card', 'Success'),
      (8, 8, 2736.00, 'UPI', 'Success'),
      (9, 9, 2172.00, 'Net Banking', 'Success'),
      (10, 10, NULL, 'Cash', 'Failed'),
      (11, 11, 1907.40, 'UPI', 'Success'),
      (12, 12, 425.60, 'Debit Card', 'Success'),
      (13, 13, 5355.00, 'Credit Card', 'Success'),
      (14, 14, 2299.50, 'Net Banking', 'Success'),
      (15, 15, NULL, 'Cash', 'Pending')
    `);

    // 9. Schedules (15 records)
    await pool.query(`
      INSERT INTO Schedule (ScheduleID, TrainID, DepartureTime, ArrivalTime, DayOfWeek) VALUES
      (1, 1, '17:00:00', '08:30:00', 'Monday'),
      (2, 2, '06:00:00', '23:30:00', 'Tuesday'),
      (3, 3, '22:20:00', '19:10:00', 'Wednesday'),
      (4, 4, '23:45:00', '06:15:00', 'Thursday'),
      (5, 5, '19:15:00', '12:30:00', 'Friday'),
      (6, 6, '12:30:00', '10:00:00', 'Saturday'),
      (7, 7, '07:00:00', '20:45:00', 'Sunday'),
      (8, 8, '16:20:00', '10:00:00', 'Monday'),
      (9, 9, '20:05:00', '09:30:00', 'Tuesday'),
      (10, 10, '07:15:00', '10:30:00', 'Wednesday'),
      (11, 11, '15:30:00', '06:45:00', 'Thursday'),
      (12, 12, '05:50:00', '11:00:00', 'Friday'),
      (13, 13, '14:00:00', '06:30:00', 'Saturday'),
      (14, 14, '18:10:00', '08:45:00', 'Sunday'),
      (15, 15, '06:30:00', '18:45:00', 'Monday')
    `);

    console.log('All data inserted successfully!');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    pool.end(); // Close the connection pool
  }
}


async function deleteAllData() {

  await pool.query('SET FOREIGN_KEY_CHECKS = 0');

  const tables = [
    'Payment',
    'Ticket',
    'Seat',
    'Schedule',
    'Route',
    'Class',
    'Passenger',
    'Train',
    'Station'
  ];

  for (const table of tables) {
    await pool.query(`DELETE FROM ${table}`);
    console.log(`Deleted all data from ${table}`);
  }

}

// uncomment for initial data insertion

// insertAllData();

// deleteAllData();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("Dev");
module.exports = app;

