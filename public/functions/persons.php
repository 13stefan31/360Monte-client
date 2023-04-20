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