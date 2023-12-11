$(document).ready(function() {
    var savedFilters = localStorage.getItem('dailyDataFilters');
    var current_page=$('#current_page').val();
    var per_page=$('#per_page').val();
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getDailyDataHistory(savedFilters,current_page,per_page);

        var selectedVehicleValue=$('#daily_data_filter_vehicle_id').val();
        getVehiclesSelect('vehicleFilterId',selectedVehicleValue)

    } else {
        getDailyDataHistory('',current_page,per_page);
    }

    $('#showDailyDataFilter').click(function(e) {
        e.preventDefault();
        getVehiclesSelect('vehicleFilterId');
        $("#dailyDataFilter").toggle();
        $("#dailyDataCart").hide();
    });

    $('#showDailyDataCart').click(function(e) {
        e.preventDefault();
        getVehiclesSelect('vehicleCartId');
        $("#dailyDataFilter").hide();
        $("#dailyDataCart").toggle();
    });

    $('#newDailyDataButton').click(function(e) {
        e.preventDefault();
        $("#dailyDataAddError").empty();
        getVehiclesSelect('vehicleSelectNew');
    });


    $('#addNewDailyData').click(function(e) {
        e.preventDefault();
        // var validate = validateNewDailyData();
        // if (validate){
            var $btn = $(this);
            $btn.addClass('is-loading').prop('disabled', true);
            $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');

            $.ajax({
                url: '/../../functions/dailyDataHistory.php',
                type:'POST',
                data:  {
                    'addDailyData': 1,
                    'data':{
                        'vehicleId': $('#vehicleSelectNew').val(),
                        'startingMileage': $('#startingMileage').val(),
                        'fuelPrice': $('#fuelPrice').val(),
                        'fuelQuantity': $('#fuelQuantity').val(),
                        'endingMileage': $('#endingMileage').val()
                    }
                } ,
                success: function(response) {
                    var dataParse = JSON.parse(response);
                    if (dataParse.error){
                        $('#dailyDataAddError').html(handleErrors(dataParse.error));
                    }else{
                        var data = dataParse.data.data;
                        console.log(data)
                        var newRow = $('<tr>').attr('id', data.id);
                        newRow.append($('<td>').text( data.vehicle.brand +' '+ data.vehicle.model ));
                        newRow.append($('<td>').text( data.vehicle.registrationNumber ));
                        newRow.append($('<td style="text-align: right">').text( data.vehicle.year ));
                        newRow.append($('<td style="text-align: right">').text(data.starting_mileage+'km'));
                        newRow.append($('<td style="text-align: right">').text(data.ending_mileage+'km'));
                        newRow.append($('<td style="text-align: right">').text(data.fuel_quantity+'L'));
                        newRow.append($('<td>').html('<a class="btn btn-primary m-r-5 " href="/istorija-dnevnog-podatka/'+data.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a>'));
                        $('#daily-data-table tbody').prepend(newRow);

                        $('#alertAddDialyData').html(createSuccessMessage('Uspješno ste unijeli novu istoriju dnevnih podataka!'));

                        $('#newDailyData').modal('hide');
                        $('#dialyDataAdd')[0].reset();
                    }

                },  error: function(jqXHR) {
                    var error = generateAjaxError(jqXHR);
                    $('#dailyDataAddError').html(createErrorMessage(error));
                },
                complete:function (){
                    $btn.removeClass('is-loading').prop('disabled', false);
                    $btn.find('.anticon-loading').remove();
                }
            });
        // }
    });


    $('#clearFilters').on('click', function() {
        var per_page=$('#per_page').val();
        getDailyDataHistory('',1,per_page);
        localStorage.removeItem('dailyDataFilters');
        $('#vehicleFilterId').val('');
        $('#clearFilters').hide();
    });

    let myChart;
    $("#generateVehicleChart").on("click", function () {
        const selectedVehicleId = $("#vehicleCartId").val();

        if (!selectedVehicleId) {
            Swal.fire("Morate odabrati vozilo za generisanje dijagrama",'','warning')
            return;
        }

        const selectedValueText = $("#vehicleCartId option:selected").text();

        $.ajax({
            url: '/../../functions/dailyDataHistory.php',
            method: 'GET',
            data: {
                vehicleId: selectedVehicleId,
                generateCart: 1
            },
            success: function (data) {
                $("#chartDiv").show();
                var dataParse = JSON.parse(data);
                const chartData = dataParse.data.data.chartData;
                if (myChart) {
                    myChart.destroy();
                }

                const displayTextMap = {
                    "averageMileage": "Prosječna kilometraža",
                    "averageFuelQuantity": "Prosječna količina goriva (L)",
                    "averageFuelPrice": "Prosječna cijena goriva (EUR)"
                };

                const xAsis = chartData.xAsis || [];
                const updatedXAsis = xAsis.map(value => displayTextMap[value] || value);

                const yAsis = chartData.yAsis || [];
                const ctx = document.getElementById('dailyDataChart').getContext('2d');
                 myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: updatedXAsis,
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


$(document).on('click', '#dailyDayaFilterSubmit', function() {
    var vehicleId = $('#vehicleFilterId').val();
    var filters = {
        vehicleId: vehicleId
    };
    localStorage.setItem('dailyDataFilters', JSON.stringify(filters));
    var current_page=1;
    var per_page=$('#per_page').val();
    getDailyDataHistory(filters,current_page,per_page);
    $('#clearFilters').show();
});
function getDailyDataHistory(filters,current_page,per_page){
    var data = {
        getDailyDataHistory: 1,
        per_page:per_page,
        current_page:current_page
    };

    if (filters !== '') {
        data.vehicleId = filters.vehicleId;
    }

    $('#daily-data-table tbody').html('<tr><td colspan="5" class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
    $.ajax({
        url: '/../../functions/dailyDataHistory.php',
        type:'GET',
        data:data,
        dataType: 'json',
        success: function(response) {

            if (response.error) {
                $('#alert').append(createWarningMessage(response.error));
            } else {
                $('#daily-data-table tbody').empty();
                var data = response.data.data;
                $.each(data, function(index, row) {
                    $('#daily-data-table tbody').prepend('' +
                        '<tr id="'+row.id+'">' +
                        '<td>' + row.vehicle.brand +' '+ row.vehicle.model + '</td>' +
                        '<td>' + row.vehicle.registrationNumber + '</td>' +
                        '<td style="text-align: right">' + row.vehicle.year + '</td>' +
                        '<td style="text-align: right">' + row.starting_mileage + 'km</td>' +
                        '<td style="text-align: right">' + row.ending_mileage + 'km</td>' +
                        '<td style="text-align: right">' + row.fuel_quantity + 'L</td>' +
                        '<td><a class="btn btn-primary m-r-5 " href="/istorija-dnevnog-podatka/'+row.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a>' +
                        '</td></tr>');
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
    var savedFilters = localStorage.getItem('dailyDataFilters');
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getUsers(savedFilters,pageNumber,per_page);
    } else {
        getUsers('',pageNumber,per_page);
    }

}
