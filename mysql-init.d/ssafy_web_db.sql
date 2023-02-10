CREATE DATABASE  IF NOT EXISTS `ssafy_web_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `ssafy_web_db`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: ssafy_web_db
-- ------------------------------------------------------
-- Server version	5.7.35-log

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
-- Table structure for table `bundle`
--

DROP TABLE IF EXISTS `bundle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bundle` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `is_approval` bit(1) NOT NULL,
  `is_paid` bit(1) NOT NULL,
  `is_refuse` bit(1) NOT NULL,
  `price` int(11) NOT NULL,
  `live_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtq8og15huiqfplpbxy222d1ui` (`live_id`),
  KEY `FKix2q83ap1m0q5x7cxtdvt1gmc` (`user_id`),
  CONSTRAINT `FKix2q83ap1m0q5x7cxtdvt1gmc` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKtq8og15huiqfplpbxy222d1ui` FOREIGN KEY (`live_id`) REFERENCES `live` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bundle`
--

LOCK TABLES `bundle` WRITE;
/*!40000 ALTER TABLE `bundle` DISABLE KEYS */;
INSERT INTO `bundle` VALUES (1,_binary '\0',_binary '\0',_binary '\0',14000,1,1),(2,_binary '\0',_binary '\0',_binary '\0',3000,1,6),(3,_binary '\0',_binary '\0',_binary '\0',21000,2,3),(4,_binary '\0',_binary '\0',_binary '\0',37400,3,7),(5,_binary '\0',_binary '\0',_binary '\0',37400,3,8),(6,_binary '\0',_binary '\0',_binary '\0',37400,4,1),(7,_binary '\0',_binary '\0',_binary '\0',37400,4,7);
/*!40000 ALTER TABLE `bundle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bundled_items_relation`
--

DROP TABLE IF EXISTS `bundled_items_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bundled_items_relation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bundle_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKq62l8ijyiek612hyfde54wsvw` (`bundle_id`),
  KEY `FK58x2l8un1et8vb7v4r41hbd4g` (`product_id`),
  CONSTRAINT `FK58x2l8un1et8vb7v4r41hbd4g` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKq62l8ijyiek612hyfde54wsvw` FOREIGN KEY (`bundle_id`) REFERENCES `bundle` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bundled_items_relation`
--

LOCK TABLES `bundled_items_relation` WRITE;
/*!40000 ALTER TABLE `bundled_items_relation` DISABLE KEYS */;
INSERT INTO `bundled_items_relation` VALUES (1,1,1),(2,1,3),(3,1,4),(4,2,2),(5,3,5),(6,3,6),(7,4,7),(8,4,8),(9,5,9),(10,6,10),(11,7,11);
/*!40000 ALTER TABLE `bundled_items_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_message`
--

DROP TABLE IF EXISTS `chat_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `sender_id` bigint(20) NOT NULL,
  `chat_room_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj52yap2xrm9u0721dct0tjor9` (`chat_room_id`),
  CONSTRAINT `FKj52yap2xrm9u0721dct0tjor9` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
