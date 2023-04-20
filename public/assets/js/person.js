$(document).ready(function() {
    var url = window.location.href;
    var personId = url.substring(url.lastIndexOf('/') + 1);
    $.ajax({
        url: '/../../functions/person.php',
        type:'GET',
        data:{getSinglePerson:1,personId:personId},
        dataType: 'json',
        success: function(response) {
            console.log(response)
            var data = response.data.data;
            if (data.error) {
                $('#alertGetPerson').html(createWarningMessage(data.error));
            } else {
                $('.personName').html(data.name);
                $('.personEmail').html(data.email);
                $('.personUsername').html(data.username);


                $('#personName').val(data.name);
                $('#personEmail').val(data.email);
                $('#personUsername').val(data.username);
            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alertGetPerson').html(createWarningMessage(error));
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

                        $('#personName').val(data.name);
                        $('#personEmail').val(data.email);
                        $('#personUsername').val(data.username);
                    }
                },  error: function(jqXHR) {
                    var error = generateAjaxError(jqXHR);
                    $('#alertChangeUser').html(createErrorMessage(error));
                }
            });

        }
    });

    $('#personPasswordChange').click(function(e) {
        e.preventDefault();
        $(this).prop('disabled', true); // disable the button
        var validated = validatePasswordData();
        if (validated){

            $.ajax({
                url: '/../../functions/person.php',
                type:'put',
                contentType: 'application/json',
                data:  JSON.stringify({
                    'updatePassword': 1,
                    'data':{
                        'personId': personId,
                        'currentPassword': $('#currentPassword').val(),
                        'newPassword': $('#newPassword').val(),
                        'confirmPassword': $('#confirmPassword').val()
                    }
                }),
                success: function(response) {
                    var data = JSON.parse(response);
                    console.log(data)

                    if (data.error) {
                        $('#alertChangeUserPassword').html(createWarningMessage(data.error));
                    } else {
                        $('#alertChangeUserPassword').html(createSuccessMessage('Uspješno ste izmijenili lozinku'));
                    }

                },  error: function(jqXHR) {

                    var error = generateAjaxError(jqXHR);
                    $('#alertChangeUserPassword').html(createErrorMessage(error));
                },complete:function (){
                    $("#currentPassword").val("");
                    $("#newPassword").val("");
                    $("#confirmPassword").val("");
                    $('#personPasswordChange').prop('disabled', false); // enable the button
                }
            });
        }
    });
});

function validatePasswordData(){
    var currentPassword = $('#currentPassword').val();
    var newPassword = $('#newPassword').val();
    var confirmPassword = $('#confirmPassword').val();

    $('.error').remove();

    if (currentPassword.length < 8) {
        $('#currentPassword').after('<p class="error">Trenutna lozinka mora biti najmanje 8 karaktera dugačka.</p>');
    }

    if (newPassword.length < 8) {
        $('#newPassword').after('<p class="error">Nova lozinka mora biti najmanje 8 karaktera dugačka.</p>');
    } else if (newPassword == currentPassword) {
        $('#newPassword').after('<p class="error">Nova lozinka ne može biti ista kao trenutna lozinka.</p>');
    }

    if (confirmPassword != newPassword) {
        $('#confirmPassword').after('<p class="error">Ponovljena lozinka se ne podudara sa novom lozinkom.</p>');
    }

    if ($('.error').length == 0) {
        return true;
    }else{
        return false;
    }
}

function validateUpdateUser(){
    var name = $("#personName").val();
    var email = $("#personEmail").val();
    var errorCount = 0;

    if (name === "") {
        $("#personName").next("p").addClass("error").text("Morate unijeti ime i prezime.");
        errorCount++;
    } else {
        $("#personName").next("p").removeClass("error").text("");
    }

    if (email === "") {
        $("#personEmail").next("p").addClass("error").text("Morate unijeti email.");
        errorCount++;
    } else {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailRegex.test(email)) {
            $("#personEmail").next("p").addClass("error").text("Unesite validnu email adresu.");
            errorCount++;
        } else {
            $("#personEmail").next("p").removeClass("error").text("");
        }
    }


    if (errorCount === 0) {
        return true;
    } else {
        return false;
    }
}