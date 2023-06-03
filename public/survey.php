<?php
require 'auth.php';
if (!in_array($authRole,$surveysAllowedRoles)){
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
                    <h2 class="header-title">Anketa</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <a class="breadcrumb-item" href="/ankete">Ankete</a>
                            <span class="breadcrumb-item active">Pregled detalja ankete</span>
                        </nav>
                    </div>
                </div>

                <div class="container-fluid">

                    <div id="surveysError"></div>
                    <div class="tab-content m-t-15 surveyDatacard">
                        <div class="tab-pane fade show active" id="product-overview" >
                            <div class="card">
                                <div class="card-body">
<!--                                    <h4 class="card-title">Detalji</h4>-->
                                    <div class="table-responsive">
                                        <table class="product-info-table m-t-20">
                                            <tbody>
                                            <tr>
                                                <td>Komentariše:</td>
                                                <td class="text-dark font-weight-semibold surveyPersonName"></td>
                                            </tr>
                                            <tr>
                                                <td>Datum i vrijeme:</td>
                                                <td class="surveyTime"></td>
                                            </tr>
                                            <tr>
                                                <td>Tip ankete:</td>
                                                <td class="surveyType"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="surveyData"></div>
                        </div>
                        <div class="tab-pane fade" id="product-images">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <img class="img-fluid" src="assets/images/others/product-1.jpg" alt="">
                                        </div>
                                        <div class="col-md-3">
                                            <img class="img-fluid" src="assets/images/others/product-2.jpg" alt="">
                                        </div>
                                        <div class="col-md-3">
                                            <img class="img-fluid" src="assets/images/others/product-3.jpg" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    <script src="/assets/js/singleSurvey.js"></script>

</body>

</html>