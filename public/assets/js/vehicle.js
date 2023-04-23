$(document).ready(function() {
    var url = window.location.href;
    var vehicleId = url.substring(url.lastIndexOf('/') + 1);
    $.ajax({
        url: '/../../functions/vehicles.php',
        type:'GET',
        data:{getSingleVehicle:1,vehicleId:vehicleId},
        dataType: 'json',
        success: function(response) {
            console.log(response)
            var data = response.data.data;
            if (data.error) {
                $('#alertGetVehicle').html(handleErrors(data.error));
            } else {
                $('.vehicleName').html(data.brand + ' ' + data.model);
                $('.vehicleBrand').html(data.brand);
                $('.vehicleModel').html(data.model);
                $('.vehicleNumberOfSeats').html(data.numberOfSeats);
                $('.vehicleRegistrationNumber').html(data.registrationNumber);
                $('.vehicleYear').html(data.year);

                if (data.readyForDrive==true){
                    $('.vehicleReadyForDrive').html('<span class="badge badge-pill badge-cyan font-size-13">Ispravno</span>');
                }else{
                    $('.vehicleReadyForDrive').html('<span class="badge badge-pill badge-red font-size-13">Neispravno</span>');
                }

            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alertGetVehicle').html(createWarningMessage(error));
        }
    });



});