<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getAllSurveys'])){
    $limit = isset($_GET['per_page']) ? $_GET['per_page'] : null;
    $page = isset($_GET['current_page']) ? $_GET['current_page'] : null;

    return $survey_sender->getAllSurveys($limit,$page);
}
if(isset($_GET) && isset($_GET['getSingleSurvey'])){
    return $survey_sender->getSingleSurveys($_GET['token']);
}
if(isset($_POST) && isset($_POST['addSurveyVote'])){
    return $survey_sender->addSurveyVote($_POST);
}