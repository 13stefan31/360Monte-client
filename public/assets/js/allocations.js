$(document).ready(function() {
    var savedFilters = localStorage.getItem('allocationsFilters');
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getAllocations(savedFilters);
        // var selectedStatusValue=$('#allocation_filter_status').val();
        var selectedVehicleValue=$('#allocation_filter_vehicle').val();
        // var selectedDateValue=$('#allocation_filter_date').val();
        getVehiclesSelect('vehicleFilterId',selectedVehicleValue)
    } else {
        getAllocations('');
    }


    $('#clearFilters').on('click', function() {
        getAllocations('');
        localStorage.removeItem('allocationsFilters');
        $('#vehicleFilterId').val('');
        $('#dateFilter').val('');
        $('#statusFilter').val('');
        $('#clearFilters').hide();
        $('#filterVehicles').hide();
    });

    $('#showAllocationsFilter').click(function(e) {
        e.preventDefault();
        getVehiclesSelect('vehicleFilterId');
    });
    $('#newAllocationBtn').click(function(e) {
        e.preventDefault();
        getVehiclesSelect('vehicleAdd');
    });

    $('#addNewAllocation').click(function(e) {
        e.preventDefault();
        // var validate = validateAllocation();
        var validate = true;
        if (validate){
            const date = new Date($('#allocationDate').val());
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1;
            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const formattedToday = dd + '.' + mm + '.' + yyyy;
            $.ajax({
                url: '/../../functions/allocations.php',
                type:'POST',
                data:  {
                    'addNewAllocation': 1,
                    'data':{
                        'vehicleId': $('#vehicleAdd').val(),
                        'allocationDate':formattedToday
                    }
                } ,
                success: function(response) {
                    console.log(response)
                    var dataParse = JSON.parse(response);
                    if (dataParse.error){
                        $('#alertAddAllocationError').html(createWarningMessage(dataParse.error));
                    }else{
                        var data = dataParse.data.data;
                        var newRow = $('<tr>').attr('id', data.id);
                        newRow.append($('<td>').text(data.allocationDate));
                        newRow.append($('<td>').text(data.vehicle.brand +' ' +data.vehicle.model));
                        newRow.append($('<td>').text(data.vehicle.registrationNumber));
                        if (data.status==0){
                            var status ='<span class="badge badge-pill badge-red font-size-13">Pending</span>';
                        }else  if (data.status==1){
                            var status ='<span class="badge badge-pill badge-cyan font-size-13">Confirmed</span>';
                        }else{
                            var status ='<span class="badge badge-pill badge-red font-size-13"></span>';
                        }

                        newRow.append($('<td>').html(status));
                        newRow.append($('<td>').html('<a class="btn btn-primary m-r-5 " href="/alokacija/'+data.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a><button class="btn btn-danger m-r-5 allocation-delete" data-allocationid="'+data.id+'"><i class="anticon anticon-user-delete"></i>Obriši</button>'));
                        $('#allocations-table tbody').prepend(newRow);

                        $('#alertAddAllocationSuccess').html(createSuccessMessage('Uspješno ste kreirali novu alokaciju'));

                        $('#newAllocation').modal('hide');
                        $('#allocationAdd')[0].reset();
                    }

                },  error: function(jqXHR) {
                    var error = generateAjaxError(jqXHR);
                    $('#alertAddAllocationError').html(createErrorMessage(error));
                }
            });
        }
    });
});

$(document).on('click', '.allocation-delete', function() {
    var allocationId = $(this).data('allocationid');
    if (confirm('Da li ste sigurni da želite da obrišete alokaciju ? ')) {
        $.ajax({
            url: '/../../functions/allocations.php',
            type: 'delete',
            contentType: 'application/json',
            data: JSON.stringify({ deleteAllocation: 1, allocationId: allocationId }),
            success: function(response) {
                console.log(response)
                var data = JSON.parse(response);
                if (data.error){
                    $('#alertDeleteAllocation').html(createWarningMessage(data.error));
                }else{
                    var id = data.data.data.id;
                    console.log(id)
                    var datum = data.data.data.allocationDate;
                    var vehicle = data.data.data.vehicle.brand + ' ' +data.data.data.vehicle.model ;
                    var table = $('#allocation-table').DataTable();
                    var row = table.row('#' + id);
                    row.remove().draw();
                    $('#alertDeleteAllocation').html(createSuccessMessage('Uspješno ste obrisali alokaciju za datum ' +datum + ' i vozilo ' +vehicle ));
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                var error = generateAjaxError(jqXHR);
                $('#alertDeleteUser').html(createErrorMessage(error));
            }
        });
    }
});
$(document).on('click', '#allocationsFilter', function() {
    var vehicle = $('#vehicleFilterId').val();
    var status = $('#statusFilter').val();

    const date = new Date($('#dateFilter').val());
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '.' + mm + '.' + yyyy;
    var filters = {
        vehicle: vehicle,
        allocationDate: formattedToday,
        status: status,
    };

    localStorage.setItem('allocationsFilters', JSON.stringify(filters));
    getAllocations(filters);
    $('#clearFilters').show();
});
function getAllocations(filters){
    var data = {
        getAllAllocations: 1
    };

    if (filters !== '') {
        data.status= filters.status;
        data.vehicle= filters.vehicle;
        data.allocationDate= filters.allocationDate;
    }
    var paginationData = $('#pagination-form').serializeArray();
    $.each(paginationData, function(index, item) {
        data[item.name] = item.value;
    });

    $.ajax({
        url: '/../../functions/allocations.php',
        type:'GET',
        data:data,
        dataType: 'json',
        success: function(response) {
            console.log(response)
            if (response.error) {
                $('#allocationAlert').append(createWarningMessage(response.error));
            } else {
                $('#allocations-table tbody').empty();
                var data = response.data.data;
                $.each(data, function(index, row) {
                    if (row.status==0){
                        var status ='<span class="badge badge-pill badge-red font-size-13">Pending</span>';
                    }else  if (row.status==1){
                        var status ='<span class="badge badge-pill badge-cyan font-size-13">Confirmed</span>';
                    }
                    $('#allocations-table tbody').prepend('<tr id="'+row.id+'"><td>' + row.allocationDate + '</td><td>' + row.vehicle.brand +' ' +row.vehicle.model+ '</td><td>' + row.vehicle.registrationNumber + '</td> <td>' + status + '</td> <td><a class="btn btn-primary m-r-5 " href="/alokacija/'+row.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a><button class="btn btn-danger m-r-5 allocation-delete" data-allocationid="'+row.id+'"><i class="anticon anticon-user-delete"></i>Obriši</button></td></tr>');
                });
                $('#allocations-table').DataTable();
            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#allocationAlert').append(createWarningMessage(error));
        }
    });
}
function getVehiclesSelect(selectId, selectedValue = null){
    $.ajax({
        url: '/../../functions/vehicles.php',
        type: 'GET',
        dataType: 'json',
        data:{'getAllVehicles':1},
        success: function(response) {
            console.log(response)
            var data = response.data.data;
            var select = $('#'+selectId);
            select.empty();
            select.append('<option value="">Odaberite vozilo</option>');
            $.each(data, function(key, value) {
                var selected = (value.id == selectedValue) ? 'selected' : '';
                select.append('<option value="' + value.id + '"' + selected + '>' + value.brand + ' ' + value.model + ' ' + value.year +'</option>');
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + errorThrown);
        }
    });

}