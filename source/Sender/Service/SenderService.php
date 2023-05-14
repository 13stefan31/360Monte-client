<?php

namespace Main;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\ServerException;
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
    public function send_get_request($field) {

        try{
            $client = new Client(['base_uri'=>$this->url]);
            $token = $_COOKIE['token'];
            $head = [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $token
            ];
            $response = $client->request('GET', $field, [
                'headers' => $head
            ]);

            return $this->check_response($response);
        } catch (\Exception $e) {
            $error = handleServerError($e);
            $response_array = [
                "success" => false,
                "error" => $error,
                "status" => intval($e->getCode())
            ];
            echo json_encode($response_array);

        }

    }

    public function send_put_request($field,$data) {

        try {
            $token = $_COOKIE['token'];
            $head = [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $token
            ];

            $client = new Client(['base_uri' => $this->url]);
            $response = $client->put($field, [
                'json' => $data,
                'headers' => array_filter($head),
            ]);
            return $this->check_response($response);
        } catch (\Exception $e) {
            $error = handleServerError($e);
            $response_array = [
                "success" => false,
                "error" => $error,
                "status" => intval($e->getCode())
            ];
            echo json_encode($response_array);
        }

    }

    public function send_post_request($field,$data=null)
    {
        try{
        $client = new Client(['base_uri'=>$this->url]);

            $token = $_COOKIE['token'];
            $head = [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $token
            ];
        $response = $client->post($field,[
           'headers'=>$head,
           'json'=>$data
        ]);
        return $this->check_response($response);
        } catch (\Exception $e) {
            $error = handleServerError($e);
            $response_array = [
                "success" => false,
                "error" => $error,
                "status" => intval($e->getCode())
            ];
            echo json_encode($response_array);
        }

    }

    public function send_delete_request($field)
    {

        $client = new Client(['base_uri'=>$this->url]);
        try {

            $token = $_COOKIE['token'];
            $headers = [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $token
            ];
              $response = $client->delete($field, ['headers' => $headers]);
            return $this->check_response($response);
        } catch (RequestException | ServerException $e) {
            $error = handleServerError($e);
            $response_array = [
                "success" => false,
                "error" => $error,
                "status" => intval($e->getCode())
            ];
            echo json_encode($response_array);
        }

    }
    public function getRoles() {
        return $this->send_get_request('roles/','');
    }
}
function handleServerError($exception) {
    $error = $exception->getResponse()->getBody()->getContents();
    if (is_string($error)) {
        $response = json_decode($error, true);
        if (isset($response['error'])) {
            return $response['error'];
        }
    }
    if (is_array($error) || is_object($error)) {
        if (isset($error->error)) {
            return $error->error;
        } else if (isset($error['error'])) {
            return $error['error'];
        }
    }
    return $error;
}
