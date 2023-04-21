<?php
session_start();

require_once dirname(__DIR__) . '/vendor/autoload.php';

//define("P_API_URL", $_ENV['P_API_URL']);

require_once(dirname(__FILE__) . "/../source/Person/Sender/Service/PersonSender.php");
require_once(dirname(__FILE__) . "/../source/Person/Model/Person.php");

$person_sender = PersonSender::getInstance();
$person = Person::getInstance();


require_once(dirname(__FILE__) . "/../source/Vehicle/Sender/Service/VehicleSender.php");
require_once(dirname(__FILE__) . "/../source/Vehicle/Model/Vehicle.php");
$vehicle_sender = VehicleSender::getInstance();
$vehicle = Vehicle::getInstance();