<?php  require 'auth.php';
//if (!in_array($authRole,$worksHistoryAllowedRoles)){
//    header('HTTP/1.0 403 Forbidden');
//    header('Location: /403');
//    exit();
//}
//$active = isset($_GET['active']) ? $_GET['active'] : null;

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
                                <a class="breadcrumb-item" href="" id="backLink">Aktivni kvarovi vozila</a>
                                <span class="breadcrumb-item active">Aktivni kvar</span>
                        </nav>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="tab-content m-t-15">
                        <div class="tab-pane fade show active">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Informacije
                                    </h4>
                                    <div id="alertGetActiveData"></div>
                                    <div class="activeDataDivCard">
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
                                                    <li class="list-group-item">
                                                                                                            <p>Opis: <span class="workDesc m-b-0 text-dark font-weight-semibold"></span></p>
                                                                                                        </li>
                                                </ul>
                                            </div>
<!--                                            <div class="card">-->
<!--                                                <div class="table-responsive">-->
<!--                                                    <table id="mehanic-tabele" class="table">-->
<!--                                                        <thead>-->
<!--                                                        <tr>-->
<!--                                                            <th scope="col" colspan="3" class="text-center" style="background-color: #ededed">MAJSTOR </th>-->
<!--                                                        </tr>-->
<!--                                                        <tr>-->
<!--                                                            <th scope="col">Način plaćanja </th>-->
<!--                                                            <th scope="col" class="mehanicPayMethod"></th>-->
<!--                                                        </tr>-->
<!--                                                        </thead>-->
<!--                                                        <tbody>-->
<!--                                                        </tbody>-->
<!--                                                    </table>-->
<!--                                                </div>-->
<!--                                                <div class="table-responsive">-->
<!--                                                    <table id="parts-tabele" class="table">-->
<!--                                                        <thead>-->
<!--                                                        <tr>-->
<!--                                                            <th scope="col" colspan="3" class="text-center" style="background-color: #ededed">DJELOVI </th>-->
<!--                                                        </tr>-->
<!--                                                        <tr>-->
<!--                                                            <th scope="col">Način plaćanja </th>-->
<!--                                                            <th scope="col" class="partsPayMethod"></th>-->
<!--                                                        </tr>-->
<!--                                                        </thead>-->
<!--                                                        <tbody>-->
<!--                                                        </tbody>-->
<!--                                                    </table>-->
<!--                                                </div>-->
<!--                                                <li class="list-group-item">-->
<!--                                                    <p>Opis: <span class="workDesc m-b-0 text-dark font-weight-semibold"></span></p>-->
<!--                                                </li>-->
<!--                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    <script src="/assets/js/activeSingleWorkData.js?v=1"></script>

</body>

</html>