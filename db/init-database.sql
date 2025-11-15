SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
CREATE TABLE `booking` (
  `booking_id` varchar(23) NOT NULL,
  `booking_date` date NOT NULL,
  `booking_time_in` datetime NOT NULL,
  `booking_time_out` datetime NOT NULL,
  `booking_name` varchar(100) NOT NULL,
  `booking_tel` varchar(15) NOT NULL,
  `booking_client` tinyint(4) NOT NULL,
  `booking_create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `booking_update_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `booking_status_id` tinyint(4) NOT NULL COMMENT '1 = waiting, 2 = came',
  `booking_remark` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `booking_item`
--

DROP TABLE IF EXISTS `booking_item`;
CREATE TABLE `booking_item` (
  `booking_item_id` int(11) NOT NULL,
  `booking_id` varchar(23) NOT NULL,
  `therapist_id` smallint(6) NOT NULL DEFAULT '0' COMMENT '0 = Any',
  `massage_type_id` tinyint(4) NOT NULL,
  `booking_item_status` tinyint(4) NOT NULL COMMENT '1 = coming, 2 = came'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `booking_room`
--

DROP TABLE IF EXISTS `booking_room`;
CREATE TABLE `booking_room` (
  `booking_id` varchar(23) NOT NULL,
  `room_type_id` tinyint(4) NOT NULL,
  `booking_room_amount` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `booking_sms`
--

DROP TABLE IF EXISTS `booking_sms`;
CREATE TABLE `booking_sms` (
  `booking_sms_id` int(11) NOT NULL,
  `booking_id` varchar(23) NOT NULL,
  `booking_sms_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `booking_sms_result` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `client_id` varchar(23) NOT NULL,
  `health_fund_id` int(11) NOT NULL,
  `client_membership_no` varchar(10) NOT NULL,
  `client_patient_id` tinyint(4) NOT NULL,
  `client_first_name` varchar(50) NOT NULL,
  `client_last_name` varchar(50) NOT NULL,
  `client_gender` bit(1) NOT NULL,
  `client_address` varchar(250) NOT NULL,
  `client_postcode` varchar(4) NOT NULL,
  `client_email` varchar(50) NOT NULL,
  `client_contact_no` varchar(12) NOT NULL,
  `client_birthday` date DEFAULT NULL,
  `client_occupation` varchar(50) NOT NULL,
  `client_sports` varchar(50) NOT NULL,
  `client_other_conditions` varchar(50) NOT NULL,
  `client_emergency_contact_name` varchar(50) NOT NULL,
  `client_emergency_contact_no` varchar(12) NOT NULL,
  `client_create_datetime` datetime NOT NULL,
  `client_create_user` tinyint(4) NOT NULL,
  `client_update_datetime` datetime DEFAULT NULL,
  `client_update_user` tinyint(4) NOT NULL DEFAULT '0',
  `client_void_datetime` datetime DEFAULT NULL,
  `client_void_user` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `client_condition`
--

DROP TABLE IF EXISTS `client_condition`;
CREATE TABLE `client_condition` (
  `client_id` varchar(23) NOT NULL,
  `condition_type_id` tinyint(4) NOT NULL,
  `client_condition_remark` varchar(50) NOT NULL,
  `client_condition_checked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `client_finding`
--

DROP TABLE IF EXISTS `client_finding`;
CREATE TABLE `client_finding` (
  `client_id` varchar(23) NOT NULL,
  `finding_type_id` tinyint(4) NOT NULL,
  `client_finding_remark` varchar(50) NOT NULL,
  `client_finding_checked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `condition_type`
--

DROP TABLE IF EXISTS `condition_type`;
CREATE TABLE `condition_type` (
  `condition_type_id` tinyint(4) NOT NULL,
  `condition_type_name` varchar(50) NOT NULL,
  `condition_type_suffix` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `condition_type`
--

TRUNCATE TABLE `condition_type`;
--
-- Dumping data for table `condition_type`
--

INSERT INTO `condition_type` (`condition_type_id`, `condition_type_name`, `condition_type_suffix`) VALUES
(1, 'Stroke', 'Stroke'),
(2, 'Cancer', 'Cancer'),
(3, 'Isomnia', 'Isomnia'),
(4, 'Headache', 'Headache'),
(5, 'Heart Conditions', 'HeartCon'),
(6, 'Pain/Stiffness', 'Pain'),
(7, 'High/Low Blood Pressure', 'BloodPressure'),
(8, 'Allergies/Asthma', 'Allergy'),
(9, 'Broken/Dislocated Bones', 'BrokenBone'),
(10, 'Contagious/Infactious Diseases', 'Disease'),
(11, 'Pregnancy/Breastfeeding', 'Pregnancy'),
(12, 'Sore Back', 'SoreBack');

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `config_name` varchar(50) NOT NULL,
  `config_value` varchar(50) NOT NULL,
  `config_active_date_start` date NOT NULL DEFAULT '1999-01-01',
  `config_active_date_end` date NOT NULL DEFAULT '2999-12-31'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `config`
--

TRUNCATE TABLE `config`;
--
-- Dumping data for table `config`
--

INSERT INTO `config` (`config_name`, `config_value`, `config_active_date_start`, `config_active_date_end`) VALUES
('CONFIG_COMMISSION_RATE', '0.5', '1999-01-01', '2999-12-31'),
('CONFIG_MIN_REQUEST', '0', '1999-01-01', '2999-12-31');

-- --------------------------------------------------------

--
-- Table structure for table `finding_type`
--

DROP TABLE IF EXISTS `finding_type`;
CREATE TABLE `finding_type` (
  `finding_type_id` tinyint(4) NOT NULL,
  `finding_type_name` varchar(50) NOT NULL,
  `finding_type_suffix` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `finding_type`
--

TRUNCATE TABLE `finding_type`;
--
-- Dumping data for table `finding_type`
--

INSERT INTO `finding_type` (`finding_type_id`, `finding_type_name`, `finding_type_suffix`) VALUES
(1, 'True Local', 'TrueLocal'),
(2, 'Google', 'Google'),
(3, 'Passing By', 'Passing'),
(4, 'Word of Mouth', 'Word'),
(5, 'Flyer', 'Flyer'),
(6, 'Facebook', 'Facebook'),
(7, 'Gift Voucher', 'GiftVoucher'),
(8, 'Referred By', 'Referred');

-- --------------------------------------------------------

--
-- Table structure for table `health_fund`
--

DROP TABLE IF EXISTS `health_fund`;
CREATE TABLE `health_fund` (
  `health_fund_id` int(11) NOT NULL,
  `health_fund_name` varchar(50) NOT NULL,
  `health_fund_provider_no` varchar(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `health_fund`
--

TRUNCATE TABLE `health_fund`;
--
-- Dumping data for table `health_fund`
--

INSERT INTO `health_fund` (`health_fund_id`, `health_fund_name`, `health_fund_provider_no`) VALUES
(0, '----- Non Health Fund -----', ''),
(1, 'ACA Health', 'AW10487R'),
(2, 'AHM Health Insurance', '21146594'),
(3, 'Australian Unity Health Ltd', '21135790'),
(4, 'Budget Direct', ''),
(5, 'Bupa Australia', 'C065957'),
(6, 'CBHS Health Fund Limited', 'AMT1-10487'),
(7, 'CUA Health Limited', 'AW10487R'),
(8, 'Defence Health Limited', 'AW10487R'),
(9, 'Frank Health insurance', 'AW10487R'),
(10, 'GMF Health', 'AW10487R'),
(11, 'GMHBA Limited', 'AW10487R'),
(12, 'Grand United Health', 'H2314359'),
(13, 'HBF Health Fund', '1283571W'),
(14, 'Health Care Insurance Ltd', 'AW10487R'),
(15, 'Health Insurance Fund of Australia Ltd (HIF)', 'AW10487R'),
(16, 'Health Partners', 'AW10487R'),
(17, 'Health.com.au', 'AW10487R'),
(18, 'Medibank Private Ltd', '1283571W'),
(19, 'Onemedifund', 'AW10487R'),
(20, 'Navy Health', 'AW10487R'),
(21, 'NIB Health Funds Ltd', 'AMT1-10487'),
(22, 'Peoplecare Health Insurance', 'AW10487R'),
(23, 'Phoenix Health Fund Ltd', 'AW10487R'),
(24, 'Queensland Country Health Fund Ltd', 'AW10487R'),
(25, 'Railway and Transport Health Fund Ltd', 'AW10487R'),
(26, 'Reserve Bank Health Society', ''),
(27, 'St Lukes', 'AW10487R'),
(28, 'The Doctors\' Health Fund', 'AM10487'),
(29, 'Teachers Health Fund', 'AW10487R'),
(30, 'Transport Health Pty Ltd', 'AW10487R'),
(31, 'TUH', ''),
(32, 'Uni Health', ''),
(33, 'Westfund Ltd', ''),
(34, 'HCF', 'AMT1-10487'),
(35, 'Mildura District Hospital Fund Ltd', 'AW10487R'),
(36, 'La Trobe Health Services', 'AW10487R'),
(37, 'Police Health', 'AW10487R'),
(38, 'Cessnock District Health Benefits Fund', 'AW10487R'),
(39, 'Teachers Union Health', 'AW10487R'),
(40, 'Teachers Federation Health', 'AW10487R'),
(41, 'GUHealth', ''),
(42, 'Hospitals Contribution Fund of Australia', ''),
(43, 'NMH', ''),
(44, 'MyOwn Health Insurance', '');

-- --------------------------------------------------------

--
-- Table structure for table `massage_record`
--

DROP TABLE IF EXISTS `massage_record`;
CREATE TABLE `massage_record` (
  `massage_record_id` int(11) NOT NULL,
  `therapist_id` smallint(6) NOT NULL,
  `massage_type_id` int(11) NOT NULL,
  `room_no` float NOT NULL,
  `booking_item_id` int(11) NOT NULL,
  `massage_record_minutes` smallint(6) NOT NULL,
  `massage_record_time_in` datetime NOT NULL DEFAULT '1900-01-01 00:00:00',
  `massage_record_time_out` datetime NOT NULL DEFAULT '1900-01-01 00:00:00',
  `massage_record_requested` tinyint(1) NOT NULL,
  `massage_record_request_reward` decimal(10,2) NOT NULL,
  `massage_record_promotion` tinyint(1) NOT NULL,
  `massage_record_commission` decimal(10,2) NOT NULL,
  `massage_record_cash` decimal(10,2) NOT NULL,
  `massage_record_credit` decimal(10,2) NOT NULL,
  `massage_record_hicaps` decimal(10,2) NOT NULL,
  `massage_record_stamp` smallint(6) NOT NULL,
  `massage_record_voucher` decimal(10,2) NOT NULL,
  `massage_record_date` date NOT NULL,
  `massage_record_create_user` smallint(6) NOT NULL,
  `massage_record_create_datetime` datetime NOT NULL,
  `massage_record_update_user` smallint(6) NOT NULL DEFAULT '0',
  `massage_record_update_datetime` datetime DEFAULT NULL,
  `massage_record_void_user` smallint(6) NOT NULL DEFAULT '0',
  `massage_record_void_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `massage_type`
--

DROP TABLE IF EXISTS `massage_type`;
CREATE TABLE `massage_type` (
  `massage_type_id` int(11) NOT NULL,
  `massage_type_name` varchar(30) NOT NULL,
  `massage_type_commission` decimal(10,2) NOT NULL,
  `massage_type_active` tinyint(1) NOT NULL,
  `massage_type_update_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `massage_type`
--

TRUNCATE TABLE `massage_type`;
--
-- Dumping data for table `massage_type`
--

INSERT INTO `massage_type` (`massage_type_id`, `massage_type_name`, `massage_type_commission`, `massage_type_active`, `massage_type_update_datetime`) VALUES
(1, 'Thai Massage', 0.00, 1, '2017-06-05 11:41:47'),
(2, 'Hot Stone', 8.00, 1, '2019-07-13 12:59:51'),
(3, 'Cupping', 5.00, 1, '2023-01-17 15:53:19'),
(5, 'Gift Voucher', 0.00, 0, '2017-02-10 20:13:34'),
(6, 'Remedial', 0.00, 1, '0000-00-00 00:00:00'),
(7, 'Aroma Massage', 0.00, 1, '2017-02-14 16:58:47'),
(8, 'Coconut Oil relaxation', 0.00, 1, '2017-02-14 16:59:13'),
(9, 'Pregnancy', 0.00, 1, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `membership`
--

DROP TABLE IF EXISTS `membership`;
CREATE TABLE `membership` (
  `membership_no` varchar(10) NOT NULL,
  `membership_patient_id` tinyint(4) NOT NULL,
  `client_id` int(11) NOT NULL,
  `health_fund_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(30) NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `product_price_changeable` tinyint(1) NOT NULL,
  `product_stock_amt` int(11) NOT NULL,
  `product_img` varchar(50) NOT NULL,
  `product_active` tinyint(1) NOT NULL,
  `product_update_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `provider`
--

DROP TABLE IF EXISTS `provider`;
CREATE TABLE `provider` (
  `provider_id` int(11) NOT NULL,
  `provider_no` varchar(20) NOT NULL,
  `provider_name` varchar(50) NOT NULL,
  `provider_update_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `provider_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `reception_record`
--

DROP TABLE IF EXISTS `reception_record`;
CREATE TABLE `reception_record` (
  `reception_record_id` int(11) NOT NULL,
  `therapist_id` int(11) NOT NULL,
  `reception_record_date` date NOT NULL,
  `reception_record_late_night` tinyint(1) NOT NULL,
  `reception_record_whole_day` tinyint(1) NOT NULL,
  `reception_record_hour` tinyint(4) NOT NULL,
  `reception_record_shop_income` decimal(10,2) NOT NULL,
  `reception_record_std_com` decimal(10,2) NOT NULL,
  `reception_record_extra_com` decimal(10,2) NOT NULL,
  `reception_record_total_com` decimal(10,2) NOT NULL,
  `reception_record_create_user` int(11) NOT NULL,
  `reception_record_create_datetime` datetime NOT NULL,
  `reception_record_update_user` int(11) NOT NULL DEFAULT '0',
  `reception_record_update_datetime` datetime DEFAULT NULL,
  `reception_record_void_user` int(11) NOT NULL DEFAULT '0',
  `reception_record_void_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
  `report_id` varchar(23) NOT NULL,
  `report_date` date NOT NULL,
  `report_detail` text NOT NULL,
  `report_recommendation` text NOT NULL,
  `report_hour` decimal(10,2) NOT NULL,
  `therapist_id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL,
  `membership_no` int(11) DEFAULT NULL,
  `pateint_id` int(11) NOT NULL DEFAULT '0',
  `report_create_datetime` datetime NOT NULL,
  `report_create_user` tinyint(4) NOT NULL,
  `report_update_datetime` datetime DEFAULT NULL,
  `report_update_user` tinyint(4) NOT NULL DEFAULT '0',
  `report_void_datetime` datetime DEFAULT NULL,
  `report_void_user` tinyint(4) NOT NULL DEFAULT '0',
  `client_id` varchar(23) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `request_condition`
--

DROP TABLE IF EXISTS `request_condition`;
CREATE TABLE `request_condition` (
  `request_condition_request` tinyint(1) NOT NULL,
  `request_condition_promotion` tinyint(1) NOT NULL,
  `request_condition_stamp` tinyint(1) NOT NULL,
  `request_condition_amt` decimal(10,2) NOT NULL,
  `request_condition_active_date_start` date NOT NULL DEFAULT '1999-01-01',
  `request_condition_active_date_end` date NOT NULL DEFAULT '2999-12-31'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `request_condition`
--

TRUNCATE TABLE `request_condition`;
--
-- Dumping data for table `request_condition`
--

INSERT INTO `request_condition` (`request_condition_request`, `request_condition_promotion`, `request_condition_stamp`, `request_condition_amt`, `request_condition_active_date_start`, `request_condition_active_date_end`) VALUES
(0, 0, 0, 0.00, '2016-01-01', '2017-04-14'),
(0, 0, 0, 0.00, '2017-04-15', '2999-12-31'),
(0, 0, 1, 0.00, '2017-04-15', '2999-12-31'),
(0, 1, 0, 0.00, '2016-01-01', '2017-04-14'),
(0, 1, 0, 0.00, '2017-04-15', '2999-12-31'),
(0, 1, 1, 0.00, '2017-04-15', '2999-12-31'),
(1, 0, 0, 3.00, '2016-01-01', '2017-04-14'),
(1, 0, 0, 3.00, '2017-04-15', '2999-12-31'),
(1, 0, 1, 3.00, '2017-04-15', '2999-12-31'),
(1, 1, 0, 0.00, '2016-01-01', '2017-04-14'),
(1, 1, 0, 3.00, '2017-04-15', '2999-12-31'),
(1, 1, 1, 3.00, '2017-04-15', '2999-12-31');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `room_no` float NOT NULL,
  `room_remark` varchar(20) NOT NULL,
  `room_type_id` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `room`
--

TRUNCATE TABLE `room`;
--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_no`, `room_remark`, `room_type_id`) VALUES
(1, '', 1),
(2.1, '(Double)', 2),
(2.2, '(Double)', 2),
(4.1, '(Double)', 2),
(4.2, '(Double)', 2),
(5, '', 1),
(6, '(Double)', 2),
(8, '(Double)', 2),
(9, '', 1),
(10, '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `room_double`
--

DROP TABLE IF EXISTS `room_double`;
CREATE TABLE `room_double` (
  `room_double_no` tinyint(4) NOT NULL,
  `room_no_1` float NOT NULL,
  `room_no_2` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `room_double`
--

TRUNCATE TABLE `room_double`;
--
-- Dumping data for table `room_double`
--

INSERT INTO `room_double` (`room_double_no`, `room_no_1`, `room_no_2`) VALUES
(1, 4.1, 4.2),
(2, 2.1, 2.2),
(3, 6, 8);

-- --------------------------------------------------------

--
-- Table structure for table `room_type`
--

DROP TABLE IF EXISTS `room_type`;
CREATE TABLE `room_type` (
  `room_type_id` tinyint(4) NOT NULL,
  `room_type_name` varchar(20) NOT NULL,
  `room_type_capacity` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `room_type`
--

TRUNCATE TABLE `room_type`;
--
-- Dumping data for table `room_type`
--

INSERT INTO `room_type` (`room_type_id`, `room_type_name`, `room_type_capacity`) VALUES
(1, 'Single', 1),
(2, 'Double', 2);

-- --------------------------------------------------------

--
-- Table structure for table `sale`
--

DROP TABLE IF EXISTS `sale`;
CREATE TABLE `sale` (
  `sale_id` int(11) NOT NULL,
  `sale_uid` varchar(23) NOT NULL,
  `sale_date` date NOT NULL,
  `sale_time` time NOT NULL,
  `sale_total` decimal(10,2) NOT NULL,
  `sale_cash` decimal(10,2) NOT NULL,
  `sale_credit` decimal(10,2) NOT NULL,
  `sale_create_user` smallint(6) NOT NULL,
  `sale_create_datetime` datetime NOT NULL,
  `sale_update_user` smallint(6) NOT NULL DEFAULT '0',
  `sale_update_datetime` datetime DEFAULT NULL,
  `sale_void_user` smallint(6) NOT NULL DEFAULT '0',
  `sale_void_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sale_item`
--

DROP TABLE IF EXISTS `sale_item`;
CREATE TABLE `sale_item` (
  `sale_item_id` int(11) NOT NULL,
  `sale_uid` varchar(23) NOT NULL,
  `product_id` int(11) NOT NULL,
  `sale_item_amount` smallint(6) NOT NULL,
  `sale_item_price` decimal(10,2) NOT NULL,
  `sale_item_total` decimal(10,2) NOT NULL,
  `sale_item_create_user` smallint(6) NOT NULL,
  `sale_item_create_datetime` datetime NOT NULL,
  `sale_item_update_user` smallint(6) NOT NULL DEFAULT '0',
  `sale_item_update_datetime` datetime DEFAULT NULL,
  `sale_item_void_user` smallint(6) NOT NULL DEFAULT '0',
  `sale_item_void_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
CREATE TABLE `shift` (
  `shift_id` int(11) NOT NULL,
  `shift_date` date NOT NULL,
  `therapist_id` int(11) NOT NULL,
  `shift_type_id` int(11) NOT NULL,
  `shift_working` tinyint(1) NOT NULL,
  `shift_time_start` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `shift_create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `shift_update_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `shift_type`
--

DROP TABLE IF EXISTS `shift_type`;
CREATE TABLE `shift_type` (
  `shift_type_id` int(11) NOT NULL,
  `shift_type_name` varchar(20) NOT NULL,
  `shift_type_rate` decimal(10,2) NOT NULL,
  `shift_type_time_start` time NOT NULL,
  `shift_type_color` varchar(20) NOT NULL,
  `shift_type_seq` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `shift_type`
--

TRUNCATE TABLE `shift_type`;
--
-- Dumping data for table `shift_type`
--

INSERT INTO `shift_type` (`shift_type_id`, `shift_type_name`, `shift_type_rate`, `shift_type_time_start`, `shift_type_color`, `shift_type_seq`) VALUES
(1, 'Full', 1.00, '10:30:00', 'limegreen', 1),
(2, 'Half 2 PM', 0.50, '14:00:00', 'orange', 2),
(3, 'Half 3 PM', 0.50, '15:00:00', 'orange', 4),
(4, 'Half 4 PM', 0.50, '16:00:00', 'orange', 6),
(5, 'On-Call', 0.00, '17:00:00', 'red', 8),
(6, 'Reception', 0.00, '09:30:00', '#00f3ff', 9),
(7, 'Half 2.30 PM', 0.50, '14:30:00', 'orange', 3),
(8, 'Half 3.30 PM', 0.50, '15:30:00', 'orange', 5),
(9, 'Half 4.30 PM', 0.50, '16:30:00', 'orange', 7);

-- --------------------------------------------------------

--
-- Table structure for table `therapist`
--

DROP TABLE IF EXISTS `therapist`;
CREATE TABLE `therapist` (
  `therapist_id` smallint(6) NOT NULL,
  `therapist_name` varchar(50) NOT NULL,
  `therapist_guarantee` decimal(10,2) NOT NULL,
  `therapist_username` varchar(10) DEFAULT NULL,
  `therapist_password` varchar(50) NOT NULL,
  `therapist_permission` tinyint(4) NOT NULL COMMENT '9 = admin, 8 = manager, 7 = receptionist, 1 = staff',
  `therapist_update_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `therapist_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE TABLE `therapist`;

INSERT INTO `therapist`(`therapist_id`, `therapist_name`, `therapist_guarantee`, `therapist_username`, `therapist_password`, `therapist_permission`, `therapist_update_datetime`, `therapist_active`) VALUES
(0, '--- Unknown ---', 0, 'Unknown', 'xxxunknownxxx', 0, '0000-00-00', 1),
(1, 'Admin', 0, 'admin', 'MyAdmin@1', 9, '0000-00-00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `muscle_region`
--

DROP TABLE IF EXISTS `muscle_region`;
CREATE TABLE `muscle_region` (
  `muscle_region_id` int(11) NOT NULL,
  `muscle_region_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `muscle_region`
--

TRUNCATE TABLE `muscle_region`;
--
-- Dumping data for table `muscle_region`
--

INSERT INTO `muscle_region` (`muscle_region_id`, `muscle_region_name`) VALUES
(1, 'Back'),
(2, 'Upper Limb'),
(3, 'Lower Limb'),
(4, 'Head'),
(5, 'Neck');

-- --------------------------------------------------------

--
-- Table structure for table `muscle`
--

DROP TABLE IF EXISTS `muscle`;
CREATE TABLE `muscle` (
  `muscle_id` int(11) NOT NULL,
  `muscle_region_id` int(11) NOT NULL,
  `muscle_name` varchar(200) NOT NULL,
  `muscle_image` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `muscle`
--

TRUNCATE TABLE `muscle`;
--
-- Dumping data for table `muscle`
--

INSERT INTO `muscle` (`muscle_id`, `muscle_region_id`, `muscle_name`, `muscle_image`) VALUES
(1, 1, 'Deltoid', 'back-delt.jpg'),
(2, 1, 'Erector Spinae - Spinalis', 'back-spin.jpg'),
(3, 1, 'Erector Spinae - Iliocostalis', 'back-ili.jpg'),
(4, 1, 'Erector Spinae - Longissimus', 'back-long.jpg'),
(5, 1, 'Infraspinatus', 'back-infs.jpg'),
(6, 1, 'Interspinales', 'back-ints.jpg'),
(7, 1, 'Intertransversarii', 'back-ints.jpg'),
(8, 1, 'Latissimus Dorsi', 'back-lat.jpg'),
(9, 1, 'Levator Scapulae', 'back-ls.jpg'),
(11, 1, 'Obliquus Capitis Inferior', 'back-obci.jpg'),
(12, 1, 'Obliquus Capitis Superior', 'back-obcs.jpg'),
(13, 1, 'Rectus Capitus Posterior Major', 'back-rpmj.jpg'),
(14, 1, 'Rectus Capitus Posterior Minor', 'back-rpmn.jpg'),
(15, 1, 'Rhomboid Major', 'back-rhmj.jpg'),
(16, 1, 'Rhomboid Minor', 'back-rhmn.jpg'),
(17, 1, 'Serratus Posterior Inferior', 'back-spi.jpg'),
(18, 1, 'Serratus Posterior Superior', 'back-sps.jpg'),
(21, 1, 'Teres Major', 'back-tmj.jpg'),
(22, 1, 'Teres Minor', 'back-tmn.jpg'),
(23, 1, 'Transversospinalis - Multifidus', 'back-mult.jpg'),
(24, 1, 'Transversospinalis - Rotatores', 'back-rota.jpg'),
(25, 1, 'Transversospinalis - Semispinalis', 'back-ssps.jpg'),
(26, 1, 'Trapezius', 'back-trap.jpg'),
(27, 2, 'Abductor Digiti Minimi (hand)', 'uplimb-abdh.jpg'),
(28, 2, 'Abductor Pollicis Brevis', 'uplimb-abpb.jpg'),
(29, 2, 'Abductor Pollicis Longus', 'uplimb-abpl.jpg'),
(30, 2, 'Adductor Pollicis', 'uplimb-adpo.jpg'),
(31, 2, 'Anconeus', 'uplimb-anco.jpg'),
(32, 2, 'Articularis Cubiti', 'uplimb-artc.jpg'),
(33, 2, 'Biceps Brachii', 'uplimb-bb.jpg'),
(34, 2, 'Brachialis', 'uplimb-brac.jpg'),
(35, 2, 'Brachioradialis', 'uplimb-brds.jpg'),
(36, 2, 'Coracobrachialis', 'uplimb-cora.jpg'),
(37, 2, 'Extensor Carpi Radialis Brevis', 'uplimb-ecrb.jpg'),
(38, 2, 'Extensor Carpi Radialis Longus', 'uplimb-ecrl.jpg'),
(39, 2, 'Extensor Carpi Ulnaris', 'uplimb-ecu.jpg'),
(40, 2, 'Extensor Digiti Minimi (hand)', 'uplimb-edm.jpg'),
(41, 2, 'Extensor Digitorum (hand)', 'uplimb-edh.jpg'),
(42, 2, 'Extensor Indicis', 'uplimb-exi.jpg'),
(43, 2, 'Extensor Pollicis Brevis', 'uplimb-epb.jpg'),
(44, 2, 'Extensor Pollicis Longus', 'uplimb-epl.jpg'),
(45, 2, 'Flexor Carpi Radialis', 'uplimb-fcr.jpg'),
(46, 2, 'Flexor Carpi Ulnaris', 'uplimb-fcu.jpg'),
(47, 2, 'Flexor Digiti Minimi Brevis (hand)', 'uplimb-fdmh.jpg'),
(48, 2, 'Flexor Digitorum Profundus', 'uplimb-fdp.jpg'),
(49, 2, 'Flexor Digitorum Superficialis', 'uplimb-fds.jpg'),
(50, 2, 'Flexor Pollicis Brevis', 'uplimb-fpb.jpg'),
(51, 2, 'Flexor Pollicis Longus', 'uplimb-fpl.jpg'),
(53, 2, 'Interossei - Dorsal (hand)', 'uplimb-dih.jpg'),
(54, 2, 'Interossei - Palmar (hand)', 'uplimb-pih.jpg'),
(55, 2, 'Lumbricals (hand)', 'uplimb-lumh.jpg'),
(56, 2, 'Opponens Digiti Minimi (hand)', 'uplimb-odmh.jpg'),
(57, 2, 'Opponens Pollicis', 'uplimb-op.jpg'),
(58, 2, 'Palmaris Brevis', 'uplimb-pb.jpg'),
(59, 2, 'Palmaris Longus', 'uplimb-pl.jpg'),
(60, 2, 'Pronator Quadratus', 'uplimb-pq.jpg'),
(61, 2, 'Pronator Teres', 'uplimb-prt.jpg'),
(62, 2, 'Pectoralis Major', 'uplimb-pcmj.jpg'),
(63, 2, 'Pectoralis Minor', 'uplimb-pcmn.jpg'),
(64, 2, 'Subscapularis', 'uplimb-subs.jpg'),
(65, 2, 'Supinator', 'uplimb-sup.jpg'),
(66, 2, 'Supraspinatus', 'uplimb-sups.jpg'),
(67, 2, 'Triceps', 'uplimb-tric.jpg'),
(68, 3, 'Abductor Digiti Minimi (foot)', 'lowlimb-abddmf.jpg'),
(69, 3, 'Abductor Hallucis', 'lowlimb-abhf.jpg'),
(70, 3, 'Adductor Brevis', 'lowlimb-adbr.jpg'),
(71, 3, 'Adductor Hallucis', 'lowlimb-adhf.jpg'),
(72, 3, 'Adductor Longus', 'lowlimb-adlg.jpg'),
(73, 3, 'Adductor Magnus', 'lowlimb-admg.jpg'),
(74, 3, 'Articularis Genu', 'lowlimb-art.jpg'),
(75, 3, 'Biceps Femoris', 'lowlimb-bfem.jpg'),
(76, 3, 'Extensor Digitorum Brevis (foot)', 'lowlimb-edbf.jpg'),
(77, 3, 'Extensor Digitorum Longus (foot)', 'lowlimb-exdl.jpg'),
(78, 3, 'Extensor Hallucis Brevis', 'lowlimb-ehbf.jpg'),
(79, 3, 'Extensor Hallucis Longus', 'lowlimb-exhl.jpg'),
(80, 3, 'Flexor Digiti Minimi Brevis (foot)', 'lowlimb-fdmf.jpg'),
(81, 3, 'Flexor Digitorum Brevis (foot)', 'lowlimb-fdbf.jpg'),
(82, 3, 'Flexor Digitorum Longus', 'lowlimb-fdl.jpg'),
(83, 3, 'Flexor Hallucis Brevis (foot)', 'lowlimb-fhbf.jpg'),
(84, 3, 'Flexor Hallucis Longus', 'lowlimb-fhl.jpg'),
(85, 3, 'Gastrocnemius', 'lowlimb-gast.jpg'),
(86, 3, 'Gemellus Inferior', 'lowlimb-gemi.jpg'),
(87, 3, 'Gemellus Superior', 'lowlimb-gems.jpg'),
(88, 3, 'Gluteus Maximus', 'lowlimb-glmx.jpg'),
(89, 3, 'Gluteus Medius', 'lowlimb-glmd.jpg'),
(90, 3, 'Gluteus Minimus', 'lowlimb-glmn.jpg'),
(91, 3, 'Gracilis', 'lowlimb-grac.jpg'),
(92, 3, 'Iliacus', 'lowlimb-ilia.jpg'),
(93, 3, 'Interossei - Dorsal (foot)', 'lowlimb-dif.jpg'),
(94, 3, 'Interossei - Plantar (foot)', 'lowlimb-pif.jpg'),
(95, 3, 'Lumbricals (foot)', 'lowlimb-lumf.jpg'),
(96, 3, 'Obturator Externus', 'lowlimb-obex.jpg'),
(97, 3, 'Obturator Internus', 'lowlimb-obi.jpg'),
(98, 3, 'Pectineus', 'lowlimb-pect.jpg'),
(99, 3, 'Peroneus Brevis', 'lowlimb-perb.jpg'),
(100, 3, 'Peroneus Longus', 'lowlimb-perl.jpg'),
(101, 3, 'Peroneus Tertius', 'lowlimb-pert.jpg'),
(102, 3, 'Piriformis', 'lowlimb-pirf.jpg'),
(103, 3, 'Plantaris', 'lowlimb-plnt.jpg'),
(104, 3, 'Popliteus', 'lowlimb-pop.jpg'),
(105, 3, 'Quadratus Femoris', 'lowlimb-qf.jpg'),
(106, 3, 'Quadratus Plantae', 'lowlimb-qp.jpg'),
(107, 3, 'Rectus Femoris', 'lowlimb-recf.jpg'),
(108, 3, 'Sartorius', 'lowlimb-sart.jpg'),
(109, 3, 'Semimembranosus', 'lowlimb-semm.jpg'),
(110, 3, 'Semitendinosus', 'lowlimb-semt.jpg'),
(111, 3, 'Soleus', 'lowlimb-sole.jpg'),
(112, 3, 'Tensor Fasciae Lata', 'lowlimb-tfl.jpg'),
(113, 3, 'Tibialis Anterior', 'lowlimb-tiba.jpg'),
(114, 3, 'Tibialis Posterior', 'lowlimb-tibp.jpg'),
(115, 3, 'Vastus Intermedius', 'lowlimb-vasi.jpg'),
(116, 3, 'Vastus Lateralis', 'lowlimb-vasl.jpg'),
(117, 3, 'Vastus Medialis', 'lowlimb-vasm.jpg'),
(118, 3, 'Psoas Major', 'lowlimb-psmj.jpg'),
(119, 3, 'Psoas Minor', 'lowlimb-psmn.jpg'),
(120, 4, 'Auricularis', 'head-aur.jpg'),
(121, 4, 'Masseter', 'head-mass.jpg'),
(122, 4, 'Frontalis', 'head-fron.jpg'),
(123, 4, 'Levator Anguli Oris', 'head-lao.jpg'),
(124, 4, 'Levator Labii Auperioris', 'head-lls.jpg'),
(125, 4, 'Orbicularis Oculi', 'head-ooc.jpg'),
(126, 4, 'Orbicularis Oris', 'head-oor.jpg'),
(127, 4, 'Temporalis', 'head-temp.jpg'),
(128, 5, 'Splenius Capitis', 'neck-spca.jpg'),
(129, 5, 'Splenius Cervicis', 'neck-spce.jpg'),
(130, 5, 'Sternocleidomastoid', 'neck-scm.jpg'),
(131, 5, 'Sternohyoid', 'neck-steh.jpg'),
(132, 5, 'Sternothyroid', 'neck-sthr.jpg'),
(133, 5, 'Stylohyoid', 'neck-styh.jpg'),
(134, 5, 'Stylopharyngeus', 'neck-styp.jpg'),
(135, 5, 'Thyrohyoid', 'neck-thyh.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `report_muscle_treatment`
--

DROP TABLE IF EXISTS `report_muscle_treatment`;
CREATE TABLE `report_muscle_treatment` (
  `report_muscle_treatment_id` int(11) NOT NULL,
  `report_id` varchar(23) NOT NULL,
  `muscle_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `booking_item`
--
ALTER TABLE `booking_item`
  ADD PRIMARY KEY (`booking_item_id`);

--
-- Indexes for table `booking_room`
--
ALTER TABLE `booking_room`
  ADD PRIMARY KEY (`booking_id`,`room_type_id`);

--
-- Indexes for table `booking_sms`
--
ALTER TABLE `booking_sms`
  ADD PRIMARY KEY (`booking_sms_id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `client_condition`
--
ALTER TABLE `client_condition`
  ADD PRIMARY KEY (`condition_type_id`,`client_id`);

--
-- Indexes for table `client_finding`
--
ALTER TABLE `client_finding`
  ADD PRIMARY KEY (`finding_type_id`,`client_id`);

--
-- Indexes for table `condition_type`
--
ALTER TABLE `condition_type`
  ADD PRIMARY KEY (`condition_type_id`);

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`config_name`);

--
-- Indexes for table `finding_type`
--
ALTER TABLE `finding_type`
  ADD PRIMARY KEY (`finding_type_id`);

--
-- Indexes for table `health_fund`
--
ALTER TABLE `health_fund`
  ADD PRIMARY KEY (`health_fund_id`);

--
-- Indexes for table `massage_record`
--
ALTER TABLE `massage_record`
  ADD PRIMARY KEY (`massage_record_id`);

--
-- Indexes for table `massage_type`
--
ALTER TABLE `massage_type`
  ADD PRIMARY KEY (`massage_type_id`);

--
-- Indexes for table `membership`
--
ALTER TABLE `membership`
  ADD PRIMARY KEY (`membership_no`,`membership_patient_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `provider`
--
ALTER TABLE `provider`
  ADD PRIMARY KEY (`provider_id`);

--
-- Indexes for table `reception_record`
--
ALTER TABLE `reception_record`
  ADD PRIMARY KEY (`reception_record_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`);

--
-- Indexes for table `request_condition`
--
ALTER TABLE `request_condition`
  ADD PRIMARY KEY (`request_condition_request`,`request_condition_promotion`,`request_condition_stamp`,`request_condition_active_date_start`,`request_condition_active_date_end`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_no`);

--
-- Indexes for table `room_double`
--
ALTER TABLE `room_double`
  ADD PRIMARY KEY (`room_double_no`,`room_no_1`);

--
-- Indexes for table `room_type`
--
ALTER TABLE `room_type`
  ADD PRIMARY KEY (`room_type_id`);

--
-- Indexes for table `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`sale_id`);

--
-- Indexes for table `sale_item`
--
ALTER TABLE `sale_item`
  ADD PRIMARY KEY (`sale_item_id`);

--
-- Indexes for table `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`shift_id`);

--
-- Indexes for table `shift_type`
--
ALTER TABLE `shift_type`
  ADD PRIMARY KEY (`shift_type_id`);

--
-- Indexes for table `therapist`
--
ALTER TABLE `therapist`
  ADD PRIMARY KEY (`therapist_id`);
  
--
-- Indexes for table `muscle`
--
ALTER TABLE `muscle`
  ADD PRIMARY KEY (`muscle_id`);

--
-- Indexes for table `muscle_region`
--
ALTER TABLE `muscle_region`
  ADD PRIMARY KEY (`muscle_region_id`);

--
-- Indexes for table `report_muscle_treatment`
--
ALTER TABLE `report_muscle_treatment`
  ADD PRIMARY KEY (`report_muscle_treatment_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking_item`
--
ALTER TABLE `booking_item`
  MODIFY `booking_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100000;

--
-- AUTO_INCREMENT for table `booking_sms`
--
ALTER TABLE `booking_sms`
  MODIFY `booking_sms_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `health_fund`
--
ALTER TABLE `health_fund`
  MODIFY `health_fund_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `massage_record`
--
ALTER TABLE `massage_record`
  MODIFY `massage_record_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `massage_type`
--
ALTER TABLE `massage_type`
  MODIFY `massage_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `provider`
--
ALTER TABLE `provider`
  MODIFY `provider_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reception_record`
--
ALTER TABLE `reception_record`
  MODIFY `reception_record_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sale`
--
ALTER TABLE `sale`
  MODIFY `sale_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sale_item`
--
ALTER TABLE `sale_item`
  MODIFY `sale_item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
  MODIFY `shift_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shift_type`
--
ALTER TABLE `shift_type`
  MODIFY `shift_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `therapist`
--
ALTER TABLE `therapist`
  MODIFY `therapist_id` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `muscle`
--
ALTER TABLE `muscle`
  MODIFY `muscle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `muscle_region`
--
ALTER TABLE `muscle_region`
  MODIFY `muscle_region_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `report_muscle_treatment`
--
ALTER TABLE `report_muscle_treatment`
  MODIFY `report_muscle_treatment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Table structure for table `report_template`
--

CREATE TABLE `report_template` (
  `report_template_id` int(11) NOT NULL,
  `report_template_name` varchar(200) NOT NULL,
  `report_template_detail` text NOT NULL,
  `report_template_recommendation` text NOT NULL,
  `report_template_create_datetime` datetime NOT NULL,
  `report_template_create_user` tinyint(4) NOT NULL,
  `report_template_update_datetime` datetime DEFAULT NULL,
  `report_template_update_user` tinyint(4) NOT NULL DEFAULT 0,
  `report_template_void_datetime` datetime DEFAULT NULL,
  `report_template_void_user` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for table `report_template`
--
ALTER TABLE `report_template`
  ADD PRIMARY KEY (`report_template_id`);

--
-- AUTO_INCREMENT for table `report_template`
--
ALTER TABLE `report_template`
  MODIFY `report_template_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Table structure for table `report_template_muscle_treatment`
--

CREATE TABLE `report_template_muscle_treatment` (
  `report_template_muscle_treatment_id` int(11) NOT NULL,
  `report_template_id` int(11) NOT NULL,
  `muscle_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for table `report_template_muscle_treatment`
--
ALTER TABLE `report_template_muscle_treatment`
  ADD PRIMARY KEY (`report_template_muscle_treatment_id`);

--
-- AUTO_INCREMENT for table `report_template_muscle_treatment`
--
ALTER TABLE `report_template_muscle_treatment`
  MODIFY `report_template_muscle_treatment_id` int(11) NOT NULL AUTO_INCREMENT;
 
ALTER TABLE `massage_record` ADD `massage_record_is_banktransfer` TINYINT(1) NOT NULL DEFAULT '0' AFTER `massage_record_request_reward`;

COMMIT;

