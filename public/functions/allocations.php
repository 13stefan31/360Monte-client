<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getAllAllocations'])){
    $status = isset($_GET['status']) ? $_GET['status'] : null;
    $vehicle = isset($_GET['vehicle']) ? $_GET['vehicle'] : null;
    $tour = isset($_GET['tour']) ? $_GET['tour'] : null;
    $allocationDate = isset($_GET['allocationDate']) ? $_GET['allocationDate'] : null;

    $limit = isset($_GET['per_page']) ? $_GET['per_page'] : null;
    $page = isset($_GET['current_page']) ? $_GET['current_page'] : null;


    if (isset($vehicle)){
        $_SESSION['allocation_filter_vehicle'] = $vehicle;
    }else{
        $_SESSION['allocation_filter_vehicle'] = null;
    }
    if (isset($tour)){
        $_SESSION['allocation_filter_tour'] = $tour;
    }else{
        $_SESSION['allocation_filter_tour'] = null;
    }
    if (isset($status)){
        $_SESSION['allocation_filter_status'] = $status;
    }else{
        $_SESSION['allocation_filter_status'] = null;
    }
    if (isset($allocationDate)){
        $_SESSION['allocation_filter_date'] = $allocationDate;
    }else{
        $_SESSION['allocation_filter_date'] = null;
    }


    return $allocation_sender->getAllAllocations($vehicle,$status,$allocationDate,$tour,$limit,$page);
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data, true);

    if (isset($decoded_data['deleteAllocation']) && isset($decoded_data['allocationId']) && !empty($decoded_data['allocationId'])) {
        return $allocation_sender->deleteAllocation($decoded_data['allocationId']);
    }
}
if(isset($_POST) && isset($_POST['addNewAllocation'])){
    return $allocation_sender->insertNewAllocation($_POST['data']);
}