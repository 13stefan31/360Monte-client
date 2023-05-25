<?php
require 'auth.php';
if (!in_array($authRole,$surveysAllowedRoles)){
    header('HTTP/1.0 403 Forbidden');
    exit();
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
                    <h2 class="header-title">Ankete</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <span class="breadcrumb-item active">Ankete</span>
                        </nav>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
<!--                        <div class="alert alert-success">-->
<!--                            <div class="d-flex align-items-center justify-content-start">-->
<!--                                        <span class="alert-icon">-->
<!--                                            <i class="anticon anticon-check-o"></i>-->
<!--                                        </span>-->
<!--                                <span>Uspješno ste unijeli novog zaposlenog</span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="alert alert-danger">-->
<!--                            <div class="d-flex align-items-center justify-content-start">-->
<!--                                        <span class="alert-icon">-->
<!--                                            <i class="anticon anticon-close-o"></i>-->
<!--                                        </span>-->
<!--                                <span>Došlo je do greške prilikom unosa, pokušajte ponovo</span>-->
<!--                            </div>-->
<!--                        </div>-->
                        <div class="m-t-25">

<!--                            <button type="button" class="btn btn-primary m-b-15" data-toggle="modal" data-target="#newPerson">-->
<!--                                Novi unos-->
<!--                            </button>-->
                            <table id="data-table" class="table">
                                <thead>
                                <tr>
                                    <th>Komentarisao</th>
                                    <th>Koga</th>
                                    <th>Datum</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Marko Markovic</td>
                                    <td>Kristina Orlandić</td>
                                    <td>23.12.2022</td>
                                    <td><a class="btn btn-primary m-r-5" href="survey.php"><i class="anticon anticon-plus"></i>Detalji</a></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

<!--            <div class="modal fade" id="newPerson">-->
<!--                <div class="modal-dialog modal-dialog-centered">-->
<!--                    <div class="modal-content">-->
<!--                        <div class="modal-header">-->
<!--                            <h5 class="modal-title" id="exampleModalCenterTitle">Novi unos</h5>-->
<!--                            <button type="button" class="close" data-dismiss="modal">-->
<!--                                <i class="anticon anticon-close"></i>-->
<!--                            </button>-->
<!--                        </div>-->
<!--                        <div class="modal-body">-->
<!--                            <div class="input-group mb-3">-->
<!--                                <div class="input-group-prepend">-->
<!--                                    <span class="input-group-text" id="basic-addon3">Ime</span>-->
<!--                                </div>-->
<!--                                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">-->
<!--                            </div>-->
<!--                            <div class="input-group mb-3">-->
<!--                                <div class="input-group-prepend">-->
<!--                                    <span class="input-group-text" id="basic-addon3">Prezime</span>-->
<!--                                </div>-->
<!--                                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">-->
<!--                            </div>-->
<!--                            <div class="input-group mb-3">-->
<!--                                <div class="input-group-prepend">-->
<!--                                    <span class="input-group-text" id="basic-addon3">Email</span>-->
<!--                                </div>-->
<!--                                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="modal-footer">-->
<!--                            <button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>-->
<!--                            <button type="button" class="btn btn-primary">Sačuvaj</button>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <!-- Content Wrapper END -->
            <?php include ('layouts/footer.php')?>
        </div>
        <!-- Page Container END -->
        <?php  include ('layouts/themeConfig.php')?>
    </div>
</div>





<?php include ('layouts/scripts.php')?>
</body>

</html>