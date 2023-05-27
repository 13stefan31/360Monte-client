<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getAllVehicles'])){
    $brand = isset($_GET['brand']) ? $_GET['brand'] : null;
    $model = isset($_GET['model']) ? $_GET['model'] : null;
    $regNo = isset($_GET['regNo']) ? $_GET['regNo'] : null;
    $status = isset($_GET['status']) ? $_GET['status'] : null;
    $seatsNo = isset($_GET['seatsNo']) ? $_GET['seatsNo'] : null;

    $limit = isset($_GET['per_page']) ? $_GET['per_page'] : null;
    $page = isset($_GET['current_page']) ? $_GET['current_page'] : null;

    if (isset($brand)){
        $_SESSION['vehicle_filter_brand'] = $brand;
    }else{
        $_SESSION['vehicle_filter_brand'] = null;
    }
    if (isset($model)){
        $_SESSION['vehicle_filter_model'] = $model;
    }else{
        $_SESSION['vehicle_filter_model'] = null;
    }
    if (isset($regNo)){
        $_SESSION['vehicle_filter_regNo'] = $regNo;
    }else{
        $_SESSION['vehicle_filter_regNo'] = null;
    }
    if (isset($status)){
        $_SESSION['vehicle_filter_status'] = $status;
    }else{
        $_SESSION['vehicle_filter_status'] = null;
    }
    if (isset($seatsNo)){
        $_SESSION['vehicle_filter_seatsNo'] = $seatsNo;
    }else{
        $_SESSION['vehicle_filter_seatsNo'] = null;
    }


    return $vehicle_sender->getAllVehicles($brand,$model,$regNo,$status,$seatsNo,$limit,$page);
}

if(isset($_GET) && isset($_GET['getSingleVehicle']) && isset($_GET['vehicleId'])){
    return $vehicle_sender->getSingleVehicle($_GET['vehicleId']);
}
if(isset($_GET) && isset($_GET['getSingleVehicleComment']) && isset($_GET['getSingleVehicleComment'])){

    $limit = isset($_GET['per_page']) ? $_GET['per_page'] : null;
    $page = isset($_GET['current_page']) ? $_GET['current_page'] : null;

    return $vehicle_sender->getSingleVehicleComment($_GET['vehicleId'],$limit,$page);
}
if(isset($_POST) && isset($_POST['addVehicleComment'])){
    return $vehicle_sender->addVehicleComment($_POST['data']);
}

