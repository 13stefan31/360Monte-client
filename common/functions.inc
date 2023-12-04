<?php
session_start();

require_once dirname(__DIR__) . '/vendor/autoload.php';

//define("P_API_URL", $_ENV['P_API_URL']);



require_once(dirname(__FILE__) . "/../source/Person/Sender/Service/PersonSender.php");
require_once(dirname(__FILE__) . "/../source/Person/Model/Person.php");

require_once(dirname(__FILE__) . "/../source/Vehicle/Sender/Service/VehicleSender.php");
require_once(dirname(__FILE__) . "/../source/Vehicle/Model/Vehicle.php");

require_once(dirname(__FILE__) . "/../source/User/Sender/Service/UserSender.php");
require_once(dirname(__FILE__) . "/../source/User/Model/User.php");

require_once(dirname(__FILE__) . "/../source/Allocation/Sender/Service/AllocationSender.php");
require_once(dirname(__FILE__) . "/../source/Allocation/Model/Allocation.php");

require_once(dirname(__FILE__) . "/../source/Tour/Sender/Service/TourSender.php");
require_once(dirname(__FILE__) . "/../source/Tour/Model/Tour.php");

require_once(dirname(__FILE__) . "/../source/Survey/Sender/Service/SurveySender.php");
require_once(dirname(__FILE__) . "/../source/Survey/Model/Survey.php");

require_once(dirname(__FILE__) . "/../source/Notification/Sender/Service/NotificationSender.php");
require_once(dirname(__FILE__) . "/../source/Notification/Model/Notification.php");

require_once(dirname(__FILE__) . "/../source/Report/Sender/Service/ReportSender.php");
require_once(dirname(__FILE__) . "/../source/Report/Model/Report.php");

require_once(dirname(__FILE__) . "/../source/DailyData/Sender/Service/DailyDataSender.php");
require_once(dirname(__FILE__) . "/../source/DailyData/Model/DailyData.php");

$person_sender = PersonSender::getInstance();
$person = Person::getInstance();

$vehicle_sender = VehicleSender::getInstance();
$vehicle = Vehicle::getInstance();

$user_sender = UserSender::getInstance();
$user = User::getInstance();

$allocation_sender = AllocationSender::getInstance();
$allocation = Allocation::getInstance();

$tour_sender = TourSender::getInstance();
$tour = Tour::getInstance();

$survey_sender = SurveySender::getInstance();
$survey = Survey::getInstance();

$notification_sender = NotificationSender::getInstance();
$notification = Notification::getInstance();

$report_sender = ReportSender::getInstance();
$report = Report::getInstance();

$daily_data_sender = DailyDataSender::getInstance();
$daily_data = DailyData::getInstance();
