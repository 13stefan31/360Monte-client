<?php
require 'auth.php';
if (!in_array($authRole,$worksHistoryAllowedRoles)){

    header('HTTP/1.0 403 Forbidden');
    header('Location: /403');
    exit();
}

if(isset($_SESSION['work_filter_reported_id'])
    || isset($_SESSION['work_filter_breakdown_cat_id'])
    || isset($_SESSION['work_filter_breakdown_sub_cat_id'])
    || isset($_SESSION['work_filter_parts_pay_id'])
    || isset($_SESSION['work_filter_mehanic_pay_id'])
    || isset($_SESSION['work_filter_vehicle_id'])
    || isset($_SESSION['work_filter_date'])
    || isset($_SESSION['is_work_finished_filter'])
){
    $showFilters = '';
    $clearFilters = '';

}else{
    $showFilters = 'display:none;';
    $clearFilters = 'display:none;';


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
                    <h2 class="header-title">Istorija radova</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <span class="breadcrumb-item active">Istorija radova</span>
                        </nav>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div id="alert"></div>
                        <div class="m-t-25">
                                <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" id="newWorkDataButton" data-target="#newWorkHistory">
                                    Novi unos
                                </button>
                            <button type="button" class="btn btn-primary m-b-15 m-r-10" id="showWorksHistoryFilter" >
                                Filteri
                            </button>
                            <button type="button" class="btn btn-secondary m-b-15 m-r-10" id="showWorksDataCart" >
                                <i class="anticon anticon-bar-chart"></i> Dijagram podataka
                            </button>
                            <div class="card" id="filterWorksHistory" style="<?=$showFilters?>">
                                <div class="card-body">
                                    <h4>Filteri</h4>
                                    <input type="hidden" id="work_filter_reported_id" value="<?php echo isset($_SESSION['work_filter_reported_id']) ? $_SESSION['work_filter_reported_id'] : '' ?>">
                                    <input type="hidden" id="work_filter_breakdown_cat_id" value="<?php echo isset($_SESSION['work_filter_breakdown_cat_id']) ? $_SESSION['work_filter_breakdown_cat_id'] : '' ?>">
                                    <input type="hidden" id="work_filter_breakdown_sub_cat_id" value="<?php echo isset($_SESSION['work_filter_breakdown_sub_cat_id']) ? $_SESSION['work_filter_breakdown_sub_cat_id'] : '' ?>">
                                    <input type="hidden" id="work_filter_parts_pay_id" value="<?php echo isset($_SESSION['work_filter_parts_pay_id']) ? $_SESSION['work_filter_parts_pay_id'] : '' ?>">
                                    <input type="hidden" id="work_filter_mehanic_pay_id" value="<?php echo isset($_SESSION['work_filter_mehanic_pay_id']) ? $_SESSION['work_filter_mehanic_pay_id'] : '' ?>">
                                    <input type="hidden" id="work_filter_vehicle_id" value="<?php echo isset($_SESSION['work_filter_vehicle_id']) ? $_SESSION['work_filter_vehicle_id'] : '' ?>">
                                    <input type="hidden" id="work_filter_date" value="<?php echo isset($_SESSION['work_filter_date']) ? $_SESSION['work_filter_date'] : '' ?>">

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Prijavio</span>
                                        </div>
                                        <select id="reportedByFilterId" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Završeno</span>
                                        </div>
                                        <select id="isWorkFinishedFilter" class="form-control">
                                            <option>Odaberite</option>
                                            <option value="0" <?php if ($_SESSION['is_work_finished_filter'] == '0') echo ' selected'; ?>>NE</option>
                                            <option value="1" <?php if ($_SESSION['is_work_finished_filter'] == '1') echo ' selected'; ?>>DA</option>
                                        </select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Vozilo</span>
                                        </div>
                                        <select id="vehicleFilterId" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Datum kreiranja/prijave</span>
                                        </div>
                                        <input type="date" class="form-control" id="dateFilterId" name="dateFilterId" aria-describedby="basic-addon3">
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Kategorija</span>
                                        </div>
                                        <select id="breakdownCatFilterId" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Potkategorija</span>
                                        </div>
                                        <select id="breakdownSubcatFilterId" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Način plaćanja djelova</span>
                                        </div>
                                        <select id="partsPayFilterId" class="form-control">
                                            <option value="">Izaberite</option>
                                            <option value="1">Račun</option>
                                            <option value="2">Keš</option>
                                            <option value="3">Kombinovano</option>
                                        </select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Način plaćanja majstora</span>
                                        </div>
                                        <select id="mehanicPayFilterId" class="form-control">
                                            <option value="">Izaberite</option>
                                            <option value="1">Račun</option>
                                            <option value="2">Keš</option>
                                            <option value="3">Kombinovano</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="text-right">
                                        <button id="clearFilters" class="btn btn-danger" style="<?=$clearFilters?>">Poništi filtere</button>
                                        <button class="btn btn-primary" id="worksHistoryFilter">Filtritaj</button>
                                    </div>
                                </div>
                            </div>
                            <div class="card  " id="worksDataCart"  style="display: none">
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
                                            <span class="input-group-text" id="basic-addon1">Kategorija kvara</span>
                                        </div>
                                        <select id="breakDownCategoryId" class="form-control"></select>

                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="text-right">
                                        <button class="btn btn-primary" id="generateVehicleChart">Generiši</button>
                                    </div>
                                </div>

                                <div id="chartTypeChange" class="mb-5 ml-1" style="display: none">
                                    <p>Odaberite tip dijagrama: </p>
                                    <button class="btn btn-secondary" id="showBreakdownChart">Kvarovi</button>
                                    <button class="btn btn-secondary" id="showPriceChart">Cijena</button>
                                </div>
                                <div class="card-body" id="chartDivPrice" style="display: none;">
                                    <canvas id="dailyDataChartPrice" width="400" height="200" ></canvas>
                                </div>
                                <div class="card-body" id="chartDivBreakdown" style="display: none;">
                                    <canvas id="dailyDataChartBreakdown" width="400" height="200" ></canvas>
                                </div>
                                <button type="button" class="btn btn-primary m-b-15 m-r-10 w-100" id="downloadWorksDataCart"  style="display: none;">
                                    <i class="anticon anticon-download"></i> Preuzmi izvještaj
                                </button>
                            </div>
                            <div id="alertAddWorkHistory"></div>
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
                                        <th>Završeno</th>
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

                <div class="modal fade" id="newWorkHistory">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Novi unos</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <i class="anticon anticon-close"></i>
                                </button>
                            </div>
                            <form id="workHisrtoryAdd">
                                <div class="modal-body">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Prijavio</span>
                                        </div>
                                        <select id="reportedBy" name="reportedBy" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Vozilo</span>
                                        </div>
                                        <select id="vehicleNew" name="vehicleNew" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >Početak</span>
                                        </div>
                                        <input type="date" class="form-control" id="startingDate" name="startingDate" aria-describedby="basic-addon3">
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"  >Kraj </span>
                                        </div>
                                        <input type="date" class="form-control" id="endingDate" name="endingDate" aria-describedby="basic-addon3">
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Kategorija</span>
                                        </div>
                                        <select id="workCategory" name="workCategory" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Potkategorija</span>
                                        </div>
                                        <select id="workSubcategory" name="workSubcategory" class="form-control"></select>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-center m-r-10 mb-2">
                                        <span>Djelovi</span>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-12 col-sm-12">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">Plaćanje</span>
                                                </div>
                                                <select id="vehiclePartsPaymentMethod" name="vehiclePartsPaymentMethod" class="form-control">
                                                    <option>Izaberite</option>
                                                    <option value="1">Račun</option>
                                                    <option value="2">Keš</option>
                                                    <option value="3">Kombinovano</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 col-sm-12">
                                            <div class="row">
                                                <div class="col-6">Račun</div>
                                                <div class="col-6">Keš</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-6">
                                                    <input type="text" class="form-control" id="partsPriceCard" name="partsPriceCard" aria-describedby="basic-addon3" placeholder="EUR">
                                                </div>
                                                <div class="col-6">
                                                    <input type="text" class="form-control" id="partsPriceCache" name="partsPriceCache" aria-describedby="basic-addon3" placeholder="EUR">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center m-r-10 justify-content-center mb-2">
                                        <span>Majstor</span>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12 col-sm-12">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Plaćanje</span>
                                        </div>
                                        <select id="mechanicPaymentMethod" name="mechanicPaymentMethod" class="form-control">
                                            <option>Izaberite</option>
                                            <option value="1">Račun</option>
                                            <option value="2">Keš</option>
                                            <option value="3">Kombinovano</option>
                                        </select>
                                    </div>
                                        </div>
                                        <div class="col-lg-12 col-sm-12">
                                            <div class="row">
                                                <div class="col-6">Račun</div>
                                                <div class="col-6">Keš</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-6">
                                                    <input type="text" class="form-control" id="mechanicPriceCard" name="mechanicPriceCard" aria-describedby="basic-addon3" placeholder="EUR">
                                                </div>
                                                <div class="col-6">
                                                    <input type="text" class="form-control" id="mechanicPriceCache" name="mechanicPriceCache" aria-describedby="basic-addon3" placeholder="EUR">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="input-group mb-3 mt-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"  >Opis</span>
                                        </div>
                                        <textarea type="text" class="form-control" id="description" name="description" aria-describedby="basic-addon3" placeholder="Unesite opis kvara i popravke"></textarea>
                                    </div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Kvar se desio na</span>
                                        </div>
                                        <input type="text" class="form-control" id="breakDownMileage" name="breakDownMileage" aria-describedby="basic-addon3" placeholder="KM">
                                    </div>

                                    <div id="workHistoryAddError"></div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                                    <button type="submit" class="btn btn-primary" id="addNewWorkHistory">Sačuvaj</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            <div class="modal fade" id="openWorkHistory">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Detalji</h5>
                            <button type="button" class="close" data-dismiss="modal">
                                <i class="anticon anticon-close"></i>
                            </button>
                        </div>

                        <div class="card-group">
                            <div class="card">
                                <ul class="list-group list-group-flus">
                                    <li class="list-group-item">
                                        <p>Vozilo: <span class="vehicleView m-b-0 text-dark font-weight-semibold"></span></p>
                                    </li>
                                    <li class="list-group-item">
                                        <p>Prijavio: <span class="reportedByView m-b-0 text-dark font-weight-semibold"></span></p>
                                    </li>
                                    <li class="list-group-item">
                                        <p>Kategorija/Potkategorija: <span class="categoryView m-b-0 text-dark font-weight-semibold"></span></p>
                                    </li>
                                    <li class="list-group-item">
                                        <p>Kvar se desion na: <span class="distanceView m-b-0 text-dark font-weight-semibold"></span></p>
                                    </li>
                                    <li class="list-group-item">
                                        <p>Početak-Kraj <span class="dateView m-b-0 text-dark font-weight-semibold"></span></p>
                                    </li>
                                    <li class="list-group-item">
                                        <p>Kreirano <span class="createdAtView m-b-0 text-dark font-weight-semibold"></span></p>
                                    </li>
                                    <li class="list-group-item">
                                        <p>Plaćanje majstore:
                                            <span class="mehanicMethodView m-b-0 text-dark font-weight-semibold"></span> /
                                            Račun
                                            <span class="mehanicAccView m-b-0 text-dark font-weight-semibold"></span>
                                            Keš
                                            <span class="mehanicCacheView m-b-0 text-dark font-weight-semibold"></span>
                                        </p>
                                    </li>
                                    <li class="list-group-item">
                                        <p>Plaćanje djelova:
                                            <span class="partsMethodView m-b-0 text-dark font-weight-semibold"></span> /
                                        Račun
                                            <span class="partsAccView m-b-0 text-dark font-weight-semibold"></span>
                                            Keš
                                            <span class="partsCacheView m-b-0 text-dark font-weight-semibold"></span>
                                        </p>
                                    </li>
                                    <li class="list-group-item">
                                        <p>Ukupno: <span class="totalView m-b-0 text-dark font-weight-semibold"></span></p>
                                    </li>

                                    <li class="list-group-item">
                                        <p>Opis: <span class="descView m-b-0 text-dark font-weight-semibold"></span></p>
                                    </li>
                                </ul>
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
<script src="/assets/js/worksHistory.js?v=1"></script>

</body>

</html>