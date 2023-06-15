<?php require 'auth.php';
if (!in_array($authRole,$reportAllowedRoles)){

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
        <!-- Page Container START -->
        <div class="page-container">
            <!-- Content Wrapper START -->
            <div class="main-content">
                <div class="page-header">
                    <h2 class="header-title personName"></h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <span class="breadcrumb-item active  ">Izvještaj</span>
                        </nav>
                    </div>
                </div><div class="card">

                    <div class="card-header">
                        <h4 class="card-title">Izvještaj</h4>
                    </div>
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
                                    <input type="date" id="dateFromReport" class="form-control" placeholder="Unesite datum" aria-label="Unesite datum" value="<?php echo $dateFilters; ?>">
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="font-weight-semibold" >Krajnji datum:</label>
                                    <input type="date" id="dateToReport" class="form-control" placeholder="Unesite datum" aria-label="Unesite datum" value="<?php echo $dateFilters; ?>">
                                </div>
                            </div>
                            <div id="reportMessage"></div>
                            <div>
                                <button class="btn btn-tone btn-primary float-right" id="generateReport">Generiši</button>
                            </div>
                        </form>
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
<script src="/assets/js/report.js"></script>

</body>

</html>