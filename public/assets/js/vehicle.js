$(document).ready(function() {
    var url = window.location.href;
    var vehicleId = url.substring(url.lastIndexOf('/') + 1);
    $.ajax({
        url: '/../../functions/vehicles.php',
        type:'GET',
        data:{getSingleVehicle:1,vehicleId:vehicleId},
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                $('#alertGetVehicle').html(handleErrors(response.error));
                $('.vehicleDataCard').hide()
            } else {
                var data = response.data.data;
                $('.vehicleName').html(data.brand + ' ' + data.model);
                $('.vehicleBrand').html(data.brand);
                $('.vehicleModel').html(data.model);
                $('.vehicleNumberOfSeats').html(data.numberOfSeats);
                $('.vehicleRegistrationNumber').html(data.registrationNumber);
                $('.vehicleYear').html(data.year);
                $('.vehicleId').val(data.id);

                if (data.readyForDrive==true){
                    $('.vehicleReadyForDrive').html('<span class="badge badge-pill badge-cyan font-size-13">Ispravno</span>');
                }else{
                    $('.vehicleReadyForDrive').html('<span class="badge badge-pill badge-red font-size-13">Neispravno</span>');
                }
                if (data.isReservedForExternalUsage==true){
                    $('.vehicleExternalUse').html('<span class="badge badge-pill badge-cyan font-size-13">DA</span>');
                }else{
                    $('.vehicleExternalUse').html('<span class="badge badge-pill badge-red font-size-13">NE</span>');
                }

            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alertGetVehicle').html(createWarningMessage(error));
        },
        complete:function (){
            $('#loader-overlay').hide();
        }
    });
    var current_page=$('#current_page').val();
    var per_page=$('#per_page').val();
    getVehicleComment(current_page,per_page);

    $('#addVehicleComment').click(function(e) {
        e.preventDefault();
        var $btn = $(this);
        $btn.addClass('is-loading').prop('disabled', true);
        $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
        vehicleId= $('.vehicleId').val();
        $.ajax({
            url: '/../../functions/vehicles.php',
            type:'post',
            data:  {
                'addVehicleComment': 1,
                'data':{
                    'vehicleId': vehicleId,
                    'comment': $('#vehicleComment').val(),
                    'mark': $('#vehicleRate').val(),
                }
            },
            success: function(response) {
                var dataParse = JSON.parse(response);
                if (dataParse.error) {
                    $('#vehicleCommentError').html(handleErrors(dataParse.error));
                } else {
                    $('#commentAlert').html(createSuccessMessage('Uspješno ste dodali novi komentar'));
                    var data = dataParse.data.data;


                    var newRow = '<tr id="'+data.id+'"><td>' + data.user.name + '</td><td>' + data.comment + '</td>' +
                        '<td>' + data.mark+ '</td><td>';
                    $('#vehicle-comment-table tbody').prepend(newRow);
                    $('#newIrregularity').modal('hide');

                }
            },  error: function(jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#vehicleCommentError').html(createErrorMessage(error));
            },
            complete:function (){
                $btn.removeClass('is-loading').prop('disabled', false);
                $btn.find('.anticon-loading').remove();
            }
        });

    });
    $('#vehicleRate').on('input', function() {
        var value = $(this).val();
        if (value < 1 || value > 5 || isNaN(value)) {
            $(this).val('');
        }
    });
    $('#changeVehicleStatus').click(function(e) {
        e.preventDefault();
        var $btn = $(this);
        $btn.addClass('is-loading').prop('disabled', true);
        $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
        vehicleId= $('.vehicleId').val();
        if ($('#vehicleStatus').val()==1){
            var vehicleStatus=true;
        }else{
            vehicleStatus=false;
        }
        $.ajax({
            url: '/../../functions/vehicles.php',
            type:'put',
            data:  JSON.stringify({
                'changeVehicleStatus': 1,
                'data':{
                    'vehicleId': vehicleId,
                    'readyToDrive': vehicleStatus
                }
            }),
            success: function(response) {
                if (response.error) {
                    $('#vehicleStatusError').html(handleErrors(response.error));
                } else {
                    var dataParse = JSON.parse(response);
                    Swal.fire('Uspejšno ste promijenili status vozila','','success' )
                    if (dataParse.data.data.readyForDrive==true){
                        $('.vehicleReadyForDrive').html('<span class="badge badge-pill badge-cyan font-size-13">Ispravno</span>');
                    }else{
                        $('.vehicleReadyForDrive').html('<span class="badge badge-pill badge-red font-size-13">Neispravno</span>');
                    }
                    $('#mehanicSetStatus').modal('hide');

                }
            },  error: function(jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#vehicleStatusError').html(createErrorMessage(error));
            },
            complete:function (){
                $btn.removeClass('is-loading').prop('disabled', false);
                $btn.find('.anticon-loading').remove();
            }
        });

    });
    $('#newIrregularityButton').click(function(e) {
        $('#vehicleComment').val('');
        $('#vehicleRate').val('');
    });
    $('#externalUseChange').click(function(e) {
        e.preventDefault();
        var $btn = $(this);
        $btn.addClass('is-loading').prop('disabled', true);
        $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
        vehicleId= $('.vehicleId').val();
        if ($('#reservedForExternalUsage').val()==1){
            var reservedForExternalUsage=true;
        }else{
            reservedForExternalUsage=false;
        }
        $.ajax({
            url: '/../../functions/vehicles.php',
            type:'put',
            data:  JSON.stringify({
                'externalUse': 1,
                'data':{
                    'vehicleId': vehicleId,
                    'reservedForExternalUsage': reservedForExternalUsage
                }
            }),
            success: function(response) {
                if (response.error) {
                    $('#vehicleExternalError').html(handleErrors(response.error));
                } else {
                    var dataParse = JSON.parse(response);
                    Swal.fire('Uspješno ste promijenili status eksterne upotrebe vozila','','success' )
                    if (dataParse.data.data.isReservedForExternalUsage==true){
                        $('.vehicleExternalUse').html('<span class="badge badge-pill badge-cyan font-size-13">Da</span>');
                    }else{
                        $('.vehicleExternalUse').html('<span class="badge badge-pill badge-red font-size-13">Ne</span>');
                    }
                    $('#externalUse').modal('hide');

                }
            },  error: function(jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#vehicleExternalError').html(createErrorMessage(error));
            },
            complete:function (){
                $btn.removeClass('is-loading').prop('disabled', false);
                $btn.find('.anticon-loading').remove();
            }
        });

    });
});

