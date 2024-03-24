<?php
require 'auth.php';
//if (!in_array($authRole,$worksHistoryAllowedRoles)){
//
//    header('HTTP/1.0 403 Forbidden');
//    header('Location: /403');
//    exit();
//}
//

$itemsPerPage = 10;
$current_page= 1;
?>
<!DOCTYPE html>
<html lang="en">
<?php include ('layouts/head.php')?>

<body>
<div class="app">
    <div class="layout">
        <?php include ('layouts/header.php')?>
        <?php include ('layouts/sideNav.php')?>
        <div class="page-container">
            <div class="main-content">
                <div class="page-header">
                    <h2 class="header-title">Aktivni kvarovi vozila</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <span class="breadcrumb-item active">Aktivni kvarovi vozila</span>
                        </nav>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div id="alert"></div>
                        <div class="m-t-25">
                            <div id="alertActiveWorkHistory"></div>
                            <div class="table-responsive">
                                <table id="works-history-table" class="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>Vozilo</th>
                                        <th>Prijavio</th>
                                        <th>Kategorija </th>
                                        <th style="text-align:right">KM </th>
                                        <th>Početak</th>
                                        <th>Kraj</th>
                                        <th>Način plaćanja majstora</th>
                                        <th>Način plaćanja djelova</th>
                                        <th>Kreirao</th>
                                        <th>Kreirano</th>
                                        <th></th>
                                    </tr>

                                    </thead>
                                    <tbody></tbody>
                                </table>
                                <input hidden="" id="per_page" value="<?=$itemsPerPage?>">
                                <input hidden="" id="current_page" value="<?=$current_page?>">
                                <div id="pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <?php include ('layouts/footer.php')?>
        </div>
        <?php  include ('layouts/themeConfig.php')?>
    </div>
</div>



<?php include ('layouts/scripts.php')?>
<script src="/assets/js/userAuth.js"></script>
<script src="/assets/js/activeWorkData.js?v=1"></script>

</body>

</html>