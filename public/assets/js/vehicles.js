$(document).ready(function() {
    $.ajax({
        url: '/../../functions/vehicles.php',
        type:'GET',
        data:{getAllVehicles:1},
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                $('#alertVehicles').append(createWarningMessage(response.error));
            } else {
                var data = response.data.data;
                $.each(data, function(index, row) {
                    if (row.readyForDrive==true){
                       var readyForDrive ='<span class="badge badge-pill badge-cyan font-size-13">Ispravno</span>';
                    }else{
                        var readyForDrive ='<span class="badge badge-pill badge-red font-size-13">Neispravno</span>';
                    }
                    $('#vehicles-table tbody').prepend('<tr id="'+row.id+'"><td>' + row.brand + '</td><td>' + row.model + '</td><td>' + row.year + '</td><td>' + row.registrationNumber + '</td><td>' + row.numberOfSeats + '</td><td>' + readyForDrive + '</td><td><a class="btn btn-primary m-r-5 " href="/vozilo/'+row.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a></td></tr>');
                });
                $('#vehicles-table').DataTable();
            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alertVehicles').append(createWarningMessage(error));
        }
    });

});