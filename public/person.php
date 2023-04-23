<?php require 'auth.php'; ?>
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
                    <h2 class="header-title personName"></h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <a class="breadcrumb-item" href="/zaposleni">Zaposleni</a>
                            <span class="breadcrumb-item active personName"></span>
                        </nav>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div id="alertGetPerson"></div>
                        <h4> <a href="/zaposleni"><i class="anticon anticon-left"></i> &nbsp;Nazad </a></h4>
                        <div class="m-t-25">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Opšte informacije</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Izmijeni podatke</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="password-tab" data-toggle="tab" href="#password" role="tab" aria-controls="password" aria-selected="false">Izmijeni lozinku</a>
                                </li>
                            </ul>
                            <div class="tab-content m-t-15" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="product-info-table m-t-20">
                                                    <tbody>
                                                    <tr>
                                                        <td>Ime i prezime:</td>
                                                        <td class="text-dark font-weight-semibold personName" ></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email:</td>
                                                        <td class="personEmail"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Username:</td>
                                                        <td class="personUsername"></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div id="alertSingleUser"></div>
                                    <div class="card">
                                        <form id="updateUserForm">
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label class="font-weight-semibold">Ime i prezime</label>
                                                <input type="text" class="form-control" id="personName" placeholder="Ime i prezime" value="">
                                                <p></p>
                                            </div>
                                            <div class="form-group">
                                                <label class="font-weight-semibold" for="productPrice">Email</label>
                                                <input type="text" class="form-control" id="personEmail" placeholder="Email" value="">

                                                <p></p>
                                            </div>
                                            <div class="form-group">
                                                <label class="font-weight-semibold" for="productBrand">Username</label>
                                                <input type="text" class="form-control" id="personUsername" disabled="" placeholder="Username" value="">
                                            </div>
                                            <div class="m-b-15">
                                                <button class="btn btn-primary" type="submit" id="personDataChange">
                                                    <i class="anticon anticon-save"></i>
                                                    <span>Sačuvaj</span>
                                                </button>
                                            </div>
                                        </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="password" role="tabpanel" aria-labelledby="profile-tab">
                                    <div id="alertChangeUserPassword"></div>
                                    <div class="card">
                                        <form id="updatePasswordForm">
                                            <div class="card-body">
                                                <div class="form-group">
                                                    <label class="font-weight-semibold">Trenutna lozinka</label>
                                                    <input type="password" class="form-control" id="currentPassword" placeholder="Trenutna lozinka" value="">
                                                    <p></p>
                                                </div>
                                                <div class="form-group">
                                                    <label class="font-weight-semibold" >Nova lozinka</label>
                                                    <input type="password" class="form-control" id="newPassword" placeholder="Nova lozinka" value="">
                                                    <p></p>
                                                </div>
                                                <div class="form-group">
                                                    <label class="font-weight-semibold">Ponovi novu lozinku</label>
                                                    <input type="password" class="form-control" id="confirmPassword" placeholder="Ponovi novu lozinku" value="">
                                                    <p></p>
                                                </div>
                                                <div class="m-b-15">
                                                    <button class="btn btn-primary" type="submit" id="personPasswordChange">
                                                        <i class="anticon anticon-save"></i>
                                                        <span>Sačuvaj</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
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
        <?php include ('layouts/themeConfig.php')?>
    </div>
</div>

<?php include ('layouts/scripts.php')?>
<script src="/assets/js/userAuth.js"></script>
<script src="/assets/js/person.js"></script>

</body>

</html>