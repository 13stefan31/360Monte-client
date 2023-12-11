<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getDailyDataHistory'])){
    $vehicleId = isset($_GET['vehicleId']) ? $_GET['vehicleId'] : null;
    if (isset($vehicleId)){
        $_SESSION['daily_data_filter_vehicle_id'] = $vehicleId;
    }else{
        $_SESSION['daily_data_filter_vehicle_id'] = null;
    }
    $limit = isset($_GET['per_page']) ? $_GET['per_page'] : null;
    $page = isset($_GET['current_page']) ? $_GET['current_page'] : null;


    return $daily_data_sender->getDailyData($vehicleId,$limit,$page);
}
if(isset($_GET) && isset($_GET['generateCart'])){
    $vehicleId = isset($_GET['vehicleId']) ? $_GET['vehicleId'] : null;
    return $daily_data_sender->getCartData($vehicleId);
}
if(isset($_POST) && isset($_POST['addDailyData'])){
    return $daily_data_sender->addDailyData($_POST['data']);
}
