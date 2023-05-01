<?php  require 'auth.php'; ?>
<!DOCTYPE html>
<html lang="en">
<?php  include ('layouts/head.php')?>
<body>
    <div class="app">
        <div class="layout">
        <?php  include ('layouts/header.php')?>
        <?php  include ('layouts/sideNav.php')?>
            <!-- Page Container START -->
            <div class="page-container">
                <!-- Content Wrapper START -->
                <div class="main-content">
                    <div class="row">
                        <div class="col-md-6 col-lg-3">
                            <a href="/zaposleni">
                            <div class="card">
                                <div class="card-body">
                                    <div class="media align-items-center">
                                        <div class="avatar avatar-icon avatar-lg avatar-blue">
                                            <i class="anticon anticon-user-add"></i>
                                        </div>
                                        <div class="m-l-15">
                                            <h2 class="m-b-0">Zaposleni</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </a>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <a href="/vozila">
                            <div class="card">
                                <div class="card-body">
                                    <div class="media align-items-center">
                                        <div class="avatar avatar-icon avatar-lg avatar-cyan">
                                            <i class="anticon anticon-car"></i>
                                        </div>
                                        <div class="m-l-15">
                                            <h2 class="m-b-0">Vozila</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </a>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <a href="">
                            <div class="card">
                                <div class="card-body">
                                    <div class="media align-items-center">
                                        <div class="avatar avatar-icon avatar-lg avatar-red">
                                            <i class="anticon anticon-question-circle"></i>
                                        </div>
                                        <div class="m-l-15">
                                            <h2 class="m-b-0">Ankete</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </a>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <a href="/alokacije">
                            <div class="card">
                                <div class="card-body">
                                    <div class="media align-items-center">
                                        <div class="avatar avatar-icon avatar-lg avatar-gold">
                                            <i class="anticon anticon-deployment-unit"></i>
                                        </div>
                                        <div class="m-l-15">
                                            <h2 class="m-b-0">Alokacije</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </a>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <a href="/ture">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="media align-items-center">
                                            <div class="avatar avatar-icon avatar-lg avatar-cyan">
                                                <i class="anticon anticon-car"></i>
                                            </div>
                                            <div class="m-l-15">
                                                <h2 class="m-b-0">Ture</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- Content Wrapper END -->
                <?php  include ('layouts/footer.php')?>
            </div>
            <!-- Page Container END -->
            <?php  include ('layouts/themeConfig.php')?>
        </div>
    </div>


    <?php  include ('layouts/scripts.php')?>
    <script src="/assets/js/userAuth.js"></script>

</body>

</html>