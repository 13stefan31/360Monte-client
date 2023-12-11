<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getAllWorksHistory'])){
    $reportedBy = isset($_GET['reportedBy']) ? $_GET['reportedBy'] : null;
    $breakdownCat = isset($_GET['breakdownCat']) ? $_GET['breakdownCat'] : null;
    $breakdownSubcat = isset($_GET['breakdownSubcat']) ? $_GET['breakdownSubcat'] : null;
    $partsPay = isset($_GET['partsPay']) ? $_GET['partsPay'] : null;
    $mehanicPay = isset($_GET['mehanicPay']) ? $_GET['mehanicPay'] : null;

    if (isset($reportedBy)){
        $_SESSION['work_filter_reported_id'] = $reportedBy;
    }else{
        $_SESSION['work_filter_reported_id'] = null;
    }

    if (isset($breakdownCat)){
        $_SESSION['work_filter_breakdown_cat_id'] = $breakdownCat;
    }else{
        $_SESSION['work_filter_breakdown_cat_id'] = null;
    }
    if (isset($breakdownSubcat)){
        $_SESSION['work_filter_breakdown_sub_cat_id'] = $breakdownSubcat;
    }else{
        $_SESSION['work_filter_breakdown_sub_cat_id'] = null;
    }
    if (isset($partsPay)){
        $_SESSION['work_filter_parts_pay_id'] = $partsPay;
    }else{
        $_SESSION['work_filter_parts_pay_id'] = null;
    }
    if (isset($mehanicPay)){
        $_SESSION['work_filter_mehanic_pay_id'] = $mehanicPay;
    }else{
        $_SESSION['work_filter_mehanic_pay_id'] = null;
    }

    $limit = isset($_GET['per_page']) ? $_GET['per_page'] : null;
    $page = isset($_GET['current_page']) ? $_GET['current_page'] : null;


    return $works_history_sender->getAllWorksHistory($reportedBy,$breakdownCat,$breakdownSubcat,$partsPay,$mehanicPay,$limit,$page);
}

if(isset($_GET) && isset($_GET['generateCart'])){
    $vehicleId = isset($_GET['vehicleId']) ? $_GET['vehicleId'] : null;
    $breakDownCategoryId = isset($_GET['breakDownCategoryId']) ? $_GET['breakDownCategoryId'] : null;
    return $works_history_sender->getCartData($vehicleId,$breakDownCategoryId);
}

if(isset($_GET) && isset($_GET['downloadWorksDataCart'])){
    $vehicleId = isset($_GET['vehicleId']) ? $_GET['vehicleId'] : null;
    $breakDownCategoryId = isset($_GET['breakdownCatId']) ? $_GET['breakdownCatId'] : null;
    return $works_history_sender->downloadWorksDataCart($vehicleId,$breakDownCategoryId);
}


if(isset($_GET) && isset($_GET['getAllBreakDownCategory'])){
     return $works_history_sender->getAllBreakDownCategory();
}

if(isset($_POST) && isset($_POST['addNewWorkHistory'])){
    return $works_history_sender->addNewWorkHistory($_POST['data']);
}


if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data, true);

    if (isset($decoded_data['editWorkHistory'])){
        return $works_history_sender->editWorkHistory($decoded_data['data']);
    }

}