<?php  require 'auth.php';
if (!in_array($authRole,$allocationAllowedRoles)){
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
                    <h2 class="header-title">Alokacija</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <a class="breadcrumb-item" href="/alokacije">Alokacije</a>
                            <span class="breadcrumb-item active">Alokacija</span>
                        </nav>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="tab-content m-t-15">
                        <div class="tab-pane fade show active">
                            <div class="card">
                                <div class="card-body">
<!--                                    staviti ovaj prvi div za svaki error-->
                                    <h4 class="card-title">Informacije</h4>
                                    <div id="allocationAlert"></div>
                                    <div id="alertGetAllocation"></div>
                                    <div class="allocationDivCard">
                                    <div class="card-group">
                                        <div class="card">
                                            <ul class="list-group list-group-flus">
                                                <li class="list-group-item">
                                                    <p>Status:</p><p class="allocationStatus m-b-0 text-dark font-weight-semibold"></p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="card-group">
                                        <div class="card">
                                            <ul class="list-group list-group-flus">
                                                <?php if (in_array($authRole,$allocationEditRoles)){?>
                                                <div class="card-footer">
                                                    <div class="text-center m-t-5">
                                                        <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" id="changeAllocationDataButton" data-target="#vehicle-date-change-modal">
                                                            <i class="anticon anticon-form"></i>Izmijeni podatke o datumu i vozilu
                                                        </button>  </div>
                                                </div>
                                                <?php }?>
                                                <li class="list-group-item">
                                                        <p>Datum:</p><p class="allocationDate m-b-0 text-dark font-weight-semibold"></p>
                                                </li>
                                                <li class="list-group-item">
                                                    <p>Tura:</p><p class="allocationTour m-b-0 text-dark font-weight-semibold"></p>
                                                </li>
                                                <li class="list-group-item">
                                                    <p>Vozilo:</p><p class="allocationVehicle m-b-0 text-dark font-weight-semibold"></p>
                                                </li>
                                                <li class="list-group-item">
                                                    <p>Registraciona oznaka vozila:</p><p class="allocationVehicleRegNo m-b-0 text-dark font-weight-semibold"></p>
                                                </li>
                                                <li class="list-group-item">
                                                    <p>Broj sjedišta vozila:</p><p class="allocationVehicleSeatsNo m-b-0 text-dark font-weight-semibold"></p>
                                                </li>
                                            </ul>

                                        </div>
                                        <div class="card">
                                            <ul class="list-group list-group-flus">
                                                <?php if (in_array($authRole,$allocationEditRoles)){?>
                                                <div class="card-footer">
                                                    <div class="text-center m-t-5">
                                                        <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" id="addEmpAllocationButton" data-target="#allocation-add-person-modal">
                                                            <i class="anticon anticon-usergroup-add"></i>Dodaj osobe
                                                        </button>
                                                    </div>
                                                </div>
                                                <?php } ?>
                                                <div class="table-responsive">
                                                    <table id="allocation-stuff-tabele" class="table">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">Pozicija</th>
                                                            <th scope="col">Ime i prezime</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="card-footer">
                                                    <div class="alert alert-info">
                                                        <p>Komentar:</p><p class="allocationNote m-b-0 text-dark font-weight-semibold"></p>
                                                    </div>
                                                </div>
                                            </ul>
                                       </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <?php if (in_array($authRole,$allocationEditRoles)){?>
                <div class="modal fade" id="vehicle-date-change-modal">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Izmijeni podatke o datumu i vozilu</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <i class="anticon anticon-close"></i>
                                </button>
                            </div>
                            <div id="allocationDataChangeError"></div>
                            <form id="allocationPersonChange">
                                <div class="modal-body">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Datum</span>
                                        </div>
                                        <input type="date" class="form-control" id="dateChange" >
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >Vozilo</span>
                                        </div>
                                        <select id="vehicleChange" class="form-control"></select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >Tura</span>
                                        </div>
                                        <select id="tourChange" class="form-control"></select>
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
                                    <button type="submit" class="btn btn-primary" id="editAllocationData">Sačuvaj</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="allocation-add-person-modal">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Dodaj zapolsenog</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <i class="anticon anticon-close"></i>
                                </button>
                            </div>
                            <div id="allocationPersonAddError"></div>
                            <form id="allocationPersonAddForm">
                                <div class="modal-body">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Zaposleni</span>
                                        </div>
                                        <select id="empAddAllocation" class="form-control"></select>
                                        <p class="error"></p>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >Pozicija</span>
                                        </div>
                                        <select id="empPositionAddAllocation" class="form-control"></select>
                                        <p class="error"></p>

                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                                    <button type="submit" class="btn btn-primary" id="addEmpAllocation">Sačuvaj</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="allocation-edit-person-modal">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Izmijeni</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <i class="anticon anticon-close"></i>
                                </button>
                            </div>
                            <div id="allocationPersonEditError"></div>
                            <form id="allocationPersonAddForm">
                                <input hidden="" id="stuffId">
                                <input hidden="" id="allocationId">
                                <div class="modal-body">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Zaposleni</span>
                                        </div>
                                        <select id="empEditAllocation" class="form-control"></select>
                                        <p class="error"></p>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >Pozicija</span>
                                        </div>
                                        <select id="empPositionEditAllocation" class="form-control"></select>
                                        <p class="error"></p>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
                                    <button type="submit" class="btn btn-primary" id="updateEmpAllocation">Sačuvaj</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <?php }?>
<!--                <div class="modal fade" id="allocation-status-update-person-modal">-->
<!--                    <div class="modal-dialog modal-dialog-centered">-->
<!--                        <div class="modal-content">-->
<!--                            <div class="modal-header">-->
<!--                                <h5 class="modal-title" id="exampleModalCenterTitle">Izmijeni status</h5>-->
<!--                                <button type="button" class="close" data-dismiss="modal">-->
<!--                                    <i class="anticon anticon-close"></i>-->
<!--                                </button>-->
<!--                            </div>-->
<!--                            <div id="updatePersonAllocationStatusError"></div>-->
<!--                            <form id="updatePersonAllocationStatusForm">-->
<!--                                <div class="modal-body">-->
<!--                                    <div class="input-group mb-3">-->
<!--                                        <div class="input-group-prepend">-->
<!--                                            <span class="input-group-text">Status</span>-->
<!--                                        </div>-->
<!--                                        <input hidden="" id="allocationStuffId" value="">-->
<!--                                        <input hidden="" id="allocationId" value="">-->
<!--                                        <select id="empStatusAllocation" class="form-control">-->
<!--                                            <option value="">Odaberite status</option>-->
<!--                                            <option value="0">Pending</option>-->
<!--                                            <option value="1">Rejected</option>-->
<!--                                            <option value="2">Not answer</option>-->
<!--                                            <option value="3">Accepted</option>-->
<!--                                        </select>-->
<!--                                        <p class="error"></p>-->
<!--                                    </div>-->
<!---->
<!--                                </div>-->
<!--                                <div class="modal-footer">-->
<!--                                    <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>-->
<!--                                    <button type="submit" class="btn btn-primary" id="updatePersonStatusAllocation">Sačuvaj</button>-->
<!--                                </div>-->
<!--                            </form>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
            <!-- Content Wrapper END -->
            <?php include ('layouts/footer.php')?>
        </div>
        <?php  include ('layouts/themeConfig.php')?>
    </div>
</div>
    <input hidden="" value="<?=$authUser->id?>" id="loggedUser">
    <input hidden="" value="<?=$authRole?>" id="authRole">
    <input hidden value="<?= htmlspecialchars($allocationEditRolesString) ?>" id="allocationEditRoles">
    <input hidden value="<?= htmlspecialchars($allocationUpdateRolesString) ?>" id="allocationUpdateRoles">




<?php include ('layouts/scripts.php')?>
    <script src="/assets/js/userAuth.js"></script>
    <script src="/assets/js/allocation.js?v=1904"></script>

</body>

</html>