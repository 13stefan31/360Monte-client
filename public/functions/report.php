<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_POST) && isset($_POST['generateReport'])){
    return $report_sender->generateReport($_POST);
}
if(isset($_POST) && isset($_POST['generateReport2'])){
    return $report_sender->generateReport2($_POST);
}
if(isset($_POST) && isset($_POST['generateReport3'])){
    return $report_sender->generateReport3($_POST);
}