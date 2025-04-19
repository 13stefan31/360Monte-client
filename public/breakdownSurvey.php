<!DOCTYPE html>
<html lang="en">
<?php
require 'auth.php';
include('layouts/head.php') ?>
<body>
<div class="app">
    <div class="container-fluid p-h-0 p-v-20 bg full-height d-flex" style="background-image: url('/assets/images/others/login-3.png')">
        <div class="d-flex flex-column justify-content-between w-100">
            <div class="container-fluid d-flex h-100 justify-content-center">
                <div class="row align-items-center w-100">
                    <div class="col-md-12 col-lg-10 m-h-auto">
                        <div class="card shadow-lg">
                            <div class="card-body">
                                <div class="d-flex align-items-center justify-content-between m-b-30">
                                   <a href="/pocetna"> <img class="img-fluid" alt="" src="/assets/images/logo/logo.png"></a>
                                </div>
                                    <div id="surveyError"></div>
                                <div class="row surveyData" >
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-12 table-container">
                                        <table class="table table-hover " id="breakdownSurveyInfo">
                                            <thead>
                                            <tr>
                                                <th colspan="3">Aktivni kavarovi</th>
                                            </tr>
                                            <tr>
                                                <th>Kategorija</th>
                                                <th>Potkategorija</th>
                                                <th>Opis</th>
                                            </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-12 p-l-20" id="breakdownSurveyData">
                                    </div>
                                </div>

                                <div id="surveyData" class="float-right"></div>

                                <a class="btn btn-primary m-r-5 float-right backHome" href="/pocetna"style="display: none">Nazad na početnu</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php include('layouts/footer.php') ?>
        </div>
    </div>
</div>
<script src="/assets/js/vendors.min.js"></script>

<script src="/assets/js/pages/dashboard-default.js"></script>

<script src="/assets/vendors/datatables/jquery.dataTables.min.js"></script>
<script src="/assets/vendors/datatables/dataTables.bootstrap.min.js"></script>
<script src="/assets/js/pages/datatables.js"></script>

<!-- Core JS -->
<script src="/assets/js/app.min.js"></script>
<script src="/assets/js/alerts.js"></script>
<script src="/assets/js/custom.js?v=1904"></script>

<script src="/assets/vendors/select2/select2.min.js"></script>
<script src="/assets/js/userAuth.js"></script>
<script src="/assets/js/employeeSurvey.js"></script>


</body>

</html>