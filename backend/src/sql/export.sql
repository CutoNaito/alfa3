-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: obchod
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `obchod`
--

START TRANSACTION;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `obchod` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `obchod`;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_zak` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `text` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_zak_const` (`id_zak`),
  KEY `id_prod_const` (`id_prod`),
  CONSTRAINT `id_prod_const` FOREIGN KEY (`id_prod`) REFERENCES `produkt` (`id`),
  CONSTRAINT `id_zak_const` FOREIGN KEY (`id_zak`) REFERENCES `zakaznik` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `feedback_on_product`
--

DROP TABLE IF EXISTS `feedback_on_product`;
/*!50001 DROP VIEW IF EXISTS `feedback_on_product`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `feedback_on_product` (
  `id` tinyint NOT NULL,
  `id_prod` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `surname` tinyint NOT NULL,
  `first_name` tinyint NOT NULL,
  `title` tinyint NOT NULL,
  `text` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `objednavka`
--

DROP TABLE IF EXISTS `objednavka`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `objednavka` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_zak` int(11) NOT NULL,
  `id_zam` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `datum_vytvoreni` datetime NOT NULL DEFAULT current_timestamp(),
  `isPaid` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_zak_constr` (`id_zak`),
  KEY `id_zam_constr` (`id_zam`),
  KEY `id_prod_constr` (`id_prod`),
  CONSTRAINT `id_prod_constr` FOREIGN KEY (`id_prod`) REFERENCES `produkt` (`id`),
  CONSTRAINT `id_zak_constr` FOREIGN KEY (`id_zak`) REFERENCES `zakaznik` (`id`),
  CONSTRAINT `id_zam_constr` FOREIGN KEY (`id_zam`) REFERENCES `zamestnanec` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objednavka`
--

LOCK TABLES `objednavka` WRITE;
/*!40000 ALTER TABLE `objednavka` DISABLE KEYS */;
/*!40000 ALTER TABLE `objednavka` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `orders_per_person`
--

DROP TABLE IF EXISTS `orders_per_person`;
/*!50001 DROP VIEW IF EXISTS `orders_per_person`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `orders_per_person` (
  `id` tinyint NOT NULL,
  `id_zak` tinyint NOT NULL,
  `surname` tinyint NOT NULL,
  `first_name` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `price` tinyint NOT NULL,
  `size` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `produkt`
--

DROP TABLE IF EXISTS `produkt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produkt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` float NOT NULL,
  `size` enum('XXS','XS','S','M','L','XL','XXL','3XL') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produkt`
--

LOCK TABLES `produkt` WRITE;
/*!40000 ALTER TABLE `produkt` DISABLE KEYS */;
INSERT INTO `produkt` VALUES (1,'test',10,'XXL'),(2,' price',0,NULL),(3,' 225',0,NULL),(5,' price',0,NULL),(6,' 225',0,NULL),(8,'Black T-shirt',225,''),(9,'Black T-shirt',225,'L'),(10,'Black T-shirt',225,'L'),(11,'Black T-shirt',225,'L'),(12,'Black T-shirt',225,'L'),(13,'Black T-shirt',225,'L'),(14,'Black T-shirt',225,'L');
/*!40000 ALTER TABLE `produkt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zakaznik`
--

DROP TABLE IF EXISTS `zakaznik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zakaznik` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `surname` varchar(20) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zakaznik`
--

LOCK TABLES `zakaznik` WRITE;
/*!40000 ALTER TABLE `zakaznik` DISABLE KEYS */;
/*!40000 ALTER TABLE `zakaznik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zamestnanec`
--

DROP TABLE IF EXISTS `zamestnanec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zamestnanec` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `surname` varchar(20) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zamestnanec`
--

LOCK TABLES `zamestnanec` WRITE;
/*!40000 ALTER TABLE `zamestnanec` DISABLE KEYS */;
/*!40000 ALTER TABLE `zamestnanec` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `obchod`
--

USE `obchod`;

--
-- Final view structure for view `feedback_on_product`
--

COMMIT;

/*!50001 DROP TABLE IF EXISTS `feedback_on_product`*/;
/*!50001 DROP VIEW IF EXISTS `feedback_on_product`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `feedback_on_product` AS select `feedback`.`id` AS `id`,`feedback`.`id_prod` AS `id_prod`,`produkt`.`name` AS `name`,`zakaznik`.`surname` AS `surname`,`zakaznik`.`first_name` AS `first_name`,`feedback`.`title` AS `title`,`feedback`.`text` AS `text` from ((`feedback` join `produkt` on(`produkt`.`id` = `feedback`.`id_prod`)) join `zakaznik` on(`zakaznik`.`id` = `feedback`.`id_zak`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `orders_per_person`
--

/*!50001 DROP TABLE IF EXISTS `orders_per_person`*/;
/*!50001 DROP VIEW IF EXISTS `orders_per_person`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `orders_per_person` AS select `objednavka`.`id` AS `id`,`objednavka`.`id_zak` AS `id_zak`,`zakaznik`.`surname` AS `surname`,`zakaznik`.`first_name` AS `first_name`,`produkt`.`name` AS `name`,`produkt`.`price` AS `price`,`produkt`.`size` AS `size` from ((`objednavka` join `produkt` on(`produkt`.`id` = `objednavka`.`id_prod`)) join `zakaznik` on(`zakaznik`.`id` = `objednavka`.`id_zak`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-03 10:19:46
