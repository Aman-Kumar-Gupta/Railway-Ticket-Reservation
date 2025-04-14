# SQL QUERIES

## Procedure to find available trains and their seat

sql

 DELIMITER //

CREATE PROCEDURE findavailable(
    IN stationsrc VARCHAR(100),
    IN stationout VARCHAR(100),
    IN journeyDate DATE
)
BEGIN
    DECLARE sourceID INT;
    DECLARE destinationID INT;

    -- Get source and destination station IDs
    SELECT StationID INTO sourceID
    FROM Station
    WHERE StationName = stationsrc
    LIMIT 1;

    SELECT StationID INTO destinationID
    FROM Station
    WHERE StationName = stationout
    LIMIT 1;

    -- Show available seats on trains between source and destination for the given date
    SELECT 
        s.SeatNumber,
        t.TrainName,
        c.ClassType,
        sa.JourneyDate,
        sa.AvailabilityStatus,
        calculate_fare(t.TrainID, c.ClassID) AS Fare
    FROM Seat s
    JOIN Train t ON s.TrainID = t.TrainID
    JOIN Class c ON s.ClassID = c.ClassID AND s.TrainID = c.TrainID
    JOIN SeatAvailability sa ON s.SeatID = sa.SeatID
    WHERE sa.AvailabilityStatus = 'Available'
      AND sa.JourneyDate = journeyDate
      AND t.SourceStationID = sourceID
      AND t.DestinationStationID = destinationID;
END //

DELIMITER ;

```

## Get train name by stations

```sql
DELIMITER //

CREATE PROCEDURE findtrain_bystations(
    IN stationsrc VARCHAR(100),
    IN stationout VARCHAR(100)
)
BEGIN
    DECLARE sourceID INT;
    DECLARE destinationID INT;

    -- Get source and destination station IDs
    SELECT StationID INTO sourceID
    FROM Station
    WHERE StationName = stationsrc
    LIMIT 1;

    SELECT StationID INTO destinationID
    FROM Station
    WHERE StationName = stationout
    LIMIT 1;

    -- Return matching trains with arrival and departure times
    SELECT 
        t.TrainID,
        t.TrainName,
        t.TrainNumber,
        s1.StationName AS SourceStation,
        s2.StationName AS DestinationStation,
        sch.ArrivalTime,
        sch.DepartureTime
    FROM Train t
    JOIN Station s1 ON t.SourceStationID = s1.StationID
    JOIN Station s2 ON t.DestinationStationID = s2.StationID
    JOIN Schedule sch ON t.TrainID = sch.TrainID
    WHERE t.SourceStationID = sourceID
      AND t.DestinationStationID = destinationID;
END //

DELIMITER ;
```

## Get train by train number

```sql
DELIMITER //
CREATE PROCEDURE findtrain_bytrainnumber(
    IN train_number VARCHAR(10)
)
BEGIN
    SELECT 
        t.TrainID,
        t.TrainName,
        t.TrainNumber,
        s1.StationName AS SourceStation,
        s2.StationName AS DestinationStation,
        sch.DepartureTime,
        sch.ArrivalTime
    FROM Train t
    JOIN Station s1 ON t.SourceStationID = s1.StationID
    JOIN Station s2 ON t.DestinationStationID = s2.StationID
    JOIN Schedule sch ON t.TrainID = sch.TrainID
    WHERE t.TrainNumber = train_number;
END //

DELIMITER ;
```

## Get train schedule

```sql
DELIMITER //

CREATE PROCEDURE show_train_schedule(IN inputTrainName VARCHAR(100))
BEGIN
    -- Show the full schedule for the train using the name
    SELECT 
        t.TrainName,
        t.TrainNumber,
        ss.StationName AS SourceStation,
        ds.StationName AS DestinationStation,
        s.DayOfWeek,
        s.DepartureTime,
        s.ArrivalTime
    FROM Train t
    JOIN Schedule s ON t.TrainID = s.TrainID
    JOIN Station ss ON t.SourceStationID = ss.StationID
    JOIN Station ds ON t.DestinationStationID = ds.StationID
    WHERE t.TrainName = inputTrainName;
END //

DELIMITER ;
```

## GET PNR Status

```sql
DELIMITER //

