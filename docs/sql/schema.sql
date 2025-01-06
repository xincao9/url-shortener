CREATE
DATABASE `url_shortener`
/*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE TABLE `urls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `raw` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `raw` (`raw`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;