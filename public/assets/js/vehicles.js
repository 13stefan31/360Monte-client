$(document).ready(function() {
    var savedFilters = localStorage.getItem('vehiclesFilters');
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getVehicles(savedFilters);
        var selectedValue=$('#vehicle_status_filter').val();
        $('#statusFilter').val(selectedValue);
    } else {
        getVehicles('');
    }


    $('#clearFilters').on('click', function() {
        getVehicles('');
        localStorage.removeItem('vehiclesFilters');
        $('#brandFilter').val('');
        $('#modelFilter').val('');
        $('#regNoFilter').val('');
        $('#statusFilter').val('');
        $('#seatsNoFilter').val('');
        $('#clearFilters').hide();
        $('#filterVehicles').hide();
    });
});

$(document).on('click', '#vehicleFilters', function() {
    var brand = $('#brandFilter').val();
    var model = $('#modelFilter').val();
    var regNo = $('#regNoFilter').val();
    var status = $('#statusFilter').val();
    var seatsNo = $('#seatsNoFilter').val();
    var filters = {
        brand: brand,
        model: model,
        regNo: regNo,
        status: status,
        seatsNo: seatsNo
    };

    localStorage.setItem('vehiclesFilters', JSON.stringify(filters));
    getVehicles(filters);
    $('#clearFilters').show();
});
function getVehicles(filters){
    var data = {
        getAllVehicles: 1,
    };

    if (filters !== '') {
        data.brand= filters.brand;
        data.model= filters.model;
        data.regNo= filters.regNo;
        data.status= filters.status;
        data.seatsNo= filters.seatsNo;
    }
    data.showOnWeb= 2;
    var paginationData = $('#pagination-form').serializeArray();
    $.each(paginationData, function(index, item) {
        data[item.name] = item.value;
    });
    $('#vehicles-table tbody').html('<tr><td colspan="5" class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

    $.ajax({
        url: '/../../functions/vehicles.php',
        type:'GET',
        data:data,
        dataType: 'json',
        success: function(response) {
            console.log(response)
            if (response.error) {
                $('#alertVehicles').html(handleErrors(response.error));
            } else {
                $('#vehicles-table tbody').empty();
                var data = response.data.data;
                var meta = response.data.meta;
                $.each(data, function(index, row) {
                    if (row.readyForDrive==true){
                        var readyForDrive ='<span class="badge badge-pill badge-cyan font-size-13">Ispravno</span>';
                    }else{
                        var readyForDrive ='<span class="badge badge-pill badge-red font-size-13">Neispravno</span>';
                    }
                    if (row.show==true){
                        var show ='<span class="badge badge-pill badge-green font-size-13">Dostupno</span>';
                    }else{
                        var show ='<span class="badge badge-pill badge-red font-size-13">Nedostupno</span>';
                    }
                    $('#vehicles-table tbody').append('<tr id="'+row.id+'"><td>' + row.brand + '</td><td>' + row.model + '</td><td>' + row.year + '</td><td>' + row.registrationNumber + '</td><td>' + row.numberOfSeats + '</td><td>' + readyForDrive + '</td><td>'+show+'</td><td><a class="btn btn-primary m-r-5 " href="/vozila/'+row.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a></td></tr>');
                });
                $('#vehicles-table').DataTable({
                    searching: false,
                    lengthChange: false
                });
                $('#vehicles-table_info').hide();

            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alertVehicles').append(createWarningMessage(error));
        }
    });
}