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



    public function loginUser($data){
        $body = [
            'email' => $data['email'],
            'password' => $data['password']
        ];

        $initialize_field = 'login';
        return  $this->send_post_request($initialize_field, $body);

    }
    public function logoutUser(){
        $initialize_field = 'logout';
        return $this->send_post_request($initialize_field);
    }


    public function loggedUser() {
        $initialize_field = 'users/user/logged';

        ob_start();
        $this->send_get_request($initialize_field);
        $output = ob_get_contents();
        ob_end_clean();
        $decodedResponse = json_decode($output);
        if ($decodedResponse->success) {
            return $decodedResponse->data->data;
        } else {
            return null;
        }
    }

    public function forgottenPassword($email){
        $body = [
            'email' => $email
        ];
        $initialize_field = 'users/password/forgotten-password';
        return  $this->send_post_request($initialize_field, $body);

    }

    public function checkChangePassword($token){
        $initialize_field = 'users/password/forgotten-password/'.$token ;
        return  $this->send_get_request($initialize_field);
    }
    public function changePassword($data){
        $body = [
            'newPassword' => $data['newPassword'],
            'confirmPassword' => $data['confirmPassword']
        ];
        $initialize_field = 'users/password/forgotten-password/'.$data['token'];
        return  $this->send_post_request($initialize_field, $body);

    }

}

