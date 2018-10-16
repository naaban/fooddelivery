-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2018 at 09:09 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.0.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fooddelivery`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_reg`
--

CREATE TABLE `admin_reg` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `image` varchar(40) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `approved` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_reg`
--

INSERT INTO `admin_reg` (`id`, `name`, `mobile`, `image`, `email`, `password`, `approved`) VALUES
(1, 'Naban', '7373170701', '1.jpg', 'a@gmail.com', '87654321', 1),
(2, 'pad', '7373170701', '', 'aa@gmail.com', '123', 0),
(3, 'pad', '7373170701', '', 'an@gmail.com', '123', 0),
(4, 'pad', '7373170701', '', 'at@gmail.com', '123', 0),
(5, 'pad', 'this.params.mobile', '', 'n@gmail.com', '123', 0);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `product_id`, `customer_id`) VALUES
(1, 1, 1),
(2, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer_address`
--

CREATE TABLE `customer_address` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `street` varchar(40) NOT NULL,
  `door_no` varchar(10) NOT NULL,
  `city` varchar(20) NOT NULL,
  `state` varchar(40) NOT NULL,
  `pincode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_address`
--

INSERT INTO `customer_address` (`id`, `customer_id`, `street`, `door_no`, `city`, `state`, `pincode`) VALUES
(1, 1, 'summa street', '111', 'Salem', 'TN', '636010');

-- --------------------------------------------------------

--
-- Table structure for table `customer_reg`
--

CREATE TABLE `customer_reg` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_reg`
--

INSERT INTO `customer_reg` (`id`, `name`, `mobile`, `email`, `password`) VALUES
(1, 'pad', '7373170701', 'a@gmail.com', '12345678'),
(2, 'pad', '75645646', 'n@gmail.com', '123');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `qty` int(5) NOT NULL,
  `total_amt` int(11) NOT NULL,
  `customer_address_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `approval` int(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `order_id`, `qty`, `total_amt`, `customer_address_id`, `product_id`, `approval`) VALUES
(2, 1, 'FOOD100000', 1, 250, 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_type` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(400) NOT NULL,
  `price` varchar(10) NOT NULL,
  `qty_avail` int(11) NOT NULL,
  `image` longblob NOT NULL,
  `special_offer` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_type`, `admin_id`, `name`, `description`, `price`, `qty_avail`, `image`, `special_offer`) VALUES
(1, 2, 1, 'Briyani', 'Oder and Taste', '250', 25, 0x312e, 0),
(2, 1, 1, 'Briyani', 'Oder and Taste', '250', 25, '', 0),
(3, 1, 1, 'Briyani', 'Oder and Taste', '250', 25, '', 0),
(4, 1, 1, 'Briyani', 'Oder and Taste', '250', 25, 0x312e6a7067, 0),
(9, 1, 1, 'Asd', 'Asd', 'Asd', 0, 0x312e, 0),
(10, 1, 1, 'Wr', 'Ff', 'Gg', 0, 0x312e, 0),
(11, 1, 1, 'Snns', 'Jshs', '12000', 2, 0x312e, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_type`
--

CREATE TABLE `product_type` (
  `id` int(11) NOT NULL,
  `product_type` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_type`
--

INSERT INTO `product_type` (`id`, `product_type`) VALUES
(1, 'StreetFood'),
(2, 'HomeFood'),
(3, 'ResturantFood'),
(4, 'GosyFood');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_reg`
--
ALTER TABLE `admin_reg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cart_customer_id` (`customer_id`),
  ADD KEY `fk_product_id` (`product_id`);

--
-- Indexes for table `customer_address`
--
ALTER TABLE `customer_address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_customer_id` (`customer_id`);

--
-- Indexes for table `customer_reg`
--
ALTER TABLE `customer_reg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_customer_id` (`customer_id`),
  ADD KEY `fk_customer_address_id` (`customer_address_id`),
  ADD KEY `fk_order_product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_admin_id` (`admin_id`),
  ADD KEY `fk_product_type` (`product_type`);

--
-- Indexes for table `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_reg`
--
ALTER TABLE `admin_reg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer_address`
--
ALTER TABLE `customer_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer_reg`
--
ALTER TABLE `customer_reg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `product_type`
--
ALTER TABLE `product_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_cart_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer_reg` (`id`),
  ADD CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `customer_address`
--
ALTER TABLE `customer_address`
  ADD CONSTRAINT `fk_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer_reg` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_customer_address_id` FOREIGN KEY (`customer_address_id`) REFERENCES `customer_address` (`id`),
  ADD CONSTRAINT `fk_order_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer_reg` (`id`),
  ADD CONSTRAINT `fk_order_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin_reg` (`id`),
  ADD CONSTRAINT `fk_product_type` FOREIGN KEY (`product_type`) REFERENCES `product_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
