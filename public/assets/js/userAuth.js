$(document).ready(function () {
    var ajaxExecuted = false;
    $.ajax({
        url: '/../../functions/user.php',
        type:'post',
        data:{
            loggedUser:1
        },
        dataType: 'json',
        success: function(response) {
            console.log(response)
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
            $('#alertVehicles').append(createWarningMessage(error));
        }
    });
    });
