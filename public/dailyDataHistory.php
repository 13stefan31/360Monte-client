<?php
require 'auth.php';
if (!in_array($authRole,$dailyDataHistoryAllowedRoles)){

    header('HTTP/1.0 403 Forbidden');
    header('Location: /403');
    exit();
}

if( isset($_SESSION['daily_data_filter_vehicle_id']) ||  isset($_SESSION['daily_data_filter_date'])){
    $vehicleIdFilters = isset($_SESSION['daily_data_filter_vehicle_id']) ? $_SESSION['daily_data_filter_vehicle_id'] : '';
    $showFilters = '';
    $clearFilters = '' ;
}else{
    $showFilters = 'display:none;';
    $clearFilters = 'display:none;' ;
    $vehicleIdFilters = '';

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
        <div class="page-container">
            <div class="main-content">
                <div class="page-header">
                    <h2 class="header-title">Istorija dnevnih podataka</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <span class="breadcrumb-item active">Istorija dnevnih podataka</span>
                        </nav>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body" id="dialy-data">
                        <div id="alert"></div>
                        <div class="m-t-25">
                                <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" id="newDailyDataButton" data-target="#newDailyData">
                                    Novi unos
                                </button>
                            <button type="button" class="btn btn-primary m-b-15 m-r-10" id="showDailyDataFilter" >
                                Filteri
                            </button>
                            <button type="button" class="btn btn-secondary m-b-15 m-r-10 " id="showDailyDataCart" >
                                <i class="anticon anticon-bar-chart"></i> Dijagram podataka
                            </button>
                            <div class="card" id="dailyDataFilter" style="<?=$showFilters?>">
                                <div class="card-body">
                                    <h4>Filteri</h4>
                                    <input type="hidden" id="daily_data_filter_vehicle_id" value="<?php echo isset($_SESSION['daily_data_filter_vehicle_id']) ? $_SESSION['daily_data_filter_vehicle_id'] : '' ?>">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Vozilo</span>
                                        </div>
                                        <select id="vehicleFilterId" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Datum</span>
                                        </div>
                                        <input type="date" class="form-control" id="date" aria-describedby="basic-addon3" <?php if(isset($_SESSION['daily_data_filter_date'])) echo 'value="' . date('Y-m-d', strtotime($_SESSION['daily_data_filter_date'])) . '"'; ?>>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="text-right">
                                        <button id="clearFilters" class="btn btn-danger" style="<?=$clearFilters?>">Poništi filtere</button>
                                        <button class="btn btn-primary" id="dailyDayaFilterSubmit">Filtritaj</button>
                                    </div>
                                </div>
                            </div>
                            <div class="card" id="dailyDataCart" style="display: none">
                                <div class="card-body">
                                    <h4>Dijagram podataka</h4>
                                     <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Vozilo</span>
                                        </div>
                                        <select id="vehicleCartId" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Datum</span>
                                        </div>
                                        <input id="dateCart" class="form-control" type="date">
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="text-right">
                                        <button class="btn btn-primary" id="generateVehicleChart">Generiši</button>
                                    </div>
                                </div>

                                <div class="card-body" id="chartDiv" style="display: none;">
                                    <canvas id="dailyDataChart" width="400" height="200" ></canvas>
                                </div>
                            </div>
                            <div id="alertAddDialyData"></div>
                            <div class="table-container">
                                <table id="daily-data-table" class="table">
                                    <thead>
                                    <tr>
                                        <th>Vozilo</th>
                                        <th>Registarska oznaka</th>
                                        <th style="text-align: right">Godina</th>
                                        <th style="text-align: right">Počeo dan</th>
                                        <th style="text-align: right">Završio dan</th>
                                        <th style="text-align: right">Količina goriva</th>
                                        <th style="text-align: right">Datum unosa</th>
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

                <div class="modal fade" id="newDailyData">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Novi unos</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <i class="anticon anticon-close"></i>
                                </button>
                            </div>
                            <form id="dialyDataAdd">
                                <div class="modal-body">
                                    <div id="dailyDataAddError"  ></div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Vozilo</span>
                                        </div>
                                        <select id="vehicleSelectNew" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"  >Datum</span>
                                        </div>
                                        <input type="date" class="form-control" id="dateNew" aria-describedby="basic-addon3" >
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >Vozač</span>
                                        </div>
                                        <select id="empAddDailyData" class="form-control"></select>
                                        <p class="error"></p>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"  >Početna kilometraža</span>
                                        </div>
                                        <input type="number" class="form-control" id="startingMileage" aria-describedby="basic-addon3" placeholder="Unesite početnu kilometražu">

                                    </div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"  >Krajnja kilomteraža</span>
                                        </div>
                                        <input type="number" class="form-control" id="endingMileage" aria-describedby="basic-addon3" placeholder="Unesite završnu kilometražu">

                                    </div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"  >Cijena goriva (EUR)</span>
                                        </div>
                                        <input type="number" class="form-control" id="fuelPrice" aria-describedby="basic-addon3" placeholder="Unesite cijenu goriva">

                                    </div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"  >Količina goriva (L)</span>
                                        </div>
                                        <input type="number" class="form-control" id="fuelQuantity" aria-describedby="basic-addon3" placeholder="Unesite količinu goriva">

                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                                    <button type="submit" class="btn btn-primary" id="addNewDailyData">Sačuvaj</button>
                                </div>
                            </form>
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
<script src="/assets/vendors/chartist/chartist.min.js"></script>
<script src="/assets/js/dailyDataHistory.js?v=1904"></script>
</body>

</html>