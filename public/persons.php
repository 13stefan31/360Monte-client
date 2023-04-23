<?php
require 'auth.php';

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
                                <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" id="newPersonButton" data-target="#newPerson">
                                    Novi unos
                                </button>
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
                            </div>
                        </div>
                    </div>
                </div>
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