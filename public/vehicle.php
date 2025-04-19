<?php require 'auth.php';
if (!in_array($authRole,$vehiclesAllowedRoles)){
    header('HTTP/1.0 403 Forbidden');
    header('Location: /403');
    exit();
}

$itemsPerPage = 10;
$current_page= 1;

$itemsPerPage1 = 10;
$current_page1= 1;


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
                    <h2 class="header-title vehicleName"></h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <a class="breadcrumb-item" href="/vozila">Vozila</a>
                            <span class="breadcrumb-item active vehicleName"></span>
                        </nav>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h4> <a href="/vozila"><i class="anticon anticon-left"></i> &nbsp;Nazad </a></h4>

                        <div id="alertGetVehicle"></div>

                        <div id="alertAddWorkHistory"></div>
                        <div class="m-t-25 vehicleDataCard">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Opšte informacije</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Istorija kvarova i neregularnosti</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#inspection" role="tab" aria-controls="inspection" aria-selected="false">Inspekcija vozila</a>
                                </li>
                            </ul>
                            <?php if (in_array($authRole,$worksHistoryAllowedRoles)){?>
                                <button type="button" class="btn btn-primary m-b-15" style=" display:none;" data-toggle="modal" id="newWorkDataButton" data-target="#newWorkHistory" >
                                    Novi unos kvara
                                </button>
                            <?php }?>
                            <div class="tab-content m-t-15" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="card">

                                        <div class="card-body">
                                            <?php if (in_array($authRole,$externalUseChange)){?>
                                            <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" data-target="#externalUse">
                                               Promijeni status eksterne upotrebe
                                            </button>
                                            <?php }?>
                                            <div class="table-responsive">
                                                <table class="product-info-table m-t-20">
                                                    <tbody>
                                                    <tr>
                                                        <td>Brend:</td>
                                                        <td class="text-dark font-weight-semibold vehicleBrand" ></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Model:</td>
                                                        <td class="vehicleModel"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Broj sjedišta:</td>
                                                        <td class="vehicleNumberOfSeats"></td>
                                                    <tr>
                                                        <td>Registarska oznaka:</td>
                                                        <td class="vehicleRegistrationNumber"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Godina:</td>
                                                        <td class="vehicleYear"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ispravnost:</td>
                                                        <td class="vehicleReadyForDrive"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dostupno:</td>
                                                        <td class="vehicleShowOnSite"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Da li je za eksternu upotrebu:</td>
                                                        <td class="vehicleExternalUse"></td>
                                                    </tr>
                                                    <input hidden="" class="vehicleId" value="">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div id="commentAlert"></div>
                                    <?php if (in_array($authRole,$vehicleCommentRoles)){?>
                                    <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" data-target="#newIrregularity" id="newIrregularityButton">
                                        Novi unos
                                    </button>
                                        <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" data-target="#mehanicSetStatus">
                                            Promijeni status
                                        </button>
                                    <?php }?>
                                    <?php if (in_array($authRole,$worksHistoryAllowedRoles)){?>
                                        <span id="worksTab"></span>
                                    <?php }?>
                                        <input hidden="" value="1" id="isSingleVehicleWorkAdd">

                                    <div class="table-container">
                                    <table id="vehicle-comment-table" class="table">
                                        <thead>
                                        <tr>
                                            <th>Zaposleni</th>
                                            <th>Komentar</th>
                                            <th>Ocjena</th>
                                        </tr>
                                        </thead>
                                        <tbody>  </tbody>
                                    </table>
                                    <input hidden="" id="per_page" value="<?=$itemsPerPage?>">
                                    <input hidden="" id="current_page" value="<?=$current_page?>">
                                    <div id="pagination"></div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="inspection" role="tabpanel" aria-labelledby="inspection-tab">
                                    <div id="commentAlert"></div>
                                    <div id="inspectionError"></div>
                                    <?php if (in_array($authRole,$vehicleInspectionsRoles)){?>
                                        <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" data-target="#newWeeklyInspection" id="newWeeklyInspectionButton" data-type="1">
                                            Novi nedeljni izvještaj
                                        </button>
                                        <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" data-target="#newWeeklyInspection" id="newMonthlyInspectionButton" data-type="2">
                                            Novi mjesečni izvještaj
                                        </button>
<input id="singleVehicleInspection" value="1" hidden="">
                                    <?php }?>
                                    <?php if (in_array($authRole,$worksHistoryAllowedRoles)){?>
                                        <span id="inspectionTab"></span>
                                    <?php }?>
                                    <div class="table-container">
                                        <table id="surveysTable" class="table">
                                            <thead>
                                            <tr>
                                                <th>Komentariše</th>
                                                <th>Vozilo</th>
                                                <th>Datum</th>
                                                <th>Tip</th>
                                            </tr>
                                            </thead>
                                            <tbody>  </tbody>
                                        </table>
                                        <input hidden="" id="per_page1" value="<?=$itemsPerPage1?>">
                                        <input hidden="" id="current_page1" value="<?=$current_page1?>">
                                        <div id="pagination1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <?php if (in_array($authRole,$vehicleCommentRoles)){?>
            <div class="modal fade" id="newIrregularity">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Novi unos</h5>
                            <button type="button" class="close" data-dismiss="modal">
                                <i class="anticon anticon-close"></i>
                            </button>
                        </div>

                        <div id="vehicleCommentError"></div>
                        <div class="modal-body">
                            <div class="input-group m-b-10">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Komentar</span>
                                </div>
                                <textarea class="form-control" id="vehicleComment"></textarea>
                            </div>
                            <div class="input-group m-b-10">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Ocjena (1-5)</span>
                                </div>
                                <input type="number" class="form-control" id="vehicleRate" min="1" max="5">
                            </div>
                         </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                            <button type="button" class="btn btn-primary" id="addVehicleComment">Sačuvaj</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="mehanicSetStatus">

                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Promijeni status</h5>
                            <button type="button" class="close" data-dismiss="modal">
                                <i class="anticon anticon-close"></i>
                            </button>
                        </div>

                        <div id="vehicleStatusError"></div>
                        <div class="modal-body">

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Status</span>
                                </div>
                                <select id="vehicleStatus" class="form-control">
                                    <option value="">Promijenite status vozila</option>
                                    <option value="1">Ispravno</option>
                                    <option value="0">Neispravno</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                            <button type="button" class="btn btn-primary" id="changeVehicleStatus">Sačuvaj</button>
                        </div>
                    </div>
                </div>
            </div>
            <?php }?>

            <?php if (in_array($authRole,$externalUseChange)){?>
            <div class="modal fade" id="externalUse">

                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Promijeni status eksterne upotrebe</h5>
                            <button type="button" class="close" data-dismiss="modal">
                                <i class="anticon anticon-close"></i>
                            </button>
                        </div>

                        <div id="vehicleExternalError"></div>
                        <div class="modal-body">

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Status</span>
                                </div>
                                <select id="reservedForExternalUsage" class="form-control">
                                    <option value=""></option>
                                    <option value="1">Rezervisano</option>
                                    <option value="0">Nije rezervisano</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                            <button type="button" class="btn btn-primary" id="externalUseChange">Sačuvaj</button>
                        </div>
                    </div>
                </div>
            </div>
                <div class="modal fade" id="newWeeklyInspection">
                    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
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
                                        <select id="vehicleNew" name="vehicleNew" class="form-control" disabled></select>
                                    </div>
                                    <div id="inspectionTableContainer"></div>
                                    <div id="weeklyInspectionAddError"></div>
                                    <input type="hidden" id="reportType" name="reportType" value="">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                                    <button type="submit" class="btn btn-primary" id="addNewWeeklyInspection">Sačuvaj</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            <?php }?>
            <?php if (in_array($authRole,$worksHistoryAllowedRoles)){?>

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
                                    <select id="vehicleNewWorks" name="vehicleNewWorks" class="form-control" disabled></select>
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

            <?php }?>
            <?php include ('layouts/footer.php')?>
        </div>
        <!-- Page Container END -->
        <?php  include ('layouts/themeConfig.php')?>
    </div>
</div>





<?php include ('layouts/scripts.php')?>
<script src="/assets/js/userAuth.js"></script>
<script src="/assets/js/vehicle.js?v=1904"></script>
<script src="/assets/js/custom.js?v=1204"></script>

</body>

</html>