$(document).ready(function() {
    $.ajax({
        url: '/../../functions/persons.php',
        type:'GET',
        data:{getAllPersons:1},
        dataType: 'json',
        success: function(data) {
            if (data.error) {
                $('#alert').append(createWarningMessage(data.error));
            } else {
                $.each(data, function(index, row) {
                    $('#persons-table tbody').prepend('<tr id="'+row.id+'"><td>' + row.name + '</td><td>' + row.email + '</td><td>' + row.username + '</td><td><a class="btn btn-primary m-r-5 " href="/zaposleni/'+row.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a></td></tr>');
                });
                $('#persons-table').DataTable();
            }
        }  ,
        error: function(jqXHR) {
            var errorMessage = '';
            errorMessage += jqXHR.status +' Došlo je do greške prilikom preuzimanja podataka.';
            $('#alert').append(createWarningMessage(errorMessage));
        }
    });


    $('#newPersonButton').click(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/../../functions/persons.php',
            type: 'GET',
            dataType: 'json',
            data:{'getRoles':1},
            success: function(data) {
                console.log(data)
                var select = $('#rolaId');
                select.empty();
                select.append('<option value="">Odaberite rolu</option>');
                $.each(data, function(key, value) {
                    select.append('<option value="' + value.id + '">' + value.name + '</option>');
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error: ' + errorThrown);
            }
        });
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
                        var data = JSON.parse(response);
                        if (data.error){
                            $('#alertAddUser').html(createWarningMessage(data.error));
                        }else{

                            var newRow = $('<tr>').attr('id', 'row-' + data.id);
                            newRow.append($('<td>').text(data.name));
                            newRow.append($('<td>').text(data.email));
                            newRow.append($('<td>').text(data.username));
                            newRow.append($('<td>').html('<a class="btn btn-primary m-r-5 " href="/zaposleni/'+data.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a>'));
                            $('#persons-table tbody').prepend(newRow);

                            $('#alertAddUser').html(createSuccessMessage('Uspješno ste dodali novog korisnika'));

                        }

                    },  error: function(jqXHR) {
                        var errorMessage = '';
                        errorMessage += jqXHR.status +' Došlo je do greške prilikom preuzimanja podataka.';
                        $('#alertAddUser').html(createErrorMessage(errorMessage));
                    },
                    complete: function() {
                        $('#newPerson').modal('hide');
                        $('#personAdd')[0].reset();
                    }
                });
            }
    });
});
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
