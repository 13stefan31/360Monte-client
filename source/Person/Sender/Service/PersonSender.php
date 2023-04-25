<?php

require_once(dirname(__FILE__) . '/../../../Sender/Service/SenderService.php');

class PersonSender extends \Main\SenderService
{

    private static $instance = null;

    function __construct() {
        parent::__construct();
    }

    public static function getInstance(){
        if (self::$instance == null) {
            self::$instance = new PersonSender();
        }

        return self::$instance;
    }

    public function getAllPersons($name = null, $rolaId = null){
        $initialize_field = 'users' ;
        if ($name!=null){
            $initialize_field .='?name='.$name;
        }
        if ($rolaId!=null){
            if ($name!=null){
                $initialize_field .='&roleId='.$rolaId;
            }else{
                $initialize_field .='?roleId='.$rolaId;
            }
        }
        return  $this->send_get_request($initialize_field, '');
    }

    public function getAllStuffForAllocation(){
        $initialize_field = 'users/user/allocation-stuff-selection' ;
        return  $this->send_get_request($initialize_field, '');
    }


    public function getSinglePerson($id) {
        $initialize_field = 'users' . '/' . $id;
        return  $this->send_get_request($initialize_field, '');
    }

    public function updatePerson($data){
        $body = [
            'userId' => $data['personId'],
            'name' => $data['personName'],
            'email' => $data['personEmail'],
            'roleId' => 1
        ];

        $initialize_field = 'users';
        return  $this->send_put_request($initialize_field, $body);

    }
    public function changePassword($data){
        $body=[
            'userId'=>$data['personId'],
            'currentPassword'=>$data['currentPassword'],
            'newPassword'=>$data['newPassword'],
            'confirmPassword'=>$data['confirmPassword']
        ];
        $initialize_field = 'users/password/change';
        return $this->send_put_request($initialize_field,$body);
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

