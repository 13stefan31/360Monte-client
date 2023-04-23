<?php
require_once(dirname(__FILE__). '/../../common/functions.inc');

if(isset($_GET) && isset($_GET['getSingleAllocation']) && isset($_GET['allocationId'])){
    return $allocation_sender->getSingleAllocation($_GET['allocationId']);
}