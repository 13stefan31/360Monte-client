<?php require 'auth.php';
if (!in_array($authRole,$vehiclesAllowedRoles)){
    header('HTTP/1.0 403 Forbidden');
    header('Location: /403');
    exit();
}

$itemsPerPage = 10;
$current_page= 1;

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
                        <div class="m-t-25 vehicleDataCard">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Opšte informacije</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Istorija kvarova i neregularnosti</a>
                                </li>
                            </ul>
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
            <?php }?>
            <?php include ('layouts/footer.php')?>
        </div>
        <!-- Page Container END -->
        <?php  include ('layouts/themeConfig.php')?>
    </div>
</div>





<?php include ('layouts/scripts.php')?>
<script src="/assets/js/userAuth.js"></script>
<script src="/assets/js/vehicle.js?v=2"></script>

</body>

</html>