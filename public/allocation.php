
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
                    <h2 class="header-title">Alokacija</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <a class="breadcrumb-item" href="/alokacije">Alokacije</a>
                            <span class="breadcrumb-item active">Alokacija</span>
                        </nav>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="tab-content m-t-15">
                        <div class="tab-pane fade show active">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Informacije</h4>
                                    <div class="card-group">
                                        <div class="card">
                                            <ul class="list-group list-group-flus">
                                                <li class="list-group-item">
                                                    <p>Status:</p><p class="allocationStatus m-b-0 text-dark font-weight-semibold"></p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="card-group">
                                        <div class="card">
                                            <ul class="list-group list-group-flus">
                                                <li class="list-group-item">
                                                        <p>Datum:</p><p class="allocationDate m-b-0 text-dark font-weight-semibold"></p>
                                                </li>
                                                <li class="list-group-item">
                                                    <p>Vozilo:</p><p class="allocationVehicle m-b-0 text-dark font-weight-semibold"></p>
                                                </li>
                                                <li class="list-group-item">
                                                    <p>Registraciona oznaka vozila:</p><p class="allocationVehicleRegNo m-b-0 text-dark font-weight-semibold"></p>
                                                </li>
                                                <li class="list-group-item">
                                                    <p>Broj sjedišta vozila:</p><p class="allocationVehicleSeatsNo m-b-0 text-dark font-weight-semibold"></p>
                                                </li>
                                            </ul>
                                            <div class="card-footer">
                                                <div class="text-center m-t-5">
                                                    <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" id="changeAllocationDataButton" data-target="#vehicle-date-change-modal">
                                                        <i class="anticon anticon-form"></i>Izmijeni podatke o datumu i vozilu
                                                    </button>  </div>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <ul class="list-group list-group-flus">
                                                <li class="list-group-item">
                                                    <p>Vozač:</p><p class=" m-b-0 text-dark font-weight-semibold"></p>
                                                </li>
                                                <li class="list-group-item">
                                                    <p>Vodič:</p><p class=" m-b-0 text-dark font-weight-semibold"></p>
                                                </li>
                                                <li class="list-group-item">
                                                    <p>U paru sa vozačem:</p><p class=" m-b-0 text-dark font-weight-semibold"></p>
                                                </li>
                                            </ul>
                                  </div>
                                    </div>
                                    <div class="alert alert-primary">
                                        <div class="d-flex justify-content-start">
                                            <span class="alert-icon m-r-20 font-size-30">
                                                <i class="anticon anticon-info-circle"></i>
                                            </span>
                                            <div>
                                                <h5 class="alert-heading">Promijeni status</h5>
                                                <button class="btn btn-success btn-tone m-r-5">Prihvatam</button>
                                                <button class="btn btn-warning btn-tone m-r-5">Na čekanju</button>
                                                <button class="btn btn-danger btn-tone m-r-5">Odbijam</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="vehicle-date-change-modal">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Izmijeni podatke o datumu i vozilu</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <i class="anticon anticon-close"></i>
                                </button>
                            </div>
                            <form id="allocationDataChange">
                                <div class="modal-body">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Datum</span>
                                        </div>
                                        <input type="date" class="form-control" id="dateChange" >
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >Vozilo</span>
                                        </div>
                                        <select id="vehicleChange" class="form-control"></select>

                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                                    <button type="submit" class="btn btn-primary" id="addNewPerson">Sačuvaj</button>
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
    <script src="/assets/js/allocation.js"></script>

</body>

</html>