<?php
require 'auth.php';
if(isset($_SESSION['allocation_filter_vehicle']) ||
    isset($_SESSION['allocation_filter_status']) ||
    isset($_SESSION['allocation_filter_date'])  ){
    $vehicleFilters = isset($_SESSION['allocation_filter_vehicle']) ? $_SESSION['allocation_filter_vehicle'] : '';
    $statusFilters = isset($_SESSION['allocation_filter_status']) ? $_SESSION['allocation_filter_status'] : '';
    $dateFilters = isset($_SESSION['allocation_filter_date']) ? $_SESSION['allocation_filter_date'] : '';
    $showFilters = '';
    $clearFilters = '';
}else{
    $showFilters = 'display:none;';
    $clearFilters = 'display:none;';
    $vehicleFilters = '';
    $dateFilters = '';
    $statusFilters='';
}

$total_items = 10;
$per_page=3;
$current_page= 1;
$offset = ($current_page - 1) * $per_page;
$total_pages = ceil($total_items / $per_page);

//"currentPage": 1,
//        "from": 1,
//        "lastPage": 2,
//        "itemsPerPage": 4,
//        "totalItems": 6


?>
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
                                <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                                <span class="breadcrumb-item active">Alokacije</span>
                            </nav>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div id="alertAddAllocationSuccess">  </div>
                            <div id="allocationAlert"> </div>
                            <div id="alertDeleteAllocation"></div>
                            <div class="m-t-25">
                                <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" id="newAllocationBtn" data-target="#newAllocation">
                                    Novi unos
                                </button>
                                <button type="button" class="btn btn-primary m-b-15 m-r-10" id="showAllocationsFilter" >
                                    Filteri
                                </button>
                               <div class="card" id="filterAllocations" style="<?=$showFilters?>">
                                   <input type="hidden" id="allocation_filter_vehicle" value="<?php echo isset($_SESSION['allocation_filter_vehicle']) ? $_SESSION['allocation_filter_vehicle'] : '' ?>">
                                    <input type="hidden" id="allocation_filter_date" value="<?php echo isset($_SESSION['allocation_filter_date']) ? $_SESSION['allocation_filter_date'] : '' ?>">
                                   <div class="card-body">
                                        <h4>Filteri</h4>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Vozilo</span>
                                            </div>
                                            <select id="vehicleFilterId" class="form-control"></select>
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Datum</span>
                                            </div>
                                            <input type="date" id="dateFilter" class="form-control" placeholder="Unesite datum" aria-label="Unesite datum" aria-describedby="basic-addon1" value="<?php echo $dateFilters; ?>">
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Status</span>
                                            </div>
                                            <select id="statusFilter" class="form-control">
                                                <option value="">Odaberite status alokacije</option>
                                                <option value="0"<?php if ($statusFilters == '0') echo ' selected'; ?>>Pending</option>
                                                <option value="1"<?php if ($statusFilters == '1') echo ' selected'; ?>>Confirmed</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div class="card-footer">
                                        <div class="text-right">
                                            <button id="clearFilters" class="btn btn-danger" style="<?=$clearFilters?>">Poništi filtere</button>
                                            <button class="btn btn-primary" id="allocationsFilter">Filtritaj</button>
                                        </div>
                                    </div>
                                </div>
                                <table id="allocations-table" class="table">
                                    <thead>
                                        <tr>
                                            <th>Datum</th>
                                            <th>Vozilo</th>
                                            <th>Registraciona oznaka vozila</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
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
                            <div id="alertAddAllocationError"></div>

                            <form id="allocationAdd">
                            <div class="modal-body">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon3">Datum</span>
                                    </div>
                                    <input type="date" class="form-control" id="allocationDate" aria-describedby="basic-addon3">
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon3">Vozilo</span>
                                    </div>
                                    <select id="vehicleAdd" class="form-control"></select>
                                </div>
                            </div>
                            </form>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                                <button type="button" class="btn btn-primary" id="addNewAllocation">Sačuvaj</button>
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
    <script src="/assets/js/allocations.js"></script>
</body>

</html>