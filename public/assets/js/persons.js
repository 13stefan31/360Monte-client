$(document).ready(function() {
    var savedFilters = localStorage.getItem('personFilters');
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getUsers(savedFilters);
        var selectedValue=$('#person_filter_rola_id').val();
        getRoles('rolaFilterId',selectedValue);
    } else {
        getUsers('');
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
                        var data = dataParse.data.data;
                        if (data.error){
                            $('#alertAddUser').html(createWarningMessage(data.error));
                        }else{
                            var newRow = $('<tr>').attr('id', 'row-' + data.id);
                            newRow.append($('<td>').text(data.name));
                            newRow.append($('<td>').text(data.email));
                            newRow.append($('<td>').text(data.username));
                            newRow.append($('<td>').html('<a class="btn btn-primary m-r-5 " href="/zaposleni/'+data.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a><button class="btn btn-danger m-r-5 user-delete" data-userid="'+data.id+'"><i class="anticon anticon-user-delete"></i>Obriši</button>'));
                            $('#persons-table tbody').prepend(newRow);

                            $('#alertAddUser').html(createSuccessMessage('Uspješno ste dodali novog korisnika'));

                        }

                    },  error: function(jqXHR) {
                        var error = generateAjaxError(jqXHR);
                        $('#alertAddUser').html(createErrorMessage(error));
                    },
                    complete: function() {
                        $('#newPerson').modal('hide');
                        $('#personAdd')[0].reset();
                    }
                });
            }
    });
    $('#clearFilters').on('click', function() {
        getUsers('');
        localStorage.removeItem('personFilters');
        $('#personFilterName').val('');
        $('#rolaFilterId').val('');
        $('#clearFilters').hide();
    });
});
$(document).on('click', '.user-delete', function() {
    var userId = $(this).data('userid');
    if (confirm('Are you sure you want to delete this user?')) {

        $.ajax({
            url: '/../../functions/persons.php',
            type: 'delete',
            contentType: 'application/json',
            data: JSON.stringify({ deleteUser: 1, userId: userId }),
            success: function(response) {
                var data = JSON.parse(response);
                if (data.error){
                    $('#alertDeleteUser').html(createWarningMessage(data.error));
                }else{
                    var id = data.data.data.id;
                    var name = data.data.data.name;
                    var table = $('#persons-table').DataTable();
                    var row = table.row('#'+id);
                    row.remove().draw();

                    $('#alertDeleteUser').html(createSuccessMessage('Uspješno ste obrisali korisnika '+name));
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {

                var error = generateAjaxError(jqXHR);
                $('#alertDeleteUser').html(createErrorMessage(error));
            }
        });
    }
});

$(document).on('click', '#persosnsFilter', function() {
    var name = $('#personFilterName').val();
    var rolaId = $('#rolaFilterId').val();
    var filters = {
        name: name,
        rolaId: rolaId
    };

    localStorage.setItem('personFilters', JSON.stringify(filters));
    getUsers(filters);
    $('#clearFilters').show();
});
function getUsers(filters){
    var data = {
        getAllPersons: 1
    };

    if (filters !== '') {
        data.name = filters.name;
        data.rolaId = filters.rolaId;
    }

    $.ajax({
        url: '/../../functions/persons.php',
        type:'GET',
        data:data,
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                $('#alert').append(createWarningMessage(response.error));
            } else {
                $('#persons-table tbody').empty();
                var data = response.data.data;
                $.each(data, function(index, row) {
                    $('#persons-table tbody').prepend('<tr id="'+row.id+'"><td>' + row.name + '</td><td>' + row.email + '</td><td>' + row.username + '</td><td><a class="btn btn-primary m-r-5 " href="/zaposleni/'+row.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a>' +
                        '<button class="btn btn-danger m-r-5 user-delete" data-userid="'+row.id+'"><i class="anticon anticon-user-delete"></i>Obriši</button></td></tr>');
                });
                $('#persons-table').DataTable();
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
