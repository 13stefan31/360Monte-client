$(document).ready(function () {

    $("#showVehicleFilter").click(function () {
        $("#filterVehicles").toggle();
    });
    $("#showPersonsFilter").click(function () {
        $("#filterPersons").toggle();
    });
    $("#showAllocationsFilter").click(function () {
        $("#filterAllocations").toggle();
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $(".alert").remove();
    });
    $('#newPersonButton').click(function() {
        $('.alert').remove();
    });


    $('.login').click(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/../../functions/user.php',
            type:'POST',
            data:  {
                'login': 1,
                'data': {
                    'email': $('#email').val(),
                    'password': $('#password').val()
                }
            },
            success: function(response) {
                console.log(response)
                var dataParse = JSON.parse(response);
                if (dataParse.success==false){
                    // $('#loginAlert').html(createWarningMessage(data.error));
                    $('#loginAlert').html('Kredencijali nisu dobri');
                }else{
                    document.cookie = 'token='+dataParse.data.access_token +'; path=/';
                    window.location ='/pocetna';
                }

            },  error: function(jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#loginAlert').html(createErrorMessage(error));
            }
        });
    });
    $('#logout').click(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/../../functions/user.php',
            type:'POST',
            data: {
                'logout': 1
            },
            success: function(response) {
                console.log(response)
                var dataParse = JSON.parse(response);
                if (dataParse.success==false){
                    alert('Doslo je do greske, pokusajte ponovo');
                }else{
                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    sessionStorage.clear();
                    localStorage.clear();
                    window.location ='/prijava';
                }

            },  error: function(jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#loginAlert').html(createErrorMessage(error));
            }
        });
    });
});
