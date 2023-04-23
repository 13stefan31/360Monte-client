$(document).ready(function() {
    var url = window.location.href;
    var allocationId = url.substring(url.lastIndexOf('/') + 1);
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

    $('#personDataChange').click(function(e) {
        e.preventDefault();
        var validated = validateUpdateUser();
        if (validated){
            $.ajax({
                url: '/../../functions/person.php',
                type:'put',
                data:  JSON.stringify({
                    'updatePerson': 1,
                    'data':{
                        'personId': personId,
                        'personName': $('#personName').val(),
                        'personEmail': $('#personEmail').val()
                    }
                }),
                success: function(response) {
                    var dataParse = JSON.parse(response);
                    var data = dataParse.data.data;
                    if (data.error) {
                        $('#alertChangeUser').html(createWarningMessage(data.error));
                    } else {
                        $('#alertChangeUser').html(createSuccessMessage('Uspješno ste izmijenili podatke o korisniku'));
                        $('.personName').html(data.name);
                        $('.personEmail').html(data.email);
                        $('.personUsername').html(data.username);

                    }
                },  error: function(jqXHR) {
                    var error = generateAjaxError(jqXHR);
                    $('#alertChangeUser').html(createErrorMessage(error));
                }
            });

        }
    });




});
