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
                                        <label class="font-weight-semibold" for="password">Ocijenite vozilo:</label>
                                        <div class="star-rating m-t-5">
                                            <input type="radio" id="star3-5" name="rating-3" value="5" checked disabled/><label for="star3-5" title="5 star"></label>
                                            <input type="radio" id="star3-4" name="rating-3" value="4" disabled/><label for="star3-4" title="4 star"></label>
                                            <input type="radio" id="star3-3" name="rating-3" value="3" disabled/><label for="star3-3" title="3 star"></label>
                                            <input type="radio" id="star3-2" name="rating-3" value="2" disabled/><label for="star3-2" title="2 star"></label>
                                            <input type="radio" id="star3-1" name="rating-3" value="1" disabled/><label for="star3-1" title="1 star"></label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="font-weight-semibold" for="password">Obrazložite odgovor:</label>
                                        <input type="text" class="form-control" placeholder="Obrazložite odgovor">
                                    </div>
                                    <div class="form-group">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <button class="btn btn-primary">Potvrdite</button>
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
<script src="assets/js/vendors.min.js"></script>

<!-- page js -->

<!-- Core JS -->
<script src="assets/js/app.min.js"></script>

</body>

</html>