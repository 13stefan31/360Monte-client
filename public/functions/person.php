<?php
require_once dirname(__DIR__) .'/../vendor/autoload.php';
require_once dirname(__DIR__) .'/params.php';
use GuzzleHttp\Client;
function getSinglePerson(){
    $id=$_GET['personId'];
    $client = new Client(['base_uri' => P_API_URL]);

    $response = $client->request('GET', 'users/' . $id);

    if ($response->getStatusCode() === 200) {
        $user = json_decode($response->getBody(), true);
        if (empty($user)) {
            echo json_encode(['error' => 'Ne postoji korisnik sa tim id-jem.']);
        } else {
             echo json_encode($user);
        }
    } else {
        echo json_encode(['error' => 'Došlo je do greške.']);
    }
};
function updatePersonData($data){
    $id=$data['personId'];
    $client = new Client(['base_uri' => P_API_URL]);
    $headers = [
        'Content-Type' => 'application/json'
    ];
    $body = '{
              "userId": '.$id.',
              "name": "'.$data['personName'].'",
              "email": "'.$data['personEmail'].'",
              "roleId": 1
            }';
    $response = $client->request('PUT', 'users/' . $id, [
        'headers' => $headers,
        'body' => $body
    ]);
    if ($response->getStatusCode() === 200) {
        $user = json_decode($response->getBody(), true);
        if (empty($user)) {
            echo json_encode(['error' => 'Ne postoji korisnik sa tim id-jem.']);
        } else {
            echo json_encode($user);
        }
    } else {
        echo json_encode(['error' => 'Došlo je do greške.']);
    }


}
function updatePassword($data){
    $id=$data['personId'];
    $client = new Client(['base_uri' => P_API_URL]);
    $headers = [
        'Content-Type' => 'application/json'
    ];
    $body = '{
              "userId": '.$id.',
                "currentPassword":"'.$data['currentPassword'].'",
                "newPassword":"'.$data['newPassword'].'",
                "confirmPassword": "'.$data['confirmPassword'].'"
            }';
    $response = $client->request('PUT', 'users/' . $id, [
        'headers' => $headers,
        'body' => $body
    ]);
    if ($response->getStatusCode() === 200) {
        $user = json_decode($response->getBody(), true);
        if (empty($user)) {
            echo json_encode(['error' => 'Ne postoji korisnik sa tim id-jem.']);
        } else {
            echo json_encode($user);
        }
    } else {
        echo json_encode(['error' => 'Došlo je do greške.']);
    }


}
if(isset($_GET) && isset($_GET['getSinglePerson']) && isset($_GET['personId'])){
    getSinglePerson();
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data, true);

    if (isset($decoded_data['updatePerson'])){
        updatePersonData($decoded_data['data']);
    }
    if (isset($decoded_data['updatePassword'])){
        updatePassword($decoded_data['data']);
    }
}