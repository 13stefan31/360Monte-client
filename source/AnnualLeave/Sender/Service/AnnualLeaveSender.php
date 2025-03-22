<?php

require_once(dirname(__FILE__) . '/../../../Sender/Service/SenderService.php');

class AnnualLeaveSender extends \Main\SenderService
{

    private static $instance = null;

    function __construct()
    {
        parent::__construct();
    }

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new AnnualLeaveSender();
        }

        return self::$instance;
    }

    public function getMyAnualLeav($userId = null, $statusId = null, $limit, $page)
    {
        $initialize_field = 'vacation/for-user/'. $userId;


        if (!empty($statusId)) {
            $filters[] = 'status=' . urlencode($statusId);
        }
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


        return $this->send_get_request($initialize_field);
    }

    public function getAllAnualLeav($name = null, $statusId = null, $limit, $page)
    {
        $initialize_field = 'vacation';

        $filters = array();
        if (!empty($name) ) {
            $filters[] = 'user=' . urlencode($name);
        }

        if (!empty($statusId)) {
            $filters[] = 'status=' . urlencode($statusId);
        }
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


        return $this->send_get_request($initialize_field);
    }

    public function getSingleAnnualLeave($id)
    {
        $initialize_field = 'vacation/' . $id;


        return $this->send_get_request($initialize_field);
    }

    public function updateVacationData($data)
    {
        $body = [
            'status' => $data['status'],
            'comment' => $data['comment']
        ];

        $initialize_field = 'vacation/' . $data['vacationId'];
        return $this->send_put_request($initialize_field, $body);
    }

    public function sendVacationRequest($data)
    {
        $body = [
            'requestedDays' => array_values($data)
        ];

        $initialize_field = 'vacation';
        return  $this->send_post_request($initialize_field, $body);
    }

}

