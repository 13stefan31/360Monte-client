<?php

if (isset($_COOKIE['token'])){
    header("Location: /");
}
?>
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
                                    <form>
                                        <div class="form-group">
                                            <label class="font-weight-semibold" for="userName">Email:</label>
                                            <div class="input-affix">
                                                <i class="prefix-icon anticon anticon-mail"></i>
                                                <input type="email" class="form-control" id="email" placeholder="Email">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="font-weight-semibold" for="password">Lozinka:</label>
                                            <a class="float-right font-size-13 text-muted" href="/zaboravljena-lozinka">Zaboravili ste lozinku?</a>
                                            <div class="input-affix m-b-10">
                                                <i class="prefix-icon anticon anticon-lock"></i>
                                                <input type="password" class="form-control" id="password" placeholder="Lozinka">
                                            </div>
                                        </div>
                                        <div id="loginAlert"></div>
                                        <div class="form-group">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <button class="btn btn-primary login" >Prijavite se</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php include ('layouts/footer.php')?>
            </div>
        </div>
    </div>

    
    <!-- Core Vendors JS -->
    <script src="/assets/js/vendors.min.js"></script>

    <!-- page js -->

    <!-- Core JS -->
    <script src="/assets/js/app.min.js"></script>
    <script src="/assets/js/alerts.js"></script>
    <script src="/assets/js/custom.js?v=2304"></script>

</body>

</html>