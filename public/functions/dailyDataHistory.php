<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getDailyDataHistory'])){
    $vehicleId = isset($_GET['vehicleId']) ? $_GET['vehicleId'] : null;
    $date = isset($_GET['date']) && $_GET['date'] !== '' ? DateTime::createFromFormat('Y-m-d', $_GET['date'])->format('d.m.Y') : null;

    if (isset($vehicleId)){
        $_SESSION['daily_data_filter_vehicle_id'] = $vehicleId;
    }else{
        $_SESSION['daily_data_filter_vehicle_id'] = null;
    }

     if (isset($vehicleId)){
         $_SESSION['daily_data_filter_date'] = $date;
     }else{
         $_SESSION['daily_data_filter_date'] = null;
     }
    $limit = isset($_GET['per_page']) ? $_GET['per_page'] : null;
    $page = isset($_GET['current_page']) ? $_GET['current_page'] : null;


    return $daily_data_sender->getDailyData($vehicleId,$date,$limit,$page);
}
if(isset($_GET) && isset($_GET['generateCart'])){
    $vehicleId = isset($_GET['vehicleId']) ? $_GET['vehicleId'] : null;
    $date = isset($_GET['date']) && $_GET['date'] !== '' ? DateTime::createFromFormat('Y-m-d', $_GET['date'])->format('d.m.Y') : null;

    return $daily_data_sender->getCartData($vehicleId,$date);
}
if(isset($_POST) && isset($_POST['addDailyData'])){
    return $daily_data_sender->addDailyData($_POST['data']);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data, true);

    if (isset($decoded_data['deleteDailyData']) && !empty($decoded_data['dailyDataId'])) {
        return $daily_data_sender->deleteDailyData($decoded_data['dailyDataId']);
    }
}