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
                    <h2 class="header-title">Marko Marković</h2>
                    <div class="header-sub-title">
                        <nav class="breadcrumb breadcrumb-dash">
                            <a href="/" class="breadcrumb-item"><i class="anticon anticon-home m-r-5"></i>Početna</a>
                            <a class="breadcrumb-item" href="persons.php">Zaposleni</a>
                            <span class="breadcrumb-item active">Marko Markovic</span>
                        </nav>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h4> <a href="persons.php"><i class="anticon anticon-left"></i> &nbsp;Nazad </a></h4>
                        <div class="m-t-25">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Opšte informacije</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Izmijeni podatke</a>
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
                                                        <td>Ime:</td>
                                                        <td class="text-dark font-weight-semibold">Marko</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Prezime:</td>
                                                        <td>Marković</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email:</td>
                                                        <td>marko@gmail.com</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                    <div class="alert alert-success">
                                        <div class="d-flex align-items-center justify-content-start">
                                        <span class="alert-icon">
                                            <i class="anticon anticon-check-o"></i>
                                        </span>
                                            <span>Uspješno ste izmijenili podatke</span>
                                        </div>
                                    </div>
                                    <div class="alert alert-danger">
                                        <div class="d-flex align-items-center justify-content-start">
                                        <span class="alert-icon">
                                            <i class="anticon anticon-close-o"></i>
                                        </span>
                                            <span>Došlo je do greške prilikom izmjene, pokušajte ponovo</span>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label class="font-weight-semibold" for="productName">Ime</label>
                                                <input type="text" class="form-control" id="productName" placeholder="Product Name" value="Marko">
                                            </div>
                                            <div class="form-group">
                                                <label class="font-weight-semibold" for="productPrice">Prezime</label>
                                                <input type="text" class="form-control" id="productPrice" placeholder="Price" value="Marković">
                                            </div>
                                            <div class="form-group">
                                                <label class="font-weight-semibold" for="productBrand">Email</label>
                                                <input type="text" class="form-control" id="productBrand" placeholder="Brand" value="marko@gmail.com">
                                            </div>
                                            <div class="m-b-15">
                                                <button class="btn btn-primary">
                                                    <i class="anticon anticon-save"></i>
                                                    <span>Save</span>
                                                </button>
                                            </div>
                                        </div>
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

</body>

</html>