CREATE PROCEDURE GetTicketSummaryByPNR(IN pnrNumber VARCHAR(20))
BEGIN
    SELECT 
        tr.TrainNumber,
        tr.TrainName,
        DATE_FORMAT(NOW(), '%Y-%m-%d') AS JourneyDate, -- You'll need a journey date field
        st_src.StationName AS SourceStation,
        st_dest.StationName AS DestinationStation,
        p.Name AS PassengerName,
        p.Age,
        p.Gender,
        c.ClassType,
        t.BookingStatus,
        CONCAT(COALESCE(s.SeatNumber, 'N/A'), 
               IF(t.BookingStatus = 'RAC', CONCAT(' / RAC ', t.TicketID), '')) AS CoachSeat,
        DATE_FORMAT(NOW(), '%Y-%m-%d') AS BookingDate, -- You'll need a booking date field
        t.FareAmount AS TotalFare
    FROM 
        Ticket t
    JOIN 
        Passenger p ON t.PassengerID = p.PassengerID
    JOIN 
        Train tr ON t.TrainID = tr.TrainID
    LEFT JOIN 
        Seat s ON t.SeatID = s.SeatID
    LEFT JOIN 
        Class c ON t.ClassID = c.ClassID
    JOIN 
        Station st_src ON tr.SourceStationID = st_src.StationID
    JOIN 
        Station st_dest ON tr.DestinationStationID = st_dest.StationID
    WHERE 
        t.PNRNumber = pnrNumber;
END //

DELIMITER ;
```

## Calcuate Fare

```sql
DELIMITER //

CREATE FUNCTION calculate_fare (
    train_id INT,
    class_id INT
)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE distance DECIMAL(10,2);
    DECLARE base_fare_per_km DECIMAL(10,2);
    DECLARE fare_multiplier DECIMAL(5,2);
    DECLARE fare DECIMAL(10,2);
    
    -- Get the distance for the route
    SELECT r.Distance INTO distance
    FROM Route r
    WHERE r.TrainID = train_id
    LIMIT 1;
    
    -- Get base fare and multiplier
    SELECT c.BaseFarePerKM, c.FareMultiplier INTO base_fare_per_km, fare_multiplier
    FROM Class c
    WHERE c.ClassID = class_id AND c.TrainID = train_id
    LIMIT 1;
    
    -- Calculate fare without concession
    SET fare = distance * base_fare_per_km * fare_multiplier;
    
    RETURN fare;
END //

DELIMITER ;
```

## Update Trigger on booking

```sql
DELIMITER $$


CREATE TRIGGER after_ticket_insert
AFTER INSERT ON Ticket
FOR EACH ROW    
BEGIN
    UPDATE Seat SET AvailabilityStatus = 'Booked'
    WHERE SeatID = NEW.SeatID;
END $$

DELIMITER ;
```


## Book_ticket

```sql

DELIMITER $$

