$(document).ready(function() {
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    var allocationId = id.match(/\d+/)[0];
    $('#allocationId').val(allocationId)
    $.ajax({
        url: '/../../functions/allocation.php',
        type:'GET',
        data:{getSingleAllocation:1,allocationId:allocationId},
        dataType: 'json',
        success: function(response) {
            var data = response.data.data;
            if (data.error) {
                $('#alertGetAllocation').html(createWarningMessage(data.error));
            } else {
                if (data.status==1){
                    var status ='<span class="badge badge-pill badge-cyan font-size-13">Confirmed</span>';
                }else  if (data.status==0){
                    var status ='<span class="badge badge-pill badge-red font-size-13">Pending</span>';
                }
                $('.allocationDate').html(data.allocationDate);
                $('.allocationVehicle').html(data.vehicle.brand + ' ' + data.vehicle.model  );
                $('.allocationVehicleRegNo').html(data.vehicle.registrationNumber  );
                $('.allocationVehicleSeatsNo').html(data.vehicle.numberOfSeats  );
                $('.allocationStatus').html(status);
                var date = data.allocationDate;
                var dateComponents = date.split('.');
                var year = dateComponents[2];
                var month = dateComponents[1];
                var day = dateComponents[0];

                var formattedDate = year + '-' + month + '-' + day;
                $('#dateChange').val(formattedDate);

                getVehiclesSelect('vehicleChange',data.vehicle.id);

            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alertGetAllocation').html(createWarningMessage(error));
        }
    });

    $.ajax({
        url: '/../../functions/allocation.php',
        type:'GET',
        data:{getAllAllocationStuff:1,allocationId:allocationId},
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                $('#allocationAlert').html(createWarningMessage(data.error));
            } else {
                response.data.data.forEach(function(item) {
                    console.log(item)
                    var newRow = '<tr id="'+item.id+'"><td class="stuffPosition">' + item.allocationPosition + '</td><td class="stuffName">' + item.employee.name + '</td><td class="stuffStatus">' + item.status + '</td><td>' +
                        '<button class="btn btn-primary m-r-5 stuff-edit" data-allocationstuffid="'+item.id+'" ><i class="anticon anticon-edit"></i></button>' +
                        '<button class="btn btn-danger m-r-5 stuff-delete"  data-allocationid="'+item.allocation.id+'" data-allocationstuffid="'+item.id+'" data-allocationstuffname="'+item.employee.name+'"><i class="anticon anticon-delete"></i></button></td></tr>';
                    $('#allocation-stuff-tabele tbody').append(newRow);
                });
            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#allocationAlert').html(createWarningMessage(error));
        }
    });

    $('#editAllocationData').click(function(e) {
        e.preventDefault();
        // var validated = validateUpdateUser();
        var validated = true;
        if (validated){
            const date = new Date($('#dateChange').val());
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1;
            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const formattedToday = dd + '.' + mm + '.' + yyyy;
            $.ajax({
                url: '/../../functions/allocation.php',
                type:'put',
                data:  JSON.stringify({
                    'updateAllocationData': 1,
                    'data':{
                        'allocationId': allocationId,
                        'allocationDate': formattedToday,
                        'vehicleId': $('#vehicleChange').val()
                    }

                }),
                success: function(response) {
                    var dataParse = JSON.parse(response);
                    console.log(dataParse)
                    if (dataParse.error) {
                        $('#allocationDataChangeError').html(createWarningMessage(dataParse.error));
                    } else {
                        var data = dataParse.data.data;
                        $('#allocationAlert').html(createSuccessMessage('Uspješno ste izmijenili podatke o alokaciji'));
                        $('.allocationDate').html(data.allocationDate);
                        $('.allocationVehicle').html(data.vehicle.brand + ' ' + data.vehicle.model);
                        $('.allocationVehicleRegNo').html(data.vehicle.allocationDate);
                        $('.allocationVehicleSeatsNo').html(data.vehicle.numberOfSeats);

                        $('#vehicle-date-change-modal').modal('hide');

                    }
                },  error: function(jqXHR) {
                    var error = generateAjaxError(jqXHR);
                    $('#allocationDataChangeError').html(createErrorMessage(error));
                }
            });

        }
    });

    $('#addEmpAllocationButton').click(function(e) {
        e.preventDefault();
        getStuffPositionAllocation('empPositionAddAllocation');
        getStuffAllocation('empAddAllocation');
    });

    $('#addEmpAllocation').click(function(e) {
        e.preventDefault();
        var allocationId= $('#allocationId').val();
        // var validated = validateUpdateUser();
        var validated = true;
        if (validated){
            $.ajax({
                url: '/../../functions/allocation.php',
                type:'post',
                data:   {
                    'addAllocationStuff': 1,
                    'data':{
                        'allocationId': allocationId,
                        'employeeId': $('#empAddAllocation').val(),
                        'allocationStuffPositionId': $('#empPositionAddAllocation').val(),
                    }

                },
                success: function(response) {
                    var dataParse = JSON.parse(response);
                    if (dataParse.error) {
                        $('#allocationPersonAddError').html(createWarningMessage(dataParse.error));
                    } else {
                        $('#allocationAlert').html(createSuccessMessage('Uspješno ste dodali novog zaposlenog na alokaciji'));
                        var data = dataParse.data.data;
                        var newRow = '<tr id="'+data.id+'"><td>' + data.allocationPosition + '</td><td>' + data.employee.name + '</td><td>' + data.status + '</td><td><button class="btn btn-primary m-r-5"><i class="anticon anticon-edit"></i></button>' +
                            '<button class="btn btn-danger m-r-5 stuff-delete"  data-allocationid="'+data.allocation.id+'" data-allocationstuffid="'+data.id+'" data-allocationstuffname="'+data.employee.name+'"><i class="anticon anticon-delete"></i></button></td></tr>';
                        $('#allocation-stuff-tabele tbody').append(newRow);

                        $('#allocation-add-person-modal').modal('hide');

                    }
                },  error: function(jqXHR) {
                    var error = generateAjaxError(jqXHR);
                    $('#allocationPersonAddError').html(createErrorMessage(error));
                }
            });

        }
    });




});
$(document).on('click', '.stuff-delete', function() {
    var allocationStuffId = $(this).data('allocationstuffid');
    var allocationStuffName = $(this).data('allocationstuffname');
    var allocationId = $(this).data('allocationid');
    if (confirm('Da li ste sigutni da želite da uklonite ' + allocationStuffName + ' ?')) {
        $.ajax({
            url: '/../../functions/allocation.php',
            type: 'delete',
            contentType: 'application/json',
            data: JSON.stringify({
                  deleteAllocation: 1
                , allocationStuffId: allocationStuffId
                , allocationId: allocationId
            }),
            success: function(response) {
                var data = JSON.parse(response);
                if (data.error){
                    $('#allocationAlert').html(createWarningMessage(data.error));
                }else{
                    $('#'+data.data.data.id).remove();
                    $('#allocationAlert').html(createSuccessMessage('Uspješno ste uklonili osobu '+data.data.data.employee.name));
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {

                var error = generateAjaxError(jqXHR);
                $('#allocationAlert').html(createErrorMessage(error));
            }
        });
    }
});
$(document).on('click', '.stuff-edit', function() {
    var allocationStuffId = $(this).data('allocationstuffid');

    alert(allocationStuffId)
});
function getStuffPositionAllocation(selectId, selectedValue = null){
    $.ajax({
        url: '/../../functions/allocation.php',
        type: 'GET',
        dataType: 'json',
        data:{'getAllStuffPositions':1},
        success: function(response) {
            console.log(response)
            var data = response.data.data;
            var select = $('#'+selectId);
            select.empty();
            select.append('<option value="">Odaberite poziciju</option>');
            $.each(data, function(key, value) {
                var selected = (value.id == selectedValue) ? 'selected' : '';
                select.append('<option value="' + value.id + '"' + selected + '>' + value.name +'</option>');
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + errorThrown);
        }
    });

}
//svi vozaci i vodici
function getStuffAllocation(selectId, selectedValue = null){
    $.ajax({
        url: '/../../functions/allocation.php',
        type: 'GET',
        dataType: 'json',
        data:{'getAllStuffAdd':1},
        success: function(response) {
            console.log(response)
            var data = response.data.data;
            var select = $('#'+selectId);
            select.empty();
            select.append('<option value="">Odaberite zaposlenog</option>');
            $.each(data, function(key, value) {
                var selected = (value.id == selectedValue) ? 'selected' : '';
                select.append('<option value="' + value.id + '"' + selected + '>' + value.name +'</option>');
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + errorThrown);
        }
    });

}