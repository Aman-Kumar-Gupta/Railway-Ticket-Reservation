CREATE DATABASE  IF NOT EXISTS `RailwayReservation` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `RailwayReservation`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: yamabiko.proxy.rlwy.net    Database: RailwayReservation
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Class`
--

DROP TABLE IF EXISTS `Class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Class` (
  `ClassID` int NOT NULL AUTO_INCREMENT,
  `TrainID` int DEFAULT NULL,
  `ClassType` enum('Sleeper','AC 3-tier','AC 2-tier','First Class','Second Class','General') DEFAULT NULL,
  `TotalSeats` int NOT NULL,
  `FareMultiplier` decimal(3,2) NOT NULL,
  `BaseFarePerKM` decimal(5,2) NOT NULL,
  PRIMARY KEY (`ClassID`),
  KEY `TrainID` (`TrainID`),
  CONSTRAINT `Class_ibfk_1` FOREIGN KEY (`TrainID`) REFERENCES `Train` (`TrainID`)
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Class`
--

LOCK TABLES `Class` WRITE;
/*!40000 ALTER TABLE `Class` DISABLE KEYS */;
INSERT INTO `Class` VALUES (1,1,'AC 3-tier',64,1.50,0.50),(2,1,'AC 2-tier',48,2.00,0.50),(3,1,'First Class',24,3.00,0.50),(4,1,'Second Class',120,0.80,0.50),(5,1,'General',300,0.50,0.50),(6,2,'AC 3-tier',64,1.50,0.50),(7,2,'AC 2-tier',48,2.00,0.50),(8,2,'First Class',24,3.00,0.50),(9,2,'Second Class',120,0.80,0.50),(10,2,'General',300,0.50,0.50),(11,3,'AC 3-tier',64,1.50,0.50),(12,3,'AC 2-tier',48,2.00,0.50),(13,3,'First Class',24,3.00,0.50),(14,3,'Second Class',120,0.80,0.50),(15,3,'General',300,0.50,0.50),(16,4,'AC 3-tier',64,1.50,0.50),(17,4,'AC 2-tier',48,2.00,0.50),(18,4,'First Class',24,3.00,0.50),(19,4,'Second Class',120,0.80,0.50),(20,4,'General',300,0.50,0.50),(21,5,'AC 3-tier',64,1.50,0.50),(22,5,'AC 2-tier',48,2.00,0.50),(23,5,'First Class',24,3.00,0.50),(24,5,'Second Class',120,0.80,0.50),(25,5,'General',300,0.50,0.50),(26,6,'AC 3-tier',64,1.50,0.50),(27,6,'AC 2-tier',48,2.00,0.50),(28,6,'First Class',24,3.00,0.50),(29,6,'Second Class',120,0.80,0.50),(30,6,'General',300,0.50,0.50),(31,7,'AC 3-tier',64,1.50,0.50),(32,7,'AC 2-tier',48,2.00,0.50),(33,7,'First Class',24,3.00,0.50),(34,7,'Second Class',120,0.80,0.50),(35,7,'General',300,0.50,0.50),(36,8,'AC 3-tier',64,1.50,0.50),(37,8,'AC 2-tier',48,2.00,0.50),(38,8,'First Class',24,3.00,0.50),(39,8,'Second Class',120,0.80,0.50),(40,8,'General',300,0.50,0.50),(41,9,'AC 3-tier',64,1.50,0.50),(42,9,'AC 2-tier',48,2.00,0.50),(43,9,'First Class',24,3.00,0.50),(44,9,'Second Class',120,0.80,0.50),(45,9,'General',300,0.50,0.50),(46,10,'AC 3-tier',64,1.50,0.50),(47,10,'AC 2-tier',48,2.00,0.50),(48,10,'First Class',24,3.00,0.50),(49,10,'Second Class',120,0.80,0.50),(50,10,'General',300,0.50,0.50),(51,11,'AC 3-tier',64,1.50,0.50),(52,11,'AC 2-tier',48,2.00,0.50),(53,11,'First Class',24,3.00,0.50),(54,11,'Second Class',120,0.80,0.50),(55,11,'General',300,0.50,0.50),(56,12,'AC 3-tier',64,1.50,0.50),(57,12,'AC 2-tier',48,2.00,0.50),(58,12,'First Class',24,3.00,0.50),(59,12,'Second Class',120,0.80,0.50),(60,12,'General',300,0.50,0.50),(61,13,'AC 3-tier',64,1.50,0.50),(62,13,'AC 2-tier',48,2.00,0.50),(63,13,'First Class',24,3.00,0.50),(64,13,'Second Class',120,0.80,0.50),(65,13,'General',300,0.50,0.50),(66,14,'AC 3-tier',64,1.50,0.50),(67,14,'AC 2-tier',48,2.00,0.50),(68,14,'First Class',24,3.00,0.50),(69,14,'Second Class',120,0.80,0.50),(70,14,'General',300,0.50,0.50),(71,15,'AC 3-tier',64,1.50,0.50),(72,15,'AC 2-tier',48,2.00,0.50),(73,15,'First Class',24,3.00,0.50),(74,15,'Second Class',120,0.80,0.50),(75,15,'General',300,0.50,0.50),(76,16,'AC 3-tier',64,1.50,0.50),(77,16,'AC 2-tier',48,2.00,0.50),(78,16,'First Class',24,3.00,0.50),(79,16,'Second Class',120,0.80,0.50),(80,16,'General',300,0.50,0.50),(81,17,'AC 3-tier',64,1.50,0.50),(82,17,'AC 2-tier',48,2.00,0.50),(83,17,'First Class',24,3.00,0.50),(84,17,'Second Class',120,0.80,0.50),(85,17,'General',300,0.50,0.50),(86,18,'AC 3-tier',64,1.50,0.50),(87,18,'AC 2-tier',48,2.00,0.50),(88,18,'First Class',24,3.00,0.50),(89,18,'Second Class',120,0.80,0.50),(90,18,'General',300,0.50,0.50),(91,19,'AC 3-tier',64,1.50,0.50),(92,19,'AC 2-tier',48,2.00,0.50),(93,19,'First Class',24,3.00,0.50),(94,19,'Second Class',120,0.80,0.50),(95,19,'General',300,0.50,0.50),(96,20,'AC 3-tier',64,1.50,0.50),(97,20,'AC 2-tier',48,2.00,0.50),(98,20,'First Class',24,3.00,0.50),(99,20,'Second Class',120,0.80,0.50),(100,20,'General',300,0.50,0.50),(101,21,'AC 3-tier',64,1.50,0.50),(102,21,'AC 2-tier',48,2.00,0.50),(103,21,'First Class',24,3.00,0.50),(104,21,'Second Class',120,0.80,0.50),(105,21,'General',300,0.50,0.50),(106,22,'AC 3-tier',64,1.50,0.50),(107,22,'AC 2-tier',48,2.00,0.50),(108,22,'First Class',24,3.00,0.50),(109,22,'Second Class',120,0.80,0.50),(110,22,'General',300,0.50,0.50),(111,23,'AC 3-tier',64,1.50,0.50),(112,23,'AC 2-tier',48,2.00,0.50),(113,23,'First Class',24,3.00,0.50),(114,23,'Second Class',120,0.80,0.50),(115,23,'General',300,0.50,0.50),(116,24,'AC 3-tier',64,1.50,0.50),(117,24,'AC 2-tier',48,2.00,0.50),(118,24,'First Class',24,3.00,0.50),(119,24,'Second Class',120,0.80,0.50),(120,24,'General',300,0.50,0.50),(121,25,'AC 3-tier',64,1.50,0.50),(122,25,'AC 2-tier',48,2.00,0.50),(123,25,'First Class',24,3.00,0.50),(124,25,'Second Class',120,0.80,0.50),(125,25,'General',300,0.50,0.50),(126,26,'AC 3-tier',64,1.50,0.50),(127,26,'AC 2-tier',48,2.00,0.50),(128,26,'First Class',24,3.00,0.50),(129,26,'Second Class',120,0.80,0.50),(130,26,'General',300,0.50,0.50),(131,27,'AC 3-tier',64,1.50,0.50),(132,27,'AC 2-tier',48,2.00,0.50),(133,27,'First Class',24,3.00,0.50),(134,27,'Second Class',120,0.80,0.50),(135,27,'General',300,0.50,0.50),(136,28,'AC 3-tier',64,1.50,0.50),(137,28,'AC 2-tier',48,2.00,0.50),(138,28,'First Class',24,3.00,0.50),(139,28,'Second Class',120,0.80,0.50),(140,28,'General',300,0.50,0.50),(141,29,'AC 3-tier',64,1.50,0.50),(142,29,'AC 2-tier',48,2.00,0.50),(143,29,'First Class',24,3.00,0.50),(144,29,'Second Class',120,0.80,0.50),(145,29,'General',300,0.50,0.50),(146,30,'AC 3-tier',64,1.50,0.50),(147,30,'AC 2-tier',48,2.00,0.50),(148,30,'First Class',24,3.00,0.50),(149,30,'Second Class',120,0.80,0.50),(150,30,'General',300,0.50,0.50),(151,31,'AC 3-tier',64,1.50,0.50),(152,31,'AC 2-tier',48,2.00,0.50),(153,31,'First Class',24,3.00,0.50),(154,31,'Second Class',120,0.80,0.50),(155,31,'General',300,0.50,0.50),(156,32,'AC 3-tier',64,1.50,0.50),(157,32,'AC 2-tier',48,2.00,0.50),(158,32,'First Class',24,3.00,0.50),(159,32,'Second Class',120,0.80,0.50),(160,32,'General',300,0.50,0.50),(161,33,'AC 3-tier',64,1.50,0.50),(162,33,'AC 2-tier',48,2.00,0.50),(163,33,'First Class',24,3.00,0.50),(164,33,'Second Class',120,0.80,0.50),(165,33,'General',300,0.50,0.50),(166,34,'AC 3-tier',64,1.50,0.50),(167,34,'AC 2-tier',48,2.00,0.50),(168,34,'First Class',24,3.00,0.50),(169,34,'Second Class',120,0.80,0.50),(170,34,'General',300,0.50,0.50),(171,35,'AC 3-tier',64,1.50,0.50),(172,35,'AC 2-tier',48,2.00,0.50),(173,35,'First Class',24,3.00,0.50),(174,35,'Second Class',120,0.80,0.50),(175,35,'General',300,0.50,0.50),(176,36,'AC 3-tier',64,1.50,0.50),(177,36,'AC 2-tier',48,2.00,0.50),(178,36,'First Class',24,3.00,0.50),(179,36,'Second Class',120,0.80,0.50),(180,36,'General',300,0.50,0.50),(181,37,'AC 3-tier',64,1.50,0.50),(182,37,'AC 2-tier',48,2.00,0.50),(183,37,'First Class',24,3.00,0.50),(184,37,'Second Class',120,0.80,0.50),(185,37,'General',300,0.50,0.50),(186,38,'AC 3-tier',64,1.50,0.50),(187,38,'AC 2-tier',48,2.00,0.50),(188,38,'First Class',24,3.00,0.50),(189,38,'Second Class',120,0.80,0.50),(190,38,'General',300,0.50,0.50),(191,39,'AC 3-tier',64,1.50,0.50),(192,39,'AC 2-tier',48,2.00,0.50),(193,39,'First Class',24,3.00,0.50),(194,39,'Second Class',120,0.80,0.50),(195,39,'General',300,0.50,0.50),(196,40,'AC 3-tier',64,1.50,0.50),(197,40,'AC 2-tier',48,2.00,0.50),(198,40,'First Class',24,3.00,0.50),(199,40,'Second Class',120,0.80,0.50),(200,40,'General',300,0.50,0.50),(201,41,'AC 3-tier',64,1.50,0.50),(202,41,'AC 2-tier',48,2.00,0.50),(203,41,'First Class',24,3.00,0.50),(204,41,'Second Class',120,0.80,0.50),(205,41,'General',300,0.50,0.50),(206,42,'AC 3-tier',64,1.50,0.50),(207,42,'AC 2-tier',48,2.00,0.50),(208,42,'First Class',24,3.00,0.50),(209,42,'Second Class',120,0.80,0.50),(210,42,'General',300,0.50,0.50),(211,43,'AC 3-tier',64,1.50,0.50),(212,43,'AC 2-tier',48,2.00,0.50),(213,43,'First Class',24,3.00,0.50),(214,43,'Second Class',120,0.80,0.50),(215,43,'General',300,0.50,0.50),(216,44,'AC 3-tier',64,1.50,0.50),(217,44,'AC 2-tier',48,2.00,0.50),(218,44,'First Class',24,3.00,0.50),(219,44,'Second Class',120,0.80,0.50),(220,44,'General',300,0.50,0.50),(221,45,'AC 3-tier',64,1.50,0.50),(222,45,'AC 2-tier',48,2.00,0.50),(223,45,'First Class',24,3.00,0.50),(224,45,'Second Class',120,0.80,0.50),(225,45,'General',300,0.50,0.50),(226,46,'AC 3-tier',64,1.50,0.50),(227,46,'AC 2-tier',48,2.00,0.50),(228,46,'First Class',24,3.00,0.50),(229,46,'Second Class',120,0.80,0.50),(230,46,'General',300,0.50,0.50),(231,47,'AC 3-tier',64,1.50,0.50),(232,47,'AC 2-tier',48,2.00,0.50),(233,47,'First Class',24,3.00,0.50),(234,47,'Second Class',120,0.80,0.50),(235,47,'General',300,0.50,0.50),(236,48,'AC 3-tier',64,1.50,0.50),(237,48,'AC 2-tier',48,2.00,0.50),(238,48,'First Class',24,3.00,0.50),(239,48,'Second Class',120,0.80,0.50),(240,48,'General',300,0.50,0.50),(241,49,'AC 3-tier',64,1.50,0.50),(242,49,'AC 2-tier',48,2.00,0.50),(243,49,'First Class',24,3.00,0.50),(244,49,'Second Class',120,0.80,0.50),(245,49,'General',300,0.50,0.50),(246,50,'AC 3-tier',64,1.50,0.50),(247,50,'AC 2-tier',48,2.00,0.50),(248,50,'First Class',24,3.00,0.50),(249,50,'Second Class',120,0.80,0.50),(250,50,'General',300,0.50,0.50);
/*!40000 ALTER TABLE `Class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Concession`
--

DROP TABLE IF EXISTS `Concession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Concession` (
  `ConcessionID` int NOT NULL AUTO_INCREMENT,
  `ConcessionType` varchar(100) NOT NULL,
  `Discount` decimal(5,2) NOT NULL COMMENT 'Percentage discount (e.g., 20.00 for 20%)',
  PRIMARY KEY (`ConcessionID`),
  UNIQUE KEY `ConcessionType` (`ConcessionType`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Concession`
--

LOCK TABLES `Concession` WRITE;
/*!40000 ALTER TABLE `Concession` DISABLE KEYS */;
INSERT INTO `Concession` VALUES (1,'None',0.00),(2,'Senior Citizen',40.00),(3,'Student',25.00),(4,'Military',50.00),(5,'Divyang',75.00);
/*!40000 ALTER TABLE `Concession` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Passenger`
--

DROP TABLE IF EXISTS `Passenger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Passenger` (
  `PassengerID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Age` int NOT NULL,
  `Gender` enum('Male','Female','Other') NOT NULL,
  `ConcessionCategory` enum('None','Senior Citizen','Student','Military','Divyang') DEFAULT 'None',
  PRIMARY KEY (`PassengerID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Passenger`
--

LOCK TABLES `Passenger` WRITE;
/*!40000 ALTER TABLE `Passenger` DISABLE KEYS */;
INSERT INTO `Passenger` VALUES (1,'Passenger_253',37,'Female','Student'),(2,'Passenger_445',21,'Male','None'),(3,'Passenger_659',35,'Male','Student'),(4,'Passenger_62',45,'Male','Senior Citizen'),(5,'Passenger_230',27,'Female','Student'),(6,'Passenger_675',45,'Male','None'),(7,'Passenger_74',32,'Female','Student'),(8,'Passenger_932',52,'Male','None'),(9,'Passenger_112',58,'Female','Student'),(10,'Passenger_259',51,'Male','Military'),(11,'Passenger_11',31,'Female','Divyang'),(12,'Passenger_264',19,'Female','Divyang'),(13,'Passenger_720',54,'Male','Senior Citizen'),(14,'Passenger_735',23,'Female','Divyang'),(15,'Passenger_714',52,'Male','Student'),(16,'Passenger_26',41,'Other','Military'),(17,'Passenger_856',39,'Male','Military'),(18,'Passenger_523',53,'Female','Military'),(19,'Passenger_344',26,'Other','Senior Citizen'),(20,'Passenger_683',50,'Other','Divyang'),(21,'Passenger_853',31,'Male','Student'),(22,'Passenger_639',31,'Other','Student'),(23,'Passenger_409',47,'Male','Student'),(24,'Passenger_144',26,'Female','Senior Citizen'),(25,'Passenger_717',36,'Male','Divyang'),(26,'Passenger_467',33,'Female','None'),(27,'Passenger_726',44,'Other','Divyang'),(28,'Passenger_572',34,'Male','None'),(29,'Passenger_683',40,'Female','Student'),(30,'Passenger_673',19,'Male','Student'),(31,'Passenger_568',25,'Male','None'),(32,'Passenger_889',23,'Male','Military'),(33,'Passenger_704',21,'Male','None'),(34,'Passenger_928',50,'Male','Senior Citizen'),(35,'Passenger_90',51,'Other','None'),(36,'Passenger_818',36,'Other','Senior Citizen'),(37,'Passenger_660',26,'Male','Military'),(38,'Passenger_348',26,'Other','Senior Citizen'),(39,'Passenger_226',55,'Other','None'),(40,'Passenger_674',41,'Other','None'),(41,'Passenger_489',48,'Male','Student'),(42,'Passenger_70',58,'Female','Senior Citizen'),(43,'Passenger_230',21,'Other','Senior Citizen'),(44,'Passenger_703',28,'Male','Divyang'),(45,'Passenger_686',36,'Male','Student'),(46,'Passenger_756',36,'Other','Senior Citizen'),(47,'Passenger_940',23,'Other','None'),(48,'Passenger_111',21,'Male','None'),(49,'Passenger_685',26,'Other','None'),(50,'Passenger_134',41,'Female','None');
/*!40000 ALTER TABLE `Passenger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `PaymentID` int NOT NULL AUTO_INCREMENT,
  `TicketID` int DEFAULT NULL,
  `AmountPaid` decimal(10,2) DEFAULT NULL,
  `PaymentMode` enum('Credit Card','Debit Card','UPI','Net Banking','Cash') DEFAULT NULL,
  `PaymentStatus` enum('Success','Failed','Pending','Refund') DEFAULT NULL,
  PRIMARY KEY (`PaymentID`),
  KEY `TicketID` (`TicketID`),
  CONSTRAINT `Payment_ibfk_1` FOREIGN KEY (`TicketID`) REFERENCES `Ticket` (`TicketID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
INSERT INTO `Payment` VALUES (1,1,759.38,'Net Banking','Success'),(2,2,145.00,'UPI','Success'),(3,3,641.25,'Net Banking','Success'),(4,4,300.00,'Net Banking','Success'),(5,5,258.75,'Debit Card','Success'),(6,6,1710.00,'Credit Card','Success'),(7,7,144.38,'Credit Card','Success'),(8,8,1125.00,'Cash','Success'),(9,9,945.00,'Cash','Success'),(10,10,111.25,'UPI','Success'),(11,11,74.38,'Cash','Success'),(12,12,97.50,'Credit Card','Success'),(13,13,1242.00,'Credit Card','Success'),(14,14,156.00,'Cash','Success'),(15,15,1035.00,'Net Banking','Success'),(16,16,667.50,'UPI','Success'),(17,17,196.00,'Debit Card','Success'),(18,18,855.00,'Debit Card','Success'),(19,19,207.00,'Debit Card','Success'),(20,20,618.75,'Net Banking','Success'),(21,21,892.50,'Credit Card','Success'),(22,22,517.50,'Credit Card','Success'),(23,23,855.00,'UPI','Success'),(24,24,400.50,'Cash','Success'),(25,25,223.13,'Debit Card','Success'),(26,26,890.00,'Net Banking','Success'),(27,27,36.25,'UPI','Success'),(28,28,1627.50,'Net Banking','Success'),(29,29,652.50,'UPI','Success'),(30,30,174.00,'UPI','Success'),(31,31,2340.00,'UPI','Success'),(32,32,855.00,'Cash','Success'),(33,33,542.50,'Credit Card','Success'),(34,34,520.80,'Debit Card','Success'),(35,35,1560.00,'Net Banking','Success'),(36,36,178.50,'Cash','Success'),(37,37,427.50,'Credit Card','Success'),(38,38,522.00,'UPI','Success'),(39,39,1035.00,'Debit Card','Success'),(40,40,1012.50,'UPI','Success'),(41,41,342.00,'Cash','Success'),(42,42,750.00,'Net Banking','Success'),(43,43,828.00,'Net Banking','Success'),(44,44,145.00,'UPI','Success'),(45,45,183.75,'Debit Card','Success'),(46,46,178.50,'Net Banking','Success'),(47,47,1125.00,'Debit Card','Success'),(48,48,735.00,'UPI','Success'),(49,49,1170.00,'Cash','Success'),(50,50,690.00,'UPI','Success');
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Route`
--

DROP TABLE IF EXISTS `Route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Route` (
  `RouteID` int NOT NULL AUTO_INCREMENT,
  `TrainID` int DEFAULT NULL,
  `SourceStationID` int DEFAULT NULL,
  `DestinationStationID` int DEFAULT NULL,
  `Distance` decimal(10,2) NOT NULL,
  PRIMARY KEY (`RouteID`),
  KEY `TrainID` (`TrainID`),
  KEY `SourceStationID` (`SourceStationID`),
  KEY `DestinationStationID` (`DestinationStationID`),
  CONSTRAINT `Route_ibfk_1` FOREIGN KEY (`TrainID`) REFERENCES `Train` (`TrainID`),
  CONSTRAINT `Route_ibfk_2` FOREIGN KEY (`SourceStationID`) REFERENCES `Station` (`StationID`),
  CONSTRAINT `Route_ibfk_3` FOREIGN KEY (`DestinationStationID`) REFERENCES `Station` (`StationID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Route`
--

LOCK TABLES `Route` WRITE;
/*!40000 ALTER TABLE `Route` DISABLE KEYS */;
INSERT INTO `Route` VALUES (1,1,1,2,1380.00),(2,2,3,4,2170.00),(3,3,5,6,890.00),(4,4,7,8,1560.00),(5,5,9,10,920.00),(6,6,11,12,1140.00),(7,7,13,14,580.00),(8,8,15,16,770.00),(9,9,17,18,1650.00),(10,10,19,20,1190.00),(11,11,1,2,1380.00),(12,12,3,4,2170.00),(13,13,5,6,890.00),(14,14,7,8,1560.00),(15,15,9,10,920.00),(16,16,11,12,1140.00),(17,17,13,14,580.00),(18,18,15,16,770.00),(19,19,17,18,1650.00),(20,20,19,20,1190.00),(21,21,21,22,840.00),(22,22,23,24,1350.00),(23,23,25,26,1250.00),(24,24,27,28,980.00),(25,25,29,30,1500.00),(26,26,1,2,1380.00),(27,27,3,4,2170.00),(28,28,5,6,890.00),(29,29,7,8,1560.00),(30,30,9,10,920.00),(31,31,11,12,1140.00),(32,32,13,14,580.00),(33,33,15,16,770.00),(34,34,17,18,1650.00),(35,35,19,20,1190.00),(36,36,21,22,840.00),(37,37,23,24,1350.00),(38,38,25,26,1250.00),(39,39,27,28,980.00),(40,40,29,30,1500.00),(41,41,1,2,1380.00),(42,42,3,4,2170.00),(43,43,5,6,890.00),(44,44,7,8,1560.00),(45,45,9,10,920.00),(46,46,11,12,1140.00),(47,47,13,14,580.00),(48,48,17,18,1650.00),(49,49,19,20,1190.00),(50,50,20,1,1380.00);
/*!40000 ALTER TABLE `Route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Schedule`
--

DROP TABLE IF EXISTS `Schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Schedule` (
  `ScheduleID` int NOT NULL AUTO_INCREMENT,
  `TrainID` int DEFAULT NULL,
  `DepartureTime` time NOT NULL,
  `ArrivalTime` time NOT NULL,
  `DayOfWeek` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') DEFAULT NULL,
  PRIMARY KEY (`ScheduleID`),
  KEY `TrainID` (`TrainID`),
  CONSTRAINT `Schedule_ibfk_1` FOREIGN KEY (`TrainID`) REFERENCES `Train` (`TrainID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Schedule`
--

LOCK TABLES `Schedule` WRITE;
/*!40000 ALTER TABLE `Schedule` DISABLE KEYS */;
INSERT INTO `Schedule` VALUES (1,1,'06:00:00','12:30:00','Monday'),(2,2,'07:15:00','13:00:00','Tuesday'),(3,3,'08:00:00','14:15:00','Wednesday'),(4,4,'09:30:00','15:45:00','Thursday'),(5,5,'10:00:00','16:30:00','Friday'),(6,6,'11:45:00','18:00:00','Saturday'),(7,7,'13:00:00','19:00:00','Sunday'),(8,8,'05:30:00','11:30:00','Monday'),(9,9,'06:15:00','12:15:00','Tuesday'),(10,10,'07:45:00','14:00:00','Wednesday'),(11,11,'08:30:00','14:45:00','Thursday'),(12,12,'09:00:00','15:30:00','Friday'),(13,13,'10:15:00','16:45:00','Saturday'),(14,14,'11:30:00','17:00:00','Sunday'),(15,15,'13:15:00','19:30:00','Monday'),(16,16,'05:45:00','11:45:00','Tuesday'),(17,17,'06:30:00','13:00:00','Wednesday'),(18,18,'07:00:00','13:45:00','Thursday'),(19,19,'08:15:00','14:30:00','Friday'),(20,20,'09:30:00','15:00:00','Saturday'),(21,21,'10:45:00','16:15:00','Sunday'),(22,22,'12:00:00','18:30:00','Monday'),(23,23,'06:00:00','12:00:00','Tuesday'),(24,24,'07:30:00','13:30:00','Wednesday'),(25,25,'08:45:00','14:45:00','Thursday'),(26,26,'10:00:00','16:00:00','Friday'),(27,27,'11:15:00','17:30:00','Saturday'),(28,28,'12:30:00','19:00:00','Sunday'),(29,29,'05:30:00','11:15:00','Monday'),(30,30,'06:45:00','13:15:00','Tuesday'),(31,31,'08:00:00','14:30:00','Wednesday'),(32,32,'09:15:00','15:45:00','Thursday'),(33,33,'10:30:00','17:00:00','Friday'),(34,34,'11:45:00','18:15:00','Saturday'),(35,35,'13:00:00','19:30:00','Sunday'),(36,36,'06:00:00','12:30:00','Monday'),(37,37,'07:15:00','13:45:00','Tuesday'),(38,38,'08:30:00','14:30:00','Wednesday'),(39,39,'09:45:00','15:15:00','Thursday'),(40,40,'11:00:00','17:30:00','Friday'),(41,41,'12:15:00','18:45:00','Saturday'),(42,42,'13:30:00','20:00:00','Sunday'),(43,43,'05:30:00','12:00:00','Monday'),(44,44,'06:45:00','13:15:00','Tuesday'),(45,45,'08:00:00','14:30:00','Wednesday'),(46,46,'09:15:00','15:45:00','Thursday'),(47,47,'10:30:00','17:00:00','Friday'),(48,48,'11:45:00','18:15:00','Saturday'),(49,49,'13:00:00','19:30:00','Sunday'),(50,50,'06:00:00','12:30:00','Monday');
/*!40000 ALTER TABLE `Schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Seat`
--

DROP TABLE IF EXISTS `Seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Seat` (
  `SeatID` int NOT NULL AUTO_INCREMENT,
  `TrainID` int DEFAULT NULL,
  `ClassID` int DEFAULT NULL,
  `SeatNumber` varchar(10) NOT NULL,
  PRIMARY KEY (`SeatID`),
  UNIQUE KEY `uk_seat_unique` (`TrainID`,`ClassID`,`SeatNumber`),
  KEY `ClassID` (`ClassID`),
  CONSTRAINT `Seat_ibfk_1` FOREIGN KEY (`TrainID`) REFERENCES `Train` (`TrainID`),
  CONSTRAINT `Seat_ibfk_2` FOREIGN KEY (`ClassID`) REFERENCES `Class` (`ClassID`)
) ENGINE=InnoDB AUTO_INCREMENT=407 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Seat`
--

LOCK TABLES `Seat` WRITE;
/*!40000 ALTER TABLE `Seat` DISABLE KEYS */;
INSERT INTO `Seat` VALUES (1,1,1,'B1-01'),(2,1,1,'B1-02'),(3,1,2,'A1-01'),(4,1,2,'A1-02'),(5,1,3,'FC1-01'),(6,1,4,'SC1-01'),(7,1,4,'SC1-02'),(8,1,4,'SC1-03'),(9,1,5,'GN1-01'),(10,1,5,'GN1-02'),(11,2,6,'B2-01'),(12,2,6,'B2-02'),(13,2,6,'B2-03'),(14,2,7,'A2-01'),(15,2,8,'FC2-01'),(16,2,9,'SC2-01'),(17,2,9,'SC2-02'),(18,2,10,'GN2-01'),(19,2,10,'GN2-02'),(20,3,11,'B3-01'),(21,3,11,'B3-02'),(22,3,12,'A3-01'),(23,3,12,'A3-02'),(24,3,13,'FC3-01'),(25,3,14,'SC3-01'),(26,3,14,'SC3-02'),(27,3,14,'SC3-03'),(28,3,15,'GN3-01'),(29,4,16,'B4-01'),(30,4,16,'B4-02'),(31,4,16,'B4-03'),(32,4,17,'A4-01'),(33,4,18,'FC4-01'),(34,4,19,'SC4-01'),(35,4,19,'SC4-02'),(36,4,20,'GN4-01'),(37,4,20,'GN4-02'),(38,5,21,'B5-01'),(39,5,21,'B5-02'),(40,5,22,'A5-01'),(41,5,22,'A5-02'),(42,5,23,'FC5-01'),(43,5,24,'SC5-01'),(44,5,24,'SC5-02'),(45,5,25,'GN5-01'),(46,5,25,'GN5-02'),(47,5,25,'GN5-03'),(48,6,26,'B6-01'),(49,6,26,'B6-02'),(50,6,27,'A6-01'),(51,6,28,'FC6-01'),(52,6,28,'FC6-02'),(53,6,29,'SC6-01'),(54,6,30,'GN6-01'),(55,6,30,'GN6-02'),(56,7,31,'B7-01'),(57,7,31,'B7-02'),(58,7,32,'A7-01'),(59,7,32,'A7-02'),(60,7,33,'FC7-01'),(61,7,34,'SC7-01'),(62,7,34,'SC7-02'),(63,7,34,'SC7-03'),(64,7,35,'GN7-01'),(65,8,36,'B8-01'),(66,8,36,'B8-02'),(67,8,37,'A8-01'),(68,8,38,'FC8-01'),(69,8,39,'SC8-01'),(70,8,39,'SC8-02'),(71,8,40,'GN8-01'),(72,8,40,'GN8-02'),(73,9,41,'B9-01'),(74,9,42,'A9-01'),(75,9,42,'A9-02'),(76,9,43,'FC9-01'),(77,9,43,'FC9-02'),(78,9,44,'SC9-01'),(79,9,45,'GN9-01'),(80,9,45,'GN9-02'),(81,10,46,'B10-01'),(82,10,46,'B10-02'),(83,10,46,'B10-03'),(84,10,47,'A10-01'),(85,10,48,'FC10-01'),(86,10,49,'SC10-01'),(87,10,49,'SC10-02'),(88,10,50,'GN10-01'),(89,11,51,'B11-01'),(90,11,51,'B11-02'),(91,11,52,'A11-01'),(92,11,53,'FC11-01'),(93,11,54,'SC11-01'),(94,11,54,'SC11-02'),(95,11,55,'GN11-01'),(96,11,55,'GN11-02'),(97,12,56,'B12-01'),(98,12,57,'A12-01'),(99,12,57,'A12-02'),(100,12,58,'FC12-01'),(101,12,59,'SC12-01'),(102,12,59,'SC12-02'),(103,12,59,'SC12-03'),(104,12,60,'GN12-01'),(105,13,61,'B13-01'),(106,13,61,'B13-02'),(107,13,61,'B13-03'),(108,13,62,'A13-01'),(109,13,62,'A13-02'),(110,13,63,'FC13-01'),(111,13,64,'SC13-01'),(112,13,64,'SC13-02'),(113,13,65,'GN13-01'),(114,13,65,'GN13-02'),(115,14,66,'B14-01'),(116,14,66,'B14-02'),(117,14,67,'A14-01'),(118,14,68,'FC14-01'),(119,14,68,'FC14-02'),(120,14,69,'SC14-01'),(121,14,69,'SC14-02'),(122,14,70,'GN14-01'),(123,15,71,'B15-01'),(124,15,71,'B15-02'),(125,15,71,'B15-03'),(126,15,72,'A15-01'),(127,15,73,'FC15-01'),(128,15,74,'SC15-01'),(129,15,74,'SC15-02'),(130,15,75,'GN15-01'),(131,15,75,'GN15-02'),(132,16,76,'B16-01'),(133,16,76,'B16-02'),(134,16,77,'A16-01'),(135,16,78,'FC16-01'),(136,16,79,'SC16-01'),(137,16,79,'SC16-02'),(138,16,79,'SC16-03'),(139,16,80,'GN16-01'),(140,17,81,'B17-01'),(141,17,82,'A17-01'),(142,17,82,'A17-02'),(143,17,83,'FC17-01'),(144,17,84,'SC17-01'),(145,17,84,'SC17-02'),(146,17,85,'GN17-01'),(147,17,85,'GN17-02'),(148,18,86,'B18-01'),(149,18,86,'B18-02'),(150,18,87,'A18-01'),(151,18,88,'FC18-01'),(152,18,89,'SC18-01'),(153,18,89,'SC18-02'),(154,18,89,'SC18-03'),(155,18,90,'GN18-01'),(156,18,90,'GN18-02'),(157,19,91,'B19-01'),(158,19,91,'B19-02'),(159,19,92,'A19-01'),(160,19,92,'A19-02'),(161,19,93,'FC19-01'),(162,19,94,'SC19-01'),(163,19,95,'GN19-01'),(164,19,95,'GN19-02'),(165,20,96,'B20-01'),(166,20,96,'B20-02'),(167,20,96,'B20-03'),(168,20,97,'A20-01'),(169,20,98,'FC20-01'),(170,20,99,'SC20-01'),(171,20,99,'SC20-02'),(172,20,100,'GN20-01'),(173,20,100,'GN20-02'),(174,21,101,'B21-01'),(175,21,101,'B21-02'),(176,21,102,'A21-01'),(177,21,103,'FC21-01'),(178,21,104,'SC21-01'),(179,21,104,'SC21-02'),(180,21,105,'GN21-01'),(181,21,105,'GN21-02'),(182,22,106,'B22-01'),(183,22,106,'B22-02'),(184,22,107,'A22-01'),(185,22,107,'A22-02'),(186,22,108,'FC22-01'),(187,22,109,'SC22-01'),(188,22,110,'GN22-01'),(189,23,111,'B23-01'),(190,23,111,'B23-02'),(191,23,112,'A23-01'),(192,23,113,'FC23-01'),(193,23,114,'SC23-01'),(194,23,114,'SC23-02'),(195,23,115,'GN23-01'),(196,23,115,'GN23-02'),(197,24,116,'B24-01'),(198,24,116,'B24-02'),(199,24,117,'A24-01'),(200,24,117,'A24-02'),(201,24,118,'FC24-01'),(202,24,119,'SC24-01'),(203,24,119,'SC24-02'),(204,24,120,'GN24-01'),(205,25,121,'B25-01'),(206,25,121,'B25-02'),(207,25,122,'A25-01'),(208,25,123,'FC25-01'),(209,25,124,'SC25-01'),(210,25,124,'SC25-02'),(211,25,125,'GN25-01'),(212,25,125,'GN25-02'),(213,26,126,'B26-01'),(214,26,126,'B26-02'),(215,26,126,'B26-03'),(216,26,127,'A26-01'),(217,26,127,'A26-02'),(218,26,128,'FC26-01'),(219,26,129,'SC26-01'),(220,26,129,'SC26-02'),(221,26,130,'GN26-01'),(222,26,130,'GN26-02'),(223,27,131,'B27-01'),(224,27,131,'B27-02'),(225,27,132,'A27-01'),(226,27,133,'FC27-01'),(227,27,134,'SC27-01'),(228,27,134,'SC27-02'),(229,27,134,'SC27-03'),(230,27,135,'GN27-01'),(231,27,135,'GN27-02'),(232,28,136,'B28-01'),(233,28,136,'B28-02'),(234,28,137,'A28-01'),(235,28,138,'FC28-01'),(236,28,139,'SC28-01'),(237,28,139,'SC28-02'),(238,28,140,'GN28-01'),(239,28,140,'GN28-02'),(240,29,141,'B29-01'),(241,29,141,'B29-02'),(242,29,142,'A29-01'),(243,29,142,'A29-02'),(244,29,143,'FC29-01'),(245,29,144,'SC29-01'),(246,29,145,'GN29-01'),(247,29,145,'GN29-02'),(248,30,146,'B30-01'),(249,30,146,'B30-02'),(250,30,147,'A30-01'),(251,30,148,'FC30-01'),(252,30,149,'SC30-01'),(253,30,149,'SC30-02'),(254,30,150,'GN30-01'),(255,31,151,'B31-01'),(256,31,151,'B31-02'),(257,31,152,'A31-01'),(258,31,152,'A31-02'),(259,31,153,'FC31-01'),(260,31,154,'SC31-01'),(261,31,155,'GN31-01'),(262,31,155,'GN31-02'),(263,32,156,'B32-01'),(264,32,156,'B32-02'),(265,32,156,'B32-03'),(266,32,157,'A32-01'),(267,32,158,'FC32-01'),(268,32,159,'SC32-01'),(269,32,159,'SC32-02'),(270,32,160,'GN32-01'),(271,33,161,'B33-01'),(272,33,161,'B33-02'),(273,33,162,'A33-01'),(274,33,163,'FC33-01'),(275,33,163,'FC33-02'),(276,33,164,'SC33-01'),(277,33,164,'SC33-02'),(278,33,165,'GN33-01'),(279,34,166,'B34-01'),(280,34,167,'A34-01'),(281,34,167,'A34-02'),(282,34,168,'FC34-01'),(283,34,169,'SC34-01'),(284,34,169,'SC34-02'),(285,34,170,'GN34-01'),(286,34,170,'GN34-02'),(287,35,171,'B35-01'),(288,35,171,'B35-02'),(289,35,172,'A35-01'),(290,35,173,'FC35-01'),(291,35,174,'SC35-01'),(292,35,174,'SC35-02'),(293,35,175,'GN35-01'),(294,36,176,'B36-01'),(295,36,176,'B36-02'),(296,36,177,'A36-01'),(297,36,177,'A36-02'),(298,36,178,'FC36-01'),(299,36,179,'SC36-01'),(300,36,180,'GN36-01'),(301,36,180,'GN36-02'),(302,37,181,'B37-01'),(303,37,181,'B37-02'),(304,37,182,'A37-01'),(305,37,183,'FC37-01'),(306,37,184,'SC37-01'),(307,37,184,'SC37-02'),(308,37,185,'GN37-01'),(309,38,186,'B38-01'),(310,38,187,'A38-01'),(311,38,187,'A38-02'),(312,38,188,'FC38-01'),(313,38,189,'SC38-01'),(314,38,190,'GN38-01'),(315,38,190,'GN38-02'),(316,39,191,'B39-01'),(317,39,191,'B39-02'),(318,39,192,'A39-01'),(319,39,193,'FC39-01'),(320,39,193,'FC39-02'),(321,39,194,'SC39-01'),(322,39,195,'GN39-01'),(323,39,195,'GN39-02'),(324,40,196,'B40-01'),(325,40,196,'B40-02'),(326,40,196,'B40-03'),(327,40,197,'A40-01'),(328,40,198,'FC40-01'),(329,40,199,'SC40-01'),(330,40,199,'SC40-02'),(331,40,200,'GN40-01'),(332,41,201,'B41-01'),(333,41,201,'B41-02'),(334,41,202,'A41-01'),(335,41,203,'FC41-01'),(336,41,204,'SC41-01'),(337,41,204,'SC41-02'),(338,41,205,'GN41-01'),(339,42,206,'B42-01'),(340,42,206,'B42-02'),(341,42,207,'A42-01'),(342,42,207,'A42-02'),(343,42,208,'FC42-01'),(344,42,209,'SC42-01'),(345,42,209,'SC42-02'),(346,42,210,'GN42-01'),(347,42,210,'GN42-02'),(348,43,211,'B43-01'),(349,43,211,'B43-02'),(350,43,212,'A43-01'),(351,43,213,'FC43-01'),(352,43,214,'SC43-01'),(353,43,215,'GN43-01'),(354,43,215,'GN43-02'),(355,44,216,'B44-01'),(356,44,216,'B44-02'),(357,44,217,'A44-01'),(358,44,218,'FC44-01'),(359,44,218,'FC44-02'),(360,44,219,'SC44-01'),(361,44,220,'GN44-01'),(362,44,220,'GN44-02'),(363,45,221,'B45-01'),(364,45,221,'B45-02'),(365,45,221,'B45-03'),(366,45,222,'A45-01'),(367,45,223,'FC45-01'),(368,45,224,'SC45-01'),(369,45,224,'SC45-02'),(370,45,225,'GN45-01'),(371,46,226,'B46-01'),(372,46,226,'B46-02'),(373,46,227,'A46-01'),(374,46,227,'A46-02'),(375,46,228,'FC46-01'),(376,46,229,'SC46-01'),(377,46,230,'GN46-01'),(378,47,231,'B47-01'),(379,47,231,'B47-02'),(380,47,232,'A47-01'),(381,47,233,'FC47-01'),(382,47,234,'SC47-01'),(383,47,234,'SC47-02'),(384,47,235,'GN47-01'),(385,48,236,'B48-01'),(386,48,236,'B48-02'),(387,48,237,'A48-01'),(388,48,238,'FC48-01'),(389,48,239,'SC48-01'),(390,48,239,'SC48-02'),(391,48,239,'SC48-03'),(392,48,240,'GN48-01'),(393,49,241,'B49-01'),(394,49,242,'A49-01'),(395,49,242,'A49-02'),(396,49,243,'FC49-01'),(397,49,244,'SC49-01'),(398,49,245,'GN49-01'),(399,49,245,'GN49-02'),(400,50,246,'B50-01'),(401,50,246,'B50-02'),(402,50,247,'A50-01'),(403,50,248,'FC50-01'),(404,50,249,'SC50-01'),(405,50,249,'SC50-02'),(406,50,250,'GN50-01');
/*!40000 ALTER TABLE `Seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SeatAvailability`
--

DROP TABLE IF EXISTS `SeatAvailability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SeatAvailability` (
  `SeatID` int NOT NULL,
  `JourneyDate` date NOT NULL,
  `AvailabilityStatus` enum('Available','Booked','Reserved') DEFAULT 'Available',
  PRIMARY KEY (`SeatID`,`JourneyDate`),
  CONSTRAINT `SeatAvailability_ibfk_1` FOREIGN KEY (`SeatID`) REFERENCES `Seat` (`SeatID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SeatAvailability`
--

LOCK TABLES `SeatAvailability` WRITE;
/*!40000 ALTER TABLE `SeatAvailability` DISABLE KEYS */;
INSERT INTO `SeatAvailability` VALUES (1,'2025-04-14','Available'),(1,'2025-04-21','Available'),(2,'2025-04-14','Available'),(2,'2025-04-21','Available'),(3,'2025-04-14','Available'),(3,'2025-04-21','Available'),(4,'2025-04-14','Available'),(4,'2025-04-21','Available'),(5,'2025-04-14','Available'),(5,'2025-04-21','Available'),(6,'2025-04-14','Available'),(6,'2025-04-21','Available'),(7,'2025-04-14','Available'),(7,'2025-04-21','Available'),(8,'2025-04-14','Available'),(8,'2025-04-21','Available'),(9,'2025-04-14','Available'),(9,'2025-04-21','Available'),(10,'2025-04-14','Available'),(10,'2025-04-21','Available'),(11,'2025-04-15','Booked'),(11,'2025-04-22','Available'),(12,'2025-04-15','Available'),(12,'2025-04-22','Available'),(13,'2025-04-15','Available'),(13,'2025-04-22','Available'),(14,'2025-04-15','Available'),(14,'2025-04-22','Available'),(15,'2025-04-15','Available'),(15,'2025-04-22','Available'),(16,'2025-04-15','Booked'),(16,'2025-04-22','Available'),(17,'2025-04-15','Available'),(17,'2025-04-22','Available'),(18,'2025-04-15','Available'),(18,'2025-04-22','Available'),(19,'2025-04-15','Available'),(19,'2025-04-22','Available'),(20,'2025-04-16','Available'),(20,'2025-04-23','Booked'),(21,'2025-04-16','Available'),(21,'2025-04-23','Available'),(22,'2025-04-16','Available'),(22,'2025-04-23','Available'),(23,'2025-04-16','Available'),(23,'2025-04-23','Available'),(24,'2025-04-16','Available'),(24,'2025-04-23','Available'),(25,'2025-04-16','Available'),(25,'2025-04-23','Available'),(26,'2025-04-16','Available'),(26,'2025-04-23','Available'),(27,'2025-04-16','Available'),(27,'2025-04-23','Available'),(28,'2025-04-16','Booked'),(28,'2025-04-23','Available'),(29,'2025-04-17','Available'),(29,'2025-04-24','Available'),(30,'2025-04-17','Available'),(30,'2025-04-24','Available'),(31,'2025-04-17','Available'),(31,'2025-04-24','Available'),(32,'2025-04-17','Available'),(32,'2025-04-24','Available'),(33,'2025-04-17','Available'),(33,'2025-04-24','Available'),(34,'2025-04-17','Available'),(34,'2025-04-24','Available'),(35,'2025-04-17','Available'),(35,'2025-04-24','Available'),(36,'2025-04-17','Available'),(36,'2025-04-24','Available'),(37,'2025-04-17','Available'),(37,'2025-04-24','Available'),(38,'2025-04-18','Available'),(38,'2025-04-25','Booked'),(39,'2025-04-18','Available'),(39,'2025-04-25','Available'),(40,'2025-04-18','Available'),(40,'2025-04-25','Available'),(41,'2025-04-18','Available'),(41,'2025-04-25','Available'),(42,'2025-04-18','Available'),(42,'2025-04-25','Available'),(43,'2025-04-18','Available'),(43,'2025-04-25','Available'),(44,'2025-04-18','Available'),(44,'2025-04-25','Available'),(45,'2025-04-18','Available'),(45,'2025-04-25','Available'),(46,'2025-04-18','Available'),(46,'2025-04-25','Available'),(47,'2025-04-18','Available'),(47,'2025-04-25','Available'),(48,'2025-04-19','Available'),(48,'2025-04-26','Booked'),(49,'2025-04-19','Available'),(49,'2025-04-26','Available'),(50,'2025-04-19','Available'),(50,'2025-04-26','Booked'),(51,'2025-04-19','Available'),(51,'2025-04-26','Available'),(52,'2025-04-19','Available'),(52,'2025-04-26','Available'),(53,'2025-04-19','Available'),(53,'2025-04-26','Available'),(54,'2025-04-19','Available'),(54,'2025-04-26','Available'),(55,'2025-04-19','Available'),(55,'2025-04-26','Available'),(56,'2025-04-20','Available'),(56,'2025-04-27','Available'),(57,'2025-04-20','Available'),(57,'2025-04-27','Available'),(58,'2025-04-20','Available'),(58,'2025-04-27','Available'),(59,'2025-04-20','Available'),(59,'2025-04-27','Available'),(60,'2025-04-20','Available'),(60,'2025-04-27','Booked'),(61,'2025-04-20','Available'),(61,'2025-04-27','Available'),(62,'2025-04-20','Available'),(62,'2025-04-27','Available'),(63,'2025-04-20','Available'),(63,'2025-04-27','Available'),(64,'2025-04-20','Available'),(64,'2025-04-27','Available'),(65,'2025-04-14','Available'),(65,'2025-04-21','Available'),(66,'2025-04-14','Available'),(66,'2025-04-21','Available'),(67,'2025-04-14','Available'),(67,'2025-04-21','Available'),(68,'2025-04-14','Available'),(68,'2025-04-21','Available'),(69,'2025-04-14','Available'),(69,'2025-04-21','Available'),(70,'2025-04-14','Available'),(70,'2025-04-21','Available'),(71,'2025-04-14','Available'),(71,'2025-04-21','Available'),(72,'2025-04-14','Available'),(72,'2025-04-21','Available'),(73,'2025-04-15','Available'),(73,'2025-04-22','Available'),(74,'2025-04-15','Available'),(74,'2025-04-22','Available'),(75,'2025-04-15','Available'),(75,'2025-04-22','Available'),(76,'2025-04-15','Booked'),(76,'2025-04-22','Available'),(77,'2025-04-15','Available'),(77,'2025-04-22','Available'),(78,'2025-04-15','Available'),(78,'2025-04-22','Available'),(79,'2025-04-15','Available'),(79,'2025-04-22','Available'),(80,'2025-04-15','Available'),(80,'2025-04-22','Available'),(81,'2025-04-16','Available'),(81,'2025-04-23','Available'),(82,'2025-04-16','Available'),(82,'2025-04-23','Available'),(83,'2025-04-16','Available'),(83,'2025-04-23','Available'),(84,'2025-04-16','Available'),(84,'2025-04-23','Available'),(85,'2025-04-16','Available'),(85,'2025-04-23','Available'),(86,'2025-04-16','Available'),(86,'2025-04-23','Available'),(87,'2025-04-16','Available'),(87,'2025-04-23','Available'),(88,'2025-04-16','Available'),(88,'2025-04-23','Available'),(89,'2025-04-17','Available'),(89,'2025-04-24','Available'),(90,'2025-04-17','Available'),(90,'2025-04-24','Available'),(91,'2025-04-17','Available'),(91,'2025-04-24','Booked'),(92,'2025-04-17','Available'),(92,'2025-04-24','Available'),(93,'2025-04-17','Available'),(93,'2025-04-24','Available'),(94,'2025-04-17','Available'),(94,'2025-04-24','Available'),(95,'2025-04-17','Available'),(95,'2025-04-24','Available'),(96,'2025-04-17','Available'),(96,'2025-04-24','Available'),(97,'2025-04-18','Available'),(97,'2025-04-25','Available'),(98,'2025-04-18','Available'),(98,'2025-04-25','Available'),(99,'2025-04-18','Available'),(99,'2025-04-25','Available'),(100,'2025-04-18','Available'),(100,'2025-04-25','Available'),(101,'2025-04-18','Available'),(101,'2025-04-25','Available'),(102,'2025-04-18','Available'),(102,'2025-04-25','Available'),(103,'2025-04-18','Available'),(103,'2025-04-25','Available'),(104,'2025-04-18','Available'),(104,'2025-04-25','Available'),(105,'2025-04-19','Available'),(105,'2025-04-26','Available'),(106,'2025-04-19','Available'),(106,'2025-04-26','Available'),(107,'2025-04-19','Available'),(107,'2025-04-26','Available'),(108,'2025-04-19','Available'),(108,'2025-04-26','Booked'),(109,'2025-04-19','Available'),(109,'2025-04-26','Available'),(110,'2025-04-19','Booked'),(110,'2025-04-26','Available'),(111,'2025-04-19','Available'),(111,'2025-04-26','Available'),(112,'2025-04-19','Available'),(112,'2025-04-26','Available'),(113,'2025-04-19','Available'),(113,'2025-04-26','Available'),(114,'2025-04-19','Available'),(114,'2025-04-26','Available'),(115,'2025-04-20','Available'),(115,'2025-04-27','Available'),(116,'2025-04-20','Available'),(116,'2025-04-27','Available'),(117,'2025-04-20','Available'),(117,'2025-04-27','Available'),(118,'2025-04-20','Available'),(118,'2025-04-27','Available'),(119,'2025-04-20','Available'),(119,'2025-04-27','Available'),(120,'2025-04-20','Available'),(120,'2025-04-27','Available'),(121,'2025-04-20','Available'),(121,'2025-04-27','Available'),(122,'2025-04-20','Available'),(122,'2025-04-27','Available'),(123,'2025-04-14','Available'),(123,'2025-04-21','Available'),(124,'2025-04-14','Available'),(124,'2025-04-21','Available'),(125,'2025-04-14','Available'),(125,'2025-04-21','Available'),(126,'2025-04-14','Available'),(126,'2025-04-21','Available'),(127,'2025-04-14','Available'),(127,'2025-04-21','Available'),(128,'2025-04-14','Available'),(128,'2025-04-21','Available'),(129,'2025-04-14','Available'),(129,'2025-04-21','Available'),(130,'2025-04-14','Available'),(130,'2025-04-21','Available'),(131,'2025-04-14','Available'),(131,'2025-04-21','Available'),(132,'2025-04-15','Available'),(132,'2025-04-22','Available'),(133,'2025-04-15','Available'),(133,'2025-04-22','Available'),(134,'2025-04-15','Available'),(134,'2025-04-22','Available'),(135,'2025-04-15','Booked'),(135,'2025-04-22','Booked'),(136,'2025-04-15','Booked'),(136,'2025-04-22','Available'),(137,'2025-04-15','Available'),(137,'2025-04-22','Available'),(138,'2025-04-15','Available'),(138,'2025-04-22','Available'),(139,'2025-04-15','Available'),(139,'2025-04-22','Available'),(140,'2025-04-16','Available'),(140,'2025-04-23','Available'),(141,'2025-04-16','Available'),(141,'2025-04-23','Available'),(142,'2025-04-16','Available'),(142,'2025-04-23','Available'),(143,'2025-04-16','Available'),(143,'2025-04-23','Available'),(144,'2025-04-16','Available'),(144,'2025-04-23','Booked'),(145,'2025-04-16','Available'),(145,'2025-04-23','Available'),(146,'2025-04-16','Available'),(146,'2025-04-23','Available'),(147,'2025-04-16','Available'),(147,'2025-04-23','Available'),(148,'2025-04-17','Available'),(148,'2025-04-24','Available'),(149,'2025-04-17','Available'),(149,'2025-04-24','Available'),(150,'2025-04-17','Available'),(150,'2025-04-24','Available'),(151,'2025-04-17','Available'),(151,'2025-04-24','Available'),(152,'2025-04-17','Available'),(152,'2025-04-24','Available'),(153,'2025-04-17','Available'),(153,'2025-04-24','Available'),(154,'2025-04-17','Available'),(154,'2025-04-24','Available'),(155,'2025-04-17','Booked'),(155,'2025-04-24','Available'),(156,'2025-04-17','Available'),(156,'2025-04-24','Available'),(157,'2025-04-18','Available'),(157,'2025-04-25','Available'),(158,'2025-04-18','Available'),(158,'2025-04-25','Available'),(159,'2025-04-18','Available'),(159,'2025-04-25','Available'),(160,'2025-04-18','Available'),(160,'2025-04-25','Available'),(161,'2025-04-18','Available'),(161,'2025-04-25','Available'),(162,'2025-04-18','Available'),(162,'2025-04-25','Available'),(163,'2025-04-18','Available'),(163,'2025-04-25','Available'),(164,'2025-04-18','Available'),(164,'2025-04-25','Available'),(165,'2025-04-19','Available'),(165,'2025-04-26','Available'),(166,'2025-04-19','Available'),(166,'2025-04-26','Available'),(167,'2025-04-19','Available'),(167,'2025-04-26','Available'),(168,'2025-04-19','Available'),(168,'2025-04-26','Available'),(169,'2025-04-19','Available'),(169,'2025-04-26','Available'),(170,'2025-04-19','Available'),(170,'2025-04-26','Available'),(171,'2025-04-19','Available'),(171,'2025-04-26','Available'),(172,'2025-04-19','Available'),(172,'2025-04-26','Booked'),(173,'2025-04-19','Available'),(173,'2025-04-26','Available'),(174,'2025-04-20','Available'),(174,'2025-04-27','Available'),(175,'2025-04-20','Available'),(175,'2025-04-27','Available'),(176,'2025-04-20','Available'),(176,'2025-04-27','Available'),(177,'2025-04-20','Available'),(177,'2025-04-27','Available'),(178,'2025-04-20','Available'),(178,'2025-04-27','Available'),(179,'2025-04-20','Available'),(179,'2025-04-27','Available'),(180,'2025-04-20','Available'),(180,'2025-04-27','Available'),(181,'2025-04-20','Available'),(181,'2025-04-27','Available'),(182,'2025-04-14','Available'),(182,'2025-04-21','Booked'),(183,'2025-04-14','Available'),(183,'2025-04-21','Available'),(184,'2025-04-14','Available'),(184,'2025-04-21','Available'),(185,'2025-04-14','Available'),(185,'2025-04-21','Available'),(186,'2025-04-14','Available'),(186,'2025-04-21','Available'),(187,'2025-04-14','Available'),(187,'2025-04-21','Available'),(188,'2025-04-14','Available'),(188,'2025-04-21','Available'),(189,'2025-04-15','Available'),(189,'2025-04-22','Available'),(190,'2025-04-15','Available'),(190,'2025-04-22','Available'),(191,'2025-04-15','Available'),(191,'2025-04-22','Available'),(192,'2025-04-15','Available'),(192,'2025-04-22','Available'),(193,'2025-04-15','Booked'),(193,'2025-04-22','Available'),(194,'2025-04-15','Available'),(194,'2025-04-22','Available'),(195,'2025-04-15','Available'),(195,'2025-04-22','Available'),(196,'2025-04-15','Available'),(196,'2025-04-22','Available'),(197,'2025-04-16','Booked'),(197,'2025-04-23','Available'),(198,'2025-04-16','Available'),(198,'2025-04-23','Available'),(199,'2025-04-16','Available'),(199,'2025-04-23','Available'),(200,'2025-04-16','Available'),(200,'2025-04-23','Available'),(201,'2025-04-16','Available'),(201,'2025-04-23','Available'),(202,'2025-04-16','Available'),(202,'2025-04-23','Available'),(203,'2025-04-16','Available'),(203,'2025-04-23','Available'),(204,'2025-04-16','Available'),(204,'2025-04-23','Available'),(205,'2025-04-17','Available'),(205,'2025-04-24','Booked'),(206,'2025-04-17','Available'),(206,'2025-04-24','Available'),(207,'2025-04-17','Available'),(207,'2025-04-24','Available'),(208,'2025-04-17','Available'),(208,'2025-04-24','Available'),(209,'2025-04-17','Available'),(209,'2025-04-24','Available'),(210,'2025-04-17','Available'),(210,'2025-04-24','Available'),(211,'2025-04-17','Available'),(211,'2025-04-24','Available'),(212,'2025-04-17','Available'),(212,'2025-04-24','Available'),(213,'2025-04-18','Available'),(213,'2025-04-25','Available'),(214,'2025-04-18','Available'),(214,'2025-04-25','Available'),(215,'2025-04-18','Available'),(215,'2025-04-25','Available'),(216,'2025-04-18','Available'),(216,'2025-04-25','Available'),(217,'2025-04-18','Available'),(217,'2025-04-25','Available'),(218,'2025-04-18','Available'),(218,'2025-04-25','Available'),(219,'2025-04-18','Available'),(219,'2025-04-25','Available'),(220,'2025-04-18','Available'),(220,'2025-04-25','Available'),(221,'2025-04-18','Booked'),(221,'2025-04-25','Booked'),(222,'2025-04-18','Available'),(222,'2025-04-25','Available'),(223,'2025-04-19','Available'),(223,'2025-04-26','Available'),(224,'2025-04-19','Available'),(224,'2025-04-26','Available'),(225,'2025-04-19','Available'),(225,'2025-04-26','Available'),(226,'2025-04-19','Available'),(226,'2025-04-26','Available'),(227,'2025-04-19','Available'),(227,'2025-04-26','Available'),(228,'2025-04-19','Available'),(228,'2025-04-26','Available'),(229,'2025-04-19','Available'),(229,'2025-04-26','Available'),(230,'2025-04-19','Available'),(230,'2025-04-26','Booked'),(231,'2025-04-19','Available'),(231,'2025-04-26','Available'),(232,'2025-04-20','Available'),(232,'2025-04-27','Available'),(233,'2025-04-20','Available'),(233,'2025-04-27','Available'),(234,'2025-04-20','Available'),(234,'2025-04-27','Available'),(235,'2025-04-20','Available'),(235,'2025-04-27','Available'),(236,'2025-04-20','Available'),(236,'2025-04-27','Available'),(237,'2025-04-20','Available'),(237,'2025-04-27','Available'),(238,'2025-04-20','Available'),(238,'2025-04-27','Available'),(239,'2025-04-20','Available'),(239,'2025-04-27','Available'),(240,'2025-04-14','Available'),(240,'2025-04-21','Available'),(241,'2025-04-14','Available'),(241,'2025-04-21','Available'),(242,'2025-04-14','Booked'),(242,'2025-04-21','Available'),(243,'2025-04-14','Available'),(243,'2025-04-21','Available'),(244,'2025-04-14','Available'),(244,'2025-04-21','Available'),(245,'2025-04-14','Available'),(245,'2025-04-21','Available'),(246,'2025-04-14','Available'),(246,'2025-04-21','Available'),(247,'2025-04-14','Available'),(247,'2025-04-21','Available'),(248,'2025-04-15','Available'),(248,'2025-04-22','Booked'),(249,'2025-04-15','Available'),(249,'2025-04-22','Available'),(250,'2025-04-15','Available'),(250,'2025-04-22','Available'),(251,'2025-04-15','Available'),(251,'2025-04-22','Available'),(252,'2025-04-15','Available'),(252,'2025-04-22','Available'),(253,'2025-04-15','Available'),(253,'2025-04-22','Available'),(254,'2025-04-15','Available'),(254,'2025-04-22','Available'),(255,'2025-04-16','Booked'),(255,'2025-04-23','Available'),(256,'2025-04-16','Available'),(256,'2025-04-23','Available'),(257,'2025-04-16','Available'),(257,'2025-04-23','Available'),(258,'2025-04-16','Available'),(258,'2025-04-23','Available'),(259,'2025-04-16','Available'),(259,'2025-04-23','Available'),(260,'2025-04-16','Available'),(260,'2025-04-23','Available'),(261,'2025-04-16','Available'),(261,'2025-04-23','Available'),(262,'2025-04-16','Available'),(262,'2025-04-23','Available'),(263,'2025-04-17','Available'),(263,'2025-04-24','Available'),(264,'2025-04-17','Available'),(264,'2025-04-24','Available'),(265,'2025-04-17','Available'),(265,'2025-04-24','Available'),(266,'2025-04-17','Available'),(266,'2025-04-24','Available'),(267,'2025-04-17','Available'),(267,'2025-04-24','Available'),(268,'2025-04-17','Available'),(268,'2025-04-24','Available'),(269,'2025-04-17','Available'),(269,'2025-04-24','Available'),(270,'2025-04-17','Available'),(270,'2025-04-24','Booked'),(271,'2025-04-18','Available'),(271,'2025-04-25','Available'),(272,'2025-04-18','Available'),(272,'2025-04-25','Available'),(273,'2025-04-18','Available'),(273,'2025-04-25','Available'),(274,'2025-04-18','Available'),(274,'2025-04-25','Available'),(275,'2025-04-18','Available'),(275,'2025-04-25','Available'),(276,'2025-04-18','Available'),(276,'2025-04-25','Available'),(277,'2025-04-18','Available'),(277,'2025-04-25','Available'),(278,'2025-04-18','Available'),(278,'2025-04-25','Available'),(279,'2025-04-19','Available'),(279,'2025-04-26','Available'),(280,'2025-04-19','Available'),(280,'2025-04-26','Available'),(281,'2025-04-19','Available'),(281,'2025-04-26','Available'),(282,'2025-04-19','Available'),(282,'2025-04-26','Available'),(283,'2025-04-19','Available'),(283,'2025-04-26','Available'),(284,'2025-04-19','Available'),(284,'2025-04-26','Available'),(285,'2025-04-19','Available'),(285,'2025-04-26','Available'),(286,'2025-04-19','Available'),(286,'2025-04-26','Available'),(287,'2025-04-20','Booked'),(287,'2025-04-27','Available'),(288,'2025-04-20','Available'),(288,'2025-04-27','Available'),(289,'2025-04-20','Available'),(289,'2025-04-27','Booked'),(290,'2025-04-20','Available'),(290,'2025-04-27','Available'),(291,'2025-04-20','Available'),(291,'2025-04-27','Available'),(292,'2025-04-20','Available'),(292,'2025-04-27','Available'),(293,'2025-04-20','Available'),(293,'2025-04-27','Booked'),(294,'2025-04-14','Available'),(294,'2025-04-21','Available'),(295,'2025-04-14','Available'),(295,'2025-04-21','Available'),(296,'2025-04-14','Available'),(296,'2025-04-21','Available'),(297,'2025-04-14','Available'),(297,'2025-04-21','Available'),(298,'2025-04-14','Booked'),(298,'2025-04-21','Available'),(299,'2025-04-14','Available'),(299,'2025-04-21','Available'),(300,'2025-04-14','Available'),(300,'2025-04-21','Available'),(301,'2025-04-14','Available'),(301,'2025-04-21','Available'),(302,'2025-04-15','Booked'),(302,'2025-04-22','Available'),(303,'2025-04-15','Available'),(303,'2025-04-22','Available'),(304,'2025-04-15','Available'),(304,'2025-04-22','Available'),(305,'2025-04-15','Available'),(305,'2025-04-22','Available'),(306,'2025-04-15','Available'),(306,'2025-04-22','Available'),(307,'2025-04-15','Available'),(307,'2025-04-22','Available'),(308,'2025-04-15','Available'),(308,'2025-04-22','Available'),(309,'2025-04-16','Available'),(309,'2025-04-23','Available'),(310,'2025-04-16','Available'),(310,'2025-04-23','Booked'),(311,'2025-04-16','Available'),(311,'2025-04-23','Available'),(312,'2025-04-16','Available'),(312,'2025-04-23','Available'),(313,'2025-04-16','Available'),(313,'2025-04-23','Available'),(314,'2025-04-16','Available'),(314,'2025-04-23','Available'),(315,'2025-04-16','Available'),(315,'2025-04-23','Available'),(316,'2025-04-17','Available'),(316,'2025-04-24','Available'),(317,'2025-04-17','Available'),(317,'2025-04-24','Available'),(318,'2025-04-17','Available'),(318,'2025-04-24','Available'),(319,'2025-04-17','Available'),(319,'2025-04-24','Available'),(320,'2025-04-17','Available'),(320,'2025-04-24','Available'),(321,'2025-04-17','Booked'),(321,'2025-04-24','Available'),(322,'2025-04-17','Booked'),(322,'2025-04-24','Available'),(323,'2025-04-17','Available'),(323,'2025-04-24','Available'),(324,'2025-04-18','Booked'),(324,'2025-04-25','Available'),(325,'2025-04-18','Available'),(325,'2025-04-25','Available'),(326,'2025-04-18','Available'),(326,'2025-04-25','Available'),(327,'2025-04-18','Available'),(327,'2025-04-25','Available'),(328,'2025-04-18','Available'),(328,'2025-04-25','Available'),(329,'2025-04-18','Available'),(329,'2025-04-25','Available'),(330,'2025-04-18','Available'),(330,'2025-04-25','Available'),(331,'2025-04-18','Available'),(331,'2025-04-25','Available'),(332,'2025-04-19','Available'),(332,'2025-04-26','Available'),(333,'2025-04-19','Available'),(333,'2025-04-26','Available'),(334,'2025-04-19','Available'),(334,'2025-04-26','Available'),(335,'2025-04-19','Available'),(335,'2025-04-26','Booked'),(336,'2025-04-19','Available'),(336,'2025-04-26','Available'),(337,'2025-04-19','Available'),(337,'2025-04-26','Available'),(338,'2025-04-19','Available'),(338,'2025-04-26','Available'),(339,'2025-04-20','Available'),(339,'2025-04-27','Available'),(340,'2025-04-20','Available'),(340,'2025-04-27','Available'),(341,'2025-04-20','Available'),(341,'2025-04-27','Available'),(342,'2025-04-20','Available'),(342,'2025-04-27','Available'),(343,'2025-04-20','Available'),(343,'2025-04-27','Available'),(344,'2025-04-20','Available'),(344,'2025-04-27','Available'),(345,'2025-04-20','Available'),(345,'2025-04-27','Available'),(346,'2025-04-20','Available'),(346,'2025-04-27','Available'),(347,'2025-04-20','Available'),(347,'2025-04-27','Available'),(348,'2025-04-14','Available'),(348,'2025-04-21','Available'),(349,'2025-04-14','Available'),(349,'2025-04-21','Available'),(350,'2025-04-14','Available'),(350,'2025-04-21','Available'),(351,'2025-04-14','Available'),(351,'2025-04-21','Available'),(352,'2025-04-14','Available'),(352,'2025-04-21','Available'),(353,'2025-04-14','Available'),(353,'2025-04-21','Available'),(354,'2025-04-14','Available'),(354,'2025-04-21','Available'),(355,'2025-04-15','Booked'),(355,'2025-04-22','Available'),(356,'2025-04-15','Available'),(356,'2025-04-22','Available'),(357,'2025-04-15','Available'),(357,'2025-04-22','Available'),(358,'2025-04-15','Booked'),(358,'2025-04-22','Available'),(359,'2025-04-15','Available'),(359,'2025-04-22','Available'),(360,'2025-04-15','Available'),(360,'2025-04-22','Booked'),(361,'2025-04-15','Booked'),(361,'2025-04-22','Available'),(362,'2025-04-15','Available'),(362,'2025-04-22','Available'),(363,'2025-04-16','Available'),(363,'2025-04-23','Available'),(364,'2025-04-16','Available'),(364,'2025-04-23','Available'),(365,'2025-04-16','Available'),(365,'2025-04-23','Available'),(366,'2025-04-16','Available'),(366,'2025-04-23','Available'),(367,'2025-04-16','Available'),(367,'2025-04-23','Booked'),(368,'2025-04-16','Available'),(368,'2025-04-23','Available'),(369,'2025-04-16','Available'),(369,'2025-04-23','Available'),(370,'2025-04-16','Available'),(370,'2025-04-23','Available'),(371,'2025-04-17','Available'),(371,'2025-04-24','Available'),(372,'2025-04-17','Available'),(372,'2025-04-24','Available'),(373,'2025-04-17','Available'),(373,'2025-04-24','Available'),(374,'2025-04-17','Available'),(374,'2025-04-24','Available'),(375,'2025-04-17','Available'),(375,'2025-04-24','Booked'),(376,'2025-04-17','Available'),(376,'2025-04-24','Available'),(377,'2025-04-17','Available'),(377,'2025-04-24','Available'),(378,'2025-04-18','Available'),(378,'2025-04-25','Available'),(379,'2025-04-18','Available'),(379,'2025-04-25','Available'),(380,'2025-04-18','Available'),(380,'2025-04-25','Booked'),(381,'2025-04-18','Available'),(381,'2025-04-25','Booked'),(382,'2025-04-18','Available'),(382,'2025-04-25','Available'),(383,'2025-04-18','Available'),(383,'2025-04-25','Available'),(384,'2025-04-18','Booked'),(384,'2025-04-25','Available'),(385,'2025-04-19','Available'),(385,'2025-04-26','Available'),(386,'2025-04-19','Available'),(386,'2025-04-26','Available'),(387,'2025-04-19','Available'),(387,'2025-04-26','Available'),(388,'2025-04-19','Available'),(388,'2025-04-26','Available'),(389,'2025-04-19','Available'),(389,'2025-04-26','Available'),(390,'2025-04-19','Available'),(390,'2025-04-26','Available'),(391,'2025-04-19','Available'),(391,'2025-04-26','Available'),(392,'2025-04-19','Available'),(392,'2025-04-26','Available'),(393,'2025-04-20','Available'),(393,'2025-04-27','Available'),(394,'2025-04-20','Available'),(394,'2025-04-27','Available'),(395,'2025-04-20','Available'),(395,'2025-04-27','Available'),(396,'2025-04-20','Available'),(396,'2025-04-27','Available'),(397,'2025-04-20','Available'),(397,'2025-04-27','Available'),(398,'2025-04-20','Available'),(398,'2025-04-27','Booked'),(399,'2025-04-20','Available'),(399,'2025-04-27','Available'),(400,'2025-04-14','Booked'),(400,'2025-04-21','Available'),(401,'2025-04-14','Available'),(401,'2025-04-21','Available'),(402,'2025-04-14','Available'),(402,'2025-04-21','Available'),(403,'2025-04-14','Available'),(403,'2025-04-21','Available'),(404,'2025-04-14','Available'),(404,'2025-04-21','Available'),(405,'2025-04-14','Available'),(405,'2025-04-21','Available'),(406,'2025-04-14','Available'),(406,'2025-04-21','Available');
/*!40000 ALTER TABLE `SeatAvailability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Station`
--

DROP TABLE IF EXISTS `Station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Station` (
  `StationID` int NOT NULL AUTO_INCREMENT,
  `StationName` varchar(100) NOT NULL,
  `Location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`StationID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Station`
--

LOCK TABLES `Station` WRITE;
/*!40000 ALTER TABLE `Station` DISABLE KEYS */;
INSERT INTO `Station` VALUES (1,'Mumbai CST','Mumbai'),(2,'Delhi Junction','Delhi'),(3,'Howrah','Kolkata'),(4,'Chennai Central','Chennai'),(5,'Secunderabad','Hyderabad'),(6,'Pune Junction','Pune'),(7,'Nagpur','Nagpur'),(8,'Lucknow NR','Lucknow'),(9,'Patna Jn','Patna'),(10,'Bhopal Jn','Bhopal'),(11,'Ahmedabad Jn','Ahmedabad'),(12,'Jaipur','Jaipur'),(13,'Coimbatore Jn','Coimbatore'),(14,'Trivandrum Central','Trivandrum'),(15,'Ranchi','Ranchi'),(16,'Guwahati','Guwahati'),(17,'Chandigarh','Chandigarh'),(18,'Indore','Indore'),(19,'Jabalpur','Jabalpur'),(20,'Kanpur Central','Kanpur'),(21,'Visakhapatnam','Visakhapatnam'),(22,'Varanasi Jn','Varanasi'),(23,'Bhubaneswar','Bhubaneswar'),(24,'Madurai','Madurai'),(25,'Amritsar Jn','Amritsar'),(26,'Gaya Jn','Gaya'),(27,'Haridwar','Haridwar'),(28,'Kota Jn','Kota'),(29,'Raipur Jn','Raipur'),(30,'Udaipur City','Udaipur'),(31,'Tirupati','Tirupati'),(32,'Nashik Road','Nashik'),(33,'Gwalior','Gwalior'),(34,'Durg','Durg'),(35,'Jamshedpur','Jamshedpur'),(36,'Bilaspur','Bilaspur'),(37,'Surat','Surat'),(38,'Meerut City','Meerut'),(39,'Agra Cantt','Agra'),(40,'Aligarh','Aligarh'),(41,'Panipat','Panipat'),(42,'Ludhiana','Ludhiana'),(43,'Jodhpur','Jodhpur'),(44,'Baroda','Vadodara'),(45,'Dhanbad','Dhanbad'),(46,'Rourkela','Rourkela'),(47,'Kharagpur','Kharagpur'),(48,'Jhansi Jn','Jhansi'),(49,'Ajmer','Ajmer'),(50,'Ernakulam Jn','Ernakulam');
/*!40000 ALTER TABLE `Station` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ticket`
--

DROP TABLE IF EXISTS `Ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ticket` (
  `TicketID` int NOT NULL AUTO_INCREMENT,
  `PassengerID` int DEFAULT NULL,
  `TrainID` int DEFAULT NULL,
  `SeatID` int DEFAULT NULL,
  `ClassID` int DEFAULT NULL,
  `BookingStatus` enum('Confirmed','RAC','Waitlist','Cancelled') DEFAULT NULL,
  `PNRNumber` varchar(20) NOT NULL,
  `JourneyDate` date DEFAULT NULL,
  `FareAmount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`TicketID`),
  UNIQUE KEY `PNRNumber` (`PNRNumber`),
  KEY `PassengerID` (`PassengerID`),
  KEY `TrainID` (`TrainID`),
  KEY `SeatID` (`SeatID`),
  KEY `ClassID` (`ClassID`),
  CONSTRAINT `Ticket_ibfk_1` FOREIGN KEY (`PassengerID`) REFERENCES `Passenger` (`PassengerID`),
  CONSTRAINT `Ticket_ibfk_2` FOREIGN KEY (`TrainID`) REFERENCES `Train` (`TrainID`),
  CONSTRAINT `Ticket_ibfk_3` FOREIGN KEY (`SeatID`) REFERENCES `Seat` (`SeatID`),
  CONSTRAINT `Ticket_ibfk_4` FOREIGN KEY (`ClassID`) REFERENCES `Class` (`ClassID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ticket`
--

LOCK TABLES `Ticket` WRITE;
/*!40000 ALTER TABLE `Ticket` DISABLE KEYS */;
INSERT INTO `Ticket` VALUES (1,1,22,182,106,'Confirmed','PNR047315','2025-04-21',759.38),(2,2,32,270,160,'Confirmed','PNR625321','2025-04-24',145.00),(3,3,6,48,26,'Confirmed','PNR220314','2025-04-26',641.25),(4,4,23,193,114,'Confirmed','PNR308728','2025-04-15',300.00),(5,5,26,221,130,'Confirmed','PNR576009','2025-04-25',258.75),(6,6,16,135,78,'Confirmed','PNR674883','2025-04-22',1710.00),(7,7,18,155,90,'Confirmed','PNR278404','2025-04-17',144.38),(8,8,25,205,121,'Confirmed','PNR867501','2025-04-24',1125.00),(9,9,36,298,178,'Confirmed','PNR833807','2025-04-14',945.00),(10,10,3,28,15,'Confirmed','PNR577810','2025-04-16',111.25),(11,11,49,398,245,'Confirmed','PNR428432','2025-04-27',74.38),(12,12,44,361,220,'Confirmed','PNR576895','2025-04-15',97.50),(13,13,41,335,203,'Confirmed','PNR182501','2025-04-26',1242.00),(14,14,44,360,219,'Confirmed','PNR247312','2025-04-22',156.00),(15,15,11,91,52,'Confirmed','PNR860836','2025-04-24',1035.00),(16,16,13,110,63,'Confirmed','PNR919582','2025-04-19',667.50),(17,17,39,321,194,'Confirmed','PNR591820','2025-04-17',196.00),(18,18,46,375,228,'Confirmed','PNR174542','2025-04-24',855.00),(19,19,26,221,130,'Confirmed','PNR879974','2025-04-18',207.00),(20,20,9,76,43,'Confirmed','PNR645139','2025-04-15',618.75),(21,21,35,289,172,'Confirmed','PNR292798','2025-04-27',892.50),(22,22,30,248,146,'Confirmed','PNR445480','2025-04-22',517.50),(23,23,6,50,27,'Confirmed','PNR506636','2025-04-26',855.00),(24,24,3,20,11,'Confirmed','PNR716414','2025-04-23',400.50),(25,25,35,287,171,'Confirmed','PNR323818','2025-04-20',223.13),(26,26,13,108,62,'Confirmed','PNR335052','2025-04-26',890.00),(27,27,47,384,235,'Confirmed','PNR822163','2025-04-18',36.25),(28,28,2,11,6,'Confirmed','PNR294542','2025-04-15',1627.50),(29,29,47,381,233,'Confirmed','PNR111568','2025-04-25',652.50),(30,30,17,144,84,'Confirmed','PNR558267','2025-04-23',174.00),(31,31,44,358,218,'Confirmed','PNR768712','2025-04-15',2340.00),(32,32,16,135,78,'Confirmed','PNR480319','2025-04-15',855.00),(33,33,27,230,135,'Confirmed','PNR952231','2025-04-26',542.50),(34,34,2,16,9,'Confirmed','PNR885285','2025-04-15',520.80),(35,35,29,242,142,'Confirmed','PNR886940','2025-04-14',1560.00),(36,36,35,293,175,'Confirmed','PNR698286','2025-04-27',178.50),(37,37,31,255,151,'Confirmed','PNR179747','2025-04-16',427.50),(38,38,7,60,33,'Confirmed','PNR749166','2025-04-27',522.00),(39,39,50,400,246,'Confirmed','PNR271833','2025-04-14',1035.00),(40,40,37,302,181,'Confirmed','PNR909686','2025-04-15',1012.50),(41,41,16,136,79,'Confirmed','PNR460904','2025-04-15',342.00),(42,42,38,310,187,'Confirmed','PNR689603','2025-04-23',750.00),(43,43,45,367,223,'Confirmed','PNR421997','2025-04-23',828.00),(44,44,47,380,232,'Confirmed','PNR661758','2025-04-25',145.00),(45,45,39,322,195,'Confirmed','PNR115271','2025-04-17',183.75),(46,46,20,172,100,'Confirmed','PNR186550','2025-04-26',178.50),(47,47,40,324,196,'Confirmed','PNR491369','2025-04-18',1125.00),(48,48,24,197,116,'Confirmed','PNR408853','2025-04-16',735.00),(49,49,44,355,216,'Confirmed','PNR040277','2025-04-15',1170.00),(50,50,5,38,21,'Confirmed','PNR136939','2025-04-25',690.00);
/*!40000 ALTER TABLE `Ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Train`
--

DROP TABLE IF EXISTS `Train`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Train` (
  `TrainID` int NOT NULL AUTO_INCREMENT,
  `TrainName` varchar(100) NOT NULL,
  `TrainNumber` varchar(10) NOT NULL,
  `SourceStationID` int DEFAULT NULL,
  `DestinationStationID` int DEFAULT NULL,
  `RACCapacity` int DEFAULT '10',
  `WLCapacity` int DEFAULT '20',
  PRIMARY KEY (`TrainID`),
  UNIQUE KEY `TrainNumber` (`TrainNumber`),
  KEY `SourceStationID` (`SourceStationID`),
  KEY `DestinationStationID` (`DestinationStationID`),
  CONSTRAINT `Train_ibfk_1` FOREIGN KEY (`SourceStationID`) REFERENCES `Station` (`StationID`),
  CONSTRAINT `Train_ibfk_2` FOREIGN KEY (`DestinationStationID`) REFERENCES `Station` (`StationID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Train`
--

LOCK TABLES `Train` WRITE;
/*!40000 ALTER TABLE `Train` DISABLE KEYS */;
INSERT INTO `Train` VALUES (1,'Rajdhani Express','12301',1,2,20,30),(2,'Shatabdi Express','12001',3,4,15,25),(3,'Duronto Express','12245',5,6,10,20),(4,'Garib Rath','12909',7,8,25,40),(5,'Tejas Express','22119',9,10,20,20),(6,'Vande Bharat Express','22436',11,12,15,15),(7,'Jan Shatabdi','12071',13,14,18,22),(8,'Double Decker','12931',15,16,12,18),(9,'Humsafar Express','12595',17,18,14,24),(10,'Intercity Express','12731',19,20,10,20),(11,'Superfast Express','12345',1,2,12,30),(12,'Mail Express','13005',3,4,18,28),(13,'Passenger Special','54729',5,6,20,30),(14,'Sampark Kranti','12907',7,8,10,15),(15,'Antyodaya Express','22877',9,10,25,35),(16,'Kavi Guru Express','13015',11,12,12,25),(17,'Mahamana Express','22417',13,14,14,20),(18,'Yuva Express','12247',15,16,16,22),(19,'Uday Express','22666',17,18,10,20),(20,'Kumbh Express','12369',19,20,20,30),(21,'Goa Express','12779',21,22,14,18),(22,'Punjab Mail','12137',23,24,12,22),(23,'Jammu Mail','14033',25,26,10,15),(24,'Deccan Queen','12123',27,28,18,25),(25,'Chennai Express','12621',29,30,15,30),(26,'Mandovi Express','10103',1,2,15,25),(27,'Netravati Express','16345',3,4,14,28),(28,'Karnataka Express','12627',5,6,18,30),(29,'Goa Sampark Kranti','12449',7,8,12,18),(30,'Utkal Express','18477',9,10,16,24),(31,'Tamil Nadu Express','12622',11,12,18,22),(32,'Sampoorna Kranti','12393',13,14,10,20),(33,'Avadh Express','19037',15,16,22,32),(34,'Swaraj Express','12471',17,18,12,22),(35,'Gitanjali Express','12859',19,20,14,26),(36,'Howrah Mail','12809',21,22,18,28),(37,'Purushottam Express','12801',23,24,10,20),(38,'Puri Express','12887',25,26,16,24),(39,'Secunderabad Express','12723',27,28,20,30),(40,'Ahmedabad Express','19407',29,30,18,26),(41,'Ajmer Express','16210',1,2,14,22),(42,'Nizamuddin Express','12645',3,4,15,30),(43,'Vivek Express','15905',5,6,20,40),(44,'Kaziranga Express','15635',7,8,12,28),(45,'Sikkim Express','12575',9,10,16,20),(46,'Darjeeling Mail','12343',11,12,18,25),(47,'Mysuru Express','16231',13,14,10,20),(48,'Nilgiri Express','12671',15,16,22,34),(49,'Dehradun Express','19019',17,18,15,25),(50,'Goa Link Express','17315',19,20,14,20);
/*!40000 ALTER TABLE `Train` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `otp_expiry` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `mobile_number` (`mobile_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'RailwayReservation'
--
/*!50003 DROP FUNCTION IF EXISTS `calculate_fare` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `calculate_fare`(
    train_id INT,
    class_id INT
) RETURNS decimal(10,2)
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `calculate_revenue` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `calculate_revenue`(
    start_date DATE,
    end_date DATE
) RETURNS decimal(10,2)
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `refund_amount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `refund_amount`(p_pnr VARCHAR(20)) RETURNS decimal(10,2)
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `auto_book_50_tickets` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `auto_book_50_tickets`()
BEGIN
  DECLARE i INT DEFAULT 0;

  -- Declare variables to hold input values
  DECLARE v_name VARCHAR(100);
  DECLARE v_age INT;
  DECLARE v_gender ENUM('Male','Female','Other');
  DECLARE v_concession ENUM('None','Senior Citizen','Student','Military','Divyang');
  DECLARE v_train_number VARCHAR(10);
  DECLARE v_class_type ENUM('AC 3-tier','AC 2-tier','First Class','Second Class','General');
  DECLARE v_journey_date DATE;
  DECLARE v_payment_mode ENUM('Credit Card','Debit Card','UPI','Net Banking','Cash');

  -- Loop to generate 50 bookings
  WHILE i < 50 DO

    -- Generate random name, age, gender, and concession
    SET v_name = CONCAT('Passenger_', FLOOR(RAND() * 1000));
    SET v_age = FLOOR(18 + RAND() * 42);
    SET v_gender = ELT(FLOOR(1 + RAND() * 3), 'Male', 'Female', 'Other');
    SET v_concession = ELT(FLOOR(1 + RAND() * 5), 'None','Senior Citizen','Student','Military','Divyang');
    SET v_payment_mode = ELT(FLOOR(1 + RAND() * 5), 'Credit Card','Debit Card','UPI','Net Banking','Cash');

    -- Pick a random available seat's train, class, and date
    SELECT 
      t.TrainNumber,
      c.ClassType,
      sa.JourneyDate
    INTO 
      v_train_number,
      v_class_type,
      v_journey_date
    FROM SeatAvailability sa
    JOIN Seat s ON sa.SeatID = s.SeatID
    JOIN Train t ON s.TrainID = t.TrainID
    JOIN Class c ON s.ClassID = c.ClassID
    WHERE sa.AvailabilityStatus = 'Available'
    ORDER BY RAND()
    LIMIT 1;

    -- Call your booking procedure
    CALL book_ticket(
      v_name,
      v_age,
      v_gender,
      v_concession,
      v_train_number,
      v_class_type,
      v_journey_date,
      v_payment_mode
    );

    SET i = i + 1;
  END WHILE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `book_ticket` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `book_ticket`(
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
               passenger_id,
               @pnr AS PNR,
               booking_status AS Status,
               fare AS Fare;

    END book_ticket;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cancel_ticket` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `cancel_ticket`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `findavailable` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `findavailable`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `findtrain_bystations` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `findtrain_bystations`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `findtrain_bytrainnumber` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `findtrain_bytrainnumber`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `find_busiest_route` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `find_busiest_route`()
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `generate_itemized_bill` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `generate_itemized_bill`(
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTicketSummaryByPNR` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetTicketSummaryByPNR`(IN pnrNumber VARCHAR(20))
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_user_bookings` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `get_user_bookings`(IN input_passenger_id INT)
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `list_passengers_on_train` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `list_passengers_on_train`(
    IN p_train_name VARCHAR(100),
    IN p_journey_date DATE
)
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `show_train_schedule` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `show_train_schedule`(IN inputTrainName VARCHAR(100))
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-14 19:18:59
