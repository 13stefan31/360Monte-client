<?php
require 'auth.php';
if (!in_array($authRole,$vehicleInspectionsRoles)){
    header('HTTP/1.0 403 Forbidden');
    header('Location: /403');
    exit();
}
if (isset($_GET['v'])){
    $naslov = 'Nedeljni izvještaj';
    $prethodna = 'Vozilo';
    $link='vozila/'.$_GET['v'];
}else{
    if ($_GET['tip']==1){
        $naslov = 'Nedeljni izvještaj';
        $prethodna = 'Nedeljni izvještaji';
        $link='nedeljni-izvjestaji';
    }else{

        $naslov = 'Mjesečni izvještaj';
        $prethodna = 'Mjesečni izvještaji';
        $link='mjesecni-izvjestaji';
    }
}


?>
<!DOCTYPE html>
<html lang="en">
<?php include ('layouts/head.php')?>

<body>
<div id="loader-overlay">
    <div class="loader"></div>
</div>
<div class="app">
    <div class="layout">
        <?php include ('layouts/header.php')?>
        <?php include ('layouts/sideNav.php')?>
        <div class="page-container">
            <div class="main-content">
                <div class="page-header">
                    <h2 class="header-title"><?=$naslov?></h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <a class="breadcrumb-item" href="/<?=$link?>"><?=$prethodna?></a>
                            <span class="breadcrumb-item active"><?=$naslov?></span>
                        </nav>
                    </div>
                </div>

                <div class="container-fluid">

                    <div id="surveysError"></div>
                    <div class="tab-content m-t-15 surveyDatacard">
                        <div class="tab-pane fade show active" id="product-overview" >
                            <div class="card">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" id="updateInspectionButton" data-target="#updateInspectionForm">
                                            <i class="anticon anticon-edit"></i> Izmijeni
                                        </button>
                                        <table class="product-info-table m-t-20">
                                            <tbody>
                                            <tr>
                                                <td>Komentariše:</td>
                                                <td class="text-dark font-weight-semibold surveyPersonName"></td>
                                            </tr>
                                            <tr>
                                                <td>Vozilo:</td>
                                                <td class="surveyeVehicle"></td>
                                                <input value="" id="surveyeVehicleId" hidden="">
                                                <input value="" id="reportType"  hidden="">
                                                <input value="" id="inspectionId" hidden="">
                                            </tr>
                                            <tr>
                                                <td>Datum:</td>
                                                <td class="text-dark font-weight-semibold surveyDate"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div id="inspectionResults" class="inspection-wrapper"></div>


                                    </div>
                                </div>
                            </div>
                            <div class="surveyData"></div>
                        </div>
                        <div class="tab-pane fade" id="product-images">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <img class="img-fluid" src="assets/images/others/product-1.jpg" alt="">
                                        </div>
                                        <div class="col-md-3">
                                            <img class="img-fluid" src="assets/images/others/product-2.jpg" alt="">
                                        </div>
                                        <div class="col-md-3">
                                            <img class="img-fluid" src="assets/images/others/product-3.jpg" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="updateInspectionForm">
                    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Izmijeni</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <i class="anticon anticon-close"></i>
                                </button>
                            </div>
                            <form id="inspectionUpdate">
                                <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                                    <div class="form-group">
                                        <label for="vehicleInfo">Vozilo:</label>
                                        <span id="vehicleInfo"></span>
                                    </div>
                                    <div id="inspectionTableContainer"></div>
                                    <div id="weeklyInspectionAddError"></div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                                    <button type="submit" class="btn btn-primary" id="inspectionUpdate|">Sačuvaj</button>
                                </div>
                            </form>
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
    <script src="/assets/js/singleVehicleInspection.js?v=2304"></script>

</body>

</html>