CREATE PROCEDURE book_ticket (
    IN p_name VARCHAR(100),
    IN p_age INT,
    IN p_gender VARCHAR(10),
    IN p_concession_category VARCHAR(100),
    IN p_train_number VARCHAR(10),
    IN p_class_type VARCHAR(50),
    IN p_journey_date DATE,
    IN p_payment_mode ENUM('Credit Card','Debit Card','UPI','Net Banking','Cash')
)
BEGIN
    DECLARE train_id INT;
    DECLARE class_id INT;
    DECLARE seat_id INT;
    DECLARE booking_status ENUM('Confirmed', 'RAC', 'Waitlist');
    DECLARE available_count INT;
    DECLARE rac_count INT DEFAULT 0;
    DECLARE wl_count INT DEFAULT 0;
    DECLARE fare DECIMAL(10,2);
    DECLARE passenger_id INT;
    DECLARE concess DECIMAL(5,2);
    DECLARE ticket_id INT;

    -- Start label
    book_ticket: BEGIN

        -- 1. Get train_id
        SELECT TrainID INTO train_id
        FROM Train
        WHERE TrainNumber = p_train_number
        LIMIT 1;

        -- 2. Get class_id
        SELECT ClassID INTO class_id
        FROM Class
        WHERE TrainID = train_id AND ClassType = p_class_type
        LIMIT 1;

        -- 3. Check confirmed seat availability on the journey date
        SELECT COUNT(*) INTO available_count
        FROM Seat
        JOIN SeatAvailability ON Seat.SeatID = SeatAvailability.SeatID
        WHERE Seat.TrainID = train_id AND Seat.ClassID = class_id
          AND SeatAvailability.JourneyDate = p_journey_date
          AND SeatAvailability.AvailabilityStatus = 'Available';

        IF available_count > 0 THEN
            SET booking_status = 'Confirmed';

            SELECT Seat.SeatID INTO seat_id
            FROM Seat
            JOIN SeatAvailability ON Seat.SeatID = SeatAvailability.SeatID
            WHERE Seat.TrainID = train_id AND Seat.ClassID = class_id
              AND SeatAvailability.JourneyDate = p_journey_date
              AND SeatAvailability.AvailabilityStatus = 'Available'
            LIMIT 1;

            -- Update seat to booked for that date
            UPDATE SeatAvailability
            SET AvailabilityStatus = 'Booked'
            WHERE SeatID = seat_id AND JourneyDate = p_journey_date;

        ELSE
            -- Check RAC count for this train/class on this date
            SELECT COUNT(*) INTO rac_count
            FROM Ticket
            WHERE TrainID = train_id AND ClassID = class_id AND BookingStatus = 'RAC';

            IF rac_count < 5 THEN
                SET booking_status = 'RAC';
                SET seat_id = NULL;
            ELSE
                -- Check Waitlist
                SELECT COUNT(*) INTO wl_count
                FROM Ticket
                WHERE TrainID = train_id AND ClassID = class_id AND BookingStatus = 'Waitlist';

                IF wl_count < 10 THEN
                    SET booking_status = 'Waitlist';
                    SET seat_id = NULL;
                ELSE
                    -- All full
                    SELECT 'Booking failed: No seats available including RAC and Waitlist' AS Message;
                    LEAVE book_ticket;
                END IF;
            END IF;
        END IF;

        -- Insert passenger
        INSERT INTO Passenger (Name, Age, Gender, ConcessionCategory)
        VALUES (p_name, p_age, p_gender, p_concession_category);

        SET passenger_id = LAST_INSERT_ID();

        -- Calculate fare
        SELECT Discount INTO concess
        FROM Concession
        WHERE ConcessionType = p_concession_category
        LIMIT 1;

        SET fare = (calculate_fare(train_id, class_id) * (100 - concess) / 100);

        -- Generate PNR
        SET @pnr = CONCAT('PNR', LPAD(FLOOR(RAND() * 1000000), 6, '0'));

        -- Insert ticket
        INSERT INTO Ticket (PassengerID, TrainID, SeatID, ClassID, BookingStatus, PNRNumber, JourneyDate, FareAmount)
        VALUES (passenger_id, train_id, seat_id, class_id, booking_status, @pnr, p_journey_date, fare);

        SET ticket_id = LAST_INSERT_ID();

        -- Insert payment
        INSERT INTO Payment (TicketID, AmountPaid, PaymentMode, PaymentStatus)
        VALUES (ticket_id, fare, p_payment_mode, 'Success');

        -- Return result
        SELECT 'Booking successful' AS Message,
               @pnr AS PNR,
               booking_status AS Status,
               fare AS Fare;

    END book_ticket;
END$$

DELIMITER ;

```

## Genrate Itemizied Bill

```sql

CREATE PROCEDURE generate_itemized_bill (
    IN input_ticket_id INT
)
BEGIN
    DECLARE passenger_name VARCHAR(100);
    DECLARE concession_category VARCHAR(100);
    DECLARE train_name VARCHAR(100);
    DECLARE class_type VARCHAR(100);
    DECLARE distance_travelled DECIMAL(10,2) DEFAULT 0;
    DECLARE base_fare_per_km DECIMAL(10,2) DEFAULT 0;
    DECLARE fare_multiplier DECIMAL(5,2) DEFAULT 1.0;
    DECLARE discount DECIMAL(5,2) DEFAULT 0;
    DECLARE base_fare DECIMAL(10,2) DEFAULT 0;
    DECLARE total_fare DECIMAL(10,2) DEFAULT 0;
    DECLARE payment_mode enum('Credit Card','Debit Card','UPI','Net Banking','Cash')  ;

    DECLARE train_id INT;
    DECLARE class_id INT;
    DECLARE passenger_id INT;
    DECLARE src_id INT;
    DECLARE dest_id INT;

    -- Step 1: Get PassengerID, TrainID, ClassID
    SELECT PassengerID, TrainID, ClassID 
    INTO passenger_id, train_id, class_id
    FROM Ticket 
    WHERE TicketID = input_ticket_id;

    -- Step 2: Get passenger details
    SELECT Name, ConcessionCategory 
    INTO passenger_name, concession_category
    FROM Passenger 
    WHERE PassengerID = passenger_id;

    -- Step 3: Get train name, source and destination
    SELECT TrainName, SourceStationID, DestinationStationID 
    INTO train_name, src_id, dest_id
    FROM Train 
    WHERE TrainID = train_id;

    -- Step 4: Get class details
    SELECT ClassType, BaseFarePerKM, FareMultiplier 
    INTO class_type, base_fare_per_km, fare_multiplier
    FROM Class 
    WHERE TrainID = train_id AND ClassID = class_id;

    -- Step 5: Get the route distance using source and destination
    SELECT Distance 
    INTO distance_travelled
    FROM Route 
    WHERE TrainID = train_id 
    LIMIT 1;

    -- Step 6: Get concession discount
    SELECT Discount 
    INTO discount
    FROM Concession 
    WHERE ConcessionType = concession_category;

    -- Step 7: Calculate fares
    SET base_fare = distance_travelled * base_fare_per_km * fare_multiplier;
    SET total_fare = base_fare - (base_fare * (discount / 100));
	
    Select PaymentMode into payment_mode from Payment where TicketID=input_ticket_id;
    -- Final: Show the itemized bill
    SELECT 
        input_ticket_id AS TicketID,
        passenger_name AS PassengerName,
        train_name AS TrainName,
        class_type AS ClassType,
        distance_travelled AS DistanceKM,
        base_fare_per_km AS BaseFarePerKM,
        fare_multiplier AS FareMultiplier,
        base_fare AS BaseFare,
        discount AS DiscountPercent,
        total_fare AS FinalFare,
        payment_mode AS PaymentMode;
