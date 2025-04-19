$(document).ready(function() {
    var savedFilters = localStorage.getItem('worksHistoryFilters');
    var current_page=$('#current_page').val();
    var per_page=$('#per_page').val();
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getWorksHistory(savedFilters,current_page,per_page);
        var work_filter_reported_id=$('#work_filter_reported_id').val();
        var work_filter_breakdown_cat_id=$('#work_filter_breakdown_cat_id').val();
        var work_filter_breakdown_sub_cat_id=$('#work_filter_breakdown_sub_cat_id').val();
        var work_filter_vehicle_id=$('#work_filter_vehicle_id').val();

        var work_filter_date=$('#work_filter_date').val();
        $('#dateFilterId').val(work_filter_date);
        getStuffAllocation('reportedByFilterId',work_filter_reported_id);
        getVehiclesSelect('vehicleFilterId',work_filter_vehicle_id,2,true);
        getBreakDownCategoryIdSelect('breakdownCatFilterId',work_filter_breakdown_cat_id);
        getBreakDownSubcategoryIdSelect('breakdownSubcatFilterId',work_filter_breakdown_cat_id,work_filter_breakdown_sub_cat_id);


        var work_filter_parts_pay_id=$('#work_filter_parts_pay_id').val();
        $('#partsPayFilterId').val(work_filter_parts_pay_id);
        var work_filter_mehanic_pay_id=$('#work_filter_mehanic_pay_id').val();
        $('#mehanicPayFilterId').val(work_filter_mehanic_pay_id);

    } else {

        getWorksHistory('',current_page,per_page);
    }

    $('#showWorksHistoryFilter').click(function(e) {
        e.preventDefault();
        getStuffAllocation('reportedByFilterId');
        getBreakDownCategoryIdSelect('breakdownCatFilterId');
        getVehiclesSelect('vehicleFilterId',null,2,true);

        // getRoles('rolaFilterId');
        $("#chartTypeChange").hide();
        $("#downloadWorksDataCart").hide();
        $("#chartDivBreakdown").hide();
        $("#chartDivPrice").hide();
        $("#worksDataCart").hide();

        $("#showPriceChart").removeClass("active");
        $("#showBreakdownChart").removeClass("active");


        $("#filterWorksHistory").toggle();
    });

    $('#showWorksDataCart').click(function(e) {
        e.preventDefault();
        getVehiclesSelect('vehicleCartId');
        getBreakDownCategoryIdSelect('breakDownCategoryId');

        $("#filterWorksHistory").hide();
        $("#worksDataCart").toggleClass("hidden");
        $("#worksDataCart").toggle(function(){
            if ($("#worksDataCart").is(":hidden")) {
                $("#chartTypeChange").hide();
                $("#downloadWorksDataCart").hide();
                $("#chartDivBreakdown").hide();
                $("#chartDivPrice").hide();
                $("#showPriceChart").removeClass("active");
                $("#showBreakdownChart").removeClass("active");
            }
        });
    });




    $('#downloadWorksDataCart').click(function(e) {
        var vehicleId = $('#vehicleCartId').val();
        var breakdownCatId = $('#breakDownCategoryId').val();
        e.preventDefault();
            var $btn = $(this);
            $btn.addClass('is-loading').prop('disabled', true);
            $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
            $.ajax({
                url: '/../../functions/worksHistory.php',
                type:'GET',
                data:  {
                    'downloadWorksDataCart': 1,
                    'vehicleId':vehicleId,
                    'breakdownCatId':breakdownCatId,
                } ,
                success: function(response) {
                    var dataParse = JSON.parse(response);
                    if (dataParse.status==200){
                        Swal.fire('Izvještaj uspješno proslijeđen na email!', '', 'success')
                    }else{

                        Swal.fire('Došlo je do greške, molimo vas pokušajte ponovo', '', 'warning')
                    }

                },  error: function(jqXHR) {
                    var error = generateAjaxError(jqXHR);

                    Swal.fire(error, '', 'warning')
                },
                complete:function (){
                    $btn.removeClass('is-loading').prop('disabled', false);
                    $btn.find('.anticon-loading').remove();
                }
            });
    });

    $('#clearFilters').on('click', function() {
        var per_page=$('#per_page').val();
        getWorksHistory('',1,per_page);
        localStorage.removeItem('worksHistoryFilters');
        $('#reportedByFilterId').val('');
        $('#isWorkFinishedFilter').val('');
        $('#breakdownCatFilterId').val('');
        $('#breakdownSubcatFilterId').val('');
        $('#dateFilterId').val('');
        $('#partsPayFilterId').val('');
        $('#mehanicPayFilterId').val('');
        $('#clearFilters').hide();
        $("#filterWorksHistory").hide();
    });


    let myChartPrice;
    let myChartBreakdown;
    $("#generateVehicleChart").on("click", function () {
        const selectedVehicleId = $("#vehicleCartId").val();
        const selectedBreakDownCategoryId = $("#breakDownCategoryId").val();

        if (!selectedVehicleId) {
            Swal.fire("Morate odabrati vozilo za generisanje dijagrama",'','warning')
            return;
        }

        const selectedValueText = $("#vehicleCartId option:selected").text();

        $.ajax({
            url: '/../../functions/worksHistory.php',
            method: 'GET',
            data: {
                vehicleId: selectedVehicleId,
                breakDownCategoryId: selectedBreakDownCategoryId,
                generateCart: 1
            },
            success: function (data) {
                $("#chartTypeChange").show();
                $("#downloadWorksDataCart").show();
                var dataParse = JSON.parse(data);

                const chartDataPrice = dataParse.data.data.price.chartData;
                const chartDataBreakdown = dataParse.data.data.breakdown.chartData;

                if (myChartPrice) {
                    myChartPrice.destroy();
                }
                if (myChartBreakdown) {
                    myChartBreakdown.destroy();
                }

                const xAsisBreakdown = chartDataBreakdown.xAsis || [];
                const yAsisBreakdown = chartDataBreakdown.yAsis || [];
                const ctxBreakdown = document.getElementById('dailyDataChartBreakdown').getContext('2d');
                myChartBreakdown = new Chart(ctxBreakdown, {
                    type: 'bar',
                    data: {
                        labels: xAsisBreakdown,
                        datasets: [{
                            label: selectedValueText,
                            data: yAsisBreakdown,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
                // $("#dailyDataChartBreakdown").attr("width", 150);
                // $("#dailyDataChartBreakdown").attr("height", 150);


                const xAsisPrice = chartDataPrice.xAsis || [];
                const yAsisPrice = chartDataPrice.yAsis || [];
                const ctxPrice = document.getElementById('dailyDataChartPrice').getContext('2d');
                myChartPrice = new Chart(ctxPrice, {
                    type: 'bar',
                    data: {
                        labels: xAsisPrice,
                        datasets: [{
                            label: selectedValueText,
                            data: yAsisPrice,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
                // $("#dailyDataChartPrice").attr("width", 150);
                // $("#dailyDataChartPrice").attr("height", 150);
            },
            error: function (error) {
                console.error('Error fetching data from the API:', error);
            }
        });
    });
    $("#showBreakdownChart").click(function(){
        $("#chartDivBreakdown").show();
        $("#chartDivPrice").hide();
        $("#showPriceChart").removeClass("active");
        $("#showBreakdownChart").addClass("active");
    });

    $("#showPriceChart").click(function(){
        $("#chartDivBreakdown").hide();
        $("#chartDivPrice").show();
        $("#showPriceChart").addClass("active");
        $("#showBreakdownChart").removeClass("active");
    });



});

$(document).on('click', '#worksHistoryFilter', function() {
    var reportedByFilterId = $('#reportedByFilterId').val();
    var breakdownCatFilterId = $('#breakdownCatFilterId').val();
    var isWorkFinishedFilter = $('#isWorkFinishedFilter').val();
    var breakdownSubcatFilterId = $('#breakdownSubcatFilterId').val();
    var partsPayFilterId = $('#partsPayFilterId').val();
    var vehicleFilterId = $('#vehicleFilterId').val();
    var mehanicPayFilterId = $('#mehanicPayFilterId').val();
    var dateFilterId = $('#dateFilterId').val();
    var filters = {
        reportedByFilterId: reportedByFilterId,
        breakdownCatFilterId: breakdownCatFilterId,
        isWorkFinishedFilter: isWorkFinishedFilter,
        breakdownSubcatFilterId: breakdownSubcatFilterId,
        partsPayFilterId: partsPayFilterId,
        vehicleFilterId: vehicleFilterId,
        dateFilterId: dateFilterId,
        mehanicPayFilterId: mehanicPayFilterId
    };
    localStorage.setItem('worksHistoryFilters', JSON.stringify(filters));
    var current_page=1;
    var per_page=$('#per_page').val();
    getWorksHistory(filters,current_page,per_page);
    $('#clearFilters').show();
});
function getWorksHistory(filters,current_page,per_page){
    var data = {
        getAllWorksHistory: 1,
        per_page:per_page,
        current_page:current_page
    };
    if (filters !== '') {
        data.reportedBy = filters.reportedByFilterId;
        data.breakDownDate = filters.dateFilterId;
        data.isWorkFinishedFilter = filters.isWorkFinishedFilter;
        data.vehicleId = filters.vehicleFilterId;
        data.breakdownCat = filters.breakdownCatFilterId;
        data.breakdownSubcat = filters.breakdownSubcatFilterId;
        data.partsPay = filters.partsPayFilterId;
        data.mehanicPay = filters.mehanicPayFilterId;
    }

    $('#works-history-table tbody').html('<tr><td colspan="10" class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
    $.ajax({
        url: '/../../functions/worksHistory.php',
        type:'GET',
        data:data,
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                $('#alert').append(createWarningMessage(response.error));
            } else {
                $('#works-history-table tbody').empty();
                var data = response.data.data;
                $.each(data, function(index, row) {
                    let finished;
                    if (row.isFinished){
                        finished='DA';
                    }else{
                        finished='NE';
                    }


                    var workHistoryRow = '<tr class="work-history-row" id="' + row.id + '">' +
                        '<td>' + row.vehicle.brand + ' ' + row.vehicle.model + ' ' + row.vehicle.year + '</td>' +
                        '<td>' + row.reportedBy.name + '</td>' +
                        '<td>' + row.breakDownCategory.name + '</td>' +
                         '<td style="text-align:right">' + row.breakDownMilage + 'km</td>' +
                        '<td>' + row.startingDate + '</td>' +
                        '<td>' + row.endingDate + '</td>' +
                        '<td>' + row.mechanicPaymentMethod + '</td>' +
                        '<td>' + row.vehiclePartsPaymentMethod + '</td>' +
                        '<td class="text-center">' + finished + '</td>' +
                         '<td>' + row.createdBy.name + '</td>' +
                        '<td>' + row.createdAt + '</td>' +
                        '<td  style="display: flex">' +
                        '<a class="btn btn-primary m-r-5 " href="/istorija-rada/'+row.id+'"><i class="anticon anticon-plus"></i>Detalji</a>'
                        + '<button class="btn btn-danger btn-sm m-r-5  " href="javascript:void(0)" onclick="deleteWorkHistory(' + row.id + ')"  ><i class="anticon anticon-delete"></i></button>'
                        + '</td></tr>';

                    $('#works-history-table tbody').append(workHistoryRow );
                });

                $('#works-history-table tbody').on('mouseenter', '.work-history-row', function() {
                    var id = $(this).attr('id');
                    $(this).addClass('hovered');
                    $('.work-history-opis-row#opis-'+id).addClass('hovered');
                }).on('mouseleave', '.work-history-row', function() {
                    var id = $(this).attr('id');
                    $(this).removeClass('hovered');
                    $('.work-history-opis-row#opis-'+id).removeClass('hovered');
                });

                $('#works-history-table tbody').on('mouseenter', '.work-history-opis-row', function() {
                    var id = $(this).attr('id').replace('opis-', '');
                    $('.work-history-row#'+id).addClass('hovered');
                }).on('mouseleave', '.work-history-opis-row', function() {
                    var id = $(this).attr('id').replace('opis-', '');
                    $('.work-history-row#'+id).removeClass('hovered');
                });




                var meta = response.data.meta;
                var paginationHTML = generatePagination(meta.totalItems, meta.itemsPerPage, meta.currentPage);
                $('#pagination').html(paginationHTML);
            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alert').append(createWarningMessage(error));
        }
    });
}





function generatePagination(totalItems, itemsPerPage, currentPage, onPageClick) {
    var totalPages = Math.ceil(totalItems / itemsPerPage);
    var startPage, endPage;

    if (totalPages <= 10) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    var paginationHTML = '<nav aria-label="Page navigation example"><ul class="pagination">';
    if (currentPage === 1) {
        paginationHTML += '<li class="page-item disabled"><a class="page-link" href="javascript:void(0)" tabindex="-1">Prethodna</a></li>';
    } else {
        paginationHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="handlePageClick('+(currentPage-1)+')" tabindex="-1">Prethodna</a></li>';
    }
    for (var i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHTML += '<li class="page-item active"><a class="page-link" href="javascript:void(0)">' + i + '</a></li>';
        } else {
            paginationHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="handlePageClick('+i+')">' + i + '</a></li>';
        }
    }
    if (currentPage === totalPages) {
        paginationHTML += '<li class="page-item disabled"><a class="page-link" href="javascript:void(0)">Sledeća</a></li>';
    } else {
        paginationHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="handlePageClick('+(currentPage+1)+')">Sledeća</a></li>';
    }
    paginationHTML += '</ul></nav>';

    return paginationHTML;
}
function handlePageClick(pageNumber) {
    $('#current_page').val(pageNumber);
    var per_page=$('#per_page').val();
    var savedFilters = localStorage.getItem('worksHistoryFilters');
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getWorksHistory(savedFilters,pageNumber,per_page);
    } else {
        getWorksHistory('',pageNumber,per_page);
    }

}

$(document).on('click', '.work-edit', function() {
    $('#workHistoryEdit')[0].reset();

    $('#editWorkHistory').modal('show');
    var workId = $(this).data('workid');
    var reportedBy = $(this).data('reportedby');
    var vehicleId = $(this).data('vehicleid');
    var startingDate = $(this).data('startingdate');
    var endingDate = $(this).data('endingdate');
    var breakDownCategory = $(this).data('breakdowncategory');
    var breakDownSubcategory = $(this).data('breakdownsubcategory');

    var description = $(this).data('description');
    var mechanicPaymentMethod = $(this).data('mechanicpaymentmethod');

    var mechanicPricePayedOverAccount = $(this).data('mechanicpricepayedoveraccount');
    var mechanicPricePayedWithCache = $(this).data('mechanicpricepayedwithcache');

    var vehiclePartsPricePayedWithCache = $(this).data('vehiclepartspricepayedwithcache');
    var vehiclePartsPricePayedOverAccount = $(this).data('vehiclepartspricepayedoveraccount');

    var vehiclePartsPaymentMethod = $(this).data('vehiclepartspaymentmethod');


    $('#partsPriceCacheEdit').prop('disabled', false).removeClass('disabled-input').val('');
    $('#partsPriceCardEdit').prop('disabled', false).removeClass('disabled-input').val('');
    $('#mechanicPriceCacheEdit').prop('disabled', false).removeClass('disabled-input').val('');
    $('#mechanicPriceCardEdit').prop('disabled', false).removeClass('disabled-input').val('');

    if (mechanicPaymentMethod === 'Račun') {
        $('#mechanicPriceCacheEdit').prop('disabled', true).addClass('disabled-input').val('');
    } else if (mechanicPaymentMethod === 'Keš') {
        $('#mechanicPriceCardEdit').prop('disabled', true).addClass('disabled-input').val('');
    }

    if (vehiclePartsPaymentMethod === 'Račun') {
        $('#partsPriceCacheEdit').prop('disabled', true).addClass('disabled-input').val('');
    } else if (vehiclePartsPaymentMethod === 'Keš') {
        $('#partsPriceCardEdit').prop('disabled', true).addClass('disabled-input').val('');
    }


    var breakDownMilage = $(this).data('breakdownmilage');


    getVehiclesSelect('vehicleEdit',vehicleId);
    getBreakDownCategoryIdSelect('workCategoryEdit',breakDownCategory);
    getStuffAllocation('reportedByEdit',reportedBy);
    $('#breakDownMileageEdit').val(breakDownMilage);
    $('#descriptionEdit').val(description);

    if (vehiclePartsPricePayedOverAccount !== '' && vehiclePartsPricePayedOverAccount>0) {
        $('#partsPriceCardEdit').val(vehiclePartsPricePayedOverAccount);
    }

    if (vehiclePartsPricePayedWithCache !== '' && vehiclePartsPricePayedWithCache>0) {
        $('#partsPriceCacheEdit').val(vehiclePartsPricePayedWithCache);
    }

    if (mechanicPricePayedOverAccount !== '' && mechanicPricePayedOverAccount>0) {
        $('#mechanicPriceCardEdit').val(mechanicPricePayedOverAccount);
    }

    if (mechanicPricePayedWithCache !== '' && mechanicPricePayedWithCache>0) {
        $('#mechanicPriceCacheEdit').val(mechanicPricePayedWithCache);
    }

    $('#workIdEdit').val(workId);
    $('#startingDateEdit').val(convertToDateInputFormat(startingDate));
    $('#endingDateEdit').val(convertToDateInputFormat(endingDate));

    $('#vehiclePartsPaymentMethodEdit option').each(function() {
        if ($(this).text() === vehiclePartsPaymentMethod) {
            $(this).prop('selected', true);
        }
    });
    $('#mechanicPaymentMethodEdit option').each(function() {
        if ($(this).text() === mechanicPaymentMethod) {
            $(this).prop('selected', true);
        }
    });
    getBreakDownSubcategoryIdSelect('workSubcategoryEdit',breakDownCategory,breakDownSubcategory);



});

function deleteWorkHistory(id){
    Swal.fire({
        title: 'Da li ste sigutni da želite da obrišete?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Obriši',
        denyButtonText: `Odustani`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/../../functions/worksHistory.php',
                type: 'delete',
                contentType: 'application/json',
                data: JSON.stringify({
                    deleteWorkData: 1
                    , workDataId: id
                }),
                success: function(response) {
                    var data = JSON.parse(response);
                    if (data.error){
                        Swal.fire( data.error,'','error');
                    }else{
                        $('#'+data.data.data.id).remove();
                        Swal.fire('Uspješno obrisano','','success');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {

                    var error = generateAjaxError(jqXHR);
                    Swal.fire( error,'','error');
                }
            });
        } else if (result.isDenied) {   }
    })
}

