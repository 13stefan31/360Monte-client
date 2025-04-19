<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getSingleAllocation']) && isset($_GET['allocationId'])){
    return $allocation_sender->getSingleAllocation($_GET['allocationId']);
}
if(isset($_GET) && isset($_GET['getAllAllocationStuff']) && isset($_GET['allocationId'])){
    return $allocation_sender->getAllAllocationStuff($_GET['allocationId']);
}
if(isset($_GET) && isset($_GET['getAllStuffPositions'])){
    return $allocation_sender->getAllStuffPositions();
}

if(isset($_GET) && isset($_GET['getAllStuffAdd'])){
    return $person_sender->getAllStuffForAllocation();
}
if(isset($_GET) && isset($_GET['getAvailableStuffAllocation'])){
    return $person_sender->getAvailableStuffAllocation($_GET['allocationDate']);
}

if(isset($_POST) && isset($_POST['addAllocationStuff'])){
    return $allocation_sender->addStuff($_POST['data']);
}


if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data, true);

    if (isset($decoded_data['updateAllocationData'])){
        return $allocation_sender->updateAllocationData($decoded_data['data']);
    }
    if (isset($decoded_data['updateAllocationStuffStatus'])){
        return $allocation_sender->updateAllocationStuffStatus($decoded_data['data']);
    }
    if (isset($decoded_data['updateEmpAllocation'])){
        return $allocation_sender->updateEmpAllocation($decoded_data['data']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data, true);
    if (isset($decoded_data['deleteAllocation']) ) {
        return $allocation_sender->deleteAllocationStuff($decoded_data['allocationId'],$decoded_data['allocationStuffId']);
    }
}