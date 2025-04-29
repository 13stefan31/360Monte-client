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
                    <?php if (in_array($authRole, $personAllowedRoles)) { ?>
                        <li>
                            <a href="/zaposleni">
                            <span class="icon-holder">
                         <i class="anticon anticon-user-add"></i>
                         </span> Zaposleni</a>
                        </li>
                    <?php } ?>

                    <?php if (in_array($authRole, $vehiclesAllowedRoles) || $authUser->email=="nikola.kontic@360monte.me") { ?>
                        <li>
                            <a href="/vozila">
                            <span class="icon-holder">
                         <i class="anticon anticon-car"></i>
                         </span> Vozila</a>
                        </li>
                    <?php } ?>
                    <?php if (in_array($authRole, $surveysAllowedRoles)) { ?>
                        <li>
                            <a href="/ankete">
                             <span class="icon-holder">
                         <i class="anticon anticon-question-circle"></i>
                         </span>
                                Ankete saradnici</a>
                        </li>

                    <?php } ?>
                    <?php if (in_array($authRole, $surveysAllowedRoles)) { ?>
                        <li>
                            <a href="/ankete-vozila">
                             <span class="icon-holder">
                         <i class="anticon anticon-question-circle"></i>
                         </span>
                                Ankete vozila</a>
                        </li>

                    <?php } ?>
                    <?php if (in_array($authRole, $allocationAllowedRoles) || $authUser->email=="nikola.kontic@360monte.me" || $authUser->email=="nikolina@360monte.me") { ?>
                        <li>
                            <a href="/alokacije">
                             <span class="icon-holder">
                         <i class="anticon anticon-deployment-unit"></i>
                         </span> Alokacije</a>
                        </li>
                    <?php } ?>
                    <?php if (in_array($authRole, $reportAllowedRoles)) { ?>
                        <li>
                            <a href="/izvjestaj">
                             <span class="icon-holder">
                                                    <i class="anticon anticon-solution"></i>
                         </span> Izvještaji</a>
                        </li>
                    <?php } ?>
                    <?php if (in_array($authRole, $worksHistoryAllowedRoles)) { ?>
                        <li>
                            <a href="/istorija-radova">
                             <span class="icon-holder">
                                 <i class="fas fa-history"></i>
                         </span>Istorija radova</a>
                        </li>
                    <?php } ?>
                    <?php if (in_array($authRole, $dailyDataHistoryAllowedRoles)) { ?>
                        <li>
                            <a href="/istorija-dnevnih-podataka">
                                <i class="fas fa-history"></i>
                                </span>Istorija dnevnih podataka</a>
                        </li>
                    <?php } ?>
                    <li>
                        <a href="/ture">
                             <span class="icon-holder">
                         <i class="anticon anticon-deployment-unit"></i>
                         </span>Ture</a>
                    </li>
                    <?php if (in_array($authRole, $allVacationRoles)) { ?>
                        <li>
                            <a href="/slobodni-dani">
                             <span class="icon-holder">
                        <i class="anticon anticon-calendar"></i>
                         </span>Svi slobodni dani</a>
                        </li>
                    <?php } ?>
<!--                    --><?php //if (in_array($authRole, $myVacationRoles)) { ?>

                        <li>
                            <a href="/slobodni-dani-pregled">
                             <span class="icon-holder">
                         <i class="anticon anticon-calendar"></i>
                         </span>Moji slobodni dani</a>
                        </li>
<!--                    --><?php //} ?>
                    <?php if (in_array($authRole, $vehicleInspectionsRoles)) { ?>

                        <li>
                            <a href="/nedeljni-izvjestaji">
                             <span class="icon-holder">
                         <i class="anticon anticon-calendar"></i>
                         </span>Nedeljni izvejštaji (inspekcija vozila)</a>
                        </li>
                    <?php } ?>
                    <?php if (in_array($authRole, $vehicleInspectionsRoles)) { ?>

                        <li>
                            <a href="/mjesecni-izvjestaji">
                             <span class="icon-holder">
                         <i class="anticon anticon-calendar"></i>
                         </span>Mjesečni izvještaji (inspekcija vozila)</a>
                        </li>
                    <?php } ?>
                </ul>
            </li>
            <hr/>
        </ul>
    </div>
</div>