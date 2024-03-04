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
        getVehiclesSelect('vehicleFilterId',work_filter_vehicle_id);
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
        getVehiclesSelect('vehicleFilterId');

        // getRoles('rolaFilterId');
        $("#worksDataCart").hide();
        $("#filterWorksHistory").toggle();
    });

    $('#showWorksDataCart').click(function(e) {
        e.preventDefault();
        getVehiclesSelect('vehicleCartId');
        getBreakDownCategoryIdSelect('breakDownCategoryId');

        $("#filterWorksHistory").hide();
        $("#worksDataCart").toggle(function(){
            if ($("#worksDataCart").is(":hidden")) {
                $("#chartDiv").hide();
                $("#downloadWorksDataCart").hide();
            }
        });
    });



    $('#newWorkDataButton').click(function(e) {
        e.preventDefault();
        $('#workHisrtoryAdd')[0].reset();
        $("#workHistoryAddError").empty();
        getVehiclesSelect('vehicleNew');
        getBreakDownCategoryIdSelect('workCategory');
        getStuffAllocation('reportedBy');
    });


    $('#addNewWorkHistory').click(function(e) {
        var formData = $('#workHisrtoryAdd').serialize();
        e.preventDefault();
        var validate = validateNewWork();
        if (validate){
            var $btn = $(this);
            $btn.addClass('is-loading').prop('disabled', true);
            $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
            $.ajax({
                url: '/../../functions/worksHistory.php',
                type:'POST',
                data:  {
                    'addNewWorkHistory': 1,
                    'data':formData
                } ,
                success: function(response) {
                    var dataParse = JSON.parse(response);
                    if (dataParse.error){
                        $('#workHistoryAddError').html(handleErrors(dataParse.error)).focus();
                        var errorElement = document.getElementById('workHistoryAddError');
                        errorElement.innerHTML = handleErrors(dataParse.error);
                        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });


                    }else{
                        var data = dataParse.data.data;
                        var newRow = $('<tr>').attr('id', data.id);
                         newRow.append($('<td>').text(data.vehicle.brand + ' ' + data.vehicle.model + ' ' + data.vehicle.year));
                        newRow.append($('<td>').text(data.reportedBy.name));
                        newRow.append($('<td>').text(data.breakDownCategory.name));
                         newRow.append($('<td style="text-align:right">').text(data.breakDownMilage+"km"));
                        newRow.append($('<td>').text(data.startingDate));
                        newRow.append($('<td>').text(data.endingDate));
                        newRow.append($('<td>').text(data.mechanicPaymentMethod));
                         newRow.append($('<td>').text(data.vehiclePartsPaymentMethod));
                         newRow.append($('<td>').text(data.createdBy.name));
                         newRow.append($('<td>').text(data.createdAt));
                        newRow.append($('<td style="display: flex">').html(
                            '<button class="btn btn-success m-r-5 work-edit" data-target="#editWorkHistory" ' +
                            ' data-workid="'+data.id+'"' +
                            ' data-reportedBy="'+data.reportedBy.id+'"' +
                            ' data-vehicleId="'+data.vehicle.id+'"' +
                            ' data-startingDate="'+data.startingDate+'"' +
                            ' data-endingDate="'+data.endingDate+'"' +
                            ' data-breakDownCategory="'+data.breakDownCategory.id+'"' +
                            ' data-breakDownSubcategory="' + (data.breakDownSubcategory !== null ? data.breakDownSubcategory.id : '') + '"' +
                              ' data-description="'+data.description+'"' +
                            ' data-mechanicPaymentMethod="'+data.mechanicPaymentMethod+'"' +
                            ' data-mechanicPricePayedOverAccount="'+data.mechanicPricePayedOverAccount+'"' +
                            ' data-mechanicPricePayedWithCache="'+data.mechanicPricePayedWithCache+'"' +

                            ' data-vehiclePartsPricePayedWithCache="'+data.vehiclePartsPricePayedWithCache+'"' +
                            ' data-vehiclePartsPricePayedOverAccount="'+data.vehiclePartsPricePayedOverAccount+'"' +
                            ' data-vehiclePartsPaymentMethod="'+data.vehiclePartsPaymentMethod+'"' +

                            ' data-breakDownMilage="'+data.breakDownMilage+'"' +
                            '><i class="anticon anticon-edit"></i></button>'+
                            '<button class="btn btn-primary btn-sm m-r-5 work-open" data-target="#openWorkHistory"' +
                            ' data-workid="'+data.id+'"' +
                            ' data-reportedByName="'+data.reportedBy.name+'"' +
                            ' data-vehicleName="'+ data.vehicle.brand + ' '+ data.vehicle.model +' ' + data.vehicle.year+'"' +
                            ' data-startingDate="'+data.startingDate+'"' +
                            ' data-endingDate="'+data.endingDate+'"' +
                            ' data-totalPrice="'+data.totalPrice+'"' +
                            ' data-createdAt="'+data.createdAt+'"' +
                            ' data-breakDownCategoryName="'+data.breakDownCategory.name+'"' +

                            ' data-breakDownSubcategory="' + (data.breakDownSubcategory !== null ? data.breakDownSubcategory.id : '') + '"' +
                            ' data-description="'+data.description+'"' +
                            ' data-mechanicPaymentMethod="'+data.mechanicPaymentMethod+'"' +
                            ' data-mechanicPricePayedOverAccount="'+data.mechanicPricePayedOverAccount+'"' +
                            ' data-mechanicPricePayedWithCache="'+data.mechanicPricePayedWithCache+'"' +

                            ' data-vehiclePartsPricePayedWithCache="'+data.vehiclePartsPricePayedWithCache+'"' +
                            ' data-vehiclePartsPricePayedOverAccount="'+data.vehiclePartsPricePayedOverAccount+'"' +
                            ' data-vehiclePartsPaymentMethod="'+data.vehiclePartsPaymentMethod+'"' +
                            ' data-breakDownMilage="'+data.breakDownMilage+'"' +
                            '><i class="anticon anticon-plus"></i></button>'
                        ));

                        $('#works-history-table tbody').prepend(newRow);


                        $('#alertAddWorkHistory').html(createSuccessMessage('Uspješan unos!'));

                        $('#newWorkHistory').modal('hide');
                        $('#workHisrtoryAdd')[0].reset();


                    }

                },  error: function(jqXHR) {
                    var error = generateAjaxError(jqXHR);
                    $('#workHistoryAddError').html(createErrorMessage(error));
                },
                complete:function (){
                    $btn.removeClass('is-loading').prop('disabled', false);
                    $btn.find('.anticon-loading').remove();
                }
            });
        }
    });

    $('#editWorkHistoryButton').click(function(e) {
        var formData = $('#workHistoryEdit').serialize();
        e.preventDefault();
            var $btn = $(this);
            $btn.addClass('is-loading').prop('disabled', true);
            $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
            $.ajax({
                url: '/../../functions/worksHistory.php',
                type:'put',
                data:  JSON.stringify({
                    'editWorkHistory': 1,
                    'data':formData
                }) ,
                success: function(response) {
                    var dataParse = JSON.parse(response);
                    if (dataParse.error){
                        $('#workHistoryEditError').html(handleErrors(dataParse.error));
                    }else{
                        var updatedRowData = dataParse.data.data;
                        var $tableRow = $('#works-history-table tbody').find('tr[id="' + updatedRowData.id + '"]');

                        $tableRow.html(
                            // '<td rowspan="2"><i class="anticon anticon-right"></i></td>' +
                            '<td>' + updatedRowData.vehicle.brand + ' ' + updatedRowData.vehicle.model + ' ' + updatedRowData.vehicle.year + '</td>' +
                            '<td>' + updatedRowData.reportedBy.name + '</td>' +
                            '<td>' + updatedRowData.breakDownCategory.name + '</td>' +
                            // '<td>' + (updatedRowData.breakDownSubcategory !== null ? updatedRowData.breakDownSubcategory.name : '') + '</td>'+
                        '<td style="text-align:right">' + updatedRowData.breakDownMilage + 'km</td>' +
                            '<td>' + updatedRowData.startingDate + '</td>' +
                            '<td>' + updatedRowData.endingDate + '</td>' +
                            '<td>' + updatedRowData.mechanicPaymentMethod + '</td>' +
                            // '<td style="text-align:right">' + updatedRowData.mechanicPrice + '€</td>' +
                            '<td>' + updatedRowData.vehiclePartsPaymentMethod + '</td>' +
                            // '<td style="text-align:right">' + updatedRowData.vehiclePartsPrice + '€</td>' +
                            '<td>' + updatedRowData.createdBy.name + '</td>' +
                            '<td>' + updatedRowData.createdAt + '</td>' +
                            '<td style="display: flex">' +
                            '<button class="btn btn-success m-r-5 work-edit" data-target="#editWorkHistory"' +
                            ' data-workid="'+updatedRowData.id+'"' +
                            ' data-reportedBy="'+updatedRowData.reportedBy.id+'"' +
                            ' data-vehicleId="'+updatedRowData.vehicle.id+'"' +
                            ' data-startingDate="'+updatedRowData.startingDate+'"' +
                            ' data-endingDate="'+updatedRowData.endingDate+'"' +
                            ' data-breakDownCategory="'+updatedRowData.breakDownCategory.id+'"' +

                            ' data-breakDownSubcategory="' + (updatedRowData.breakDownSubcategory !== null ? updatedRowData.breakDownSubcategory.id : '') + '"' +
                            ' data-description="'+updatedRowData.description+'"' +
                            ' data-mechanicPaymentMethod="'+updatedRowData.mechanicPaymentMethod+'"' +
                            ' data-mechanicPricePayedOverAccount="'+updatedRowData.mechanicPricePayedOverAccount+'"' +
                            ' data-mechanicPricePayedWithCache="'+updatedRowData.mechanicPricePayedWithCache+'"' +

                            ' data-vehiclePartsPricePayedWithCache="'+updatedRowData.vehiclePartsPricePayedWithCache+'"' +
                            ' data-vehiclePartsPricePayedOverAccount="'+updatedRowData.vehiclePartsPricePayedOverAccount+'"' +
                            ' data-vehiclePartsPaymentMethod="'+updatedRowData.vehiclePartsPaymentMethod+'"' +

                            ' data-breakDownMilage="'+updatedRowData.breakDownMilage+'"' +
                            '><i class="anticon anticon-edit"></i></button>' +
                            '<button class="btn btn-primary btn-sm m-r-5 work-open" data-target="#openWorkHistory"' +
                            ' data-workid="'+updatedRowData.id+'"' +
                            ' data-reportedByName="'+updatedRowData.reportedBy.name+'"' +
                            ' data-vehicleName="'+ updatedRowData.vehicle.brand + ' '+ updatedRowData.vehicle.model +' ' + updatedRowData.vehicle.year+'"' +
                            ' data-startingDate="'+updatedRowData.startingDate+'"' +
                            ' data-endingDate="'+updatedRowData.endingDate+'"' +
                            ' data-totalPrice="'+updatedRowData.totalPrice+'"' +
                            ' data-createdAt="'+updatedRowData.createdAt+'"' +
                            ' data-breakDownCategoryName="'+updatedRowData.breakDownCategory.name+'"' +
                            ' data-breakDownSubcategoryName="' + (updatedRowData.breakDownSubcategory !== null ? updatedRowData.breakDownSubcategory.name : '') + '"'
                            +
                            ' data-description="'+updatedRowData.description+'"' +
                            ' data-mechanicPaymentMethod="'+updatedRowData.mechanicPaymentMethod+'"' +
                            ' data-mechanicPricePayedOverAccount="'+updatedRowData.mechanicPricePayedOverAccount+'"' +
                            ' data-mechanicPricePayedWithCache="'+updatedRowData.mechanicPricePayedWithCache+'"' +

                            ' data-vehiclePartsPricePayedWithCache="'+updatedRowData.vehiclePartsPricePayedWithCache+'"' +
                            ' data-vehiclePartsPricePayedOverAccount="'+updatedRowData.vehiclePartsPricePayedOverAccount+'"' +
                            ' data-vehiclePartsPaymentMethod="'+updatedRowData.vehiclePartsPaymentMethod+'"' +
                            ' data-breakDownMilage="'+updatedRowData.breakDownMilage+'"' +
                            '><i class="anticon anticon-plus"></i></button>'
                            +'</td></tr>');


                        $('#alertAddWorkHistory').html(createSuccessMessage('Uspješno ste izmijenili podatke!'));

                        $('#editWorkHistory').modal('hide');
                        $('#workHistoryEdit')[0].reset();
                    }

                },  error: function(jqXHR) {
                    var error = generateAjaxError(jqXHR);
                    $('#workHistoryEditError').html(createErrorMessage(error));
                },
                complete:function (){
                    $btn.removeClass('is-loading').prop('disabled', false);
                    $btn.find('.anticon-loading').remove();
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
        $('#breakdownCatFilterId').val('');
        $('#breakdownSubcatFilterId').val('');
        $('#dateFilterId').val('');
        $('#partsPayFilterId').val('');
        $('#mehanicPayFilterId').val('');
        $('#clearFilters').hide();
        $("#filterWorksHistory").hide();
    });


    let myChart;
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
                $("#chartDiv").show();
                $("#downloadWorksDataCart").show();
                var dataParse = JSON.parse(data);
                const chartData = dataParse.data.data.chartData;
                if (myChart) {
                    myChart.destroy();
                }

                const xAsis = chartData.xAsis || [];
                const yAsis = chartData.yAsis || [];
                const ctx = document.getElementById('dailyDataChart').getContext('2d');
                myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: xAsis,
                        datasets: [{
                            label: selectedValueText,
                            data: yAsis,
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
                $("#dailyDataChart").attr("width", 150);
                $("#dailyDataChart").attr("height", 150);
            },
            error: function (error) {
                console.error('Error fetching data from the API:', error);
            }
        });
    });


});

