<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_POST) && isset($_POST['generateReport'])){
    return $report_sender->generateReport($_POST);
}