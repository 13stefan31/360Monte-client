<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getSingleWorkData']) && isset($_GET['getSingleWorkData'])){
    return $works_history_sender->getSingleWorkData($_GET['dataId']);
}


if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data, true);

    if (isset($decoded_data['updateDailyData'])){
        return $works_history_sender->updateDailyData($decoded_data['data']);
    }
    if (isset($decoded_data['markAsFinished'])){
        return $works_history_sender->markAsFinished($decoded_data['workId']);
    }
}