INSERT INTO `chat_message` VALUES (1,NULL,'안녕하세요',1,1),(2,NULL,'안녕하세요!',2,1),(3,NULL,'그런데 무슨 일이시죠?',2,1),(4,NULL,'다음이 아니라 물건 잘 받으셨나요?',1,1),(5,NULL,'궁금해서 연락드립니다.',1,1),(6,NULL,'아이구, 친절하셔라',2,1),(7,NULL,'아주 잘쓰고 있습니다.',2,1),(8,NULL,'다행이네요!',1,1),(9,NULL,'아주 뿌듯합니다!',1,1),(10,NULL,'디음에도 이용해 주세요!!!',1,1),(11,NULL,'ㅎㅎㅎㅎㅎ',2,1),(12,NULL,'ㅎㅎㅎㅎㅎ',2,1),(13,NULL,'ㅎㅎㅎㅎㅎ',2,1),(14,NULL,'ㅎㅎㅎㅎㅎ',2,1),(15,NULL,'ㅎㅎㅎㅎㅎ',2,1),(16,NULL,'ㅎㅎㅎㅎㅎ',2,1),(17,NULL,'ㅎㅎㅎㅎㅎ',2,1),(18,NULL,'ㅎㅎㅎㅎㅎ',2,1),(19,NULL,'ㅎㅎㅎㅎㅎ',2,1),(20,NULL,'ㅎㅎㅎㅎㅎ',2,1),(21,NULL,'ㅎㅎㅎㅎㅎ',2,1),(22,NULL,'ㅎㅎㅎㅎㅎ',2,1),(23,NULL,'ㅎㅎㅎㅎㅎ',2,1),(24,NULL,'ㅎㅎㅎㅎㅎ',2,1),(25,NULL,'ㅎㅎㅎㅎㅎ',2,1),(26,NULL,'ㅎㅎㅎㅎㅎ',2,1),(27,NULL,'ㅎㅎㅎㅎㅎ',2,1),(28,NULL,'ㅎㅎㅎㅎㅎ',2,1),(29,NULL,'ㅎㅎㅎㅎㅎ',2,1),(30,NULL,'ㅎㅎㅎㅎㅎ',2,1),(31,NULL,'ㅎㅎㅎㅎㅎ',2,1),(32,NULL,'ㅎㅎㅎㅎㅎ',2,1),(33,NULL,'ㅎㅎㅎㅎㅎ',2,1),(34,NULL,'ㅎㅎㅎㅎㅎ',2,1),(35,NULL,'ㅎㅎㅎㅎㅎ',2,1),(36,NULL,'ㅎㅎㅎㅎㅎ',2,1),(37,NULL,'ㅎㅎㅎㅎㅎ',2,1),(38,NULL,'ㅎㅎㅎㅎㅎ',2,1),(39,NULL,'ㅎㅎㅎㅎㅎ',2,1),(40,NULL,'ㅎㅎㅎㅎㅎ',2,1),(41,NULL,'안녕히계세요',2,1),(42,NULL,'안녕하세요',1,2),(43,NULL,'안녕하세요!',3,2),(44,NULL,'그런데 무슨 일이시죠?',3,2),(45,NULL,'다음이 아니라 물건 잘 받으셨나요?',1,2),(46,NULL,'궁금해서 연락드립니다.',1,2),(47,NULL,'아이구, 친절하셔라',3,2),(48,NULL,'아주 잘쓰고 있습니다.',3,2),(49,NULL,'다행이네요!',1,2),(50,NULL,'아주 뿌듯합니다!',1,2),(51,NULL,'디음에도 이용해 주세요!!!',1,2),(52,NULL,'안녕히계세요',3,2),(53,NULL,'안녕하세요',1,3),(54,NULL,'안녕하세요!',4,3),(55,NULL,'그런데 무슨 일이시죠?',4,3),(56,NULL,'다음이 아니라 물건 잘 받으셨나요?',1,3),(57,NULL,'궁금해서 연락드립니다.',1,3),(58,NULL,'아이구, 친절하셔라',4,3),(59,NULL,'아주 잘쓰고 있습니다.',4,3),(60,NULL,'다행이네요!',1,3),(61,NULL,'아주 뿌듯합니다!',1,3),(62,NULL,'디음에도 이용해 주세요!!!',1,3),(63,NULL,'안녕히계세요',4,3),(64,NULL,'안녕하세요',5,4),(65,NULL,'안녕하세요!',6,4),(66,NULL,'그런데 무슨 일이시죠?',6,4),(67,NULL,'다음이 아니라 물건 잘 받으셨나요?',5,4),(68,NULL,'궁금해서 연락드립니다.',5,4),(69,NULL,'아이구, 친절하셔라',6,4),(70,NULL,'아주 잘쓰고 있습니다.',6,4),(71,NULL,'다행이네요!',5,4),(72,NULL,'아주 뿌듯합니다!',5,4),(73,NULL,'디음에도 이용해 주세요!!!',5,4),(74,NULL,'안녕히계세요',6,4),(75,NULL,'안녕하세요',5,5),(76,NULL,'안녕하세요!',7,5),(77,NULL,'그런데 무슨 일이시죠?',7,5),(78,NULL,'다음이 아니라 물건 잘 받으셨나요?',5,5),(79,NULL,'궁금해서 연락드립니다.',5,5),(80,NULL,'아이구, 친절하셔라',7,5),(81,NULL,'아주 잘쓰고 있습니다.',7,5),(82,NULL,'다행이네요!',5,5),(83,NULL,'아주 뿌듯합니다!',5,5),(84,NULL,'디음에도 이용해 주세요!!!',5,5),(85,NULL,'안녕히계세요',7,5);
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_room` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `last_send_message` varchar(255) DEFAULT NULL,
  `last_send_time` datetime(6) DEFAULT NULL,
  `first_user_id` bigint(20) DEFAULT NULL,
  `second_user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK25juxp8enpp7unn3bwjs4qw24` (`first_user_id`),
  KEY `FK3flfuyuph3s4vp7r9hws5jdv8` (`second_user_id`),
  CONSTRAINT `FK25juxp8enpp7unn3bwjs4qw24` FOREIGN KEY (`first_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK3flfuyuph3s4vp7r9hws5jdv8` FOREIGN KEY (`second_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` VALUES (1,NULL,'안녕히계세요',NULL,1,2),(2,NULL,'안녕히계세요',NULL,1,3),(3,NULL,'안녕히계세요',NULL,1,4),(4,NULL,'안녕히계세요',NULL,5,6),(5,NULL,'안녕히계세요',NULL,5,7);
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `live_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKice9lx4keequ4ujl7vog85h7n` (`live_id`),
  KEY `FKh3f2dg11ibnht4fvnmx60jcif` (`user_id`),
  CONSTRAINT `FKh3f2dg11ibnht4fvnmx60jcif` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKice9lx4keequ4ujl7vog85h7n` FOREIGN KEY (`live_id`) REFERENCES `live` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
