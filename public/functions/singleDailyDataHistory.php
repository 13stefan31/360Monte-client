<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getSingleDailyData']) && isset($_GET['getSingleDailyData'])){
    return $daily_data_sender->getSingleDailyData($_GET['dataId']);
}


if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data, true);

    if (isset($decoded_data['updateDailyData'])){
        return $daily_data_sender->updateDailyData($decoded_data['data']);
    }
}

