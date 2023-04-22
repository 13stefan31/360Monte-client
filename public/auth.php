<?php

if (isset($_COOKIE['token']))  {
    $_SESSION['token'] = $_COOKIE['token'];
} else {
    header('Location: /prijava');
    exit;
}
?>