INSERT INTO `favorite` VALUES (1,1,3),(2,1,5),(3,1,6),(4,2,3),(5,2,7),(6,3,1),(7,3,4),(8,3,6),(9,4,1),(10,4,2),(11,4,5),(12,4,6);
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `live`
--

DROP TABLE IF EXISTS `live`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `live` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_live` bit(1) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `seller_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_12u2y7974y0cyrouqhqgu8kci` (`id`,`seller_id`),
  KEY `FKt83volnphajotk5r3qeuabnd7` (`seller_id`),
  CONSTRAINT `FKt83volnphajotk5r3qeuabnd7` FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `live`
--

LOCK TABLES `live` WRITE;
/*!40000 ALTER TABLE `live` DISABLE KEYS */;
INSERT INTO `live` VALUES (1,'2023-02-09 14:50:55.034018','',_binary '',36.354963,127.297375,'4','202302094499400933088800.png','소소한 물건 팝니다','https://localhost:8000/test/4',4),(2,'2023-02-09 15:00:55.153658','',_binary '',36.354963,127.297375,'1','202302094500000879250800.png','옷 필요하신 분','https://localhost:8000/test/1',1),(3,'2023-02-09 15:07:51.318712','',_binary '',36.354963,127.297375,'1','202302094500417109444800.png','좋은 물건 많습니다.','https://localhost:8000/test/1',1),(4,'2023-02-09 15:14:02.509081','',_binary '',36.354963,127.297375,'3','202302094500788237136900.png','핸드폰 팝니다','https://localhost:8000/test/3',3);
/*!40000 ALTER TABLE `live` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `live_category`
--

DROP TABLE IF EXISTS `live_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `live_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) DEFAULT NULL,
  `live_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlwi8jh7xasagvv5iqkowag2i9` (`category_id`),
  KEY `FK2d0t24xutqtfgljbhoflhqje9` (`live_id`),
  CONSTRAINT `FK2d0t24xutqtfgljbhoflhqje9` FOREIGN KEY (`live_id`) REFERENCES `live` (`id`),
  CONSTRAINT `FKlwi8jh7xasagvv5iqkowag2i9` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `live_category`
--

LOCK TABLES `live_category` WRITE;
/*!40000 ALTER TABLE `live_category` DISABLE KEYS */;
INSERT INTO `live_category` VALUES (1,NULL,1),(2,NULL,1),(3,NULL,2),(4,NULL,3),(5,NULL,3),(6,NULL,4);
/*!40000 ALTER TABLE `live_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `buyer_id` bigint(20) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `initial_price` int(11) NOT NULL,
  `is_paid` bit(1) NOT NULL,
  `left_topx` int(11) NOT NULL,
  `left_topy` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `right_bottomx` int(11) NOT NULL,
  `right_bottomy` int(11) NOT NULL,
  `sold_at` datetime(6) DEFAULT NULL,
  `sold_price` int(11) NOT NULL,
  `live_id` bigint(20) DEFAULT NULL,
  `seller_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK996onn11af14netkudluvbaw3` (`live_id`,`seller_id`),
  CONSTRAINT `FK996onn11af14netkudluvbaw3` FOREIGN KEY (`live_id`, `seller_id`) REFERENCES `live` (`id`, `seller_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'2023-02-09 14:50:55.246936',NULL,'202302094499400859760000.png',0,_binary '\0',33,30,'마우스패드',288,323,NULL,0,1,4),(2,'2023-02-09 14:50:55.265861',NULL,'202302094499400859760000.png',3500,_binary '\0',259,124,'다람쥐인형',366,225,NULL,0,1,4),(3,'2023-02-09 14:50:55.272834',NULL,'202302094499400859760000.png',0,_binary '\0',323,197,'포스트잇',437,272,NULL,0,1,4),(4,'2023-02-09 14:50:55.278037',NULL,'202302094499400859760000.png',12000,_binary '\0',264,232,'버즈케이스',350,323,NULL,0,1,4),(5,'2023-02-09 15:00:55.232103',NULL,'202302094500000854650800.png',0,_binary '\0',184,165,'분홍색맨투맨',472,346,NULL,0,2,1),(6,'2023-02-09 15:00:55.237121',NULL,'202302094500000854650800.png',20000,_binary '\0',152,3,'검정조끼',469,213,NULL,0,2,1),(7,'2023-02-09 15:07:51.444823',NULL,'202302094500417066756100.png',0,_binary '\0',165,92,'유제균이름표',284,330,NULL,0,3,1),(8,'2023-02-09 15:07:51.451898',NULL,'202302094500417066756100.png',0,_binary '\0',254,80,'서준배이름표',380,327,NULL,0,3,1),(9,'2023-02-09 15:07:51.457708',NULL,'202302094500417066756100.png',0,_binary '\0',359,90,'장재욱이름표',476,339,NULL,0,3,1),(10,'2023-02-09 15:14:02.585465',NULL,'202302094500788207128300.png',300000,_binary '\0',282,90,'아이폰프로',430,186,NULL,0,4,3),(11,'2023-02-09 15:14:02.590465',NULL,'202302094500788207128300.png',100000,_binary '\0',268,200,'갤럭시플립',408,291,NULL,0,4,3);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `content` text,
  `is_seller` bit(1) NOT NULL,
  `is_visible` bit(1) NOT NULL,
  `score` double DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiyof1sindb9qiqr9o8npj8klt` (`product_id`),
  CONSTRAINT `FKiyof1sindb9qiqr9o8npj8klt` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `bank_address` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_delete` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_n4swgcf30j6bmtb4l4cjryuym` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,NULL,NULL,'ssafy1@edu.com',_binary '\0','김싸피','싸피1','$2a$10$TZNWyLItdQ4diF5KsC1I1.41Vte9uXrE5uR7.UHjel7fR9k2/y.iW',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTFAZWR1LmNvbSIsImlzcyI6IkVnZ3BsYW50R2FyYWdlLmNvbSIsImV4cCI6MTY3NzIxODMyOSwiaWF0IjoxNjc1OTIyMzI5fQ.30VH8i2hPsTbXJOPL8H5tURQWZTYoplNB14haNZ-Ss9jZIk8HF5EaalY8SCgG_LtMKc1jssgwJpJi1AVZp2JvQ'),(2,NULL,NULL,NULL,'ssafy2@edu.com',_binary '\0','박싸피','싸피2','$2a$10$LZuGMYN06wGChNbq4wegZOvB5vqTOG.slITXh7kbEfEQpYEIG4sZS',NULL,NULL),(3,NULL,NULL,NULL,'ssafy3@edu.com',_binary '\0','서싸피','싸피3','$2a$10$dyYo7X7rwO5h/jEzvW0EBO34UCgV9Zfp7cpxFHXQE8dgDynJrI5Ti',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTNAZWR1LmNvbSIsImlzcyI6IkVnZ3BsYW50R2FyYWdlLmNvbSIsImV4cCI6MTY3NzIxOTA5MywiaWF0IjoxNjc1OTIzMDkzfQ.rwYpBE-uIenbg9E_iNHNaVV5J2zgAXJI5x2qc4Fd7tbI8K8fQwOaQ313vuuqKQvibkGL1ggGIt7x0xjNvStMIw'),(4,NULL,NULL,NULL,'ssafy4@edu.com',_binary '\0','유싸피','싸피4','$2a$10$YSk5ITcBXGR/3Haaz0K48.cJeoftxFw/0cHIxRqVUgpa3Fc9lY2D.',NULL,NULL),(5,NULL,NULL,NULL,'ssafy5@edu.com',_binary '\0','유싸피','싸피5','$2a$10$eFZCRDoDymYuVTNgwjnDvOD.Ivx2EQDsyp06hx2B71fH/6hW1AlYW',NULL,NULL),(6,NULL,NULL,NULL,'ssafy6@edu.com',_binary '\0','장싸피','싸피6','$2a$10$/Yw5XcwfwKdRkNzLk73ZmeJ0mo2rxBLYKAZ5/i5gTsQEMvULfjDB.',NULL,NULL),(7,NULL,NULL,NULL,'ssafy7@edu.com',_binary '\0','허싸피','싸피7','$2a$10$c6qA/kiuWbfdykgW3wdoDuXcgVvrziA7sBXPF9ouEeEo554mVls5i',NULL,NULL),(8,'2023-02-09 14:56:18.152076',NULL,NULL,'ssafy8@edu.com',_binary '\0','흐싸피','싸피8','$2a$10$VNbeXtteyge0/SD9CmdfEOlkAS1wbw054Hl.A9BWTXOlNJICyJKuW',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_live`
--

DROP TABLE IF EXISTS `user_live`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_live` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `entry_time` datetime(6) DEFAULT NULL,
  `live_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7njjcqyphwvev0er94mowh5ft` (`live_id`),
  KEY `FKkce09secjt9lfnvn0appox3bd` (`user_id`),
  CONSTRAINT `FK7njjcqyphwvev0er94mowh5ft` FOREIGN KEY (`live_id`) REFERENCES `live` (`id`),
  CONSTRAINT `FKkce09secjt9lfnvn0appox3bd` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_live`
--

LOCK TABLES `user_live` WRITE;
/*!40000 ALTER TABLE `user_live` DISABLE KEYS */;
INSERT INTO `user_live` VALUES (1,'2023-02-09 14:50:55.013076',1,4),(2,'2023-02-09 15:00:55.153658',2,1),(3,'2023-02-09 15:07:51.318676',3,1),(4,'2023-02-09 15:14:02.509081',4,3);
/*!40000 ALTER TABLE `user_live` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-09 16:24:04
