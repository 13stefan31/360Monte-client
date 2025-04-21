<?php

require_once(dirname(__FILE__) . '/../../../Sender/Service/SenderService.php');

class VehicleInspectionSender extends \Main\SenderService
{

    private static $instance = null;

    function __construct()
    {
        parent::__construct();
    }

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new VehicleInspectionSender();
        }

        return self::$instance;
    }

    public function getAllWeeklyReports($limit, $page, $reportType, $reportDate, $vehicleId)
    {
        $initialize_field = 'vehicle-inspections';

        $filters = array();
        if (!empty($vehicleId)) {
            $filters[] = 'vehicleId=' . urlencode($vehicleId);
        }
        if (!empty($reportType)) {
            $filters[] = 'reportType=' . urlencode($reportType);
        }
        if (!empty($reportDate)) {
            $filters[] = 'reportDate=' . urlencode($reportDate);
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

    public function getInspectionAddData($type)
    {
        $initialize_field = 'vehicle-inspections/report/items?reportTypeId=' . $type;

        return $this->send_get_request($initialize_field);
    }

    public function getSingleSurveys($id)
    {
        $initialize_field = 'vehicle-inspections/' . $id;
        return $this->send_get_request($initialize_field);
    }

    public function deleteVehicleInspectionData($id)
    {
        $initialize_field = 'vehicle-inspections' . '/' . $id;
        return $this->send_delete_request($initialize_field);
    }


    public function addInspectionData($data)
    {
        foreach ($data['data'] as &$entry) {
            $entry['isCorrect'] = filter_var($entry['isCorrect'], FILTER_VALIDATE_BOOLEAN);
        }

        $initialize_field = 'vehicle-inspections';
        return $this->send_post_request($initialize_field, $data);

    }

    public function updateInspectionData($data)
    {
        foreach ($data['data'] as &$entry) {
            $entry['isCorrect'] = filter_var($entry['isCorrect'], FILTER_VALIDATE_BOOLEAN);
        }
        $body = [
            'reportTypeId' => $data['reportTypeId'],
            'vehicleId' => $data['vehicleId'],
            'data' => $data['data'],
        ];

        $initialize_field = 'vehicle-inspections/' . $data['inspectionId'];
        return $this->send_put_request($initialize_field, $body);
    }

}

