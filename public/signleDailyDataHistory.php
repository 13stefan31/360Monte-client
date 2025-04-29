<?php  require 'auth.php';
if (!in_array($authRole,$dailyDataHistoryAllowedRoles) && $authUser->email!="nikola.kontic@360monte.me"){
    header('HTTP/1.0 403 Forbidden');
    header('Location: /403');
    exit();
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
                    <h2 class="header-title">Istorija dnevnog podataka</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <a class="breadcrumb-item" href="/istorija-dnevnih-podataka">Istorija dnevnih podataka</a>
                            <span class="breadcrumb-item active">Istorija dnevnog podataka</span>
                        </nav>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="tab-content m-t-15">
                        <div class="tab-pane fade show active">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Informacije</h4>
                                    <div id="dailyDataAlert"></div>
                                    <div id="alertGetDailyData"></div>
                                    <div class="dailyDataDivCard">
                                        <div class="card-group">
                                            <div class="card">
                                                <li class="list-group-item">
                                                    <div class="text-center m-t-5">
                                                        <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" id="changeDailyDataButton" data-target="#daily-data-change-modal">
                                                            <i class="anticon anticon-form"></i>Izmijeni podatke
                                                        </button>  </div>
                                                </li>
                                                <ul class="list-group list-group-flus">
                                                    <li class="list-group-item">
                                                        <p>Vozilo: <span class="dailyDataVehicle m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Početna kilometraža: <span class="dailyDataStartingM m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Krajnja kilometraža: <span class="dailyDataEndingM m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Pređeni dnevni put (KM): <span class="dailyDataDistance m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Cijena goriva (EUR): <span class="dailyDataFuelP m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Količina goriva (L): <span class="dailyDataFuelQ m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Datum: <span class="dailyData m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Kreirano: <span class="dailyDataCreated m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="card">
                                                <div class="table-responsive">
                                                    <table id="drivers-tabele" class="table">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">Vozilo koristio</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                    <div class="modal fade" id="daily-data-change-modal">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalCenterTitle">Izmijeni podatke </h5>
                                    <button type="button" class="close" data-dismiss="modal">
                                        <i class="anticon anticon-close"></i>
                                    </button>
                                </div>
                                <div id="dailyDataChangeError"></div>
                                <form id="change-form">
                                    <div class="modal-body">

                                        <input hidden="" id="dataId">
                                        <input hidden="" id="vehicleId">
                                        <input hidden="" id="driverId">

                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Vozilo</span>
                                            </div>
                                            <select id="vehicleDailyEdit" class="form-control"></select>

                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" >Vozač</span>
                                            </div>
                                            <select id="empDailyEdit" class="form-control"></select>
                                            <p class="error"></p>
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" >Početna kilometraža:</span>
                                            </div>
                                            <input type="number" id="smChange" class="form-control" />
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" >Krajnja kilometraža:</span>
                                            </div>
                                            <input type="number" id="emChange" class="form-control" />
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" >Cijena goriva (EUR):</span>
                                            </div>
                                            <input type="number" id="fpChange" class="form-control" />
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" >Količina goriva (L):</span>
                                            </div>
                                            <input type="number" id="qpChange" class="form-control" />
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" >Datum:</span>
                                            </div>
                                            <input type="date" id="dateChange" class="form-control" />
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                                        <button type="submit" class="btn btn-primary" id="editDailyData">Sačuvaj</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                <?php include ('layouts/footer.php')?>
            </div>
            <?php  include ('layouts/themeConfig.php')?>
        </div>
    </div>
    <input hidden="" value="<?=$authUser->id?>" id="loggedUser">
    <input hidden="" value="<?=$authRole?>" id="authRole">

    <?php include ('layouts/scripts.php')?>
    <script src="/assets/js/userAuth.js"></script>
    <script src="/assets/js/singleDailyDataHistory.js?v=2904"></script>

</body>

</html>