$(document).on('click', '#worksHistoryFilter', function() {
    var reportedByFilterId = $('#reportedByFilterId').val();
    var breakdownCatFilterId = $('#breakdownCatFilterId').val();
    var breakdownSubcatFilterId = $('#breakdownSubcatFilterId').val();
    var partsPayFilterId = $('#partsPayFilterId').val();
    var vehicleFilterId = $('#vehicleFilterId').val();
    var mehanicPayFilterId = $('#mehanicPayFilterId').val();
    var dateFilterId = $('#dateFilterId').val();
    var filters = {
        reportedByFilterId: reportedByFilterId,
        breakdownCatFilterId: breakdownCatFilterId,
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
                    console.log(row)
                    var workHistoryRow = '<tr class="work-history-row" id="'+row.id+'">' +
                        '<td>' + row.vehicle.brand + ' '+ row.vehicle.model +' ' + row.vehicle.year+'</td>' +
                        '<td>' + row.reportedBy.name + '</td>' +
                        '<td>' + row.breakDownCategory.name + '</td>' +
                        // '<td>' + (row.breakDownSubcategory !== null ? row.breakDownSubcategory.name : '') + '</td>'+
                        '<td style="text-align:right">' + row.breakDownMilage + 'km</td>' +
                        '<td>' + row.startingDate + '</td>' +
                        '<td>' + row.endingDate + '</td>' +
                        '<td>' + row.mechanicPaymentMethod + '</td>' +
                        // '<td style="text-align:right">' + row.mechanicPrice + '€</td>' +
                        '<td>' + row.vehiclePartsPaymentMethod + '</td>' +
                        // '<td style="text-align:right">' + row.vehiclePartsPrice + '€</td>' +
                        '<td>' + row.createdBy.name + '</td>' +
                        '<td>' + row.createdAt + '</td>' +
                        '<td  style="display: flex">' +
                        '<button class="btn btn-success btn-sm m-r-5 work-edit" data-target="#editWorkHistory"' +
                        ' data-workid="'+row.id+'"' +
                        ' data-reportedBy="'+row.reportedBy.id+'"' +
                        ' data-vehicleId="'+row.vehicle.id+'"' +
                        ' data-startingDate="'+row.startingDate+'"' +
                        ' data-endingDate="'+row.endingDate+'"' +
                        ' data-breakDownCategory="'+row.breakDownCategory.id+'"' +
                        ' data-breakDownSubcategory="' + (row.breakDownSubcategory !== null ? row.breakDownSubcategory.id : '') + '"' +
                        ' data-description="'+row.description+'"' +
                        ' data-mechanicPaymentMethod="'+row.mechanicPaymentMethod+'"' +
                        ' data-mechanicPricePayedOverAccount="'+row.mechanicPricePayedOverAccount+'"' +
                        ' data-mechanicPricePayedWithCache="'+row.mechanicPricePayedWithCache+'"' +
                        ' data-vehiclePartsPricePayedWithCache="'+row.vehiclePartsPricePayedWithCache+'"' +
                        ' data-vehiclePartsPricePayedOverAccount="'+row.vehiclePartsPricePayedOverAccount+'"' +
                        ' data-vehiclePartsPaymentMethod="'+row.vehiclePartsPaymentMethod+'"' +
                        ' data-breakDownMilage="'+row.breakDownMilage+'"' +
                        '><i class="anticon anticon-edit"></i></button>'+
                        '<button class="btn btn-primary btn-sm m-r-5 work-open" data-target="#openWorkHistory"' +
                        ' data-workid="'+row.id+'"' +
                        ' data-reportedByName="'+row.reportedBy.name+'"' +
                        ' data-vehicleName="'+ row.vehicle.brand + ' '+ row.vehicle.model +' ' + row.vehicle.year+'"' +
                        ' data-startingDate="'+row.startingDate+'"' +
                        ' data-endingDate="'+row.endingDate+'"' +
                        ' data-totalPrice="'+row.totalPrice+'"' +
                        ' data-createdAt="'+row.createdAt+'"' +
                        ' data-breakDownCategoryName="'+row.breakDownCategory.name+'"' +
                        ' data-breakDownSubcategoryName="' + (row.breakDownSubcategory !== null ? row.breakDownSubcategory.name : '') + '"'
                        +
                        ' data-description="'+row.description+'"' +
                        ' data-mechanicPaymentMethod="'+row.mechanicPaymentMethod+'"' +
                        ' data-mechanicPricePayedOverAccount="'+row.mechanicPricePayedOverAccount+'"' +
                        ' data-mechanicPricePayedWithCache="'+row.mechanicPricePayedWithCache+'"' +

                        ' data-vehiclePartsPricePayedWithCache="'+row.vehiclePartsPricePayedWithCache+'"' +
                        ' data-vehiclePartsPricePayedOverAccount="'+row.vehiclePartsPricePayedOverAccount+'"' +
                        ' data-vehiclePartsPaymentMethod="'+row.vehiclePartsPaymentMethod+'"' +
                        ' data-breakDownMilage="'+row.breakDownMilage+'"' +
                        '><i class="anticon anticon-plus"></i></button>'
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


function getBreakDownCategoryIdSelect(selectId, selectedValue = null){
    $.ajax({
        url: '/../../functions/worksHistory.php',
        type: 'GET',
        dataType: 'json',
        data:{
            'getAllBreakDownCategory':1
        },
        success: function(response) {
            var  data= response.data;
            var select = $('#'+selectId);
            select.empty();
            select.append('<option value="">Odaberite kategoriju</option>');
            $.each(data, function(key, value) {
                var selected = (value.id == selectedValue) ? 'selected' : '';
                select.append('<option value="' + value.id + '"' + selected + '>' + value.name + '</option>');
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + errorThrown);
        }
    });

}



$('#workCategory').on('change', function () {
    var selectedCategoryId = $(this).val();
    if (selectedCategoryId) {
        getBreakDownSubcategoryIdSelect( 'workSubcategory',selectedCategoryId);
    } else {
        $('#workSubcategory').empty();
    }
});


$('#workCategoryEdit').on('change', function () {
    var selectedCategoryId = $(this).val();
    if (selectedCategoryId) {
        getBreakDownSubcategoryIdSelect( 'workSubcategoryEdit',selectedCategoryId);
    } else {
        $('#workSubcategoryEdit').empty();
    }
});
$('#breakdownCatFilterId').on('change', function () {
    var selectedCategoryId = $(this).val();
    if (selectedCategoryId) {
        getBreakDownSubcategoryIdSelect( 'breakdownSubcatFilterId',selectedCategoryId);
    } else {
        $('#breakdownSubcatFilterId').empty();
    }
});
function getBreakDownSubcategoryIdSelect(selectId, categoryId = null, selectedId = null) {
    $.ajax({
        url: '/../../functions/worksHistory.php',
        type: 'GET',
        dataType: 'json',
        data: {
            'getAllBreakDownCategory': 1
        },
        success: function (response) {
            var data = response.data;
            var select = $('#' + selectId);
            select.empty();
            select.append('<option value="">Odaberite potkategoriju</option>');

            $.each(data, function (key, value) {
                if (value.id == categoryId) {
                    var subcategories = value.subcategories;
                    $.each(subcategories, function (key, subcategory) {
                        var option = $('<option>', {
                            value: subcategory.id,
                            text: subcategory.name
                        });

                        if (subcategory.id == selectedId) {
                            option.prop('selected', true);
                        }

                        select.append(option);
                    });
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + errorThrown);
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

    if (mechanicPaymentMethod === 'Račun') {
        $('#mechanicPriceCardEdit').prop('disabled', true).addClass('disabled-input').val('');
    } else if (mechanicPaymentMethod === 'Keš') {
        $('#mechanicPriceCacheEdit').prop('disabled', true).addClass('disabled-input').val('');
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


$(document).on('click', '.work-open', function() {
    $('#openWorkHistory').modal('show');
    $('.vehicleView').html( $(this).data('vehiclename'));
    $('.reportedByView').html($(this).data('reportedbyname'));
    $('.categoryView').html($(this).data('breakdowncategoryname') +'/'+$(this).data('breakdownsubcategoryname'));
    $('.distanceView').html($(this).data('breakdownmilage') +' km');
    $('.dateView').html( $(this).data('startingdate') +'-'+ $(this).data('endingdate') );
    $('.totalView').html( $(this).data('totalprice') +'€' );
    $('.createdAtView').html( $(this).data('createdat') );

    $('.partsAccView').html(  $(this).data('vehiclepartspricepayedoveraccount') +'€' );
    $('.partsCacheView').html( $(this).data('vehiclepartspricepayedwithcache') +'€' );
    $('.partsMethodView').html( $(this).data('vehiclepartspaymentmethod') );

    $('.mehanicMethodView').html($(this).data('mechanicpaymentmethod') );
    $('.mehanicAccView').html($(this).data('mechanicpricepayedoveraccount')+'€');
    $('.mehanicCacheView').html($(this).data('mechanicpricepayedwithcache')+'€');

    $('.descView').html($(this).data('description'));




});
function convertToDateInputFormat(dateString) {
    var parts = dateString.split('.');
    if (parts.length === 3) {
        return parts[2] + '-' + parts[1].padStart(2, '0') + '-' + parts[0].padStart(2, '0');
    }
    return dateString;
}

function validateNewWork() {
    if ($('#startingDate').val().length === 0) {
        $('#workHistoryAddError').html(handleErrors('Morate unijeti datum početka'));
        return false;
    }
    if ($('#endingDate').val().length === 0) {
        $('#workHistoryAddError').html(handleErrors('Morate unijeti datum kraja'));
        return false;
    }
    return true;
}
function handlePaymentMethodChange(paymentMethod, priceCardElement, priceCacheElement) {
    var selectedOption = paymentMethod.val();
    priceCardElement.prop('disabled', true).addClass('disabled-input').val('');
    priceCacheElement.prop('disabled', true).addClass('disabled-input').val('');

    if (selectedOption === '1') {
        priceCardElement.prop('disabled', false).removeClass('disabled-input');
    } else if (selectedOption === '2') {
        priceCacheElement.prop('disabled', false).removeClass('disabled-input');
    } else if (selectedOption === '3') {
        priceCardElement.prop('disabled', false).removeClass('disabled-input');
        priceCacheElement.prop('disabled', false).removeClass('disabled-input');
    }
}
$(document).ready(function() {


    $('#vehiclePartsPaymentMethod, #mechanicPaymentMethod').on('change', function() {
        var selectedOption = $(this).val();
        var isVehicle = $(this).attr('id') === 'vehiclePartsPaymentMethod';

        if (isVehicle) {
            handlePaymentMethodChange($(this), $('#partsPriceCard'), $('#partsPriceCache'));
        } else {
            handlePaymentMethodChange($(this), $('#mechanicPriceCard'), $('#mechanicPriceCache'));
        }
    });

    $(document).on('change', '#vehiclePartsPaymentMethodEdit, #mechanicPaymentMethodEdit', function() {
        var selectedOption = $(this).val();
        var isVehicle = $(this).attr('id') === 'vehiclePartsPaymentMethodEdit';

        if (isVehicle) {
            handlePaymentMethodChange($(this), $('#partsPriceCardEdit'), $('#partsPriceCacheEdit'));
        } else {
            handlePaymentMethodChange($(this), $('#mechanicPriceCardEdit'), $('#mechanicPriceCacheEdit'));
        }
    });
});
