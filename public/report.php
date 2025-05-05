<?php require 'auth.php';
if (!in_array($authRole,$reportAllowedRoles) && $authUser->email!="nikola.kontic@360monte.me" && $authUser->email!="nikolina@360monte.me"){

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
                    <h2 class="header-title personName"></h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <span class="breadcrumb-item active  ">Izvještaji</span>
                        </nav>
                    </div>
                </div>
                <div class="accordion" id="accordion-default">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">
                                <a data-toggle="collapse" href="#collapseOneDefault">
                                    <span>Alokacija zaposlenog po turi</span>
                                </a>
                            </h5>
                        </div>
                        <div id="collapseOneDefault" class="collapse show" data-parent="#accordion-default">
                            <div class="card-body">

                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="font-weight-semibold">Tura:</label>
                                            <select id="toursSelectReport" class="form-control">
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="font-weight-semibold" >Zaposleni:</label>
                                            <select id="employeeSelectReport" class="form-control">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="font-weight-semibold" >Početni datum:</label>
                                            <input type="date" id="dateFromReport" class="form-control" placeholder="Unesite datum" aria-label="Unesite datum"  >
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="font-weight-semibold" >Krajnji datum:</label>
                                            <input type="date" id="dateToReport" class="form-control" placeholder="Unesite datum" aria-label="Unesite datum"  >
                                        </div>
                                    </div>
                                    <div>
                                        <button class="btn btn-primary m-r-5 float-right mb-3" id="generateReport"><i class="anticon anticon-download"></i> Preuzmi izvještaj</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">
                                <a class="collapsed" data-toggle="collapse" href="#collapseTwoDefault">
                                    <span>Alokacija tura po vodiču</span>
                                </a>
                            </h5>
                        </div>
                        <div id="collapseTwoDefault" class="collapse" data-parent="#accordion-default">
                            <div class="card-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label class="font-weight-semibold" >Zaposleni:</label>
                                            <select id="employeeSelectReport2" class="form-control">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="font-weight-semibold" >Početni datum:</label>
                                            <input type="date" id="dateFromReport2" class="form-control" placeholder="Unesite datum" aria-label="Unesite datum"  >
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="font-weight-semibold" >Krajnji datum:</label>
                                            <input type="date" id="dateToReport2" class="form-control" placeholder="Unesite datum" aria-label="Unesite datum" >
                                        </div>
                                    </div>
                                    <div>
                                        <button class="btn btn-primary m-r-5 float-right mb-3" id="generateReport2"><i class="anticon anticon-download"></i> Preuzmi izvještaj</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">
                                <a class="collapsed" data-toggle="collapse" href="#collapseThreeDefault">
                                    <span>Poređenje potrošnje goriva</span>
                                </a>
                            </h5>
                        </div>
                        <div id="collapseThreeDefault" class="collapse" data-parent="#accordion-default">
                            <div class="card-body">
                                <form>

                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="font-weight-semibold" >Vozilo:</label>
                                            <select id="vehicleSelectReport3" class="form-control">
                                                <option></option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="font-weight-semibold" >Datum:</label>
                                            <input type="date" id="dateToReport3" class="form-control" placeholder="Unesite datum" aria-label="Unesite datum"  >
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="font-weight-semibold" >Zaposleni:</label>
                                            <select id="employeeSelectReport3" class="form-control">
                                                <option></option>
                                            </select>
                                        </div>

                                        <div class="form-group col-md-6 ">
                                            <label class="font-weight-semibold" >Zaposleni za poređenje:</label>
                                            <select id="employeeSelectCompareReport3" class="form-control">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <button class="btn btn-primary m-r-5 float-right mb-3" id="generateReport3"><i class="anticon anticon-download"></i> Preuzmi izvještaj</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">
                                <a class="collapsed" data-toggle="collapse" href="#collapse4Default">
                                    <span>Broj polazaka za turu</span>
                                </a>
                            </h5>
                        </div>
                        <div id="collapse4Default" class="collapse " data-parent="#accordion-default">
                            <div class="card-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label class="font-weight-semibold">Tura:</label>
                                            <select id="toursSelectReport1" class="form-control">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="font-weight-semibold" >Početni datum:</label>
                                            <input type="date" id="dateFromReport1" class="form-control" placeholder="Unesite datum" aria-label="Unesite datum"  >
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="font-weight-semibold" >Krajnji datum:</label>
                                            <input type="date" id="dateToReport1" class="form-control" placeholder="Unesite datum" aria-label="Unesite datum"  >
                                        </div>
                                    </div>
                                    <div>
                                        <button class="btn btn-primary m-r-5 float-right mb-3" id="generateReport4"><i class="anticon anticon-download"></i> Preuzmi izvještaj</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php include ('layouts/footer.php')?>
        </div>
        <?php include ('layouts/themeConfig.php')?>
    </div>
</div>

<?php include ('layouts/scripts.php')?>
<script src="/assets/js/userAuth.js"></script>
<script src="/assets/js/report.js?v=1.2"></script>

</body>

</html>