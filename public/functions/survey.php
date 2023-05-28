<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getAllSurveys'])){
    return $survey_sender->getAllSurveys($_GET['token']);
}
if(isset($_GET) && isset($_GET['getSingleSurvey'])){
    return $survey_sender->getSingleSurveys($_GET['token']);
}
if(isset($_POST) && isset($_POST['addSurveyVote'])){
    return $survey_sender->addSurveyVote($_POST);
}