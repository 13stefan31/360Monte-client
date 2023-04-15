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
                        <div class="alert alert-success">
                            <div class="d-flex align-items-center justify-content-start">
                                        <span class="alert-icon">
                                            <i class="anticon anticon-check-o"></i>
                                        </span>
                                <span>Uspješno ste unijeli novo vozilo</span>
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
                        <div class="m-t-25">
                            <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" data-target="#newVehicle">
                                Novi unos
                            </button>
                            <button type="button" class="btn btn-primary m-b-15 m-r-10" id="showVehicleFilter" >
                               Filteri
                            </button>
                            <div class="card" id="filterVehicles" style="display:none">
                                    <div class="card-body">
                                        <h4>Filteri</h4>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Naziv vozila</span>
                                            </div>
                                            <input type="text" class="form-control" placeholder="Unesite naziv vozila" aria-label="Unesite naziv vozila" aria-describedby="basic-addon1">
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Registarska oznaka</span>
                                            </div>
                                            <input type="text" class="form-control" placeholder="Unesite registarsku oznaku" aria-label="Unesite registarsku oznaku" aria-describedby="basic-addon1">
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Status vozila</span>
                                            </div>
                                            <input type="text" class="form-control" placeholder="Unesite status vozila" aria-label="Unesite status vozila" aria-describedby="basic-addon1">
                                        </div>

                                    </div>
                                    <div class="card-footer">
                                        <div class="text-right">
                                            <button class="btn btn-primary">Filtritaj</button>
                                        </div>
                                    </div>
                                </div>
                            <table id="data-table" class="table">
                                <thead>
                                <tr>
                                    <th>Vozilo</th>
                                    <th>Registarska oznaka</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Vozilo 1</td>
                                    <td>PG GG666</td>
                                    <td>Ispravno</td>
                                    <td>
                                        <div class="text-right">
                                            <a class="btn btn-primary m-r-5" href="vehicle.php"><i class="anticon anticon-plus"></i>Detalji</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Vozilo 2</td>
                                    <td>NK BB888</td>
                                    <td>Neispravno</td>
                                    <td>
                                        <div class="text-right">
                                            <a class="btn btn-primary m-r-5" href="vehicle.php"><i class="anticon anticon-plus"></i>Detalji</a>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
<!--                                <tfoot>-->
<!--                                <tr>-->
<!--                                    <th>Vozilo</th>-->
<!--                                    <th>Registarska oznaka</th>-->
<!--                                    <th>Status</th>-->
<!--                                    <th></th>-->
<!--                                </tr>-->
<!--                                </tfoot>-->
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="newVehicle">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Novi unos</h5>
                            <button type="button" class="close" data-dismiss="modal">
                                <i class="anticon anticon-close"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon3">Naziv</span>
                                </div>
                                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon3">Registarska oznaka</span>
                                </div>
                                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
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

</body>

</html>