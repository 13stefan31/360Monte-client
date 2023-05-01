<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getAllTours'])){
    return $tour_sender->getAllTours();
}

