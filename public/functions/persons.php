<?php
require_once dirname(__DIR__) .'/../vendor/autoload.php';
require_once dirname(__DIR__) .'/params.php';
use GuzzleHttp\Client;
function getAllPersons(){
    $client = new Client(['base_uri' => P_API_URL]);

    $response = $client->request('GET', 'users');

    if ($response->getStatusCode() === 200) {
        $users = json_decode($response->getBody(), true);
        if (empty($users)) {
            echo json_encode(['error' => 'Nema rezultata.']);
        } else {
             echo json_encode($users);
        }
    } else {
        echo json_encode(['error' => 'Došlo je do greške.']);
    }
};
function insertNewPerson(){
    $data=$_POST['data'];
    $client = new Client(['base_uri' => P_API_URL]);
    $headers = [
        'Content-Type' => 'application/json'
    ];
        $body = '{ 
          "name": "'.$data['name'].'",
          "email": "'.$data['email'].'",
          "roleId": '.$data['rolaId'].'
        }';
    $response = $client->request('POST', 'users' , [
        'headers' => $headers,
        'body' => $body
    ]);
    if ($response->getStatusCode() === 200) {
        $user = json_decode($response->getBody(), true);
            echo json_encode($user);
    } else {
        echo json_encode(['error' => 'Došlo je do greške.']);
    }

}
function getRoles(){
    $client = new Client(['base_uri' => P_API_URL]);

    $response = $client->request('GET', 'roles');

    if ($response->getStatusCode() === 200) {
        $roles = json_decode($response->getBody(), true);
        if (empty($roles)) {
            echo json_encode(['error' => 'Nema rezultata.']);
        } else {
            echo json_encode($roles);
        }
    } else {
        echo json_encode(['error' => 'Došlo je do greške.']);
    }


}
if(isset($_GET) && isset($_GET['getAllPersons'])){
    getAllPersons();
}

if(isset($_POST) && isset($_POST['addNewPerson'])){
    insertNewPerson();
}

if(isset($_GET) && isset($_GET['getRoles'])){
    getRoles();
}