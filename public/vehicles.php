<?php
require 'auth.php';
if (!in_array($authRole,$vehiclesAllowedRoles)){
    header('HTTP/1.0 403 Forbidden');
    exit();
}
if(isset($_SESSION['vehicle_filter_brand']) ||
    isset($_SESSION['vehicle_filter_model']) ||
    isset($_SESSION['vehicle_filter_regNo']) ||
    isset($_SESSION['vehicle_filter_status']) ||
    isset($_SESSION['vehicle_filter_seatsNo'])){
    $brandFilters = isset($_SESSION['vehicle_filter_brand']) ? $_SESSION['vehicle_filter_brand'] : '';
    $modelFilters = isset($_SESSION['vehicle_filter_model']) ? $_SESSION['vehicle_filter_model'] : '';
    $regNoFilters = isset($_SESSION['vehicle_filter_regNo']) ? $_SESSION['vehicle_filter_regNo'] : '';
    $statusFilters = isset($_SESSION['vehicle_filter_status']) ? $_SESSION['vehicle_filter_status'] : '';

    $seatsNoFilters = isset($_SESSION['vehicle_filter_seatsNo']) ? $_SESSION['vehicle_filter_seatsNo'] : '';
    $showFilters = '';
    $clearFilters = '';
}else{
    $showFilters = 'display:none;';
    $clearFilters = 'display:none;';
    $brandFilters = '';
    $modelFilters = '';
    $regNoFilters='';
    $statusFilters='';
    $seatsNoFilters='';
}

$per_page=5;
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
                    <h2 class="header-title">Vozila</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <span class="breadcrumb-item active">Vozila</span>
                        </nav>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div id="alertVehicles"></div>
                        <div class="m-t-25">
                            <button type="button" class="btn btn-primary m-b-15 m-r-10" id="showVehicleFilter" >
                               Filteri
                            </button>
                            <div class="card" id="filterVehicles" style="<?=$showFilters?>">
                                    <div class="card-body">
                                        <h4>Filteri</h4>
                                        <input type="hidden" id="vehicle_status_filter" value="<?= $statusFilters ?>">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Brend</span>
                                            </div>
                                            <input type="text" class="form-control" id="brandFilter" placeholder="Unesite brend vozila" aria-label="Unesite brend vozila"   value="<?=$brandFilters?>">
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Model</span>
                                            </div>
                                            <input type="text" class="form-control" id="modelFilter" placeholder="Unesite model vozila" aria-label="Unesite model vozila" value="<?=$modelFilters?>">
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Registarska oznaka</span>
                                            </div>
                                            <input type="text" class="form-control" id="regNoFilter" placeholder="Unesite registarsku oznaku" aria-label="Unesite registarsku oznaku" value="<?=$regNoFilters?>">
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Broj sjedišta</span>
                                            </div>
                                            <input type="number" class="form-control" id="seatsNoFilter" placeholder="Unesite broj sjedišta" aria-label="Unesite broj sjedišta" value="<?=$seatsNoFilters?>">
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Status vozila</span>
                                            </div>
                                            <select id="statusFilter" class="form-control">
                                                <option value="">Odaberite status vozila</option>
                                                <option value="true">Ispravno</option>
                                                <option value="false">Neispravno</option>
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
                            <table id="vehicles-table" class="table">
                                <thead>
                                <tr>
                                    <th>Brend</th>
                                    <th>Model</th>
                                    <th>Godina</th>
                                    <th>Registarska oznaka</th>
                                    <th>Broj sjedišta</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody> </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Wrapper END -->
            <?php include ('layouts/footer.php')?>
        </div>
        <!-- Page Container END -->
        <?php  include ('layouts/themeConfig.php')?>
    </div>
</div>





<?php include ('layouts/scripts.php')?>
<script src="/assets/js/userAuth.js"></script>
<script src="/assets/js/vehicles.js"></script>


</body>

</html>