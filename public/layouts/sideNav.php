

<!-- Side Nav START -->
<div class="side-nav">
    <div class="side-nav-inner">
        <ul class="side-nav-menu scrollable">
            <li class="nav-item dropdown open">
                <a class="dropdown-toggle" href="javascript:void(0);">
                    <span class="icon-holder">
                        <i class="anticon anticon-dashboard"></i>
                    </span>
                    <span class="title">Dashboard</span>
                    <span class="arrow"> <i class="arrow-icon"></i> </span>
                </a>
                <ul class="dropdown-menu">

                    <?php if (in_array($authRole,$personAllowedRoles)) { ?>
                    <li>
                        <a href="/zaposleni">
                            <span class="icon-holder">
                         <i class="anticon anticon-user-add"></i>
                         </span>  Zaposleni</a>
                    </li>
                    <?php }?>

                    <?php if (in_array($authRole,$vehiclesAllowedRoles)){?>
                    <li>
                        <a href="/vozila">
                            <span class="icon-holder">
                         <i class="anticon anticon-car"></i>
                         </span> Vozila</a>
                    </li>
                    <?php }?>
                    <?php if (in_array($authRole,$surveysAllowedRoles)){?>
                        <li>
                            <a href="/surveys.php">
                             <span class="icon-holder">
                         <i class="anticon anticon-question-circle"></i>
                         </span>
                                Ankete</a>
                        </li>

                    <?php }?>
                    <?php if (in_array($authRole,$allocationAllowedRoles)){?>
                    <li>
                        <a href="/alokacije">
                             <span class="icon-holder">
                         <i class="anticon anticon-deployment-unit"></i>
                         </span> Alokacije</a>
                    </li>
                    <?php }?>
                    <li>
                        <a href="/ture">
                             <span class="icon-holder">
                         <i class="anticon anticon-deployment-unit"></i>
                         </span>Ture</a>
                    </li>

                </ul>
            </li>
            <hr/>

        </ul>
    </div>
</div>
<!-- Side Nav END -->