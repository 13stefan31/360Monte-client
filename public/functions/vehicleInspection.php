<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getAllInspectionReports'])){
    $limit = isset($_GET['per_page']) ? $_GET['per_page'] : null;
    $page = isset($_GET['current_page']) ? $_GET['current_page'] : null;

    $reportType = isset($_GET['report_type']) ? $_GET['report_type'] : null;
    $reportDate = isset($_GET['reportDate']) ? $_GET['reportDate'] : null;
    if ($reportDate) {
        $dateObj = new DateTime($reportDate);
        $reportDateFormatted = $dateObj->format('d.m.Y');
    } else {
        $reportDateFormatted = null;
    }
    $vehicleId = isset($_GET['vehicleId']) ? $_GET['vehicleId'] : null;

    if ($_GET['report_type']==1){
        if (isset($vehicleId)){
            $_SESSION['weekly_inspection_vehicle_id'] = $vehicleId;
        }else{
            $_SESSION['weekly_inspection_vehicle_id'] = null;
        }
        if (isset($reportDateFormatted)){
            $_SESSION['weekly_inspection_date'] = $reportDateFormatted;
        }else{
            $_SESSION['weekly_inspection_date'] = null;
        }
    }else{
        if (isset($vehicleId)){
            $_SESSION['monthly_inspection_vehicle_id'] = $vehicleId;
        }else{
            $_SESSION['monthly_inspection_vehicle_id'] = null;
        }
        if (isset($reportDateFormatted)){
            $_SESSION['monthly_inspection_date'] = $reportDateFormatted;
        }else{
            $_SESSION['monthly_inspection_date'] = null;
        }
    }


    return $vehicle_inspection_sender->getAllWeeklyReports($limit,$page,$reportType,$reportDateFormatted,$vehicleId);
}
if(isset($_GET) && isset($_GET['getSingleVehicleInspection'])){
    return $vehicle_inspection_sender->getSingleSurveys($_GET['id']);
}
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data, true);

    if (isset($decoded_data['deleteInspectionVehicleData']) && !empty($decoded_data['id'])) {
        return $vehicle_inspection_sender->deleteVehicleInspectionData($decoded_data['id']);
    }
}

if(isset($_GET) && isset($_GET['getInspectionAddData'])){
    return $vehicle_inspection_sender->getInspectionAddData($_GET['type']);
}


if(isset($_POST) && isset($_POST['addInspectionData'])){

    return $vehicle_inspection_sender->addInspectionData($_POST['data']);
}