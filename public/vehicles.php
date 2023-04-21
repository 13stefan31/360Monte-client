<?php require 'auth.php'; ?>
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
                        <div id="alertVehicles"></div>
                        <div class="m-t-25">
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
                            <table id="vehicles-table" class="table">
                                <thead>
                                <tr>
                                    <th>Brend</th>
                                    <th>Model</th>
                                    <th>Godina</th>
                                    <th>Registarska oznaka</th>
                                    <th>Broj sjedišta</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody> </tbody>
                            </table>
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
<script src="/assets/js/vehicles.js"></script>

</body>

</html>