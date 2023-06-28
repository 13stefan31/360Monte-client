<!DOCTYPE html>
<html lang="en">

<?php include ('layouts/head.php')?>

<body>
    <div class="app">
        <div class="container-fluid p-h-0 p-v-20 bg full-height d-flex" style="background-image: url('/assets/images/others/login-3.png')">
            <div class="d-flex flex-column justify-content-between w-100">
                <div class="container d-flex h-100">
                    <div class="row align-items-center w-100">
                        <div class="col-md-7 col-lg-5 m-h-auto">
                            <div class="card shadow-lg">
                                <div class="card-body">
                                    <div class="d-flex align-items-center justify-content-between m-b-30">
                                        <img class="img-fluid" alt="" src="/assets/images/logo/logo.png">
                                    </div>
                                    <div id="changePasswordError"></div>
                                    <form id="changePasswordForm">
                                        <div class="form-group">
                                            <label class="font-weight-semibold" for="password">Nova lozinka:</label>
                                             <div class="input-affix m-b-10">
                                                <i class="prefix-icon anticon anticon-lock"></i>
                                                <input type="password" class="form-control" id="newPassword" placeholder="Nova lozinka">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="font-weight-semibold" for="password">Ponovite lozinku:</label>
                                            <div class="input-affix m-b-10">
                                                <i class="prefix-icon anticon anticon-lock"></i>
                                                <input type="password" class="form-control" id="confirmPassword" placeholder="Ponovite lozinku">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <button class="btn btn-primary" id="changePassword">Promijenite lozinku</button>
                                            </div>
                                        </div>
                                        <input hidden="" id="changePasswordToken" value="">
                                    </form>
                                    <a class="btn btn-primary m-r-5 float-right backHome" href="/prijava"style="display: none">Nazad na prijavu</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php include ('layouts/footer.php')?>
            </div>
        </div>
    </div>
    <script src="/assets/js/vendors.min.js"></script>
    <script src="/assets/js/app.min.js"></script>
    <script src="/assets/js/alerts.js"></script>
    <script src="/assets/js/custom.js"></script>
    <script src="/assets/js/changePassword.js?v=1"></script>

</body>

</html>