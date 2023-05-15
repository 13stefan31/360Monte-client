<?php

require_once(dirname(__FILE__) . '/../../../Sender/Service/SenderService.php');

class NotificationSender extends \Main\SenderService
{

    private static $instance = null;

    function __construct() {
        parent::__construct();
    }

    public static function getInstance(){
        if (self::$instance == null) {
            self::$instance = new NotificationSender();
        }

        return self::$instance;
    }

    public function getAllNotifications($page){
        $initialize_field = 'notifications?page='.$page;
        return  $this->send_get_request($initialize_field);

    }
    public function markAsRead($id){
        $initialize_field = 'notifications/'.$id.'/opened';
        return  $this->send_put_request($initialize_field);

    }
    public function markAsSeen($ids){
        $initialize_field = 'notifications/mark-as-seen';
        $data = array(
            'notificationsIds' => $ids
        );
        return  $this->send_put_request($initialize_field,$data);

    }
}

