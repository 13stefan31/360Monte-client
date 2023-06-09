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

                        <?php if (in_array($authRole,$personAllowedRoles)) { ?>
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
                        <?php }?>

                        <?php if (in_array($authRole,$vehiclesAllowedRoles)){?>
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

                        <?php }?>
                        <?php if (in_array($authRole,$surveysAllowedRoles)){?>
                        <div class="col-md-6 col-lg-3">
                            <a href="/ankete">
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

                        <?php }?>
                        <?php if (in_array($authRole,$allocationAllowedRoles)){?>
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
                        <?php }?>
                        <?php if (in_array($authRole,$reportAllowedRoles)){?>
                            <div class="col-md-6 col-lg-3">
                                <a href="/izvjestaj">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="media align-items-center">
                                                <div class="avatar avatar-icon avatar-lg avatar-orange">
                                                    <i class="anticon anticon-solution"></i>
                                                </div>
                                                <div class="m-l-15">
                                                    <h2 class="m-b-0">Izvještaj</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        <?php }?>
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
<!--    <script src="/assets/js/userAuth.js"></script>-->

</body>

</html>