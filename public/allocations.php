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
                        <h2 class="header-title">Alokacije</h2>
                        <div class="header-sub-title">
                            <nav class="breadcrumb breadcrumb-dash">
                                <a href="#" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                                <span class="breadcrumb-item active">Alokacije</span>
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
                                    <span>Uspješno ste unijeli novu alokaciju</span>
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

                                <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" data-target="#newAllocation">
                                    Novi unos
                                </button>
                                <button type="button" class="btn btn-primary m-b-15 m-r-10" id="showAllocationsFilter" >
                                    Filteri
                                </button>
                                <div class="card" id="filterAllocations" style="display:none">
                                    <div class="card-body">
                                        <h4>Filteri</h4>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Vozilo</span>
                                            </div>
                                            <input type="text" class="form-control" placeholder="Unesite naziv vozila" aria-label="Unesite naziv vozila" aria-describedby="basic-addon1">
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Datum</span>
                                            </div>
                                            <input type="date" class="form-control" placeholder="Unesite datum" aria-label="Unesite datum" aria-describedby="basic-addon1">
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Email</span>
                                            </div>
                                            <input type="text" class="form-control" placeholder="Unesite email" aria-label="Unesite email" aria-describedby="basic-addon1">
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
                                            <th>Vozač</th>
                                            <th>Vodič</th>
                                            <th>Vozilo</th>
                                            <th>Datum</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Marko Marković</td>
                                            <td>Marko Marković</td>
                                            <td>Vozilo 1</td>
                                            <td>23.06.2023</td>
                                            <td>
                                                <span class="badge badge-pill badge-cyan font-size-13">Prihvaćeno</span>
                                            </td>
                                            <td><a class="btn btn-primary m-r-5" href="allocation.php"><i class="anticon anticon-plus"></i>Detalji</a></td>
                                        </tr>
                                        <tr>
                                            <td>Janko Janković</td>
                                            <td>Marko Marković</td>
                                            <td>Vozilo 11</td>
                                            <td>23.06.2023</td>
                                            <td>
                                                <span class="badge badge-pill badge-gold font-size-13">Na čekanju</span>
                                            </td>
                                            <td><a class="btn btn-primary m-r-5" href="allocation.php"><i class="anticon anticon-plus"></i>Detalji</a></td>
                                        </tr>
                                        <tr>
                                            <td>Janko Janković</td>
                                            <td>Marko Marković</td>
                                            <td>Vozilo 11</td>
                                            <td>23.06.2023</td>
                                            <td>
                                                <span class="badge badge-pill badge-blue font-size-13">Nije odgovoreno</span>
                                            </td>
                                            <td><a class="btn btn-primary m-r-5" href="allocation.php"><i class="anticon anticon-plus"></i>Detalji</a></td>
                                        </tr>
                                        <tr>
                                            <td>Janko Janković</td>
                                            <td>Marko Marković</td>
                                            <td>Vozilo 11</td>
                                            <td>23.06.2023</td>
                                            <td>
                                                <span class="badge badge-pill badge-red font-size-13">Odbijeno</span>
                                            </td>
                                            <td><a class="btn btn-primary m-r-5" href="allocation.php"><i class="anticon anticon-plus"></i>Detalji</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="newAllocation">
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
                                        <span class="input-group-text" id="basic-addon3">Vozač</span>
                                    </div>
                                    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
                                </div>
                                <div class="checkbox float-right">
                                    <input id="checkbox2" type="checkbox">
                                    <label for="checkbox2">Vozač je vodič</label>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon3">Vodič</span>
                                    </div>
                                    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
                                </div>

                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon3">Vozilo</span>
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