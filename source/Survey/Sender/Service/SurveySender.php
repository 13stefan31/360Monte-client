<?php

require_once(dirname(__FILE__) . '/../../../Sender/Service/SenderService.php');

class SurveySender extends \Main\SenderService
{

    private static $instance = null;

    function __construct() {
        parent::__construct();
    }

    public static function getInstance(){
        if (self::$instance == null) {
            self::$instance = new SurveySender();
        }

        return self::$instance;
    }

    public function getAllSurveys($limit,$page){
        $initialize_field = 'surveys' ;

        $filters = array();
        if (!empty($limit)) {
            $filters[] = 'limit=' . urlencode($limit);
        }
        if (!empty($page)) {
            $filters[] = 'page=' . urlencode($page);
        }
        $filterString = implode('&', $filters);
        if (!empty($filterString)) {
            $initialize_field .= '?' . $filterString;
        }
        return  $this->send_get_request($initialize_field);
    }

    public function getSingleSurveys($token){
        $initialize_field = 'surveys/'.$token ;
        return  $this->send_get_request($initialize_field);
    }
    public function addSurveyVote($data){
        $initialize_field = 'surveys/'.$data['token'] ;
//
//        $body = [
//            'targetId' => $data['targetId'],
//            'mark' => $data['mark'],
//            'comment' => $data['comment']
//        ];
        $arrayData = json_decode($data['data'], true);
        return  $this->send_post_request($initialize_field,$arrayData );



    }
}

