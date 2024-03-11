<?php

require_once(dirname(__FILE__) . '/../../../Sender/Service/SenderService.php');

class AllocationSender extends \Main\SenderService
{

    private static $instance = null;

    function __construct() {
        parent::__construct();
    }

    public static function getInstance(){
        if (self::$instance == null) {
            self::$instance = new AllocationSender();
        }

        return self::$instance;
    }

    public function getAllAllocations($vehicle=null,$status=null,$allocationDate=null,$tour=null, $limit,$page){
        $initialize_field = 'allocation' ;

        $filters = array();
        if (!empty($vehicle)) {
            $filters[] = 'vehicle=' . urlencode($vehicle);
        }
        if (!empty($tour)) {
            $filters[] = 'tour=' . urlencode($tour);
        }
        if (!empty($allocationDate)) {
            $filters[] = 'allocationDate=' . urlencode($allocationDate);
        }
        if ($status !== null && $status !== '' && $status !== false) {
            $filters[] = 'status=' . urlencode($status);
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
        return  $this->send_get_request($initialize_field);
    }


    public function getSingleAllocation($id) {
        $initialize_field = 'allocation' . '/' . $id;
        return  $this->send_get_request($initialize_field);
    }

public function getAllStuffPositions(){
    $initialize_field = 'allocation-stuff-positions' ;
    return  $this->send_get_request($initialize_field, '');
}

public function addStuff($data){
    $initialize_field = 'allocation/'.$data['allocationId'] .'/allocation-stuff' ;
    $body = [
        'employeeId' => $data['employeeId'],
        'allocationStuffPositionId' => $data['allocationStuffPositionId']
    ];

    return  $this->send_post_request($initialize_field,$body );


}
public function getAllAllocationStuff($id){
        $initialize_field = 'allocation' . '/' . $id.'/allocation-stuff';
        return  $this->send_get_request($initialize_field);
    }
    public function insertNewAllocation($data){
        $body = [
            'vehicleId' => $data['vehicleId'],
            'tourId' => $data['tourId'],
            'note' => $data['note'],
            'allocationDate' => $data['allocationDate']
        ];
        $initialize_field = 'allocation';
        return  $this->send_post_request($initialize_field, $body);

    }
    public function updateAllocationData($data){
        $body = [
            'allocationId' => $data['allocationId'],
            'vehicleId' => $data['vehicleId'],
            'tourId' => $data['tourId'],
            'note' => $data['note'],
            'allocationDate' => $data['allocationDate']
        ];
        $initialize_field = 'allocation';

        return  $this->send_put_request($initialize_field, $body);

    }
    public function updateAllocationStuffStatus($data){
        $body = [
            'statusId' => (int) $data['statusId']
        ];
        $allocationId = $data['allocationId'];
        $allocationStuffId = $data['allocationStuffId'];
        $initialize_field = 'allocation/'.$allocationId.'/allocation-stuff/'.$allocationStuffId;

        return  $this->send_put_request($initialize_field, $body);

    }

    public function updateEmpAllocation($data){
        $body = [
            'allocationStuffId' =>  $data['allocationStuffId'],
            'employeeId' =>   $data['employeeId'],
            'allocationStuffPositionId' =>   $data['allocationStuffPositionId'],
            'statusId' => (int) $data['statusId'],
        ];
        $allocationId = $data['allocationId'];
        $allocationStuffId = $data['allocationStuffId'];
        $initialize_field = 'allocation/'.$allocationId.'/allocation-stuff';

        return  $this->send_put_request($initialize_field, $body);

    }
    public function deleteAllocation($id){
        $initialize_field = 'allocation/'.$id;
        return  $this->send_delete_request($initialize_field);

    }

    public function deleteAllocationStuff($allocationId,$stuffId){
        $initialize_field = 'allocation/'.$allocationId.'/allocation-stuff/'.$stuffId;
        return  $this->send_delete_request($initialize_field);

    }
}