END //

DELIMITER ;

```

## Find Busiest Route

```sql

DELIMITER //

CREATE PROCEDURE find_busiest_route()
BEGIN
    SELECT 
        s.StationName AS SourceStation,
        d.StationName AS DestinationStation,
        r.Distance,
        COUNT(t.TicketID) AS PassengerCount
    FROM Ticket t
    JOIN Train tr ON t.TrainID = tr.TrainID
    JOIN Route r ON r.TrainID = tr.TrainID 
                 AND r.SourceStationID = tr.SourceStationID 
                 AND r.DestinationStationID = tr.DestinationStationID
    JOIN Station s ON s.StationID = r.SourceStationID
    JOIN Station d ON d.StationID = r.DestinationStationID
    WHERE t.BookingStatus = 'Confirmed'
    GROUP BY r.SourceStationID, r.DestinationStationID, r.Distance
    ORDER BY PassengerCount DESC
    LIMIT 5;
END //

DELIMITER ;
```

## List all passengers traveling on a specific train on a given date

```sql
BEGIN
    DECLARE train_id INT;

    -- Get train_id from the Train table based on the train name
    SELECT TrainID INTO train_id
    FROM Train
    WHERE TrainName = p_train_name
    LIMIT 1;

    -- Show passenger details with their booking status for the specified train and journey date
    SELECT 
        p.Name AS PassengerName,
        p.Age AS Age,
        p.Gender AS Gender,
        tk.BookingStatus AS Status
    FROM Ticket tk
    JOIN Passenger p ON tk.PassengerID = p.PassengerID
    WHERE tk.TrainID = train_id
      AND tk.JourneyDate = p_journey_date;
END //

DELIMITER ;
```

## Revenue Calcuation

```sql

DELIMITER $$

CREATE FUNCTION calculate_revenue(
    start_date DATE,
    end_date DATE
)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE total_revenue DECIMAL(10,2);

    -- Calculate total revenue for the given date range
    SELECT SUM(FareAmount) INTO total_revenue
    FROM Ticket
    WHERE JourneyDate BETWEEN start_date AND end_date;

    -- If no tickets are found, return 0
    IF total_revenue IS NULL THEN
        SET total_revenue = 0;
    END IF;

    RETURN total_revenue;
END $$

DELIMITER ;
```

## Refund Amount
```sql

DELIMITER $$

CREATE FUNCTION refund_amount(p_pnr VARCHAR(20)) 
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE ticket_id INT;
    DECLARE booking_status ENUM('Confirmed', 'RAC', 'Waitlist');
    DECLARE fare_amount DECIMAL(10,2);
    DECLARE refund DECIMAL(10,2);

    -- Retrieve the ticket details based on the provided PNR number
    SELECT TicketID, BookingStatus, FareAmount INTO ticket_id, booking_status, fare_amount
    FROM Ticket
    WHERE PNRNumber = p_pnr
    LIMIT 1;

    -- If ticket not found, return 0 (or could return NULL to indicate no refund)
    IF ticket_id IS NULL THEN
        RETURN 0;
    END IF;

    -- Calculate refund based on the booking status
    IF booking_status = 'Confirmed' THEN
        SET refund = fare_amount*0.50;  -- Full refund for confirmed tickets
    ELSEIF booking_status = 'RAC' THEN
        SET refund = fare_amount * 0.70;  -- 50% refund for RAC tickets
    ELSEIF booking_status = 'Waitlist' THEN
        SET refund = fare_amount * 0.90;  -- 20% refund for Waitlist tickets
    ELSE
        SET refund = 0;  -- No refund for other statuses
    END IF;

    -- Return the calculated refund amount
    RETURN refund;
