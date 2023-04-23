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
    public function send_get_request($field,$headers=null) {

        try{
            $client = new Client(['base_uri'=>$this->url]);
            if ($headers==null){
                $head = [
                    'Content-Type'=>'application/json'
                ];
            }else{
                $head=$headers;
            }

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

    public function send_put_request($field,$data,$headers=null) {

        try {
            $client = new Client(['base_uri' => $this->url]);
            $response = $client->put($field, [
                'json' => $data,
                'headers' => array_filter($headers),
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
            $error = handleServerError($e);
            $response_array = [
                "success" => false,
                "error" => $error,
                "status" => intval($e->getCode())
            ];
            echo json_encode($response_array);
        }

    }

    public function send_delete_request($field,$headers=null)
    {

        $client = new Client(['base_uri'=>$this->url]);
        try {
            if ($headers==null){

                $response = $client->delete($field);
            }else{
                $response = $client->delete($field, ['headers' => $headers]);

            }
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
}function handleServerError($exception) {
    $error = $exception->getResponse()->getBody()->getContents();

    // Handle a JSON string error response
    if (is_string($error)) {
        $response = json_decode($error, true);
        if (isset($response['error'])) {
            return $response['error'];
        }
    }

    // Handle an array or object error response
    if (is_array($error) || is_object($error)) {
        if (isset($error->error)) {
            return $error->error;
        } else if (isset($error['error'])) {
            return $error['error'];
        }
    }

    // Fallback to returning the entire error message as a string
    return $error;
}
