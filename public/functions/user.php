<?php

require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_POST) && isset($_POST['login'])){
    return $user_sender->loginUser($_POST['data']);
}
if(isset($_POST) && isset($_POST['logout'])){
    return $user_sender->logoutUser();
}
