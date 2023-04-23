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


$person_sender = PersonSender::getInstance();
$person = Person::getInstance();

$vehicle_sender = VehicleSender::getInstance();
$vehicle = Vehicle::getInstance();

$user_sender = UserSender::getInstance();
$user = User::getInstance();

$allocation_sender = AllocationSender::getInstance();
$allocation = Allocation::getInstance();