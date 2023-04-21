<?php

namespace Main;

use GuzzleHttp\Client;

class SenderService
{
    private $url;

    function __construct(){
//        $this->url = $_ENV['P_API_URL'];
        $this->url = 'https://api.intranet.360monte.me/api/';
    }


    public function getUrl(){
        return $this->url;
    }

    private function check_response($response) {
        $statusCode = $response->getStatusCode();
        $reasonPhrase = $response->getReasonPhrase();

        if ($response->getStatusCode() !== 200 && $response->getStatusCode() !== 201 ) {
            $response_array = [
                "success" => false,
                "error" => json_decode($reasonPhrase),
                "status" => intval($statusCode)
            ];
        }else{
            $response_array = [
                "success" => true,
                "data" => json_decode($response->getBody()),
                "status" => intval($statusCode)
            ];
        }

        echo json_encode($response_array);
    }
    public function send_get_request($field, $data) {
        $client = new Client(['base_uri' => $this->url]);
        $response = $client->request('GET', $field);

        return $this->check_response($response);

    }

    public function send_put_request($field,$data) {

        try {
            $client = new Client(['base_uri' => $this->url]);
            $response = $client->put($field, [
                'json' => $data
            ]);
            return $this->check_response($response);
        } catch (\Exception $e) {
            $error = json_decode($e->getResponse()->getBody(), true)['error'];
            $errorMessages = [];
            if (count($error) === 1) {
                $errorMessages[] = reset($error);
            } else {
                foreach ($error as $key => $value) {
                    $errorMessages[] = implode(', ', $value);
                }
            }
            $response_array = [
                "success" => false,
                "error" => implode("\n", $errorMessages),
                "status" => intval($e->getCode())
            ];
            echo json_encode($response_array);
        }
    }

    public function send_post_request($field,$data,$headers=null)
    {
        try{
        $client = new Client(['base_uri'=>$this->url]);
        if ($headers==null){
            $head = [
                'Content-Type'=>'application/json'
            ];
        }else{
            $head=$headers;
        }

        $response = $client->post($field,[
           'headers'=>$head,
           'json'=>$data
        ]);
        return $this->check_response($response);
        } catch (\Exception $e) {
            $error = json_decode($e->getResponse()->getBody(), true)['error'];
            $errorMessages = [];
            if (count($error) === 1) {
                $errorMessages[] = reset($error);
            } else {
                foreach ($error as $key => $value) {
                    $errorMessages[] = implode(', ', $value);
                }
            }
            $response_array = [
                "success" => false,
                "error" => implode("\n", $errorMessages),
                "status" => intval($e->getCode())
            ];
            echo json_encode($response_array);
        }

    }

    public function send_delete_request($field)
    {

        $client = new Client(['base_uri'=>$this->url]);
        try {
            $response = $client->delete($field);
            return $this->check_response($response);
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                $responseBody = $e->getResponse()->getBody()->getContents();
                return $responseBody;
            } else {
                return $e->getMessage();
            }
        }

    }
    public function getRoles() {
        return $this->send_get_request('roles/','');
    }

}

