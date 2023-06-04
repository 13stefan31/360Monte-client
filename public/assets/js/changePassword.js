$(document).ready(function() {
    var url = window.location.href;
    var token = url.substring(url.lastIndexOf('/') + 1);
    $('#changePasswordError').html('<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>');
    $.ajax({
        url: '/../../functions/user.php',
        type:'GET',
        data:{
            checkChangePassword:1
            ,token:token
        },
        dataType: 'json',
        success: function(response) {
            $('#changePasswordError').empty();
            if (response.error) {
                $('#changePasswordError').html(handleErrors(response.error));
                $('#changePasswordForm').hide()
                $('.backHome').show()
            } else {
                var data = response.data.data;
                $('#changePasswordToken').val(data.token)
            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#changePasswordError').html(createWarningMessage(error));
        }
    });

});
$(document).on('click', '#changePassword', function(e) {
    e.preventDefault();
    var $btn = $(this);
    $btn.addClass('is-loading').prop('disabled', true);
    $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
    $.ajax({
        url: '/../../functions/user.php',
        type:'post',
        data:   {
            'changePassword': 1,
            'token':$('#changePasswordToken').val(),
            'newPassword':$('#newPassword').val(),
            'confirmPassword':$('#confirmPassword').val()
        },
        success: function(response) {
            console.log(response)
            var dataParse = JSON.parse(response);
            if (dataParse.error) {
                $('#changePasswordError').html(handleErrors(dataParse.error));
            } else {
                $('#changePasswordForm').hide()
                $('.backHome').show()
                $('#changePasswordError').html(createSuccessMessage('Uspješno ste promijenili lozinku'));




            }
        },  error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#changePasswordError').html(createErrorMessage(error));
        },
        complete:function (){
            $btn.removeClass('is-loading').prop('disabled', false);
            $btn.find('.anticon-loading').remove();
        }
    });






});