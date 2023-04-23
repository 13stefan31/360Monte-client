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

function getVehiclesSelect(selectId, selectedValue = null){
    $.ajax({
        url: '/../../functions/vehicles.php',
        type: 'GET',
        dataType: 'json',
        data:{'getAllVehicles':1},
        success: function(response) {
            console.log(response)
            var data = response.data.data;
            var select = $('#'+selectId);
            select.empty();
            select.append('<option value="">Odaberite vozilo</option>');
            $.each(data, function(key, value) {
                var selected = (value.id == selectedValue) ? 'selected' : '';
                select.append('<option value="' + value.id + '"' + selected + '>' + value.brand + ' ' + value.model + ' ' + value.year +'</option>');
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + errorThrown);
        }
    });

}
function handleErrors(error) {
    if (typeof error === 'string') {
        return createWarningMessage(error);
    } else if (error.request && typeof error.request === 'string') {
        return createWarningMessage(error.request);
    } else if (error.request && typeof error.request === 'object') {
        let messages = [];
        for (let key in error.request) {
            if (Array.isArray(error.request[key])) {
                messages.push(key + ': ' + error.request[key].join(', '));
            } else {
                messages.push(key + ': ' + error.request[key]);
            }
        }
        return createWarningMessage(messages.join('<br>'));
    } else if (typeof error === 'object') {
        for (let key in error) {
            if (typeof error[key] === 'string') {
                return createWarningMessage(error[key]);
            } else if (Array.isArray(error[key])) {
                return createWarningMessage(error[key][0]);
            } else if (typeof error[key] === 'object') {
                return createWarningMessage(JSON.stringify(error[key]));
            }
        }
    }
    return createWarningMessage('Unknown error occurred.');
}