function getVehicleComment(current_page,per_page){

    var url = window.location.href;
    var vehicleId = url.substring(url.lastIndexOf('/') + 1);
    $('#vehicle-comment-table tbody').html('<tr><td colspan="5" class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
    $.ajax({
        url: '/../../functions/vehicles.php',
        type:'GET',
        data:{
            getSingleVehicleComment:1,
            vehicleId:vehicleId,
            per_page:per_page,
            current_page:current_page},
        dataType: 'json',
        success: function(response) {
            var data = response.data.data;
            if (data.error) {
                $('#alertGetVehicle').html(handleErrors(data.error));
            } else {
                $('#vehicle-comment-table tbody').empty();
                response.data.data.forEach(function(item) {
                    var newRow = '<tr id="'+item.id+'"><td>'+item.user.name+'</td><td class="vehicle-comment">' + item.comment + '</td><td>' + item.mark + '</td></tr>';
                    $('#vehicle-comment-table tbody').append(newRow);

                });
                var meta = response.data.meta;
                var paginationHTML = generatePagination(meta.totalItems, meta.itemsPerPage, meta.currentPage);
                $('#pagination').html(paginationHTML);

            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alertGetVehicle').html(createWarningMessage(error));
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
        getVehicleComment(pageNumber,per_page);

}
