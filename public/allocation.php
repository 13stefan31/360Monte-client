
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
                                    <div class="table-responsive">
                                        <table class="product-info-table m-t-20">
                                            <tbody>
                                            <tr>
                                                <td>Vozač:</td>
                                                <td class="text-dark font-weight-semibold"></td>
                                            </tr>
                                            <tr>
                                                <td>Vodič:</td>
                                                <td class="text-dark font-weight-semibold"></td>
                                            </tr>
                                            <tr>
                                                <td>U paru sa vozačem?</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Datum:</td>
                                                <td class="text-dark font-weight-semibold allocationDate">23.06.2023</td>
                                            </tr>
                                            <tr>
                                                <td>Vozilo:</td>
                                                <td class="allocationVehicle"></td>
                                            </tr>
                                            <tr>
                                                <td>Registraciona oznaka vozila:</td>
                                                <td class="allocationVehicleRegNo"></td>
                                            </tr>
                                            <tr>
                                                <td>Broj sjedišta vozila:</td>
                                                <td class="allocationVehicleSeatsNo"></td>
                                            </tr>
                                            <tr>
                                                <td>Status:</td>
                                                <td>
                                                    <span class="allocationStatus"></span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
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