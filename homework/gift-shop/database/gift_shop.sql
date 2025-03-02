/*
 Navicat MySQL Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 90200 (9.2.0)
 Source Host           : localhost:3306
 Source Schema         : gift_shop

 Target Server Type    : MySQL
 Target Server Version : 90200 (9.2.0)
 File Encoding         : 65001

 Date: 02/03/2025 08:56:46
*/

use gift_shop;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for gifts
-- ----------------------------
DROP TABLE IF EXISTS `gifts`;
CREATE TABLE `gifts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `targetId` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `discount` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `targetId` (`targetId`),
  CONSTRAINT `gifts_ibfk_1` FOREIGN KEY (`targetId`) REFERENCES `targets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of gifts
-- ----------------------------
BEGIN;
INSERT INTO `gifts` (`id`, `targetId`, `name`, `description`, `price`, `discount`) VALUES (1, 1, 'מתנה מיוחדת', 'תיאור מתנה מיוחדת ללקוחות', 100, 10);
INSERT INTO `gifts` (`id`, `targetId`, `name`, `description`, `price`, `discount`) VALUES (2, 2, 'מתנה לספקים', 'תיאור מתנה לספקים איכותיים', 200, 15);
INSERT INTO `gifts` (`id`, `targetId`, `name`, `description`, `price`, `discount`) VALUES (4, 3, 'במבלבי', 'גםםםםלםםםלםםכ', 0, 0);
COMMIT;

-- ----------------------------
-- Table structure for targets
-- ----------------------------
DROP TABLE IF EXISTS `targets`;
CREATE TABLE `targets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of targets
-- ----------------------------
BEGIN;
INSERT INTO `targets` (`id`, `type`) VALUES (1, 'לקוחות');
INSERT INTO `targets` (`id`, `type`) VALUES (2, 'ספקים');
INSERT INTO `targets` (`id`, `type`) VALUES (3, 'עובדים');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
