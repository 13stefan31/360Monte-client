<!-- Header START -->
<div class="header">
    <div class="logo logo-dark">
        <a href="/">
            <img src="/assets/images/logo/logo.png" alt="360Monte">
            <img class="logo-fold" src="/assets/images/logo/logo-fold.png" alt="360Monte">
        </a>
    </div>
    <div class="logo logo-white">
        <a href="/">
            <img src="/assets/images/logo/logo-white.png" alt="Logo">
            <img class="logo-fold" src="/assets/images/logo/logo-fold-white.png" alt="360Monte">
        </a>
    </div>
    <div class="nav-wrap">
        <ul class="nav-left">
            <li class="desktop-toggle">
                <a href="javascript:void(0);">
                    <i class="anticon"></i>
                </a>
            </li>
            <li class="mobile-toggle">
                <a href="javascript:void(0);">
                    <i class="anticon"></i>
                </a>
            </li>
        </ul>
        <ul class="nav-right">
            <li class="dropdown dropdown-animated scale-left">
                <a href="javascript:void(0);" data-toggle="dropdown">
                    <i class="anticon anticon-bell notification-badge"></i>
                    <span class="badge badge-indicator badge-danger"></span>
                </a>
                <?php  include ('notification.php')?>
            </li>
            <li class="dropdown dropdown-animated scale-left">
                <a href="javascript:void(0);" data-toggle="dropdown">
                    <i class="anticon anticon-user"></i>
                </a>
                <div class="p-b-15 p-t-20 dropdown-menu pop-profile">
                    <div class="p-h-20 p-b-15 m-b-10 border-bottom">
                        <div class="d-flex m-r-50">
                            <div class="m-l-10">
                                <p class="m-b-0 text-dark font-weight-semibold loggedUserName"></p>
                                <p class="m-b-0 opacity-07 loggedUserEmail"></p>
                                <p class="m-b-0 opacity-07 loggedUserRole"></p>
                            </div>
                        </div>
                    </div>
                    <button href="javascript:void(0);" class="dropdown-item d-block p-h-15 p-v-10" id="logout">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <i class="anticon opacity-04 font-size-16 anticon-logout"></i>
                                <span class="m-l-10">Logout</span>
                            </div>
                            <i class="anticon font-size-10 anticon-right"></i>
                        </div>
                    </button>
                </div>
            </li>
            <li>
                <a href="javascript:void(0);" data-toggle="modal" data-target="#quick-view">
                    <i class="anticon anticon-appstore"></i>
                </a>
            </li>
        </ul>
    </div>
</div>
</div>
<!-- Header END -->