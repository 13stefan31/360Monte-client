<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getAllPersons'])){
    return $person_sender->getAllPersons();
}

if(isset($_POST) && isset($_POST['addNewPerson'])){
    return $person_sender->insertNewPerson($_POST['data']);
}

if(isset($_GET) && isset($_GET['getRoles'])){
    return $person_sender->getRoles();
}


if(isset($_GET) && isset($_GET['getRoles'])){
    return $person_sender->send_delete_request();
}
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data, true);

    if (isset($decoded_data['deleteUser']) && isset($decoded_data['userId']) && !empty($decoded_data['userId'])) {
        return $person_sender->deleteUser($decoded_data['userId']);
    }
}