<?php
require 'auth.php';
if (!in_array($authRole,$allocationAllowedRoles)){
    header('HTTP/1.0 403 Forbidden');
    header('Location: /pocetna');

    exit();
}
if(isset($_SESSION['allocation_filter_vehicle']) ||
    isset($_SESSION['allocation_filter_status']) ||
    isset($_SESSION['allocation_filter_tour']) ||
    isset($_SESSION['allocation_filter_date'])  ){
    $vehicleFilters = isset($_SESSION['allocation_filter_vehicle']) ? $_SESSION['allocation_filter_vehicle'] : '';
    $toursFilters = isset($_SESSION['allocation_filter_tour']) ? $_SESSION['allocation_filter_tour'] : '';
    $statusFilters = isset($_SESSION['allocation_filter_status']) ? $_SESSION['allocation_filter_status'] : '';
    $dateFilters = isset($_SESSION['allocation_filter_date']) ? $_SESSION['allocation_filter_date'] : '';
    $showFilters = '';
    $clearFilters = '';
}else{
    $showFilters = 'display:none;';
    $clearFilters = 'display:none;';
    $vehicleFilters = '';
    $toursFilters = '';
    $dateFilters = '';
    $statusFilters='';
}

$itemsPerPage = 5;
$current_page= 1;


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

                               <?php if (in_array($authRole,$allocationEditRoles)){?>
                                <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" id="newAllocationBtn" data-target="#newAllocation">
                                    Novi unos
                                </button>
                               <?php }?>
                                <button type="button" class="btn btn-primary m-b-15 m-r-10" id="showAllocationsFilter" >
                                    Filteri
                                </button>
                               <div class="card" id="filterAllocations" style="<?=$showFilters?>">
                                   <input type="hidden" id="allocation_filter_vehicle" value="<?php echo isset($_SESSION['allocation_filter_vehicle']) ? $_SESSION['allocation_filter_vehicle'] : '' ?>">
                                   <input type="hidden" id="allocation_filter_tour" value="<?php echo isset($_SESSION['allocation_filter_tour']) ? $_SESSION['allocation_filter_tour'] : '' ?>">
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
                                               <span class="input-group-text" id="basic-addon1">Tura</span>
                                           </div>
                                           <select id="tourFilterId" class="form-control"></select>
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
                               <div class="table-container">
                                <table id="allocations-table" class="table">
                                    <thead>
                                        <tr>
                                            <th>Datum</th>
                                            <th>Vozilo</th>
                                            <th>Registraciona oznaka vozila</th>
                                            <th>Tura</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                                   <input hidden="" id="per_page" value="<?=$itemsPerPage?>">
                                   <input hidden="" id="current_page" value="<?=$current_page?>">
                                   <div id="pagination"></div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
<?php if (in_array($authRole,$allocationEditRoles)){?>
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
                                 <p class="error"></p>
                                  </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon3">Vozilo</span>
                                    </div>
                                    <select id="vehicleAdd" class="form-control"></select>
                                    <p class="error"></p>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon3">Tura</span>
                                    </div>
                                    <select id="tourAdd" class="form-control"></select>
                                    <p class="error"></p>
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
                <?php }?>
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