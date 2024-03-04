$(document).ready(function () {
    $.ajax({
        url: '/../../functions/user.php',
        type:'post',
        data:{
            loggedUser:1
        },
        dataType: 'json',
        success: function(response) {
            if (response.status==200){
                var data = response.data.data;
                $('.loggedUserName').html(data.name)
                $('.loggedUserEmail').html(data.email)
                $('.loggedUserRole').html(data.roleId)
            }else{
                localStorage.clear();
                window.location.href = "/prijava";
            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#loginAlert').append(createWarningMessage(error));
        }
    });
    });
