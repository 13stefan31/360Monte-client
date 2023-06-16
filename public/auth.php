<?php
session_start();
require_once dirname(__DIR__) . '/vendor/autoload.php';

if (!isset($_COOKIE['token']))  {
    header('Location: /prijava');
    exit;
}

require_once(dirname(__FILE__) . "/../source/User/Sender/Service/UserSender.php");
require_once(dirname(__FILE__) . "/../source/User/Model/User.php");

$user_sender = UserSender::getInstance();
$user = User::getInstance();


$authUser = $user_sender->loggedUser();
if ($authUser) {
    $authRole = $authUser->roleId;
} else {
    header('HTTP/1.0 403 Forbidden');
    exit();
}

define("P_ADMIN_ROLE_ID",1);
define("P_TOUR_GUIDE_ROLE_ID", 2);
define("P_DRIVER_ROLE_ID",3);
define("P_OFFICE_ADMIN_ROLE_ID", 4);
define("P_MEHANIC_ROLE_ID", 5);
define("P_GENERAL_MANAGER_ROLE_ID",6);
define("P_HR_MANAGER_ROLE_ID",7);

$allocationAllowedRoles = array(
    P_ADMIN_ROLE_ID,
    P_TOUR_GUIDE_ROLE_ID,
    P_DRIVER_ROLE_ID,
    P_OFFICE_ADMIN_ROLE_ID,
    P_GENERAL_MANAGER_ROLE_ID
);
$vehiclesAllowedRoles = array(
    P_ADMIN_ROLE_ID,
    P_OFFICE_ADMIN_ROLE_ID,
    P_GENERAL_MANAGER_ROLE_ID,
    P_HR_MANAGER_ROLE_ID,
    P_MEHANIC_ROLE_ID
);
$personAllowedRoles = array(
    P_ADMIN_ROLE_ID,
    P_OFFICE_ADMIN_ROLE_ID,
    P_GENERAL_MANAGER_ROLE_ID,
    P_HR_MANAGER_ROLE_ID
);
$reportAllowedRoles = array(
    P_ADMIN_ROLE_ID,
    P_GENERAL_MANAGER_ROLE_ID,
);
$surveysAllowedRoles = array(
    P_ADMIN_ROLE_ID,
    P_GENERAL_MANAGER_ROLE_ID
);
//za alokacije kojima je status 0
$allocationEditRoles = array(
    P_ADMIN_ROLE_ID,
    P_OFFICE_ADMIN_ROLE_ID,
    P_GENERAL_MANAGER_ROLE_ID,
    P_HR_MANAGER_ROLE_ID
);
$allocationEditRolesString = json_encode($allocationEditRoles);

//za alokacije kojima je status 1
$allocationUpdateRoles = array(
    P_GENERAL_MANAGER_ROLE_ID,
    P_ADMIN_ROLE_ID
);
$externalUseChange = array(
    P_ADMIN_ROLE_ID,
    P_OFFICE_ADMIN_ROLE_ID,
    P_GENERAL_MANAGER_ROLE_ID
);
$allocationUpdateRolesString = json_encode($allocationUpdateRoles);



//ko moze da unosi komentar na vozila
$vehicleCommentRoles = array(
    P_ADMIN_ROLE_ID,
    P_MEHANIC_ROLE_ID
);

?>