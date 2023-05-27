<?php require 'auth.php';
if (!in_array($authRole,$vehiclesAllowedRoles)){
    header('HTTP/1.0 403 Forbidden');
    exit();
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
                        <div class="m-t-25">
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
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div class="alert alert-success">
                                        <div class="d-flex align-items-center justify-content-start">
                                        <span class="alert-icon">
                                            <i class="anticon anticon-check-o"></i>
                                        </span>
                                            <span>Uspješno ste unijeli novi komentar</span>
                                        </div>
                                    </div>
                                    <div class="alert alert-danger">
                                        <div class="d-flex align-items-center justify-content-start">
                                        <span class="alert-icon">
                                            <i class="anticon anticon-close-o"></i>
                                        </span>
                                            <span>Došlo je do greške prilikom unosa, pokušajte ponovo</span>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" data-target="#newIrregularity">
                                        Novi unos
                                    </button>
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

            <div class="modal fade" id="newIrregularity">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Novi unos</h5>
                            <button type="button" class="close" data-dismiss="modal">
                                <i class="anticon anticon-close"></i>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="input-group m-b-10">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Komentar</span>
                                </div>
                                <textarea class="form-control" aria-label="With textarea"></textarea>
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon3">Status</span>
                                </div>
                                <select class="form-control" name="">
                                    <option value=""></option>
                                    <option value="">Ispravno</option>
                                    <option value="">Neispravno</option>
                                </select>
                            </div>
                         </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                            <button type="button" class="btn btn-primary">Sačuvaj</button>
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
<script src="/assets/js/vehicle.js"></script>

</body>

</html>