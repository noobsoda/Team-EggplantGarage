-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: ssafy_web_db
-- ------------------------------------------------------
-- Server version	8.0.30

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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_approval` bit(1) NOT NULL,
  `is_cancel` bit(1) NOT NULL,
  `is_paid` bit(1) NOT NULL,
  `is_refuse` bit(1) NOT NULL,
  `price` int NOT NULL,
  `live_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtq8og15huiqfplpbxy222d1ui` (`live_id`),
  KEY `FKix2q83ap1m0q5x7cxtdvt1gmc` (`user_id`),
  CONSTRAINT `FKix2q83ap1m0q5x7cxtdvt1gmc` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKtq8og15huiqfplpbxy222d1ui` FOREIGN KEY (`live_id`) REFERENCES `live` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bundle`
--

LOCK TABLES `bundle` WRITE;
/*!40000 ALTER TABLE `bundle` DISABLE KEYS */;
INSERT INTO `bundle` VALUES (1,_binary '',_binary '\0',_binary '',_binary '\0',1500,1,2),(2,_binary '',_binary '\0',_binary '\0',_binary '\0',700,1,2),(3,_binary '\0',_binary '',_binary '\0',_binary '\0',110,1,2),(4,_binary '\0',_binary '\0',_binary '\0',_binary '\0',550,1,2),(5,_binary '\0',_binary '\0',_binary '\0',_binary '',200,1,2),(6,_binary '\0',_binary '\0',_binary '\0',_binary '',550,1,2),(7,_binary '',_binary '\0',_binary '',_binary '\0',1200,2,1),(8,_binary '',_binary '\0',_binary '\0',_binary '\0',300,2,1),(9,_binary '\0',_binary '',_binary '\0',_binary '\0',100,2,1),(10,_binary '\0',_binary '\0',_binary '\0',_binary '',800,2,1),(11,_binary '\0',_binary '\0',_binary '\0',_binary '',100,2,1),(12,_binary '\0',_binary '\0',_binary '\0',_binary '',300,2,1),(13,_binary '',_binary '\0',_binary '',_binary '\0',500,2,2),(14,_binary '',_binary '\0',_binary '\0',_binary '\0',1500,2,2),(15,_binary '\0',_binary '',_binary '\0',_binary '\0',1000,2,2),(16,_binary '\0',_binary '\0',_binary '\0',_binary '',1800,2,2),(17,_binary '\0',_binary '\0',_binary '\0',_binary '',200,2,2),(18,_binary '\0',_binary '\0',_binary '\0',_binary '',450,2,2),(19,_binary '',_binary '\0',_binary '',_binary '\0',22000,3,1),(20,_binary '',_binary '\0',_binary '',_binary '\0',1300,3,1),(21,_binary '\0',_binary '',_binary '\0',_binary '\0',110,3,1),(22,_binary '\0',_binary '\0',_binary '\0',_binary '',550,3,1),(23,_binary '\0',_binary '\0',_binary '\0',_binary '',200,3,1),(24,_binary '\0',_binary '\0',_binary '\0',_binary '',550,3,1),(25,_binary '',_binary '\0',_binary '',_binary '\0',85000,3,2),(26,_binary '',_binary '\0',_binary '',_binary '\0',7000,3,2),(27,_binary '\0',_binary '',_binary '\0',_binary '\0',19000,3,2),(28,_binary '\0',_binary '\0',_binary '\0',_binary '\0',30000,3,2),(29,_binary '\0',_binary '\0',_binary '\0',_binary '',1000,3,2),(30,_binary '\0',_binary '\0',_binary '\0',_binary '',550,3,2),(31,_binary '',_binary '\0',_binary '',_binary '\0',18000,6,1);
/*!40000 ALTER TABLE `bundle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bundled_items_relation`
--

DROP TABLE IF EXISTS `bundled_items_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bundled_items_relation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bundle_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKq62l8ijyiek612hyfde54wsvw` (`bundle_id`),
  KEY `FK58x2l8un1et8vb7v4r41hbd4g` (`product_id`),
  CONSTRAINT `FK58x2l8un1et8vb7v4r41hbd4g` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKq62l8ijyiek612hyfde54wsvw` FOREIGN KEY (`bundle_id`) REFERENCES `bundle` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bundled_items_relation`
--

LOCK TABLES `bundled_items_relation` WRITE;
/*!40000 ALTER TABLE `bundled_items_relation` DISABLE KEYS */;
INSERT INTO `bundled_items_relation` VALUES (1,1,1),(2,2,2),(3,2,4),(4,3,1),(5,3,4),(6,4,1),(7,4,3),(8,5,1),(9,5,2),(10,5,3),(11,6,2),(12,6,3),(13,7,5),(14,7,6),(15,7,7),(16,8,8),(17,8,9),(18,9,5),(19,9,8),(20,10,8),(21,10,10),(22,11,11),(23,11,12),(24,11,13),(25,12,6),(26,12,15),(27,12,16),(28,13,12),(29,13,13),(30,13,14),(31,14,15),(32,14,16),(33,15,7),(34,15,8),(35,15,9),(36,16,11),(37,16,15),(38,17,5),(39,17,9),(40,18,6),(41,18,10),(42,18,12),(43,19,17),(44,19,23),(45,20,18),(46,20,19),(47,21,20),(48,21,23),(49,21,27),(50,22,21),(51,22,24),(52,22,28),(53,23,17),(54,23,18),(55,24,21),(56,24,22),(57,24,23),(58,25,22),(59,25,24),(60,25,28),(61,26,20),(62,26,27),(63,27,17),(64,27,19),(65,27,21),(66,28,21),(67,28,26),(68,29,17),(69,29,18),(70,30,19),(71,30,20),(72,30,28),(73,31,46),(74,31,47);
/*!40000 ALTER TABLE `bundled_items_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'인기'),(2,'디지털기기'),(3,'생활가전'),(4,'가구'),(5,'생활/주방'),(6,'유아용품'),(7,'유아도서'),(8,'여성의류'),(9,'여성잡화'),(10,'남성의류'),(11,'남성잡화'),(12,'뷰티/미용'),(13,'스포츠'),(14,'취미/게임'),(15,'음반'),(16,'도서'),(17,'티켓'),(18,'반려동물'),(19,'식물'),(20,'기타');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_message`
--

DROP TABLE IF EXISTS `chat_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sender_id` bigint NOT NULL,
  `chat_room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj52yap2xrm9u0721dct0tjor9` (`chat_room_id`),
  CONSTRAINT `FKj52yap2xrm9u0721dct0tjor9` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
INSERT INTO `chat_message` VALUES (1,'2023-02-12 23:41:43.183378','안녕하세요',1,1),(2,'2023-02-12 23:42:43.183378','안녕하세요!',2,1),(3,'2023-02-12 23:43:43.183378','그런데 무슨 일이시죠?',2,1),(4,'2023-02-12 23:44:43.183378','다름이 아니라 물건 잘 받으셨나요?',1,1),(5,'2023-02-12 23:45:43.183378','궁금해서 연락드립니다.',1,1),(6,'2023-02-12 23:46:43.183378','아이구, 친절하셔라',2,1),(7,'2023-02-12 23:47:43.183378','아주 잘쓰고 있습니다.',2,1),(8,'2023-02-12 23:48:43.183378','다행이네요!',1,1),(9,'2023-02-12 23:49:43.183378','아주 뿌듯합니다!',1,1),(10,'2023-02-12 23:50:43.183378','다음에도 이용해 주세요!!!',1,1),(11,'2023-02-12 23:51:43.183378','ㅎㅎㅎㅎㅎ',1,1),(12,'2023-02-12 23:52:43.183378','ㅎㅎㅎㅎㅎㅎㅎㅎ',2,1),(13,'2023-02-12 23:53:43.183378','넵 감사합니다',2,1),(14,'2023-02-12 23:54:43.183378','물건 상태도 좋더라구여',2,1),(15,'2023-02-12 23:55:43.183378','다음에 또 방송하시면',2,1),(16,'2023-02-12 23:56:43.183378','바로 달려가겠습니다!',2,1),(17,'2023-02-12 23:57:43.183378','네넹',1,1),(18,'2023-02-12 23:58:43.183378','한번에 여러가지를 팔 수 있어서',1,1),(19,'2023-02-12 23:59:43.183378','굉장히 편한 것 같아요',1,1),(20,'2023-02-12 00:11:43.183378','꼭 추천합니당',1,1),(21,'2023-02-12 00:12:43.183378','저도 다음에 방송해보려구여',2,1),(22,'2023-02-12 00:13:43.183378','ㅎㅎㅎㅎㅎ',2,1),(23,'2023-02-12 00:14:43.183378','암튼 감사합니다~~!',2,1),(24,'2023-02-12 00:15:43.183378','넿ㅎㅎ',1,1),(25,'2023-02-12 00:16:43.183378','좋은 시간 보내세요!',1,1),(26,'2023-02-12 02:52:43.183378','ㅎㅎ',2,1),(27,'2023-02-13 02:53:12.682883','안녕히계세요',2,1),(28,'2023-02-12 23:44:43.183378','안녕하세요',1,2),(29,'2023-02-12 23:46:43.183378','안녕하세요!',3,2),(30,'2023-02-12 23:47:43.183378','그런데 무슨 일이시죠?',3,2),(31,'2023-02-12 23:48:43.183378','오늘 방송 어떠셨나요??',1,2),(32,'2023-02-12 23:49:43.183378','궁금해서 연락드립니다.',1,2),(33,'2023-02-12 23:50:43.183378','아이구, 친절하셔라',3,2),(34,'2023-02-12 23:51:43.183378','아주 좋았습니다.',3,2),(35,'2023-02-12 23:52:43.183378','다행이네요!',1,2),(36,'2023-02-12 23:53:43.183378','아주 뿌듯합니다!',1,2),(37,'2023-02-12 23:54:43.183378','다음에도 이용해 주세요!!!',1,2),(38,'2023-02-13 01:53:12.682883','네 알겠습니다~',3,2),(39,'2023-02-13 03:41:12.682883','안녕하세요',4,3),(40,'2023-02-13 03:42:12.682883','안녕하세요!',1,3),(41,'2023-02-13 03:43:12.682883','그런데 무슨 일이시죠?',1,3),(42,'2023-02-13 03:45:12.682883','다름이 아니라 물건 잘 받으셨나요?',4,3),(43,'2023-02-13 03:46:12.682883','궁금해서 연락드립니다.',4,3),(44,'2023-02-13 03:47:12.682883','아이구, 친절하셔라',1,3),(45,'2023-02-13 03:49:12.682883','아주 잘쓰고 있습니다.',1,3),(46,'2023-02-13 03:50:12.682883','다행이네요!',4,3),(47,'2023-02-13 03:51:12.682883','아주 뿌듯합니다!',4,3),(48,'2023-02-13 03:52:12.682883','다음에도 이용해 주세요!!!',4,3),(49,'2023-02-13 03:53:12.682883','다음에 또 봅시다.',1,3),(50,'2023-02-13 03:41:12.682883','안녕하세요',1,4),(51,'2023-02-13 03:42:12.682883','안녕하세요!',7,4),(52,'2023-02-13 03:43:12.682883','그런데 무슨 일이시죠?',7,4),(53,'2023-02-13 03:45:12.682883','다름이 아니라 물건 잘 받으셨나요?',1,4),(54,'2023-02-13 03:46:12.682883','궁금해서 연락드립니다.',1,4),(55,'2023-02-13 03:47:12.682883','아이구, 친절하셔라',7,4),(56,'2023-02-13 03:49:12.682883','아주 잘쓰고 있습니다.',7,4),(57,'2023-02-13 03:50:12.682883','다행이네요!',1,4),(58,'2023-02-13 03:51:12.682883','아주 뿌듯합니다!',1,4),(59,'2023-02-13 03:52:12.682883','다음에도 이용해 주세요!!!',1,4),(60,'2023-02-13 04:53:12.682883','잘가요',7,4),(61,'2023-02-13 03:41:12.682883','안녕하세요',2,5),(62,'2023-02-13 03:42:12.682883','안녕하세요!',7,5),(63,'2023-02-13 03:43:12.682883','그런데 무슨 일이시죠?',7,5),(64,'2023-02-13 03:45:12.682883','다름이 아니라 물건 잘 받으셨나요?',2,5),(65,'2023-02-13 03:46:12.682883','궁금해서 연락드립니다.',2,5),(66,'2023-02-13 03:47:12.682883','아이구, 친절하셔라',7,5),(67,'2023-02-13 03:49:12.682883','아주 잘쓰고 있습니다.',7,5),(68,'2023-02-13 03:50:12.682883','다행이네요!',2,5),(69,'2023-02-13 03:51:12.682883','아주 뿌듯합니다!',2,5),(70,'2023-02-13 03:52:12.682883','다음에도 이용해 주세요!!!',2,5),(71,'2023-02-13 05:53:12.682883','감사합니다',7,5);
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_room` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `last_send_message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_send_time` datetime(6) DEFAULT NULL,
  `first_user_id` bigint DEFAULT NULL,
  `second_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK25juxp8enpp7unn3bwjs4qw24` (`first_user_id`),
  KEY `FK3flfuyuph3s4vp7r9hws5jdv8` (`second_user_id`),
  CONSTRAINT `FK25juxp8enpp7unn3bwjs4qw24` FOREIGN KEY (`first_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK3flfuyuph3s4vp7r9hws5jdv8` FOREIGN KEY (`second_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` VALUES (1,'2023-02-12 22:40:02.628644','안녕히계세요','2023-02-13 02:53:12.682883',1,2),(2,'2023-02-12 22:53:12.682883','네 알겠습니다~','2023-02-13 01:53:12.682883',1,3),(3,'2023-02-12 22:55:12.682883','다음에 또 봅시다.','2023-02-13 03:53:12.682883',4,1),(4,'2023-02-12 22:56:12.682883','잘가요','2023-02-13 04:53:12.682883',1,7),(5,'2023-02-12 22:57:12.682883','감사합니다','2023-02-13 05:53:12.682883',2,7);
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `live_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKice9lx4keequ4ujl7vog85h7n` (`live_id`),
  KEY `FKh3f2dg11ibnht4fvnmx60jcif` (`user_id`),
  CONSTRAINT `FKh3f2dg11ibnht4fvnmx60jcif` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKice9lx4keequ4ujl7vog85h7n` FOREIGN KEY (`live_id`) REFERENCES `live` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
INSERT INTO `favorite` VALUES (1,1,4),(2,1,3),(3,1,2),(4,2,1),(5,2,2),(6,2,3),(7,3,1),(8,3,2),(9,6,1);
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `live`
--

DROP TABLE IF EXISTS `live`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `live` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_live` bit(1) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `session_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `thumbnail_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seller_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_12u2y7974y0cyrouqhqgu8kci` (`id`,`seller_id`),
  KEY `FKt83volnphajotk5r3qeuabnd7` (`seller_id`),
  CONSTRAINT `FKt83volnphajotk5r3qeuabnd7` FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `live`
--

LOCK TABLES `live` WRITE;
/*!40000 ALTER TABLE `live` DISABLE KEYS */;
INSERT INTO `live` VALUES (1,'2023-02-12 22:40:02.628644','',_binary '',36.354963,127.297375,'1','2023021281270193292800.png','인형팝니다','https://localhost:8000/test/1',1),(2,'2023-02-13 00:04:31.235694','',_binary '\0',36.354963,127.297375,'7','2023021386339168733900.png','필기도구 필요하신 분~','https://localhost:8000/test/7',7),(3,'2023-02-13 01:05:32.396592','',_binary '',36.354963,127.297375,'3','2023021390000204030600.png','소소한 물건 팝니다.','https://localhost:8000/test/3',3),(4,'2023-02-13 02:25:00.116506','',_binary '',36.354963,127.297375,'2','2023021394767401639000.png','어서오시오','https://localhost:8000/test/2',2),(5,'2023-02-13 02:41:21.910478','',_binary '',36.354963,127.297375,'4','2023021395749053654500.png','다 드립니다','https://localhost:8000/test/4',4),(6,'2023-02-13 02:53:12.682883','',_binary '\0',36.354963,127.297375,'4','2023021396459730821100.png','귀여운 선풍기 가져 가세요','https://localhost:8000/test/4',4);
/*!40000 ALTER TABLE `live` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `live_category`
--

DROP TABLE IF EXISTS `live_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `live_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` bigint DEFAULT NULL,
  `live_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlwi8jh7xasagvv5iqkowag2i9` (`category_id`),
  KEY `FK2d0t24xutqtfgljbhoflhqje9` (`live_id`),
  CONSTRAINT `FK2d0t24xutqtfgljbhoflhqje9` FOREIGN KEY (`live_id`) REFERENCES `live` (`id`),
  CONSTRAINT `FKlwi8jh7xasagvv5iqkowag2i9` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `live_category`
--

LOCK TABLES `live_category` WRITE;
/*!40000 ALTER TABLE `live_category` DISABLE KEYS */;
INSERT INTO `live_category` VALUES (1,1,1),(2,14,1),(3,1,2),(4,20,2),(5,1,3),(6,2,3),(7,9,3),(8,12,3),(9,20,3),(10,1,4),(11,2,4),(12,8,4),(13,5,4),(14,20,4),(15,14,4),(16,16,4),(17,1,5),(18,20,5),(19,16,5),(20,1,6),(21,3,6);
/*!40000 ALTER TABLE `live_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `buyer_id` bigint DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `initial_price` int NOT NULL,
  `is_approval` bit(1) NOT NULL,
  `is_paid` bit(1) NOT NULL,
  `left_topx` int NOT NULL,
  `left_topy` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `right_bottomx` int NOT NULL,
  `right_bottomy` int NOT NULL,
  `sold_at` datetime(6) DEFAULT NULL,
  `sold_price` int NOT NULL,
  `live_id` bigint DEFAULT NULL,
  `seller_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK996onn11af14netkudluvbaw3` (`live_id`,`seller_id`),
  CONSTRAINT `FK996onn11af14netkudluvbaw3` FOREIGN KEY (`live_id`, `seller_id`) REFERENCES `live` (`id`, `seller_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'2023-02-12 22:40:03.088788',2,'2023021281270022919400.png',1000,_binary '',_binary '',307,3,'스펀지밥',496,115,'2023-02-12 23:41:43.183378',1500,1,1),(2,'2023-02-12 22:40:03.142943',NULL,'2023021281270022919400.png',500,_binary '',_binary '\0',30,154,'뚱이',263,316,NULL,0,1,1),(3,'2023-02-12 22:40:03.151364',NULL,'2023021281270022919400.png',0,_binary '\0',_binary '\0',247,97,'병아리',380,336,NULL,0,1,1),(4,'2023-02-12 22:40:03.159524',NULL,'2023021281270022919400.png',0,_binary '',_binary '\0',376,112,'곰돌이',638,330,NULL,0,1,1),(5,'2023-02-13 00:04:31.890018',1,'2023021386338825685500.png',500,_binary '',_binary '',204,296,'제트스트림 빨간볼펜',392,352,'2023-02-13 00:16:08.009417',400,2,7),(6,'2023-02-13 00:04:31.926468',1,'2023021386338825685500.png',500,_binary '',_binary '',186,227,'제트스트림 파란볼펜',400,293,'2023-02-13 00:16:08.011460',400,2,7),(7,'2023-02-13 00:04:31.934003',1,'2023021386338825685500.png',0,_binary '',_binary '',186,174,'형광펜',403,222,'2023-02-13 00:16:08.013411',400,2,7),(8,'2023-02-13 00:04:31.941839',NULL,'2023021386338825685500.png',0,_binary '',_binary '\0',163,133,'컴싸',396,179,NULL,0,2,7),(9,'2023-02-13 00:04:31.950098',NULL,'2023021386338825685500.png',0,_binary '',_binary '\0',192,80,'분홍 형광펜',401,135,NULL,0,2,7),(10,'2023-02-13 00:04:31.959088',NULL,'2023021386338825685500.png',100,_binary '\0',_binary '\0',192,8,'지우개',272,88,NULL,0,2,7),(11,'2023-02-13 00:04:31.965080',NULL,'2023021386338825685500.png',300,_binary '\0',_binary '\0',270,7,'화이트',357,87,NULL,0,2,7),(12,'2023-02-13 00:04:31.972626',2,'2023021386338825685500.png',500,_binary '',_binary '',376,24,'보라 무민 볼펜',611,115,'2023-02-13 00:25:51.031487',166,2,7),(13,'2023-02-13 00:04:31.980678',2,'2023021386338825685500.png',0,_binary '',_binary '',387,117,'샤프',618,163,'2023-02-13 00:25:51.033475',166,2,7),(14,'2023-02-13 00:04:31.988212',2,'2023021386338825685500.png',300,_binary '',_binary '',385,160,'커터칼',592,200,'2023-02-13 00:25:51.036475',166,2,7),(15,'2023-02-13 00:04:31.997736',NULL,'2023021386338825685500.png',0,_binary '',_binary '\0',398,206,'샤프심',604,268,NULL,0,2,7),(16,'2023-02-13 00:04:32.006523',NULL,'2023021386338825685500.png',1000,_binary '',_binary '\0',396,259,'가위',634,355,NULL,0,2,7),(17,'2023-02-13 01:05:32.987785',1,'2023021389999928658300.png',20000,_binary '',_binary '',229,167,'록시땅 핸드크림',389,295,'2023-02-13 01:33:21.000213',11000,3,3),(18,'2023-02-13 01:05:32.995310',1,'2023021389999928658300.png',2000,_binary '',_binary '',168,154,'집게핀',252,240,'2023-02-13 01:33:50.161085',650,3,3),(19,'2023-02-13 01:05:33.001814',1,'2023021389999928658300.png',1000,_binary '',_binary '',161,51,'물티슈',334,190,'2023-02-13 01:33:50.163095',650,3,3),(20,'2023-02-13 01:05:33.007348',2,'2023021389999928658300.png',1500,_binary '',_binary '',204,3,'곱창머리끈',346,87,'2023-02-13 01:34:46.838215',3500,3,3),(21,'2023-02-13 01:05:33.013917',NULL,'2023021389999928658300.png',35000,_binary '\0',_binary '\0',371,256,'봉고데기',618,352,NULL,0,3,3),(22,'2023-02-13 01:05:33.019926',2,'2023021389999928658300.png',100000,_binary '',_binary '',328,3,'갤럭시탭',551,131,'2023-02-13 01:34:26.560004',28333,3,3),(23,'2023-02-13 01:05:33.026449',1,'2023021389999928658300.png',0,_binary '',_binary '',424,170,'쿠키몬스터파우치',574,277,'2023-02-13 01:33:21.003173',11000,3,3),(24,'2023-02-13 01:05:33.033979',2,'2023021389999928658300.png',0,_binary '',_binary '',350,183,'미니언오뚝이',437,270,'2023-02-13 01:34:26.561017',28333,3,3),(25,'2023-02-13 01:05:33.039984',NULL,'2023021389999928658300.png',5000,_binary '\0',_binary '\0',432,122,'립밤',528,181,NULL,0,3,3),(26,'2023-02-13 01:05:33.043411',NULL,'2023021389999928658300.png',0,_binary '\0',_binary '\0',348,117,'리콜라사탕',448,206,NULL,0,3,3),(27,'2023-02-13 01:05:33.050412',2,'2023021389999928658300.png',7500,_binary '',_binary '',538,7,'헤어브러쉬',634,250,'2023-02-13 01:34:46.839218',3500,3,3),(28,'2023-02-13 01:05:33.055933',2,'2023021389999928658300.png',0,_binary '',_binary '',311,60,'꼬리빗',382,193,'2023-02-13 01:34:26.562063',28333,3,3),(29,'2023-02-13 02:25:00.377631',NULL,'2023021394767335054000.png',20000,_binary '\0',_binary '\0',39,122,'분홍색맨투맨',279,353,NULL,0,4,2),(30,'2023-02-13 02:25:00.381707',NULL,'2023021394767335054000.png',0,_binary '\0',_binary '\0',21,3,'산타모자',272,133,NULL,0,4,2),(31,'2023-02-13 02:25:00.385111',NULL,'2023021394767335054000.png',0,_binary '\0',_binary '\0',469,197,'산타안경',627,336,NULL,0,4,2),(32,'2023-02-13 02:25:00.387610',NULL,'2023021394767335054000.png',5000,_binary '\0',_binary '\0',273,197,'자바의 정석',446,357,NULL,0,4,2),(33,'2023-02-13 02:25:00.389612',NULL,'2023021394767335054000.png',50000,_binary '\0',_binary '\0',270,3,'향수1',346,97,NULL,0,4,2),(34,'2023-02-13 02:25:00.391165',NULL,'2023021394767335054000.png',70000,_binary '\0',_binary '\0',327,3,'향수2',401,76,NULL,0,4,2),(35,'2023-02-13 02:25:00.393231',NULL,'2023021394767335054000.png',100000,_binary '\0',_binary '\0',353,76,'갤럭시플립',448,161,NULL,0,4,2),(36,'2023-02-13 02:25:00.395178',NULL,'2023021394767335054000.png',0,_binary '\0',_binary '\0',254,83,'받침대',396,204,NULL,0,4,2),(37,'2023-02-13 02:25:00.397260',NULL,'2023021394767335054000.png',0,_binary '\0',_binary '\0',398,3,'어피치공책',576,124,NULL,0,4,2),(38,'2023-02-13 02:25:00.398178',NULL,'2023021394767335054000.png',0,_binary '\0',_binary '\0',506,104,'어피치삼색볼펜',624,215,NULL,0,4,2),(39,'2023-02-13 02:25:00.399242',NULL,'2023021394767335054000.png',2000,_binary '\0',_binary '\0',417,117,'뒤집개',508,309,NULL,0,4,2),(40,'2023-02-13 02:41:22.054279',NULL,'2023021395749012210500.png',0,_binary '\0',_binary '\0',62,96,'공책',250,343,NULL,0,5,4),(41,'2023-02-13 02:41:22.059242',NULL,'2023021395749012210500.png',5000,_binary '\0',_binary '\0',391,119,'Do It! Vue.js 입문책',615,350,NULL,0,5,4),(42,'2023-02-13 02:41:22.061339',NULL,'2023021395749012210500.png',5000,_binary '\0',_binary '\0',213,108,'Do It! HTML+CSS+JS',414,350,NULL,0,5,4),(43,'2023-02-13 02:41:22.064308',NULL,'2023021395749012210500.png',0,_binary '\0',_binary '\0',359,3,'춘식이다이어리',552,128,NULL,0,5,4),(44,'2023-02-13 02:41:22.065773',NULL,'2023021395749012210500.png',6500,_binary '\0',_binary '\0',256,3,'코로나자가진단키트',368,119,NULL,0,5,4),(45,'2023-02-13 02:41:22.067875',NULL,'2023021395749012210500.png',0,_binary '\0',_binary '\0',128,8,'삼성고속충전기',270,112,NULL,0,5,4),(46,'2023-02-13 02:53:12.751526',1,'2023021396459708845700.png',15000,_binary '',_binary '',12,3,'어피치선풍기',627,316,'2023-02-13 03:01:31.043691',9000,6,4),(47,'2023-02-13 02:53:12.755633',1,'2023021396459708845700.png',0,_binary '',_binary '',451,160,'체중계',593,355,'2023-02-13 03:01:31.045256',9000,6,4);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `is_seller` bit(1) NOT NULL,
  `is_visible` bit(1) NOT NULL,
  `score` double DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiyof1sindb9qiqr9o8npj8klt` (`product_id`),
  CONSTRAINT `FKiyof1sindb9qiqr9o8npj8klt` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'2023-02-12 23:49:23.171535','인형 너무 귀여워요! 감사합니다~',_binary '\0',_binary '',5,1),(2,'2023-02-13 00:41:29.677307','형광펜 필요했는데 잘 구매했습니다!',_binary '\0',_binary '\0',4,7),(3,'2023-02-13 00:41:42.684557','판매자님 굉장히 친절하시고 좋았습니다. 볼펜 잘 쓸게요~',_binary '\0',_binary '\0',5,6),(4,'2023-02-13 00:46:23.883172','샤프 저렴하게 잘 샀습니당',_binary '\0',_binary '\0',4,13),(5,'2023-02-13 00:46:28.131852','무민 볼펜 너무 귀여운거 아닌가요!! 감사합니다~',_binary '\0',_binary '\0',5,12),(6,'2023-02-13 01:38:13.009759','머리끈 나이스~~',_binary '\0',_binary '\0',3,20),(7,'2023-02-13 01:38:18.982193','미니언 오뚝이 너무 깜찍합니다!!',_binary '\0',_binary '',5,24),(8,'2023-02-13 01:38:31.677494','꼬리빗 잘 쓸게용',_binary '\0',_binary '\0',4,28),(9,'2023-02-13 01:38:33.034310','헤어브러쉬 튼튼하고 만족합니다.',_binary '\0',_binary '\0',4,27),(10,'2023-02-13 01:43:07.520393','쿠키몬스터 졸귀탱',_binary '\0',_binary '\0',4,23),(11,'2023-02-13 01:43:10.900669','역시 핸드크림은 록시땅!!!',_binary '\0',_binary '',4,17),(12,'2023-02-13 03:04:24.882151','꺅~~ 어피치 선풍기라니! 너무 사랑스러워요ㅠㅠ',_binary '\0',_binary '\0',5,46);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `bank_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bank_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_delete` bit(1) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `refresh_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_n4swgcf30j6bmtb4l4cjryuym` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2023-02-12 22:31:47.677954',NULL,NULL,'ssafy1@edu.com',_binary '\0','김싸피','빨강이','$2a$10$./mp1eppyr7u1DbIkqLyKuHJ4IfxUDekVd3gKtBZ40RdLyZ4sYdhe',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTFAZWR1LmNvbSIsImlzcyI6IkVnZ3BsYW50R2FyYWdlLmNvbSIsImV4cCI6MTY3NzUyMTE5NiwiaWF0IjoxNjc2MjI1MTk2fQ.ricp9utyi1N2MLoZffjv0WfAawTDS59kkrrVnEOiH6Zerveh6dOwum3oJlIdvuwZlbYv5iowS9pzTGm1Xdp8Cg'),(2,'2023-02-12 22:32:19.164372',NULL,NULL,'ssafy2@edu.com',_binary '\0','나싸피','주황','$2a$10$sC8R520W3YNV5d3/jnvOMeOvQoVEdxbTG9OTQU3EZ1wbTGLj557QW',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTJAZWR1LmNvbSIsImlzcyI6IkVnZ3BsYW50R2FyYWdlLmNvbSIsImV4cCI6MTY3NzUxODA0NiwiaWF0IjoxNjc2MjIyMDQ2fQ.Vh131DPZ4mLqS0L3pgPtwzkTBcbJ5v0mfLJlf9zXBW-YuADmRyCXplutmIuL5nTJ6vG9_TarfPtBcKEIrXXytg'),(3,'2023-02-12 22:32:44.096002',NULL,NULL,'ssafy3@edu.com',_binary '\0','도싸피','노랑이','$2a$10$MO2CM6r3dxDi2Z5cSt94ZOxNIVcYmNfwlE4YYhzpTomfek2jBDPfa',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTNAZWR1LmNvbSIsImlzcyI6IkVnZ3BsYW50R2FyYWdlLmNvbSIsImV4cCI6MTY3NzUxMzM3OSwiaWF0IjoxNjc2MjE3Mzc5fQ.gpA7cqAayZFt39tpq9plyUs0yEVYpjcMd1LAlP2DyJNQundY9ob6qPVSY45gJvp8r2lNVHVGb6lL_KpXvM798w'),(4,'2023-02-12 22:33:05.596412',NULL,NULL,'ssafy4@edu.com',_binary '\0','문싸피','초록','$2a$10$J.Hghrc6Rf0ZPJvApXVJReJs1pWLVs5g1bAuHQq1DsDzqIFkBMgDy',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTRAZWR1LmNvbSIsImlzcyI6IkVnZ3BsYW50R2FyYWdlLmNvbSIsImV4cCI6MTY3NzUxOTA1OCwiaWF0IjoxNjc2MjIzMDU4fQ.NjBvoApEDhEupdfB8uWaaDUAFLOAm02HPKr7kFZzF6iv7SUg9Xtr8BxHqXhTmIdICRcd-5OpjjzkBYmhqa_jBw'),(5,'2023-02-12 22:33:43.402530',NULL,NULL,'ssafy5@edu.com',_binary '\0','배싸피','파랑이','$2a$10$RSFd0CpNspEIKfvXQaTKF.zUJ3Jci/i60wLpCdAe.nX1jWz05ITR.',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTVAZWR1LmNvbSIsImlzcyI6IkVnZ3BsYW50R2FyYWdlLmNvbSIsImV4cCI6MTY3NzUyMzg2NiwiaWF0IjoxNjc2MjI3ODY2fQ.h6opx9y2TBFsdr7eyMeRH6PGXX8s5luWiKYtXfkTdlWeRO1lQhnLkulcutFXHopEcRhTkJV9g_s-CKYeIXrEdQ'),(6,'2023-02-12 22:34:12.476174',NULL,NULL,'ssafy6@edu.com',_binary '\0','서싸피','남색이','$2a$10$FnA3QhDOCGtsG2abCZmPHuceTBUpiAvmB.hiow6ClDaCp/.Bkf7e2',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTZAZWR1LmNvbSIsImlzcyI6IkVnZ3BsYW50R2FyYWdlLmNvbSIsImV4cCI6MTY3NzUyMzg4MiwiaWF0IjoxNjc2MjI3ODgyfQ.iL9SW4YHz1RhQBY7luhU3D9P95AG9y0OFao4U_bkRiPGqVguFzZRan1LjCgVovaecWkW3Ypdwd1ylZzCLREQOw'),(7,'2023-02-12 22:34:37.016548',NULL,NULL,'ssafy7@edu.com',_binary '\0','유싸피','보라','$2a$10$P1kIfaLX/QZJR6icrgmCFOnw8QshvxHiA4L2IvZ9hSINKvgXQ9a0y',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTdAZWR1LmNvbSIsImlzcyI6IkVnZ3BsYW50R2FyYWdlLmNvbSIsImV4cCI6MTY3NzUwOTYxNywiaWF0IjoxNjc2MjEzNjE3fQ.PyNOTU5lfh8m0PdhExJ_kfaGVIz0n-ZYODVZqJzx9lIrwmVaMsieVZLwbR6Ku3fIrErzw44Q0rpHoy_9ZIHPGQ'),(8,'2023-02-12 22:35:06.574427',NULL,NULL,'ssafy8@edu.com',_binary '\0','장싸피','분홍이','$2a$10$Dec/7aCX4.bBjo1Vvf0qTOE37yfD30njHh1E7TOBQ2udwm2/GYQMa',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeThAZWR1LmNvbSIsImlzcyI6IkVnZ3BsYW50R2FyYWdlLmNvbSIsImV4cCI6MTY3NzUyMzkwMSwiaWF0IjoxNjc2MjI3OTAxfQ.B7StlkYor6vk1xxOgeODQBWmlUYGwd9bhCtbWuQ0IirdmdVHIJYc0Lp0bD4uskmqAnXLaVud2njbgak1T74s0g'),(9,'2023-02-12 22:35:28.155867',NULL,NULL,'ssafy9@edu.com',_binary '\0','천싸피','하양이','$2a$10$.RBSOvO7aStqPolNQk6VNuY4OsBYpCHO/IPu4UKU2Hqgp7MO1b35K',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeTlAZWR1LmNvbSIsImlzcyI6IkVnZ3BsYW50R2FyYWdlLmNvbSIsImV4cCI6MTY3NzUyMzkyNSwiaWF0IjoxNjc2MjI3OTI1fQ.zrDJ62YEw2ZaZ120o7c7f6CY03Iw1Ky2y3meU1lQuJRn7xLWW2tjDhHM4VYg8rbS9KnCw2WAOnGEncmr6R8AIg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_live`
--

DROP TABLE IF EXISTS `user_live`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_live` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `entry_time` datetime(6) DEFAULT NULL,
  `live_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7njjcqyphwvev0er94mowh5ft` (`live_id`),
  KEY `FKkce09secjt9lfnvn0appox3bd` (`user_id`),
  CONSTRAINT `FK7njjcqyphwvev0er94mowh5ft` FOREIGN KEY (`live_id`) REFERENCES `live` (`id`),
  CONSTRAINT `FKkce09secjt9lfnvn0appox3bd` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_live`
--

LOCK TABLES `user_live` WRITE;
/*!40000 ALTER TABLE `user_live` DISABLE KEYS */;
INSERT INTO `user_live` VALUES (1,'2023-02-12 22:40:02.692275',1,1),(2,'2023-02-12 22:41:01.790400',1,3),(3,'2023-02-12 22:42:24.138407',1,4),(4,'2023-02-12 23:46:51.221053',1,2),(5,'2023-02-13 00:04:31.265080',2,7),(6,'2023-02-13 00:06:34.616309',2,2),(7,'2023-02-13 00:06:49.887778',2,1),(8,'2023-02-13 00:07:04.457709',2,3),(9,'2023-02-13 01:05:32.412876',3,3),(10,'2023-02-13 01:29:48.608688',3,1),(11,'2023-02-13 01:30:22.168813',3,2),(12,'2023-02-13 02:25:00.121333',4,2),(13,'2023-02-13 02:27:38.078645',4,1),(14,'2023-02-13 02:41:21.914336',5,4),(15,'2023-02-13 02:53:12.695495',6,4),(16,'2023-02-13 03:02:35.426408',6,1);
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

-- Dump completed on 2023-02-13  3:52:39
