<?php

require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_POST) && isset($_POST['login'])){
    return $user_sender->loginUser($_POST['data']);
}
if(isset($_POST) && isset($_POST['logout'])){
    return $user_sender->logoutUser();
}

if(isset($_POST) && isset($_POST['loggedUser'])){
    return $user_sender->loggedUser();
}
if(isset($_POST) && isset($_POST['forgottenPassword'])){
    return $user_sender->forgottenPassword($_POST['email']);
}
if(isset($_GET) && isset($_GET['checkChangePassword'])){
    return $user_sender->checkChangePassword($_GET['token']);
}
if(isset($_POST) && isset($_POST['changePassword'])){
    return $user_sender->changePassword($_POST);
}
//ofic aa i gen men mogu da mijenjanu status
//samo mehanicar da li je u vozno stanju ili nije