END $$

DELIMITER ;
```



## get user bookings

```sql

DELIMITER $$

CREATE PROCEDURE get_user_bookings(IN input_passenger_id INT)
BEGIN
  SELECT
    t.TicketID,
    t.PNRNumber,
    t.JourneyDate,
    t.BookingStatus,
    t.FareAmount,
    tr.TrainNumber,
    tr.TrainName,
    s1.StationName AS FromStation,
    s2.StationName AS ToStation,
    c.ClassType,
    p.Name
  FROM Ticket t
  JOIN Train tr ON t.TrainID = tr.TrainID
  JOIN Route r ON tr.TrainID = r.TrainID
  JOIN Station s1 ON r.SourceStationID = s1.StationID
  JOIN Station s2 ON r.DestinationStationID = s2.StationID
  JOIN Class c ON t.ClassID = c.ClassID
  JOIN Passenger p ON t.PassengerID = p.PassengerID
  WHERE t.PassengerID = input_passenger_id
  ORDER BY t.JourneyDate DESC;
END$$

DELIMITER ;

```



## Cancel Ticket

```sql
DELIMITER $$

CREATE PROCEDURE cancel_ticket(
    IN p_pnr VARCHAR(20)
)
BEGIN
    -- Declare variables
    DECLARE ticket_id INT;
    DECLARE seat_id INT;
    DECLARE train_id INT;
    DECLARE class_id INT;
    DECLARE journey_date DATE;
    DECLARE booking_status VARCHAR(20);
    DECLARE rac_ticket_id INT DEFAULT NULL;
    DECLARE wl_ticket_id INT DEFAULT NULL;

    -- Fetch Ticket Info
    SELECT TicketID, SeatID, TrainID, ClassID, JourneyDate, BookingStatus
    INTO ticket_id, seat_id, train_id, class_id, journey_date, booking_status
    FROM Ticket
    WHERE PNRNumber = p_pnr;

    -- Update ticket status to Cancelled
    UPDATE Ticket
    SET BookingStatus = 'Cancelled'
    WHERE TicketID = ticket_id;

    -- Update payment status to Refund
    UPDATE Payment
    SET PaymentStatus = 'Refund'
    WHERE TicketID = ticket_id;

    -- CASE 1: Confirmed ticket cancelled
    IF booking_status = 'Confirmed' AND seat_id IS NOT NULL THEN

        -- Assign seat to first RAC passenger if exists
        SELECT TicketID INTO rac_ticket_id
        FROM Ticket
        WHERE TrainID = train_id AND ClassID = class_id
              AND JourneyDate = journey_date
              AND BookingStatus = 'RAC'
        ORDER BY TicketID
        LIMIT 1;

        IF rac_ticket_id IS NOT NULL THEN
            -- Assign the seat to RAC passenger
            UPDATE Ticket
            SET SeatID = seat_id, BookingStatus = 'Confirmed'
            WHERE TicketID = rac_ticket_id;

            -- Promote one waitlist passenger to RAC
            SELECT TicketID INTO wl_ticket_id
            FROM Ticket
            WHERE TrainID = train_id AND ClassID = class_id
                  AND JourneyDate = journey_date
                  AND BookingStatus = 'Waitlist'
            ORDER BY TicketID
            LIMIT 1;

            IF wl_ticket_id IS NOT NULL THEN
                UPDATE Ticket
                SET BookingStatus = 'RAC'
                WHERE TicketID = wl_ticket_id;
            END IF;
        ELSE
            -- No RAC passengers: make seat available
            UPDATE SeatAvailability
            SET AvailabilityStatus = 'Available'
            WHERE SeatID = seat_id AND JourneyDate = journey_date;
        END IF;

    -- CASE 2: RAC ticket cancelled
    ELSEIF booking_status = 'RAC' THEN
        -- Promote one waitlist passenger to RAC
        SELECT TicketID INTO wl_ticket_id
        FROM Ticket
        WHERE TrainID = train_id AND ClassID = class_id
              AND JourneyDate = journey_date
              AND BookingStatus = 'Waitlist'
        ORDER BY TicketID
        LIMIT 1;

        IF wl_ticket_id IS NOT NULL THEN
            UPDATE Ticket
            SET BookingStatus = 'RAC'
            WHERE TicketID = wl_ticket_id;
        END IF;
    END IF;

    SELECT 'Ticket cancelled successfully and updates done' AS Message;
END$$

DELIMITER ;
```

