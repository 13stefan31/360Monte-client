<?php
require 'auth.php';
if (!in_array($authRole,$surveysAllowedRoles)){
    header('HTTP/1.0 403 Forbidden');
    header('Location: /403');
    exit();
}
if(
    isset($_SESSION['survey_filter_status'])  ){
     $statusFilters = isset($_SESSION['survey_filter_status']) ? $_SESSION['survey_filter_status'] : '';
    $showFilters = '';
    $clearFilters = '';
}else{
    $showFilters = 'display:none;';
    $clearFilters = 'display:none;';
    $statusFilters='';
}

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
        <!-- Page Container START -->
        <div class="page-container">
            <!-- Content Wrapper START -->
            <div class="main-content">
                <div class="page-header">
                    <h2 class="header-title">Ankete vozila</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <span class="breadcrumb-item active">Ankete vozila</span>
                        </nav>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div id="surveysError"></div>
                        <div class="m-t-25">
                            <button type="button" class="btn btn-primary m-b-15 m-r-10" id="showVehicleFilter" >
                                Filteri
                            </button>
                            <div class="card" id="filterVehicles" style="<?=$showFilters?>">
                                <div class="card-body">
                                    <h4>Filteri</h4>
                                    <input type="hidden" id="survey_status_filter" value="<?= $statusFilters ?>">

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Status ankete</span>
                                        </div>
                                        <select id="statusFilter" class="form-control">
                                            <option value="">Odaberite status ankete</option>
                                            <option value="1" <?= ($statusFilters == 1) ? 'selected' : '' ?>>Popunjeno</option>
                                            <option value="0" <?= ($statusFilters == 0) ? 'selected' : '' ?>>Nije popunjeno</option>
                                        </select>
                                    </div>

                                </div>
                                <div class="card-footer">
                                    <div class="text-right">
                                        <button id="clearFilters" class="btn btn-danger" style="<?=$clearFilters?>">Poništi filtere</button>
                                        <button class="btn btn-primary" id="vehicleFilters">Filtritaj</button>
                                    </div>
                                </div>
                            </div>
                            <div class="table-container">
                            <table id="surveysTable" class="table">
                                <thead>
                                <tr>
                                    <th>Vozilo</th>
                                    <th>Osoba</th>
                                    <th>Status</th>
<!--                                    <th>Datum</th>-->
<!--                                    <th></th>-->
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <input hidden="" id="per_page" value="<?=$itemsPerPage?>">
                            <input hidden="" id="current_page" value="<?=$current_page?>">
                            <div id="pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

<!--            <div class="modal fade" id="newPerson">-->
<!--                <div class="modal-dialog modal-dialog-centered">-->
<!--                    <div class="modal-content">-->
<!--                        <div class="modal-header">-->
<!--                            <h5 class="modal-title" id="exampleModalCenterTitle">Novi unos</h5>-->
<!--                            <button type="button" class="close" data-dismiss="modal">-->
<!--                                <i class="anticon anticon-close"></i>-->
<!--                            </button>-->
<!--                        </div>-->
<!--                        <div class="modal-body">-->
<!--                            <div class="input-group mb-3">-->
<!--                                <div class="input-group-prepend">-->
<!--                                    <span class="input-group-text" id="basic-addon3">Ime</span>-->
<!--                                </div>-->
<!--                                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">-->
<!--                            </div>-->
<!--                            <div class="input-group mb-3">-->
<!--                                <div class="input-group-prepend">-->
<!--                                    <span class="input-group-text" id="basic-addon3">Prezime</span>-->
<!--                                </div>-->
<!--                                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">-->
<!--                            </div>-->
<!--                            <div class="input-group mb-3">-->
<!--                                <div class="input-group-prepend">-->
<!--                                    <span class="input-group-text" id="basic-addon3">Email</span>-->
<!--                                </div>-->
<!--                                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="modal-footer">-->
<!--                            <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>-->
<!--                            <button type="button" class="btn btn-primary">Sačuvaj</button>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <!-- Content Wrapper END -->
            <?php include ('layouts/footer.php')?>
        </div>
        <!-- Page Container END -->
        <?php  include ('layouts/themeConfig.php')?>
    </div>
</div>





<?php include ('layouts/scripts.php')?>
<script src="/assets/js/userAuth.js"></script>
<script src="/assets/js/survey-vehicle.js?v=1904"></script>
</body>

</html>