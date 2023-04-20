<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

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
    return $person_sender->getSinglePerson($_GET['personId']);
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = file_get_contents('php://input');
    $decoded_data = json_decode($data, true);

    if (isset($decoded_data['updatePerson'])){
        return $person_sender->updatePerson($decoded_data['data']);

    }

    if (isset($decoded_data['updatePassword'])){
        return $person_sender->changePassword($decoded_data['data']);
//        updatePassword($decoded_data['data']);
    }
}