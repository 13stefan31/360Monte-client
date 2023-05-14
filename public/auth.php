<?php
if (!isset($_COOKIE['token']))  {
    header('Location: /prijava');
    exit;
}
?>