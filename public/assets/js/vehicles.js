$(document).ready(function() {
    var savedFilters = localStorage.getItem('vehiclesFilters');
    var current_page=$('#current_page').val();
    var per_page=$('#per_page').val();
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getVehicles(savedFilters,current_page,per_page);
        var selectedValue=$('#vehicle_status_filter').val();
        $('#statusFilter').val(selectedValue);
    } else {
        getVehicles('',current_page,per_page);
    }


    $('#clearFilters').on('click', function() {
        var per_page=$('#per_page').val();
        getVehicles('',1,per_page);
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
    var current_page=1;
    var per_page=$('#per_page').val();
    getVehicles(filters,current_page,per_page);
    $('#clearFilters').show();
});
function getVehicles(filters,current_page,per_page){
    var data = {
        getAllVehicles: 1,
        per_page:per_page,
        current_page:current_page
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
            if (response.error) {
                $('#alertVehicles').html(handleErrors(response.error));
            } else {
                $('#vehicles-table tbody').empty();
                var data = response.data.data;
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
                var meta = response.data.meta;
                var paginationHTML = generatePagination(meta.totalItems, meta.itemsPerPage, meta.currentPage);
                $('#pagination').html(paginationHTML);


            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alertVehicles').append(createWarningMessage(error));
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
    var savedFilters = localStorage.getItem('vehiclesFilters');
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getVehicles(savedFilters,pageNumber,per_page);
     } else {
        getVehicles('',pageNumber,per_page);
    }

}
