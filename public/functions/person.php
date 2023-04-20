<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getSinglePerson']) && isset($_GET['personId'])){
    return $person_sender->getSinglePerson($_GET['personId']);
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data, true);

    if (isset($decoded_data['updatePerson'])){
        return $person_sender->updatePerson($decoded_data['data']);
    }

    if (isset($decoded_data['updatePassword'])){
        return $person_sender->changePassword($decoded_data['data']);
    }
}