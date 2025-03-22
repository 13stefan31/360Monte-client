<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getAllAnualLeav'])){
    $name = isset($_GET['name']) ? $_GET['name'] : null;
    $statusId = isset($_GET['statusId']) ? $_GET['statusId'] : null;
    if (isset($name)){
        $_SESSION['person_filter_id'] = $name;
    }else{
        $_SESSION['person_filter_id'] = null;
    }
    if (isset($statusId) && $statusId !== "") {
        $_SESSION['status_filter_id'] = $statusId;
    } else {
        $_SESSION['status_filter_id'] = null;
    }
    $limit = isset($_GET['per_page']) ? $_GET['per_page'] : null;
    $page = isset($_GET['current_page']) ? $_GET['current_page'] : null;


    return $annualLeave_sender->getAllAnualLeav($name, $statusId,$limit,$page);
}
if(isset($_GET) && isset($_GET['getMyAnualLeav'])){
    $statusId = isset($_GET['statusId']) ? $_GET['statusId'] : null;
    $userId = isset($_GET['userId']) ? $_GET['userId'] : null;

    if (isset($statusId) && $statusId !== "") {
        $_SESSION['status_filter_id'] = $statusId;
    } else {
        $_SESSION['status_filter_id'] = null;
    }
    $limit = isset($_GET['per_page']) ? $_GET['per_page'] : null;
    $page = isset($_GET['current_page']) ? $_GET['current_page'] : null;


    return $annualLeave_sender->getMyAnualLeav($userId, $statusId,$limit,$page);
}
if(isset($_GET) && isset($_GET['getSingleAnnualLeave'])){
    $id = isset($_GET['vacationId']) ? $_GET['vacationId'] : null;
    return $annualLeave_sender->getSingleAnnualLeave($id);
}
if(isset($_POST) && isset($_POST['dates'])){

    return $annualLeave_sender->sendVacationRequest($_POST['dates']);
}
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data, true);

    if (isset($decoded_data['updateVacationData'])){
        return $annualLeave_sender->updateVacationData($decoded_data['data']);
    }

}

