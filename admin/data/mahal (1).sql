-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2021 at 06:08 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mahal`
--
CREATE DATABASE IF NOT EXISTS `mahal` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mahal`;

-- --------------------------------------------------------

--
-- Table structure for table `achets`
--
-- Creation: Jun 04, 2021 at 08:08 PM
--

DROP TABLE IF EXISTS `achets`;
CREATE TABLE `achets` (
  `acId` int(11) NOT NULL COMMENT 'primary key',
  `prNum` int(11) NOT NULL,
  `create_time` datetime DEFAULT NULL COMMENT 'create time',
  `update_time` datetime DEFAULT NULL COMMENT 'update time',
  `acNotes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `achets`:
--   `prNum`
--       `prod` -> `prId`
--

-- --------------------------------------------------------

--
-- Table structure for table `band`
--
-- Creation: Jun 04, 2021 at 07:43 PM
--

DROP TABLE IF EXISTS `band`;
CREATE TABLE `band` (
  `baId` int(11) NOT NULL,
  `baName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `band`:
--

--
-- Dumping data for table `band`
--

INSERT INTO `band` (`baId`, `baName`) VALUES
(2, ' مصاريف'),
(3, 'ايرادات'),
(1, 'سند');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--
-- Creation: Jun 03, 2021 at 12:44 PM
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `caId` int(11) NOT NULL COMMENT 'primary key',
  `caName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `category`:
--

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`caId`, `caName`) VALUES
(1, 'عام');

-- --------------------------------------------------------

--
-- Table structure for table `doc`
--
-- Creation: Jun 03, 2021 at 01:10 PM
--

DROP TABLE IF EXISTS `doc`;
CREATE TABLE `doc` (
  `doId` int(11) NOT NULL,
  `doName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `doc`:
--

--
-- Dumping data for table `doc`
--

INSERT INTO `doc` (`doId`, `doName`) VALUES
(1, 'شراء'),
(2, 'م_شراء'),
(3, 'بيع'),
(4, 'م_بيع'),
(5, 'مدفوعات'),
(6, 'مقبوضات'),
(7, 'مصاريف'),
(8, 'ايرادات'),
(9, 'افتتاحي'),
(10, 'جرد'),
(11, 'تحويل'),
(12, 'نواقص'),
(13, 'مدين'),
(14, 'دائن');

-- --------------------------------------------------------

--
-- Table structure for table `factor`
--
-- Creation: Jun 04, 2021 at 08:24 PM
--

DROP TABLE IF EXISTS `factor`;
CREATE TABLE `factor` (
  `faId` int(11) NOT NULL,
  `doNum` int(11) NOT NULL,
  `paNum` int(11) NOT NULL DEFAULT 1,
  `stNum` int(11) NOT NULL DEFAULT 1,
  `faTotal` decimal(10,0) NOT NULL DEFAULT 0,
  `faPay` decimal(10,0) NOT NULL DEFAULT 0,
  `hiNum` int(11) NOT NULL DEFAULT 1,
  `usNum` int(11) NOT NULL DEFAULT 1,
  `faNotes` varchar(50) NOT NULL,
  `faDt` date NOT NULL DEFAULT current_timestamp(),
  `faTm` time NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `factor`:
--   `doNum`
--       `doc` -> `doId`
--   `hiNum`
--       `hisab` -> `hiId`
--   `stNum`
--       `store` -> `stId`
--   `usNum`
--       `users` -> `usId`
--   `paNum`
--       `payment` -> `paId`
--

--
-- Dumping data for table `factor`
--

INSERT INTO `factor` (`faId`, `doNum`, `paNum`, `stNum`, `faTotal`, `faPay`, `hiNum`, `usNum`, `faNotes`, `faDt`, `faTm`) VALUES
(1, 1, 1, 1, '500', '0', 1, 1, '', '2021-06-01', '10:24:59');

-- --------------------------------------------------------

--
-- Table structure for table `hisab`
--
-- Creation: Jun 04, 2021 at 08:21 PM
--

DROP TABLE IF EXISTS `hisab`;
CREATE TABLE `hisab` (
  `hiId` int(11) NOT NULL,
  `hiName` varchar(255) NOT NULL,
  `tyNum` int(11) NOT NULL DEFAULT 4,
  `dtEnter` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `hisab`:
--   `tyNum`
--       `types` -> `tyId`
--

--
-- Dumping data for table `hisab`
--

INSERT INTO `hisab` (`hiId`, `hiName`, `tyNum`, `dtEnter`) VALUES
(1, 'نقدي', 2, '2021-06-01'),
(4, 'بوشاشي', 3, '2021-06-01'),
(5, 'عمر دردور', 4, '2021-06-01'),
(6, 'عبد الرحمان', 4, '2021-06-01');

-- --------------------------------------------------------

--
-- Table structure for table `khazina`
--
-- Creation: Jun 04, 2021 at 08:01 AM
--

DROP TABLE IF EXISTS `khazina`;
CREATE TABLE `khazina` (
  `khId` int(11) NOT NULL,
  `thName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `khazina`:
--

--
-- Dumping data for table `khazina`
--

INSERT INTO `khazina` (`khId`, `thName`) VALUES
(1, 'الصندوق');

-- --------------------------------------------------------

--
-- Table structure for table `khfactor`
--
-- Creation: Jun 04, 2021 at 08:39 PM
--

DROP TABLE IF EXISTS `khfactor`;
CREATE TABLE `khfactor` (
  `id` int(11) NOT NULL,
  `faIn` decimal(10,0) NOT NULL DEFAULT 0,
  `faOut` decimal(10,0) NOT NULL DEFAULT 0,
  `solde` decimal(10,0) NOT NULL DEFAULT 0,
  `hiNum` int(11) NOT NULL DEFAULT 1,
  `khNum` int(11) NOT NULL DEFAULT 1,
  `baNum` int(11) NOT NULL DEFAULT 1,
  `notes` varchar(500) NOT NULL DEFAULT '1',
  `faDt` date NOT NULL DEFAULT current_timestamp(),
  `faTm` time NOT NULL DEFAULT current_timestamp(),
  `usNum` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `khfactor`:
--   `baNum`
--       `band` -> `baId`
--   `hiNum`
--       `hisab` -> `hiId`
--   `usNum`
--       `users` -> `usId`
--   `khNum`
--       `khazina` -> `khId`
--

-- --------------------------------------------------------

--
-- Table structure for table `khrec`
--
-- Creation: Jun 04, 2021 at 07:49 PM
--

DROP TABLE IF EXISTS `khrec`;
CREATE TABLE `khrec` (
  `id` int(11) NOT NULL,
  `reIn` decimal(10,0) NOT NULL,
  `reOut` decimal(10,0) NOT NULL,
  `notes` varchar(500) NOT NULL,
  `baNum` int(11) NOT NULL,
  `hiNum` int(11) NOT NULL,
  `khNum` int(11) NOT NULL,
  `reDt` date NOT NULL DEFAULT current_timestamp(),
  `reTm` time NOT NULL DEFAULT current_timestamp(),
  `usNum` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `khrec`:
--   `baNum`
--       `band` -> `baId`
--

-- --------------------------------------------------------

--
-- Table structure for table `move`
--
-- Creation: Jun 04, 2021 at 12:57 PM
--

DROP TABLE IF EXISTS `move`;
CREATE TABLE `move` (
  `id` int(11) NOT NULL,
  `faNum` int(11) NOT NULL,
  `prNum` int(11) NOT NULL,
  `qtyIn` int(11) NOT NULL,
  `qtyOut` int(11) NOT NULL,
  `prixA` int(11) NOT NULL,
  `prixS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `move`:
--

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--
-- Creation: Jun 04, 2021 at 08:13 PM
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment` (
  `paId` int(11) NOT NULL,
  `paName` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `payment`:
--

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`paId`, `paName`) VALUES
(2, 'اجل'),
(1, 'نقدي');

-- --------------------------------------------------------

--
-- Table structure for table `prod`
--
-- Creation: Jun 04, 2021 at 08:13 PM
--

DROP TABLE IF EXISTS `prod`;
CREATE TABLE `prod` (
  `prId` int(11) NOT NULL COMMENT 'primary key',
  `prName` varchar(50) NOT NULL,
  `prPrixA` decimal(8,2) NOT NULL DEFAULT 0.00,
  `prPrixS` decimal(8,2) NOT NULL DEFAULT 0.00,
  `QtyLast` int(11) NOT NULL DEFAULT 1 COMMENT 'حد-الطلب',
  `caNum` int(11) NOT NULL DEFAULT 1,
  `prImg` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `prod`:
--   `caNum`
--       `category` -> `caId`
--

--
-- Dumping data for table `prod`
--

INSERT INTO `prod` (`prId`, `prName`, `prPrixA`, `prPrixS`, `QtyLast`, `caNum`, `prImg`) VALUES
(1, 'منتج', '100.00', '110.00', 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `store`
--
-- Creation: Jun 04, 2021 at 08:18 PM
--

DROP TABLE IF EXISTS `store`;
CREATE TABLE `store` (
  `stId` int(11) NOT NULL,
  `stName` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `store`:
--

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`stId`, `stName`) VALUES
(1, 'الرئيسي');

-- --------------------------------------------------------

--
-- Table structure for table `types`
--
-- Creation: Jun 04, 2021 at 08:16 PM
--

DROP TABLE IF EXISTS `types`;
CREATE TABLE `types` (
  `tyId` int(11) NOT NULL COMMENT 'primary key',
  `tyName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='نوع الحساب';

--
-- RELATIONSHIPS FOR TABLE `types`:
--

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`tyId`, `tyName`) VALUES
(1, 'مدير'),
(2, 'نقدي'),
(3, 'مورد'),
(4, 'عميل'),
(5, 'كاشير');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
-- Creation: Jun 05, 2021 at 12:39 PM
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `usId` int(11) NOT NULL COMMENT 'primary key',
  `usName` varchar(50) NOT NULL COMMENT 'الحساب',
  `email` varchar(50) NOT NULL,
  `usPw` varchar(255) NOT NULL,
  `tyNum` int(11) NOT NULL DEFAULT 5,
  `usActive` tinyint(1) NOT NULL,
  `dtEnter` date NOT NULL DEFAULT current_timestamp(),
  `tmEnter` time NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT=' الحسابات';

--
-- RELATIONSHIPS FOR TABLE `users`:
--   `tyNum`
--       `types` -> `tyId`
--

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`usId`, `usName`, `email`, `usPw`, `tyNum`, `usActive`, `dtEnter`, `tmEnter`) VALUES
(1, 'مدير', 'fe', '0', 1, 0, '2021-06-03', '03:00:00'),
(2, 'مستخدم', 'ff', '0', 5, 0, '2021-06-02', '10:12:25'),
(7, 'admin', '', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 1, 0, '2021-06-01', '22:56:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achets`
--
ALTER TABLE `achets`
  ADD KEY `prNum` (`prNum`);

--
-- Indexes for table `band`
--
ALTER TABLE `band`
  ADD UNIQUE KEY `baId` (`baId`),
  ADD UNIQUE KEY `baName` (`baName`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`caId`);

--
-- Indexes for table `doc`
--
ALTER TABLE `doc`
  ADD PRIMARY KEY (`doId`);

--
-- Indexes for table `factor`
--
ALTER TABLE `factor`
  ADD PRIMARY KEY (`faId`),
  ADD KEY `doNum` (`doNum`),
  ADD KEY `hiNum` (`hiNum`),
  ADD KEY `stNum` (`stNum`),
  ADD KEY `usNum` (`usNum`),
  ADD KEY `paNum` (`paNum`);

--
-- Indexes for table `hisab`
--
ALTER TABLE `hisab`
  ADD PRIMARY KEY (`hiId`),
  ADD KEY `tyNum` (`tyNum`);

--
-- Indexes for table `khazina`
--
ALTER TABLE `khazina`
  ADD PRIMARY KEY (`khId`),
  ADD UNIQUE KEY `thName` (`thName`);

--
-- Indexes for table `khfactor`
--
ALTER TABLE `khfactor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `baNum` (`baNum`),
  ADD KEY `hiNum` (`hiNum`),
  ADD KEY `usNum` (`usNum`),
  ADD KEY `khNum` (`khNum`);

--
-- Indexes for table `khrec`
--
ALTER TABLE `khrec`
  ADD PRIMARY KEY (`id`),
  ADD KEY `baNum` (`baNum`);

--
-- Indexes for table `move`
--
ALTER TABLE `move`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`paId`),
  ADD UNIQUE KEY `paName` (`paName`);

--
-- Indexes for table `prod`
--
ALTER TABLE `prod`
  ADD PRIMARY KEY (`prId`),
  ADD KEY `caNum` (`caNum`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`stId`),
  ADD UNIQUE KEY `stName` (`stName`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`tyId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`usId`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `usName` (`usName`),
  ADD KEY `tyNum` (`tyNum`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `band`
--
ALTER TABLE `band`
  MODIFY `baId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `caId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `doc`
--
ALTER TABLE `doc`
  MODIFY `doId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `factor`
--
ALTER TABLE `factor`
  MODIFY `faId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hisab`
--
ALTER TABLE `hisab`
  MODIFY `hiId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `khazina`
--
ALTER TABLE `khazina`
  MODIFY `khId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `khfactor`
--
ALTER TABLE `khfactor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `khrec`
--
ALTER TABLE `khrec`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `move`
--
ALTER TABLE `move`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `paId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `prod`
--
ALTER TABLE `prod`
  MODIFY `prId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `stId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `tyId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `usId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `achets`
--
ALTER TABLE `achets`
  ADD CONSTRAINT `achets_ibfk_1` FOREIGN KEY (`prNum`) REFERENCES `prod` (`prId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `factor`
--
ALTER TABLE `factor`
  ADD CONSTRAINT `factor_ibfk_1` FOREIGN KEY (`doNum`) REFERENCES `doc` (`doId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factor_ibfk_2` FOREIGN KEY (`hiNum`) REFERENCES `hisab` (`hiId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factor_ibfk_3` FOREIGN KEY (`stNum`) REFERENCES `store` (`stId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factor_ibfk_4` FOREIGN KEY (`usNum`) REFERENCES `users` (`usId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factor_ibfk_5` FOREIGN KEY (`paNum`) REFERENCES `payment` (`paId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hisab`
--
ALTER TABLE `hisab`
  ADD CONSTRAINT `hisab_ibfk_1` FOREIGN KEY (`tyNum`) REFERENCES `types` (`tyId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `khfactor`
--
ALTER TABLE `khfactor`
  ADD CONSTRAINT `khfactor_ibfk_1` FOREIGN KEY (`baNum`) REFERENCES `band` (`baId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `khfactor_ibfk_2` FOREIGN KEY (`hiNum`) REFERENCES `hisab` (`hiId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `khfactor_ibfk_3` FOREIGN KEY (`usNum`) REFERENCES `users` (`usId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `khfactor_ibfk_4` FOREIGN KEY (`khNum`) REFERENCES `khazina` (`khId`);

--
-- Constraints for table `khrec`
--
ALTER TABLE `khrec`
  ADD CONSTRAINT `khrec_ibfk_1` FOREIGN KEY (`baNum`) REFERENCES `band` (`baId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `prod`
--
ALTER TABLE `prod`
  ADD CONSTRAINT `prod_ibfk_1` FOREIGN KEY (`caNum`) REFERENCES `category` (`caId`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`tyNum`) REFERENCES `types` (`tyId`);


--
-- Metadata
--
USE `phpmyadmin`;

--
-- Metadata for table achets
--

--
-- Metadata for table band
--

--
-- Metadata for table category
--

--
-- Metadata for table doc
--

--
-- Metadata for table factor
--

--
-- Metadata for table hisab
--

--
-- Metadata for table khazina
--

--
-- Metadata for table khfactor
--

--
-- Metadata for table khrec
--

--
-- Metadata for table move
--

--
-- Metadata for table payment
--

--
-- Metadata for table prod
--

--
-- Metadata for table store
--

--
-- Metadata for table types
--

--
-- Metadata for table users
--

--
-- Metadata for database mahal
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
