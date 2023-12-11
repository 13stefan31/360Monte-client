<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getAllPersons'])){
    $name = isset($_GET['name']) ? $_GET['name'] : null;
    $rolaId = isset($_GET['rolaId']) ? $_GET['rolaId'] : null;
    if (isset($name)){
        $_SESSION['person_filter_name'] = $name;
    }else{
        $_SESSION['person_filter_name'] = null;
    }
    if (isset($rolaId)){
        $_SESSION['person_filter_rola_id'] = $rolaId;
    }else{
        $_SESSION['person_filter_rola_id'] = null;
    }
    $limit = isset($_GET['per_page']) ? $_GET['per_page'] : null;
    $page = isset($_GET['current_page']) ? $_GET['current_page'] : null;


    return $person_sender->getAllPersons($name, $rolaId,$limit,$page);
}

if(isset($_POST) && isset($_POST['addNewPerson'])){
    return $person_sender->insertNewPerson($_POST['data']);
}

if(isset($_GET) && isset($_GET['getRoles'])){
    return $person_sender->getRoles();
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data, true);

    if (isset($decoded_data['deleteUser']) && isset($decoded_data['userId']) && !empty($decoded_data['userId'])) {
        return $person_sender->deleteUser($decoded_data['userId']);
    }
}