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
                    <h2 class="header-title">Anketa</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <a class="breadcrumb-item" href="surveys.php">Ankete</a>
                            <span class="breadcrumb-item active">Komentar Marka Markovića za Janka Jankovića</span>
                        </nav>
                    </div>
                </div>

                <div class="container-fluid">
                    <div class="tab-content m-t-15">
                        <div class="tab-pane fade show active" id="product-overview" >
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Detalji</h4>
                                    <div class="table-responsive">
                                        <table class="product-info-table m-t-20">
                                            <tbody>
                                            <tr>
                                                <td>Komentarisao:</td>
                                                <td class="text-dark font-weight-semibold">Marko Marković</td>
                                            </tr>
                                            <tr>
                                                <td>Koga:</td>
                                                <td>Kristina Orlandić</td>
                                            </tr>
                                            <tr>
                                                <td>Datum:</td>
                                                <td>22.12.2022</td>
                                            </tr>
                                            <tr>
                                                <td>Ocjena:</td>
                                                <td>
                                                    <div class="star-rating m-t-5">
                                                        <input type="radio" id="star3-5" name="rating-3" value="5" checked disabled/><label for="star3-5" title="5 star"></label>
                                                        <input type="radio" id="star3-4" name="rating-3" value="4" disabled/><label for="star3-4" title="4 star"></label>
                                                        <input type="radio" id="star3-3" name="rating-3" value="3" disabled/><label for="star3-3" title="3 star"></label>
                                                        <input type="radio" id="star3-2" name="rating-3" value="2" disabled/><label for="star3-2" title="2 star"></label>
                                                        <input type="radio" id="star3-1" name="rating-3" value="1" disabled/><label for="star3-1" title="1 star"></label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Status:</td>
                                                <td>
                                                    <span class="badge badge-pill badge-cyan">In Stock</span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Komentar</h4>
                                </div>
                                <div class="card-body">
                                    <p>Komentat</p> </div>
                            </div>
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

</body>

</html>