<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getAllSurveysVehicle'])){
    $limit = isset($_GET['per_page']) ? $_GET['per_page'] : null;
    $status = isset($_GET['status']) ? $_GET['status'] : null;
    $page = isset($_GET['current_page']) ? $_GET['current_page'] : null;

    return $survey_sender->getAllSurveysVehicle($status,$limit,$page);
}