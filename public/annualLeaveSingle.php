<?php  require 'auth.php';

//if (!in_array($authRole,$myVacationRoles)){
//    header('HTTP/1.0 403 Forbidden');
//    header('Location: /403');
//
//    exit();
//}


if ($_GET['type']=='A'){
    $link='slobodni-dani';
    $naslov='Slobodni dani';
}else{
    $link='slobodni-dani-pregled';
    $naslov='Moji slobodni dani';
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
                    <h2 class="header-title">Zahtjev za slobodne dane</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <a class="breadcrumb-item" href="/<?=$link?>"><?=$naslov?></a>
                            <span class="breadcrumb-item active">Zahtjev za slobodne dane</span>
                        </nav>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="tab-content m-t-15">
                        <div class="tab-pane fade show active">
                            <div class="card">
                                <div class="card-body">
                                    <div id="annualLeaveAlert"></div>
                                    <div id="alertGetAnnualLeave"></div>
                                    <div class="annualLeaveDivCard">
                                        <div class="card-group">
                                            <div class="card" style="max-width: 400px">
                                                <ul class="list-group list-group-flus">
                                                    <?php if (in_array($authRole,$allVacationRoles) ){?>
                                                        <div class="card-footer" id="vacationChangeButton">
                                                            <div class="text-center m-t-5">
                                                                <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" id="changeAllocationDataButton" data-target="#vacation-modal">
                                                                    <i class="anticon anticon-form"></i>Izmijeni status zahtjeva za slobodne dane
                                                                </button>  </div>
                                                        </div>
                                                    <?php }?>
                                                    <li class="list-group-item">
                                                        <p>Zaposleni: <span class="employee m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Broj dana: <span class="daysNo m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Status: <span class="status m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <p>Komentar: <span class="comment m-b-0 text-dark font-weight-semibold"></span></p>
                                                    </li>
                                                </ul>

                                            </div>
                                            <div class="card">
                                                <div id="calendar" class="card-body"></div>
                                                <div id="vacation-dates" class="card-body"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <?php if (in_array($authRole,$allVacationRoles)){?>
                    <div class="modal fade" id="vacation-modal">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalCenterTitle">Izmijeni podatke o zahtjevu za slobodne dane</h5>
                                    <button type="button" class="close" data-dismiss="modal">
                                        <i class="anticon anticon-close"></i>
                                    </button>
                                </div>
                                <div id="vacationDataChangeError"></div>
                                <form id="allocationPersonChange">
                                    <div class="modal-body">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Status</span>
                                            </div>
                                            <select id="statusChange" class="form-control">
                                                <option value="">Odaberite status zahtjeva</option>
                                                <option value="3">Odbijen</option>
                                                <option value="2">Odobren</option>
                                            </select>
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" >Komentar</span>
                                            </div>
                                            <textarea id="noteChange" class="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                                        <button type="submit" class="btn btn-primary" id="editVacationData">Sačuvaj</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                <?php }?>

                <?php include ('layouts/footer.php')?>
            </div>
            <?php  include ('layouts/themeConfig.php')?>
        </div>
    </div>
    <input hidden="" value="<?=$authUser->id?>" id="loggedUser">
    <input hidden="" value="<?=$authRole?>" id="authRole">
    <input hidden="" value="" id="vacationId">


    <?php include ('layouts/scripts.php')?>
    <script src="/assets/js/userAuth.js"></script>
    <script src="/assets/js/annualLeaveSingle.js?v=1204.1"></script>

</body>

</html>