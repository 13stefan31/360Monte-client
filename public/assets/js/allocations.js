$(document).ready(function() {
    var savedFilters = localStorage.getItem('allocationsFilters');
    var current_page=$('#current_page').val();
        var per_page=$('#per_page').val();
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getAllocations(savedFilters,current_page,per_page);
        var selectedVehicleValue=$('#allocation_filter_vehicle').val();
        getVehiclesSelect('vehicleFilterId',selectedVehicleValue)
    } else {
        getAllocations('',current_page,per_page);
    }


    $('#clearFilters').on('click', function() {
        var per_page=$('#per_page').val();
        getAllocations('',1,per_page);
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
       var validate = validateAllocation();
        if (validate){
            var $btn = $(this);
            $btn.addClass('is-loading').prop('disabled', true);
            $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');

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
                    var dataParse = JSON.parse(response);
                    if (dataParse.error){
                        $('#alertAddAllocationError').html(handleErrors(dataParse.error));
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
                        newRow.append($('<td>').html('<a class="btn btn-primary m-r-5 " href="/alokacije/'+data.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a><button class="btn btn-danger m-r-5 allocation-delete" data-allocationid="'+data.id+'"><i class="anticon anticon-user-delete"></i>Obriši</button>'));
                        $('#allocations-table tbody').prepend(newRow);

                        $('#alertAddAllocationSuccess').html(createSuccessMessage('Uspješno ste kreirali novu alokaciju'));

                        $('#newAllocation').modal('hide');
                        $('#allocationAdd')[0].reset();
                    }

                },  error: function(jqXHR) {
                    var error = generateAjaxError(jqXHR);
                    $('#alertAddAllocationError').html(createErrorMessage(error));
                },
                complete:function (){  $btn.removeClass('is-loading').prop('disabled', false);
                    $btn.find('.anticon-loading').remove();

                }
            });
        }
    });
});

$(document).on('click', '.allocation-delete', function() {
    var allocationId = $(this).data('allocationid');
    if (confirm('Da li ste sigurni da želite da obrišete alokaciju ? ')) {
        var $btn = $(this);
        $btn.addClass('is-loading').prop('disabled', true);
        $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
        $.ajax({
            url: '/../../functions/allocations.php',
            type: 'delete',
            contentType: 'application/json',
            data: JSON.stringify({ deleteAllocation: 1, allocationId: allocationId }),
            success: function(response) {
                var data = JSON.parse(response);
                if (data.error){
                    $('#alertDeleteAllocation').html(handleErrors(data.error));
                }else{
                    var id = data.data.data.id;
                    var datum = data.data.data.allocationDate;
                    var vehicle = data.data.data.vehicle.brand + ' ' +data.data.data.vehicle.model ;
                    var table = $('#allocation-table').DataTable();
                    var rowRemove = table.row('#'+allocationId);
                    rowRemove.remove().draw();
                    $('#alertDeleteAllocation').html(createSuccessMessage('Uspješno ste obrisali alokaciju za datum ' +datum + ' i vozilo ' +vehicle ));
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                var error = generateAjaxError(jqXHR);
                $('#alertDeleteUser').html(createErrorMessage(error));
            },
            complete:function (){
                $btn.removeClass('is-loading').prop('disabled', false);
                $btn.find('.anticon-loading').remove();
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
    var current_page=$('#current_page').val();
    var per_page=$('#per_page').val();
    getAllocations(filters,current_page,per_page);
    $('#clearFilters').show();
});
function getAllocations(filters,current_page,per_page){
    var data = {
        getAllAllocations: 1,
        per_page:per_page,
        current_page:current_page
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
    $('#allocations-table tbody').html('<tr><td colspan="5" class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
    $.ajax({
        url: '/../../functions/allocations.php',
        type:'GET',
        data:data,
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                $('#allocationAlert').html(handleErrors(response.error));
            } else {
                $('#allocations-table tbody').empty();
                var data = response.data.data;
                $.each(data, function(index, row) {
                    if (row.status==0){
                        var status ='<span class="badge badge-pill badge-red font-size-13">Pending</span>';
                    }else  if (row.status==1){
                        var status ='<span class="badge badge-pill badge-cyan font-size-13">Confirmed</span>';
                    }
                    $('#allocations-table tbody').prepend('<tr id="'+row.id+'"><td>' + row.allocationDate + '</td><td>' + row.vehicle.brand +' ' +row.vehicle.model+ '</td><td>' + row.vehicle.registrationNumber + '</td> <td>' + status + '</td> <td><a class="btn btn-primary m-r-5 " href="/alokacije/'+row.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a><button class="btn btn-danger m-r-5 allocation-delete" data-allocationid="'+row.id+'"><i class="anticon anticon-user-delete"></i>Obriši</button></td></tr>');
                });
                var meta = response.data.meta;
                var paginationHTML = generatePagination(meta.totalItems, meta.itemsPerPage, meta.currentPage);
                $('#pagination').html(paginationHTML);
                // $('#allocations-table').DataTable();
            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#allocationAlert').append(createWarningMessage(error));
        }
    });
}
function validateAllocation(){
    var allocationDate = document.getElementById("allocationDate");
    var vehicleAdd = document.getElementById("vehicleAdd");

    // check input values
    var isValid = true;
    if (allocationDate.value === "") {
        allocationDate.nextElementSibling.textContent = "Morate odabrati datum";
        isValid = false;
    } else {
        allocationDate.nextElementSibling.textContent = "";
    }
    if (vehicleAdd.value === "") {
        vehicleAdd.nextElementSibling.textContent = "Morate odabrati vozilo";
        isValid = false;
    } else {
        vehicleAdd.nextElementSibling.textContent = "";
    }
    // submit form if valid
    if (isValid) {
        return true;
    }else{
        return false;
    }
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
    var savedFilters = localStorage.getItem('allocationsFilters');
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getAllocations(savedFilters,pageNumber,per_page);
        var selectedVehicleValue=$('#allocation_filter_vehicle').val();
        getVehiclesSelect('vehicleFilterId',selectedVehicleValue)
    } else {
        getAllocations('',pageNumber,per_page);
    }

}
