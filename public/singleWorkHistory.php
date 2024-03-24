<?php  require 'auth.php';
if (!in_array($authRole,$worksHistoryAllowedRoles)){
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
                    <h2 class="header-title">Istorija rada</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <a class="breadcrumb-item" href="/istorija-radova">Istorija radova</a>
                            <span class="breadcrumb-item active">Istorija rada</span>
                        </nav>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="tab-content m-t-15">
                        <div class="tab-pane fade show active">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Informacije
                                        <button type="button" class="btn btn-primary m-l-15" data-toggle="modal" id="changeWorkDataButton" data-target="#editWorkHistory">
                                            <i class="anticon anticon-form"></i>Izmijeni podatke
                                        </button> </h4>
                                    <div id="dailyDataAlert"></div>
                                    <div id="alertGetDailyData"></div>
                                    <div class="dailyDataDivCard">
                                        <div class="card-group">
                                            <div class="card">
                                                <ul class="list-group list-group-flus">
                                                    <li class="list-group-item">
                                                        <p>Vozilo: <span class="workDataVehicle m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Kategorija kvara: <span class="workBreakCategory m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Potkategorija kvara: <span class="workBreakSubcategory m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Kvar se desio na: <span class="workBreakMileage m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Početak: <span class="workStarted m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Kraj: <span class="workEnding m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Kreirano: <span class="workBreakCreated m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Kreirao: <span class="workCreatedBy m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="card">
                                                <div class="table-responsive">
                                                    <table id="mehanic-tabele" class="table">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col" colspan="3" class="text-center" style="background-color: #ededed">MAJSTOR </th>
                                                        </tr>
                                                        <tr>
                                                            <th scope="col">Način plaćanja </th>
                                                            <th scope="col" class="mehanicPayMethod"></th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="table-responsive">
                                                    <table id="parts-tabele" class="table">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col" colspan="3" class="text-center" style="background-color: #ededed">DJELOVI </th>
                                                        </tr>
                                                        <tr>
                                                            <th scope="col">Način plaćanja </th>
                                                            <th scope="col" class="partsPayMethod"></th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <li class="list-group-item">
                                                    <p>Opis: <span class="workDesc m-b-0 text-dark font-weight-semibold"></span></p>
                                                </li>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="editWorkHistory">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Izmijeni podatke</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <i class="anticon anticon-close"></i>
                                </button>
                            </div>
                            <form id="workHistoryEdit">
                                <input type="text" class="form-control" id="workIdEdit" name="workIdEdit" hidden="" readonly>
                                <div class="modal-body">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Prijavio</span>
                                        </div>
                                        <select id="reportedByEdit" name="reportedByEdit" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Vozilo</span>
                                        </div>
                                        <select id="vehicleEdit" name="vehicleEdit" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >Početak</span>
                                        </div>
                                        <input type="date"  class="form-control" id="startingDateEdit" name="startingDateEdit" aria-describedby="basic-addon3">
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"  >Kraj </span>
                                        </div>
                                        <input type="date" class="form-control" id="endingDateEdit" name="endingDateEdit" aria-describedby="basic-addon3">
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Kategorija</span>
                                        </div>
                                        <select id="workCategoryEdit" name="workCategoryEdit" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Potkategorija</span>
                                        </div>
                                        <select id="workSubcategoryEdit" name="workSubcategoryEdit" class="form-control"></select>
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
                                                <select id="vehiclePartsPaymentMethodEdit" name="vehiclePartsPaymentMethodEdit" class="form-control">
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
                                                    <input type="text" class="form-control" id="partsPriceCardEdit" name="partsPriceCardEdit" aria-describedby="basic-addon3" placeholder="EUR">
                                                </div>
                                                <div class="col-6">
                                                    <input type="text" class="form-control" id="partsPriceCacheEdit" name="partsPriceCacheEdit" aria-describedby="basic-addon3" placeholder="EUR">
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
                                                <select id="mechanicPaymentMethodEdit" name="mechanicPaymentMethodEdit" class="form-control">
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
                                                    <input type="text" class="form-control" id="mechanicPriceCardEdit" name="mechanicPriceCardEdit" aria-describedby="basic-addon3" placeholder="EUR">
                                                </div>
                                                <div class="col-6">
                                                    <input type="text" class="form-control" id="mechanicPriceCacheEdit" name="mechanicPriceCacheEdit" aria-describedby="basic-addon3" placeholder="EUR">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="input-group mb-3 mt-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"  >Opis</span>
                                        </div>
                                        <textarea type="text" class="form-control" id="descriptionEdit" name="descriptionEdit" aria-describedby="basic-addon3" placeholder="Unesite opis kvara i popravke"></textarea>
                                    </div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Kvar se desio na</span>
                                        </div>
                                        <input type="text" class="form-control" id="breakDownMileageEdit" name="breakDownMileageEdit" aria-describedby="basic-addon3" placeholder="KM">
                                    </div>

                                    <div id="workHistoryEditError"></div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                                    <button type="submit" class="btn btn-primary" id="editWorkHistoryButton">Izmijeni</button>
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
    <script src="/assets/js/singleWorkData.js?v=1"></script>

</body>

</html>