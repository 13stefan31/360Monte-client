<?php  require 'auth.php'; ?>
<!DOCTYPE html>
<html lang="en">
<?php  include ('layouts/head.php')?>
<body>
    <div class="app">
        <div class="layout">
        <?php  include ('layouts/header.php')?>
        <?php  include ('layouts/sideNav.php')?>
            <div class="page-container">
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
                                            <h3 class="m-b-0">Zaposleni</h3>
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
                                            <h3 class="m-b-0">Vozila</h3>
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
                                            <h3 class="m-b-0">Ankete saradnici</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </a>
                        </div>

                        <?php }?>
                        <?php if (in_array($authRole,$surveysAllowedRoles)){?>
                            <div class="col-md-6 col-lg-3">
                                <a href="/ankete-vozila">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="media align-items-center">
                                                <div class="avatar avatar-icon avatar-lg avatar-red">
                                                    <i class="anticon anticon-question-circle"></i>
                                                </div>
                                                <div class="m-l-15">
                                                    <h3 class="m-b-0">Ankete vozila</h3>
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
                                            <h3 class="m-b-0">Alokacije</h3>
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
                                                    <h3 class="m-b-0">Izvještaji</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        <?php }?>
                        <?php if (in_array($authRole,$worksHistoryAllowedRoles)){?>
                        <div class="col-md-6 col-lg-3">
                            <a href="/istorija-radova">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="media align-items-center">
                                            <div class="avatar avatar-icon avatar-lg avatar-blue">
                                                <i class="fas fa-history"></i>
                                            </div>
                                            <div class="m-l-15">
                                                <h3 class="m-b-0">Istorija radova</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php }?>
                        <?php if (in_array($authRole,$dailyDataHistoryAllowedRoles)){?>
                        <div class="col-md-6 col-lg-3">
                            <a href="/istorija-dnevnih-podataka">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="media align-items-center">
                                            <div class="avatar avatar-icon avatar-lg avatar-gold">
                                                <i class="fas fa-history"></i>
                                            </div>
                                            <div class="m-l-15">
                                                <h3 class="m-b-0">Istorija dnevnih podataka</h3>
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
                                                <h3 class="m-b-0">Ture</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php if (in_array($authRole,$allVacationRoles)){?>
                        <div class="col-md-6 col-lg-3">
                            <a href="/slobodni-dani">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="media align-items-center">
                                            <div class="avatar avatar-icon avatar-lg avatar-blue">
                                                <i class="anticon anticon-calendar"></i>

                                            </div>
                                            <div class="m-l-15">
                                                <h3 class="m-b-0">Svi slobodni dani</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php }?>
                        <?php if (in_array($authRole,$myVacationRoles)){?>


                        <div class="col-md-6 col-lg-3">
                            <a href="/slobodni-dani-pregled">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="media align-items-center">
                                            <div class="avatar avatar-icon avatar-lg avatar-blue">

                                                <i class="anticon anticon-calendar"></i>
                                            </div>
                                            <div class="m-l-15">
                                                <h3 class="m-b-0">Moji slobodni dani</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php }?>
                    </div>
                </div>
                <?php  include ('layouts/footer.php')?>
            </div>
            <?php  include ('layouts/themeConfig.php')?>
        </div>
    </div>


    <?php  include ('layouts/scripts.php')?>
<!--    <script src="/assets/js/userAuth.js"></script>-->

</body>

</html>