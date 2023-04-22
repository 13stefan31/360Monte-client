<?php

require_once(dirname(__FILE__) . '/../../../Sender/Service/SenderService.php');

class VehicleSender extends \Main\SenderService
{

    private static $instance = null;

    function __construct() {
        parent::__construct();
    }

    public static function getInstance(){
        if (self::$instance == null) {
            self::$instance = new VehicleSender();
        }

        return self::$instance;
    }

    public function getAllVehicles($brand=null,$model=null,$regNo=null,$status=null,$seatsNo=null){
        $initialize_field = 'vehicles' ;

        $filters = array();
        if (!empty($brand)) {
            $filters[] = 'brand=' . urlencode($brand);
        }
        if (!empty($model)) {
            $filters[] = 'model=' . urlencode($model);
        }
        if (!empty($regNo)) {
            $filters[] = 'registration_number=' . urlencode($regNo);
        }
        if (!empty($status)) {
            $filters[] = 'ready_to_drive=' . urlencode($status);
        }
        if (!empty($seatsNo)) {
            $filters[] = 'seats=' . urlencode($seatsNo);
        }
        $filterString = implode('&', $filters);
        if (!empty($filterString)) {
            $initialize_field .= '?' . $filterString;
        }

        return  $this->send_get_request($initialize_field, '');
    }


    public function getSingleVehicle($id) {
        $initialize_field = 'vehicles' . '/' . $id;
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

