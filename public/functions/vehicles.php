<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getAllVehicles'])){
    return $vehicle_sender->getAllVehicles();
}

if(isset($_GET) && isset($_GET['getSingleVehicle']) && isset($_GET['vehicleId'])){
    return $vehicle_sender->getSingleVehicle($_GET['vehicleId']);
}
