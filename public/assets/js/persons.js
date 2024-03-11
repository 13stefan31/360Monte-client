$(document).ready(function() {
    var savedFilters = localStorage.getItem('personFilters');
    var current_page=$('#current_page').val();
    var per_page=$('#per_page').val();
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getUsers(savedFilters,current_page,per_page);
        var selectedValue=$('#person_filter_rola_id').val();
        getRoles('rolaFilterId',selectedValue);
    } else {
        getUsers('',current_page,per_page);
    }

    $('#showPersonsFilter').click(function(e) {
        e.preventDefault();
        getRoles('rolaFilterId');
    });
    $('#newPersonButton').click(function(e) {
        e.preventDefault();
        getRoles('rolaId');
    });
    $('#addNewPerson').click(function(e) {
        e.preventDefault();
        var validate = validateNewUser();
            if (validate){
                var $btn = $(this);
                $btn.addClass('is-loading').prop('disabled', true);
                $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
                $.ajax({
                    url: '/../../functions/persons.php',
                    type:'POST',
                    data:  {
                        'addNewPerson': 1,
                        'data':{
                            'addNewPerson': 1,
                            'name': $('#name').val(),
                            'email': $('#email').val(),
                            'rolaId': $('#rolaId').val()
                        }
                    } ,
                    success: function(response) {
                        var dataParse = JSON.parse(response);
                        if (dataParse.error){
                            $('#employeeAddError').html(handleErrors(dataParse.error));
                         }else{
                            var data = dataParse.data.data;
                            var newRow = $('<tr>').attr('id', data.id);
                            newRow.append($('<td>').text(data.name));
                            newRow.append($('<td>').text(data.email));
                            newRow.append($('<td>').text(data.username));
                            newRow.append($('<td>').text(data.roleName));
                            newRow.append($('<td>').html('<a class="btn btn-primary m-r-5 " href="/zaposleni/'+data.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a><button class="btn btn-danger m-r-5 user-delete" data-userid="'+data.id+'"><i class="anticon anticon-user-delete"></i>Obriši</button>'));
                            $('#persons-table tbody').prepend(newRow);

                            $('#alertAddUser').html(createSuccessMessage('Uspješno ste dodali novog korisnika'));

                            $('#newPerson').modal('hide');
                            $('#personAdd')[0].reset();
                        }

                    },  error: function(jqXHR) {
                        var error = generateAjaxError(jqXHR);
                        $('#employeeAddError').html(createErrorMessage(error));
                    },
                    complete:function (){
                        $btn.removeClass('is-loading').prop('disabled', false);
                        $btn.find('.anticon-loading').remove();
                    }
                });
            }
    });
    $('#clearFilters').on('click', function() {
        var per_page=$('#per_page').val();
        getUsers('',1,per_page);
        localStorage.removeItem('personFilters');
        $('#personFilterName').val('');
        $('#rolaFilterId').val('');
        $('#clearFilters').hide();
    });
});
$(document).on('click', '.user-delete', function() {
    var userId = $(this).data('userid');
    Swal.fire({
        title: 'Da li ste sigurni da želite da obrišete korisnika?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Obriši',
        denyButtonText: `Odustani`,
    }).then((result) => {
        if (result.isConfirmed) {
            var $btn = $(this);
            $btn.addClass('is-loading').prop('disabled', true);
            $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');

            $.ajax({
                url: '/../../functions/persons.php',
                type: 'delete',
                contentType: 'application/json',
                data: JSON.stringify({ deleteUser: 1, userId: userId }),
                success: function(response) {
                    var data = JSON.parse(response);
                    if (data.error){
                        // $('#alertDeleteUser').html(handleErrors(data.error));
                        Swal.fire(data.error, '', 'error')
                    }else{
                        var id = data.data.data.id;
                        var name = data.data.data.name;
                        var table = $('#persons-table').DataTable();
                        var row = table.row('#'+id);
                        row.remove().draw();
                        Swal.fire('Uspješno ste obrisali korisnika '+name, '', 'success')

                        // $('#alertDeleteUser').html(createSuccessMessage('Uspješno ste obrisali korisnika '+name));
                    }

                },
                error: function(jqXHR, textStatus, errorThrown) {

                    var error = generateAjaxError(jqXHR);
                    Swal.fire(error, '', 'error')
                    // $('#alertDeleteUser').html(createErrorMessage(error));
                },
                complete:function (){
                    $btn.removeClass('is-loading').prop('disabled', false);
                    $btn.find('.anticon-loading').remove();
                }
            });


        } else if (result.isDenied) {   }
    })

});

$(document).on('click', '#persosnsFilter', function() {
    var name = $('#personFilterName').val();
    var rolaId = $('#rolaFilterId').val();
    var filters = {
        name: name,
        rolaId: rolaId
    };

    localStorage.setItem('personFilters', JSON.stringify(filters));
    var current_page=1;
    var per_page=$('#per_page').val();
    getUsers(filters,current_page,per_page);
    $('#clearFilters').show();
});
function getUsers(filters,current_page,per_page){
    var data = {
        getAllPersons: 1,
        per_page:per_page,
        current_page:current_page
    };

    if (filters !== '') {
        data.name = filters.name;
        data.rolaId = filters.rolaId;
    }

    $('#persons-table tbody').html('<tr><td colspan="5" class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
    $.ajax({
        url: '/../../functions/persons.php',
        type:'GET',
        data:data,
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                $('#alert').append(createWarningMessage(response.error));
            } else {
                console.log()
                $('#persons-table tbody').empty();
                var data = response.data.data;
                $.each(data, function(index, row) {
                    $('#persons-table tbody').append('<tr id="'+row.id+'"><td>' + row.name + '</td><td>' + row.email + '</td><td>' + row.username + '</td><td>' + row.roleName + '</td><td><a class="btn btn-primary m-r-5 " href="/zaposleni/'+row.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a>' +
                        '<button class="btn btn-danger m-r-5 user-delete" data-userid="'+row.id+'"><i class="anticon anticon-user-delete"></i>Obriši</button></td></tr>');
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
function getRoles(selectId, selectedValue = null){
    $.ajax({
        url: '/../../functions/persons.php',
        type: 'GET',
        dataType: 'json',
        data:{'getRoles':1},
        success: function(response) {
            var data = response.data.data;
            var select = $('#'+selectId);
            select.empty();
            select.append('<option value="">Odaberite rolu</option>');
            $.each(data, function(key, value) {
                var selected = (value.id == selectedValue) ? 'selected' : '';
                select.append('<option value="' + value.id + '"' + selected + '>' + value.name + '</option>');
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + errorThrown);
        }
    });

}
function isValidEmail(email) {
    var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return regex.test(email);
}
function validateNewUser(){
    var name = $('#name').val();
    var email = $('#email').val();
    var rolaId = $('#rolaId').val();
    $('.error').remove();

    if ($.trim(name).length == 0) {
        $('#name').after('<p class="error">Unesite ime i prezime.</p>');
    }
    if ($.trim(email).length == 0 || !isValidEmail(email)) {
        $('#email').after('<p class="error">Unesite validan email.</p>');
    }

    if (rolaId == '') {
        $('#rolaId').after('<p class="error">Odaberite rolu.</p>');
    }
    if ($('.error').length == 0) {
        return true;
    }else {
        return false;
    }
};
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
    var savedFilters = localStorage.getItem('personFilters');
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getUsers(savedFilters,pageNumber,per_page);
    } else {
        getUsers('',pageNumber,per_page);
    }

}
