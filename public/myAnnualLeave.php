<?php require 'auth.php';

if (!in_array($authRole,$myVacationRoles)){
    header('HTTP/1.0 403 Forbidden');
    header('Location: /403');

    exit();
}
if (isset($_SESSION['status_filter_id'])) {
    $statusFilters = isset($_SESSION['status_filter_id']) ? $_SESSION['status_filter_id'] : '';
    $showFilters = '';
    $clearFilters = '';

} else {
    $showFilters = 'display:none;';
    $clearFilters = 'display:none;';
    $nameFilters = '';
    $statusFilters = '';

}
$itemsPerPage = 10;
$current_page = 1;
?>
<!DOCTYPE html>
<html lang="en">
<?php include('layouts/head.php') ?>
<body>
<div class="app">
    <div class="layout">
        <?php include('layouts/header.php') ?>
        <?php include('layouts/sideNav.php') ?>
        <div class="page-container">
            <div class="main-content">
                <div class="page-header no-gutters has-tab">
                    <h2 class="font-weight-normal">Slobodni dani</h2>
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link  " data-toggle="tab" href="#tab-my-requests">Moji zahtjevi</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tab-calendar">Podnesite zahtjev</a>
                        </li>
                    </ul>
                </div>
                <div class="card">
                    <div class="tab-content m-t-5">
                        <div class="tab-pane fade  active show " id="tab-my-requests">

                            <div class="card-body">
                                <div id="alert"></div>
                                <div class="m-t-25">
                                    <button type="button" class="btn btn-primary m-b-15 m-r-10"
                                            id="showAnnualLeaveFilter">
                                        Filteri
                                    </button>
                                    <div class="card" id="filterAnnualLeave" style="<?= $showFilters ?>">
                                        <div class="card-body">
                                            <input type="hidden" id="status_filter_id"
                                                   value="<?php echo isset($_SESSION['status_filter_id']) ? $_SESSION['status_filter_id'] : '' ?>">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">Status</span>
                                                </div>
                                                <select id="statusFilter" class="form-control">
                                                    <option value="">Odaberite status</option>
                                                    <option value="1" <?= ($statusFilters == "1") ? 'selected' : '' ?>>
                                                        Aktivan
                                                    </option>
                                                    <option value="2" <?= ($statusFilters == "2") ? 'selected' : '' ?>>
                                                        Odobren
                                                    </option>
                                                    <option value="3" <?= ($statusFilters == "3") ? 'selected' : '' ?>>
                                                        Odbijen
                                                    </option>
                                                </select>
                                            </div>

                                        </div>
                                        <div class="card-footer">
                                            <div class="text-right">
                                                <button id="clearFilters" class="btn btn-danger"
                                                        style="<?= $clearFilters ?>">Poništi filtere
                                                </button>
                                                <button class="btn btn-primary" id="vacationFilter">Filtritaj</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-container">
                                        <table id="all-vacations-table" class="table">
                                            <thead>
                                            <tr>
                                                <th>Ime i prezime</th>
                                                <th>Status</th>
                                                <th>Broj dana</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                        <input hidden="" id="per_page" value="<?= $itemsPerPage ?>">
                                        <input hidden="" id="current_page" value="<?= $current_page ?>">
                                        <div id="pagination"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade " id="tab-calendar">
                            <div class="container">
                                <div class="row">
                                    <div class="col-12 col-sm-8">
                                        <div id='calendar'></div>
                                    </div>
                                    <div class="col-12 col-sm-4">
                                        <h3>Odabrani dani:</h3>
                                        <ul id="dates-list"></ul>
                                        <button class="d-none btn btn-primary m-b-15 m-r-10" id="sendRequest">Pošalji
                                            zathjev
                                        </button>
                                        <button class="d-none btn btn-danger m-b-15 m-r-10" id="clearDates" onclick="clearSelectedDates();">
                                            <i class="anticon anticon-delete"></i>  Ukloni selektovane datume
                                        </button>
                                        <div id="requestError"></div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <?php include('layouts/footer.php') ?>
        </div>
        <?php include('layouts/themeConfig.php') ?>
    </div>

    <input hidden="" value="<?= $authUser->id ?>" id="loggedUser">
</div>

<?php include('layouts/scripts.php') ?>
<script src="/assets/js/annualLeaveCalendar.js"></script>
<script src="/assets/js/myAnnualLeave.js"></script>

</body>

</html>