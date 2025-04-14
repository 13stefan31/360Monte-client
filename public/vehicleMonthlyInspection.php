<?php
require 'auth.php';
if (!in_array($authRole,$vehicleInspectionsRoles)){
    header('HTTP/1.0 403 Forbidden');
    header('Location: /403');
    exit();
}
if(isset($_SESSION['monthly_inspection_vehicle_id'])
    || isset($_SESSION['monthly_inspection_date'])
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
                    <h2 class="header-title">Mjesečni izvještaji (inspekcija vozila)</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <span class="breadcrumb-item active">Mjesečni izvještaji</span>
                        </nav>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div id="inspectionError"></div>
                        <div class="m-t-25">
                            <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" id="newWeeklyInspectionButton" data-target="#newWeeklyInspection">
                                Novi unos
                            </button>
                            <button type="button" class="btn btn-primary m-b-15 m-r-10" id="showMonthlyInspectionFilter" >
                                Filteri
                            </button>
                            <div class="card" id="filterMonthlyInspection" style="<?=$showFilters?>">
                                <div class="card-body">
                                    <h4>Filteri</h4>
                                    <input type="hidden" id="monthly_inspection_vehicle_id" value="<?php echo isset($_SESSION['monthly_inspection_vehicle_id']) ? $_SESSION['monthly_inspection_vehicle_id'] : '' ?>">
                                    <input type="hidden" id="monthly_inspection_date" value="<?php echo isset($_SESSION['monthly_inspection_date']) ? $_SESSION['monthly_inspection_date'] : '' ?>">

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Vozilo</span>
                                        </div>
                                        <select id="vehicleFilterId" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Datum </span>
                                        </div>
                                        <input type="date" class="form-control" id="dateFilterId" name="dateFilterId" aria-describedby="basic-addon3">
                                    </div>


                                </div>
                                <div class="card-footer">
                                    <div class="text-right">
                                        <button id="clearFiltersMonthly" class="btn btn-danger" style="<?=$clearFilters?>">Poništi filtere</button>
                                        <button class="btn btn-primary" id="monthlyInspectionsFilter">Filtritaj</button>
                                    </div>
                                </div>
                            </div>

                            <input id="reportType" value="2" hidden="">
                            <div class="table-container">
                            <table id="surveysTable" class="table">
                                <thead>
                                <tr>
                                    <th>Komentariše</th>
                                    <th>Vozilo</th>
                                    <th></th>
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
                        <div class="modal fade" id="newWeeklyInspection">
                            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                                <div class="modal-content">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Novi unos</h5>
                                        <button type="button" class="close" data-dismiss="modal">
                                            <i class="anticon anticon-close"></i>
                                        </button>
                                    </div>
                                    <form id="inspectionAdd">
                                        <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">Vozilo</span>
                                                </div>
                                                <select id="vehicleNew" name="vehicleNew" class="form-control"></select>
                                            </div>
                                            <div id="inspectionTableContainer"></div>
                                            <div id="weeklyInspectionAddError"></div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                                            <button type="submit" class="btn btn-primary" id="addNewWeeklyInspection">Sačuvaj</button>
                                        </div>
                                    </form>
                                </div>
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
<script src="/assets/js/vehicleInspection.js?v=1404"></script>
</body>

</html>