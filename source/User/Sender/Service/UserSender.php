<?php

require_once(dirname(__FILE__) . '/../../../Sender/Service/SenderService.php');

class UserSender extends \Main\SenderService
{

    private static $instance = null;

    function __construct() {
        parent::__construct();
    }

    public static function getInstance(){
        if (self::$instance == null) {
            self::$instance = new UserSender();
        }

        return self::$instance;
    }

    public function getAllVehicles(){
        $initialize_field = 'vehicles' ;
        return  $this->send_get_request($initialize_field, '');
    }


    public function getSingleVehicle($id) {
        $initialize_field = 'vehicles' . '/' . $id;
        return  $this->send_get_request($initialize_field, '');
    }

    public function loginUser($data){
        $body = [
            'email' => $data['email'],
            'password' => $data['password']
        ];

        $initialize_field = 'login';
        return  $this->send_post_request($initialize_field, $body);

    }
    public function logoutUser(){
        $token = $_COOKIE['token'];
        $headers = [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $token
        ];
        $initialize_field = 'logout';
        return $this->send_post_request($initialize_field,$body,$headers);
    }

    public function insertNewPerson($data){
        $body = [
            'name' => $data['name'],
            'email' => $data['email'],
            'roleId' => $data['rolaId']
        ];

        $initialize_field = 'users';
        return  $this->send_post_request($initialize_field, $body);

    }
    public function deleteUser($id){
        $initialize_field = 'users/'.$id;
        return  $this->send_delete_request($initialize_field);

    }
}

