-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `business`
--

DROP TABLE IF EXISTS `business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `business` (
  `bid` int NOT NULL AUTO_INCREMENT,
  `bname` varchar(200) NOT NULL,
  `fax` varchar(20) NOT NULL,
  `website` varchar(200) NOT NULL,
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business`
--

LOCK TABLES `business` WRITE;
/*!40000 ALTER TABLE `business` DISABLE KEYS */;
INSERT INTO `business` VALUES (1,'Amaxon','8769991115','Amaxon.com'),(2,'Burgers Inc','5655228628','WeBuyBurgers.com'),(3,'Yittoes','7874509755','Yittoes.com'),(4,'Diaby','0587751353','Diaby.com'),(5,'Fortudo','7892077878','Fortudo.com'),(6,'Xerxes','4312353541','Xerxes.com'),(7,'Synchnacity','2658802065','Synchnacity.com'),(8,'Mornon','7179999999','mornon.com'),(9,'Morioh','1541235532','morioh.com'),(10,'Treeglo','3444541235','treeglo.com'),(11,'Fargus','8778289191','Fargus.com'),(12,'Farrigut','7029992222','farrigut.com'),(13,'garbanzo','7829288522','garbanzo.com'),(14,'roomba','9109788121','roomba.com'),(15,'Paulas Boutique','1234567890','pboutique.com'),(16,'Shells R us','1234567890','shellsrus.com'),(17,'Ringles','1230123851','eatringles.com');
/*!40000 ALTER TABLE `business` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Customer` (`customer_id`),
  KEY `FK_Product` (`product_id`),
  CONSTRAINT `FK_Customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `FK_Product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (31,28,41);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(200) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `brand_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (7,'Acura'),(13,'Alfa Romeo'),(1,'Audi'),(2,'BMW'),(6,'Cadillac'),(4,'Genesis'),(9,'Infiniti'),(11,'Jaguar'),(10,'Kia'),(5,'Lexus'),(12,'Lincoln'),(8,'Maserati'),(3,'Mercedes Benz'),(14,'Volvo');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `city` varchar(200) NOT NULL,
  `password` varchar(70) NOT NULL,
  `zipcode` int NOT NULL,
  `phone` varchar(20) NOT NULL,
  `bid` int DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `FK_BusinessId` (`bid`),
  KEY `FK_StateId` (`state_id`),
  CONSTRAINT `FK_BusinessId` FOREIGN KEY (`bid`) REFERENCES `business` (`bid`),
  CONSTRAINT `FK_StateId` FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Nolan','Naik','27 S. 14th Street','Pittsburgh','01ea5ddd3be5477ac3eae2366fa12064615c485a541682db3e62d283241055a6',15203,'3016420865',NULL,38,'nolannaik@gmail.com'),(2,'Piada','Italian','262 1st Street','Albertsville','beb134754910a4b4790c69ab17d3975221f4c534b70c8d6e82b30c165e8c0c09',58282,'7445558966',NULL,16,'piada@forbes.com'),(3,'Amari','Cole','1084 East Slope','Saurignon','336ba5ed8c3ce83cb97d6b0a24596572df408179c5ef248ed2e95f235c4040cf',41748,'3134557444',NULL,28,'amaric@gmail.com'),(4,'Herbert','Goff','22 Fairview Avenue','Detroit','95a8a9e170c451573edee38325a741917ec1091221dc83bd601c0acbad834cd7',10101,'3852788914',NULL,30,'golions@nfl.com'),(5,'Kiribi','Njoku','7789 Overlook Court','Cleveland','6c2e1db1b3a914d0bec00336ba63f33b253253e45e7b63b2939896d84819b538',85411,'4055009652',NULL,29,'kiribati@kb.com'),(6,'Manuela','Timble','990 6th Avenue','Chapel','0c4ac837abc0830c9da02f051ec60711ac97d5b1aa55b181e6416779a182614f',74451,'1024565544',NULL,49,'mandt@msn.com'),(7,'Sherane','White','1492 Columbus Street','Northvale','b0b889633adb992bd412c1fe80ce4fbaa71b99bd6966f55fa0c62702117583de',50011,'4422885489',NULL,39,'sherane@verizon.net'),(8,'Myles','Harkonnen','1334 Kilian Circle','Liberty','44ff7b02c80d38b26dd6aa31d9470aed81b32e10331a3c994fb1a9945fd847ba',24557,'7858578200',NULL,40,'thespice@spiceworld.com'),(9,'Gerald','Gold','17046 Center Way','Dublin','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',50244,'5557496522',NULL,38,'goldenwind@gmail.com'),(10,'Paula','Pierson','8221 Emory Grove Road','Seattle,','a21aa03cab112ec591cd2ccfa3ba2d850b4695069084a89ec28527bd2f22e212',12924,'3016332329',15,49,'paula@pierson.com'),(11,'Gary','Squarepants','33 Pineapple Street','Bikini Bottom','24ace9baf7fbd081df5879aa1e83cc453c4366e98aa4449ada55d87438580976',12345,'3012229299',16,12,'gary@gary.com'),(12,'Nolan','Naik','27 South 14th St.','Pittsburgh','41a37f5b02ea65328a169b566cb3b46a3e74f5a910b7bd4d7328ff2c4142b3ce',15203,'3016420865',NULL,39,'nolan@pitt.edu'),(13,'Keanu','Brown','723 Saxony Lane','Valencia','6e00cd562cc2d88e238dfb81d9439de7ec843ee9d0c9879d549cb1436786f975',19188,'5423930099',12,52,'theone@blog.com'),(14,'Abraham','Morton','9022 East Heartland Court','Thurgood','98d9d59a907519c80fc08e9ba0e4505f152c1bb8dbe94538e11ad19f5ccdbfe0',78550,'2001554523',13,9,'honestabe@pringle.com'),(15,'Ram','Suresh','11 Meadow Vale','Olney','08ca952807af8ab051f8b358e0a710217d1cebb97823da946bffd3e445353f8b',56233,'9801233541',14,51,'ram@obgc.com'),(16,'Courtney','Wick','73 Munich Lane','Ulm','6a470ec92721daa0e5848b8004f627b5e23fb6ff69e0ea668e4d0e76f3c83b8b',14412,'5093942309',1,42,'wickster@hotmail.com'),(17,'Aisha','Valentine','22 Avalon Lane','Quail','4871ee3aa1446057cec1b0c84cab9f9a13a20764bd69828b41eb035e8997d0f3',41414,'1255520043',2,36,'valentine@zaxby.com'),(18,'Vikram','Patel','101 Bacchan Boulevard','Alabasta','905b5dd1620082bcc68dd4c8c28fc8fe0b82a4c7e227c931ff5ba9644d806673',15632,'3540123981',3,51,'vik@email.com'),(19,'Alvin','Chipmunk','9000 Victory Lane','Barbell','e4a2cc86b6892848202f300af093b04f4aa28463140c18a69dd54f35d2d42566',55188,'5423930099',4,44,'alvin@blog.com'),(20,'Larry','Winslow','92 Waldon Court','Thurgood','98d9d59a907519c80fc08e9ba0e4505f152c1bb8dbe94538e11ad19f5ccdbfe0',78150,'2001554523',5,9,'larry@hands.com'),(21,'Prince','Thicket','111 Park Avenue','Olney','08ca952807af8ab051f8b358e0a710217d1cebb97823da946bffd3e445353f8b',41221,'9801233541',6,28,'prince@typhus.com'),(22,'Yebba','Verb','713 Ortega Street','Ulm','6a470ec92721daa0e5848b8004f627b5e23fb6ff69e0ea668e4d0e76f3c83b8b',15642,'5093942309',7,11,'yeebs@hotmail.com'),(23,'Noelle','Winter','225 Lake Lane','Quail','e718b2dd3e0ac1f9208efdffe98024e7406e29c51c31bcfa9a6b29d1951b19f4',41564,'1255527823',8,41,'noelle@elves.com'),(24,'Pedro','Alvarez','10144 Ligma Boulevard','Porto','905b5dd1620082bcc68dd4c8c28fc8fe0b82a4c7e227c931ff5ba9644d806673',13412,'3542223981',9,40,'pedro@email.com'),(25,'Hock','Smock','73 Munich Lane','Detroit','c744704f6f733ca68584aba24d2c1b1713bd753a3c127eb246d58b1d461284a8',15642,'5093942309',10,31,'yeebs@hotmail.com'),(26,'Gort','Rodrigo','822 Clam Road','Nedraa','126659d70bb3f2fb585ab565afbda86a58978d52ba69820dc5ab138b8387db3e',41564,'1255527823',11,29,'noelle@elves.com'),(27,'Igor','Meegle','17 first street','pittsburgh','de5d4bc377bf747edbbd1a1567af2f4bf0108b469c2ff7f9b8fcd010e9c3870e',15213,'1231231234',NULL,10,'imeegle@gmail.com'),(28,'andrew','andrew','1 forbes avenue','Pittsburgh','de5d4bc377bf747edbbd1a1567af2f4bf0108b469c2ff7f9b8fcd010e9c3870e',15213,'222222222',NULL,39,'test@test.com'),(29,'James','Pilk','8888 Wexford Court','Bradford','08771350e9165a85b78de80201f6f1dc50011fb7abf7f8df21df8d44e39c0573',30928,'+212191446084',17,7,'james@comcast.com'),(30,'mungus','joe','22056 Borko Drive','Germantown','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',20876,'9732228221',NULL,21,'polojoe@google.com'),(31,'Bharati','Desai','3700 O\'hara Street','Pittsburgh','befede35d5bf88da6e7f44a8377497aaaf4b0af2b2fd21e28b404136b63267af',15213,'9738766000',NULL,39,'bd1952@gmail.com'),(32,'Bharati','Desai','1025 Evergreen Street','Birmingham','b177d1f587c9a552f167ec9345ff157edb81b9580ea47f362b1bbcb91b8abe71',11102,'9738766059',NULL,2,'bd1951@gmail.co2'),(34,'Paul','Lee','19 Goldbrooke Avenue','Brookeville','9e7cbc1380adfc1ed117071a6fab6401ea025ba1969eaa173e42c7c637027a9c',20830,'3017775464',NULL,21,'paullee@gmail.com');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `price` double NOT NULL,
  `description` varchar(4000) NOT NULL,
  `quantity_remaining` int NOT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FK_brandId` (`category_id`),
  CONSTRAINT `FK_brandId` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'2021 Mercedes-Benz S Class',109000,'Luxury Sedan',27,3),(2,'2021 Lexus ES',40000,'Premium Sedan',21,5),(3,'2021 Mercedes-Benz E Class',54000,'Premium Sedan',36,3),(4,'2022 Audi A6',55000,'Premium Sedan',43,1),(5,'2022 Lexus ES',40000,'Premium Sedan',63,5),(6,'2021 Audi A8',86000,'Luxury Sedan',28,1),(7,'2022 Mercedes-Benz E Class',54000,'Premium Sedan',55,3),(8,'2021 Cadillac CT4',33000,'Sedan',62,6),(9,'2021 Genesis G80',47000,'Premium Sedan',58,4),(10,'2021 Genesis G70',36000,'Sedan',77,4),(11,'2021 BMW 5 Series ',54000,'Premium Sedan',50,2),(12,'2021 Cadillac CT5',36000,'Sedan',76,6),(13,'2022 BMW 7 Series',86000,'Luxury Sedan',37,2),(14,'2021 Genesis G90',72000,'Luxury Sedan',66,4),(15,'2022 Genesis G80',48000,'Premium Sedan',83,4),(16,'2021 Infiniti Q50',36000,'Sedan',89,9),(17,'2022 Genesis G70',37000,'Premium Sedan',117,4),(18,'2021 Lexus IS',39000,'Sedan',79,5),(19,'2021 BMW 2 Series',35000,'Sedan',128,2),(20,'2022 Acura TLX',37000,'Sedan',75,7),(21,'2021 Mercedes-Benz A Class',33000,'Sedan',138,3),(22,'2021 Lexus LS',76000,'Luxury Sedan',54,5),(23,'2021 Jaguar XF',43000,'Premium Sedan',78,11),(24,'2021 Acura ILX',26000,'Sedan',152,7),(25,'2020 BMW 7 Series',86000,'Luxury Sedan',14,2),(26,'2022 Cadillac CT5',37000,'Sedan',62,6),(27,'2021 BMW 3 Series',41000,'Premium Sedan',86,2),(28,'2021 Acura TLX',37000,'Sedan',99,7),(29,'2022 Audi A5',43000,'Premium Sedan',74,1),(30,'2021 Volvo S60',38000,'Sedan',83,14),(31,'2021 Audi A6',54000,'Premium Sedan',68,1),(32,'2022 Audi A4',39000,'Sedan',90,1),(33,'2022 Maserati Ghibli',76000,'Luxury Sedan',44,8),(34,'2022 Audi A3',33000,'Sedan',82,1),(35,'2020 Mercedes-Benz S Class',94000,'Luxury Sedan',53,3),(36,'2021 Jaguar F-Type',61000,'Luxury Sedan',0,11),(37,'2020 Genesis G70',35000,'Sedan',35,4),(38,'2021 Alfa Romeo Guilia',40000,'Premium Sedan',48,13),(39,'2021 Mercedes-Benz C Class',41000,'Premium Sedan',64,3),(40,'2021 Genesis GV80',48000,'Premium SUV',66,4),(41,'2021 Audi Q3',34000,'SUV',79,1),(42,'2021 BMW X1',35000,'SUV',90,2),(43,'2021 BMW 7 Series',86000,'Luxury Sedan',43,2),(44,'2020 Mercedes-Benz E Class',54000,'Premium Sedan',34,3),(45,'2020 Cadillac CT5',36000,'Sedan',15,6),(46,'2022 Volvo S60',39000,'Sedan',60,14),(47,'2020 Lincoln MKZ',36000,'Sedan',12,12),(48,'2021 Kia Stinger',33000,'Sedan',50,10),(49,'2020 Lexus GS',51000,'Premium Sedan',35,6),(50,'2022 Mercedes-Benz CLA Class',38000,'Sedan',68,3);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases` (
  `purchase_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `quantity_sold` int NOT NULL,
  PRIMARY KEY (`purchase_id`),
  KEY `FK_ProductID` (`product_id`),
  CONSTRAINT `FK_ProductID` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (1,25,1),(2,38,3),(3,33,1),(4,24,1),(5,28,11),(6,21,1),(7,48,2),(8,32,1),(9,46,1),(10,24,1),(11,25,1),(12,42,1),(13,46,1),(14,34,3),(15,36,52),(16,23,1),(17,35,1),(18,25,1),(19,1,1),(20,27,2),(21,18,2),(22,46,1),(23,35,3),(24,1,1),(25,2,1),(26,14,2),(27,5,2),(28,22,1),(29,40,1),(30,11,1),(31,12,1),(32,13,2),(33,45,2),(34,25,3),(35,41,1),(36,21,1),(37,22,1),(38,24,2),(39,25,2),(40,32,1),(41,40,1),(42,19,1),(43,10,1),(44,13,2),(45,50,2),(46,23,3),(47,33,2),(48,1,1),(49,2,1),(50,14,2),(51,5,2),(52,22,1),(53,40,1),(54,11,1),(55,12,1),(56,13,2),(57,45,2),(58,25,3),(59,41,1),(60,21,1),(61,20,1),(62,26,2),(63,31,2),(64,32,1),(65,4,1),(66,27,1),(67,12,1),(68,8,2),(69,49,2),(70,28,3),(71,38,2),(72,13,2),(73,25,3),(74,48,2),(75,18,1),(76,25,1),(77,6,2);
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `state_id` int NOT NULL AUTO_INCREMENT,
  `state_name` varchar(20) NOT NULL,
  PRIMARY KEY (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Alabama'),(2,'Alaska'),(3,'Arizona'),(4,'Arkansas'),(5,'California'),(6,'Colorado'),(7,'Connecticut'),(8,'Delaware'),(9,'Florida'),(10,'Georgia'),(11,'Hawaii'),(12,'Idaho'),(13,'Illinois'),(14,'Indiana'),(15,'Iowa'),(16,'Kansas'),(17,'Kentucky'),(18,'Louisiana'),(19,'Maine'),(20,'Maryland'),(21,'Massachusetts'),(22,'Michigan'),(23,'Minnesota'),(24,'Mississippi'),(25,'Missouri'),(26,'Montana'),(27,'Nebraska'),(28,'Nevada'),(29,'New Hampshire'),(30,'New Jersey'),(31,'New Mexico'),(32,'New York'),(33,'North Carolina'),(34,'North Dakota'),(35,'Ohio'),(36,'Oklahoma'),(37,'Oregon'),(38,'Pennsylvania'),(39,'Puerto Rico'),(40,'Rhode Island'),(41,'South Carolina'),(42,'South Dakota'),(43,'Tennessee'),(44,'Texas'),(45,'Utah'),(46,'Vermont'),(47,'Virginia'),(48,'Washington'),(49,'Washington, DC'),(50,'West Virginia'),(51,'Wisconsin'),(52,'Wyoming');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `trans_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `purchase_id` int DEFAULT NULL,
  `date_of_transaction` date NOT NULL,
  PRIMARY KEY (`trans_id`),
  UNIQUE KEY `purchase_id` (`purchase_id`),
  KEY `FK_CustomerID` (`customer_id`),
  CONSTRAINT `FK_CustomerID` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `FK_PurchaseID` FOREIGN KEY (`purchase_id`) REFERENCES `purchases` (`purchase_id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,10,1,'2021-11-25'),(2,10,2,'2021-11-25'),(3,10,3,'2021-11-25'),(4,10,4,'2021-11-25'),(5,10,5,'2021-11-26'),(6,1,6,'2021-11-26'),(7,1,7,'2021-12-01'),(8,1,8,'2021-12-01'),(9,3,9,'2021-12-01'),(10,3,10,'2021-12-01'),(11,9,11,'2021-12-01'),(12,9,12,'2021-12-01'),(13,2,13,'2021-12-03'),(14,5,14,'2021-12-03'),(15,5,15,'2021-12-03'),(16,5,16,'2021-12-03'),(17,11,17,'2021-12-03'),(18,11,18,'2021-12-03'),(19,11,19,'2021-12-03'),(20,11,20,'2021-12-03'),(21,12,21,'2021-12-04'),(22,12,22,'2021-12-04'),(23,12,23,'2021-12-04'),(24,13,24,'2019-11-25'),(25,14,25,'2020-11-27'),(26,15,26,'2020-11-30'),(27,16,27,'2020-12-01'),(28,17,28,'2020-12-01'),(29,18,29,'2020-12-02'),(30,19,30,'2020-12-04'),(31,20,31,'2020-12-10'),(32,21,32,'2020-12-11'),(33,22,33,'2020-12-14'),(34,23,34,'2020-12-15'),(35,24,35,'2020-12-15'),(36,25,36,'2020-12-16'),(37,26,37,'2020-12-17'),(38,1,38,'2020-12-25'),(39,2,39,'2021-01-01'),(40,4,40,'2021-01-02'),(41,11,41,'2021-01-02'),(42,17,42,'2021-01-02'),(43,20,43,'2021-01-02'),(44,17,44,'2021-01-02'),(45,9,45,'2021-01-05'),(46,25,46,'2021-01-05'),(47,22,47,'2021-01-06'),(48,7,48,'2021-02-07'),(49,9,49,'2021-02-25'),(50,20,50,'2021-03-01'),(51,26,51,'2021-03-02'),(52,20,52,'2021-03-03'),(53,22,53,'2021-03-04'),(54,3,54,'2021-03-05'),(55,21,55,'2021-04-27'),(56,25,56,'2021-04-28'),(57,14,57,'2021-05-06'),(58,17,58,'2021-06-01'),(59,24,59,'2021-06-01'),(60,4,60,'2021-06-01'),(61,22,61,'2021-06-02'),(62,18,62,'2021-06-02'),(63,20,63,'2021-07-05'),(64,6,64,'2021-07-10'),(65,19,65,'2021-07-15'),(66,25,66,'2021-08-25'),(67,22,67,'2021-09-13'),(68,7,68,'2021-10-13'),(69,9,69,'2021-11-25'),(70,20,70,'2021-12-04'),(71,26,71,'2021-12-05'),(72,27,72,'2021-12-05'),(73,27,73,'2021-12-05'),(74,27,74,'2021-12-05'),(75,27,75,'2021-12-05'),(76,28,76,'2021-12-05'),(77,28,77,'2021-12-05');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-06 14:04:45
