$(document).ready(function() {
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    var personId = id.match(/\d+/)[0];
    $.ajax({
        url: '/../../functions/person.php',
        type:'GET',
        data:{getSinglePerson:1,personId:personId},
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                $('#alertGetPerson').html(handleErrors(response.error));
                $('.cardUserData').hide()
            } else {
                var data = response.data.data;
                $('.personName').html(data.name);
                $('.personEmail').html(data.email);
                $('.personUsername').html(data.username);
                $('.personRole').html(data.roleName);


                $('#personName').val(data.name);
                $('#personEmail').val(data.email);
                $('#personUsername').val(data.username);
            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alertGetPerson').html(createWarningMessage(error));
        },
        complete:function (){
            $('#loader-overlay').hide();
        }
    });

    $('#personDataChange').click(function(e) {
        e.preventDefault();
        var validated = validateUpdateUser();
        if (validated){
            var $btn = $(this);
            $btn.addClass('is-loading').prop('disabled', true);
            $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
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
                    if (dataParse.error) {
                        $('#alertSingleUser').html(handleErrors(dataParse.error));
                    } else {
                        var data = dataParse.data.data;
                        $('#alertSingleUser').html(createSuccessMessage('Uspješno ste izmijenili podatke o korisniku'));
                        $('.personName').html(data.name);
                        $('.personEmail').html(data.email);
                        $('.personUsername').html(data.username);
                        $('.personRole').html(data.roleName);

                        $('#personName').val(data.name);
                        $('#personEmail').val(data.email);
                        $('#personUsername').val(data.username);
                    }
                },  error: function(jqXHR) {
                    var error = generateAjaxError(jqXHR);
                    $('#alertSingleUser').html(createErrorMessage(error));
                },
                complete:function (){
                    $btn.removeClass('is-loading').prop('disabled', false);
                    $btn.find('.anticon-loading').remove();
                }
            });

        }
    });

    $('#personPasswordChange').click(function(e) {
        e.preventDefault();
        var validated = validatePasswordData();
        if (validated){
            var $btn = $(this);
            $btn.addClass('is-loading').prop('disabled', true);
            $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');

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
                    console.log(response)
                    var data = JSON.parse(response);
                    if (data.error) {
                        $('#alertChangeUserPassword').html(handleErrors(data.error));
                    } else {
                        $('#alertChangeUserPassword').html(createSuccessMessage('Uspješno ste izmijenili lozinku'));
                    }

                },  error: function(jqXHR) {

                    var error = generateAjaxError(jqXHR);
                    $('#alertChangeUserPassword').html(createErrorMessage(error));
                },complete:function (){
                    $btn.removeClass('is-loading').prop('disabled', false);
                    $btn.find('.anticon-loading').remove();
                    $("#currentPassword").val("");
                    $("#newPassword").val("");
                    $("#confirmPassword").val("");  }
            });
        }
    });


});

function validatePasswordData(){
    var currentPassword = $('#currentPassword').val();
    var newPassword = $('#newPassword').val();
    var confirmPassword = $('#confirmPassword').val();

    $('.error').remove();

    if (currentPassword.length < 6) {
        $('#currentPassword').after('<p class="error">Trenutna lozinka mora biti najmanje 6 karaktera dugačka.</p>');
    }

    if (newPassword.length < 6) {
        $('#newPassword').after('<p class="error">Nova lozinka mora biti najmanje 6 karaktera dugačka.</p>');
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