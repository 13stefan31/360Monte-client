<?php

require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_POST) && isset($_POST['getAllNotifications'])){
    return $notification_sender->getAllNotifications();
}
if(isset($_POST) && isset($_POST['markAsRead'])){
    return $notification_sender->markAsRead($_POST['id']);
}
if(isset($_POST) && isset($_POST['markAsSeen'])){
    return $notification_sender->markAsSeen($_POST['notificationsIds']);
}