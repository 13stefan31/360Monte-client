<?php
require 'auth.php';
if (!in_array($authRole,$personAllowedRoles)){
    header('HTTP/1.0 403 Forbidden');
    exit();
}
if(isset($_SESSION['person_filter_name']) || isset($_SESSION['person_filter_rola_id'])){
    $nameFilters = isset($_SESSION['person_filter_name']) ? $_SESSION['person_filter_name'] : '';
    $roleIdFilters = isset($_SESSION['person_filter_rola_id']) ? $_SESSION['person_filter_rola_id'] : '';
    $showFilters = '';
    $clearFilters = '';

}else{
    $showFilters = 'display:none;';
    $clearFilters = 'display:none;';
    $nameFilters = '';
    $roleIdFilters = '';

}
$itemsPerPage = 10;
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
                        <h2 class="header-title">Zaposleni</h2>
                        <div class="header-sub-title">
                            <nav class="breadcrumb breadcrumb-dash">
                                <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                                <span class="breadcrumb-item active">Zaposleni</span>
                            </nav>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div id="alert"></div>
                            <div class="m-t-25">
                                <?php if (in_array($authRole,$personAllowedRoles)){?>
                                    <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" id="newPersonButton" data-target="#newPerson">
                                        Novi unos
                                    </button>
                                <?php }?>
                                <button type="button" class="btn btn-primary m-b-15 m-r-10" id="showPersonsFilter" >
                                    Filteri
                                </button>
                                <div class="card" id="filterPersons" style="<?=$showFilters?>">
                                    <div class="card-body">
                                        <h4>Filteri</h4>
                                        <input type="hidden" id="person_filter_rola_id" value="<?php echo isset($_SESSION['person_filter_rola_id']) ? $_SESSION['person_filter_rola_id'] : '' ?>">
                                        <div class="input-group mb-3">
                                             <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Ime i prezime</span>
                                            </div>
                                            <input type="text" class="form-control" id="personFilterName" placeholder="Unesite ime i prezime" aria-label="Unesite ime" aria-describedby="basic-addon1" value="<?=$nameFilters?>">
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Rola</span>
                                            </div>
                                            <select id="rolaFilterId" class="form-control"></select>
                                        </div>

                                    </div>
                                    <div class="card-footer">
                                        <div class="text-right">
                                            <button id="clearFilters" class="btn btn-danger" style="<?=$clearFilters?>">Poništi filtere</button>
                                            <button class="btn btn-primary" id="persosnsFilter">Filtritaj</button>
                                        </div>
                                    </div>
                                </div>
                                <div id="alertAddUser"></div>
                                <div id="alertDeleteUser"></div>
                                <div class="table-container">
                                    <table id="persons-table" class="table">
                                        <thead>
                                        <tr>
                                            <th>Ime i prezime</th>
                                            <th>Email</th>
                                            <th>Username</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                    <input hidden="" id="per_page" value="<?=$itemsPerPage?>">
                                    <input hidden="" id="current_page" value="<?=$current_page?>">
                                    <div id="pagination"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <?php if (in_array($authRole,$personAllowedRoles)){?>
                <div class="modal fade" id="newPerson">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Novi unos</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <i class="anticon anticon-close"></i>
                                </button>
                            </div>
                            <form id="personAdd">
                            <div class="modal-body">
                                <div id="employeeAddError"></div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"  >Ime i prezime</span>
                                    </div>
                                    <input type="text" class="form-control" id="name" aria-describedby="basic-addon3" placeholder="Unesite ime i prezime">

                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" >Email</span>
                                    </div>
                                    <input type="text" class="form-control" id="email" aria-describedby="basic-addon3" placeholder="Unesite email">

                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Rola</span>
                                    </div>
                                    <select id="rolaId" class="form-control"></select>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                                <button type="submit" class="btn btn-primary" id="addNewPerson">Sačuvaj</button>
                            </div>
                            </form>
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
<script src="/assets/js/persons.js"></script>

</body>

</html>