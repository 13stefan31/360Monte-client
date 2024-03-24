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
        var $btn = $(this);
        $btn.addClass('is-loading').prop('disabled', true);
        $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
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
                var dataParse = JSON.parse(response);
                if (dataParse.success==false){
                    $('#loginAlert').html(createWarningMessage(dataParse.error));
                }else{
                    var accessToken = dataParse.data.access_token;
                    var expiresIn = dataParse.data.expires_in;
                    var expirationTimeInMinutes = new Date().getTime() + (expiresIn * 60 * 1000);

                    var expirationDate = new Date(expirationTimeInMinutes);


                    document.cookie = 'token=' + accessToken + ';expires=' + expirationDate.toUTCString() + ';path=/';

                    var parts = accessToken.split('.');
                    var sub = JSON.parse(atob(parts[1])).sub;
                    document.cookie = "userid=" + sub;

                    window.location ='/pocetna';
                }

            },  error: function(jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#loginAlert').html(createErrorMessage(error));
            },
            complete:function (){
                $btn.removeClass('is-loading').prop('disabled', false);
                $btn.find('.anticon-loading').remove();
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

    $('#forgottenPassword').click(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/../../functions/user.php',
            type:'POST',
            data: {
                'forgottenPassword': 1,
                'email': $('#email').val()
            },
            success: function(response) {
                var dataParse = JSON.parse(response);
                if (dataParse.error){
                    $('#passwordResetError').html(handleErrors(dataParse.error));
                }else{
                   Swal.fire('Poslat vam je email za promjenu lozinke','','success')
                }
            },  error: function(jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#passwordResetError').html(createErrorMessage(error));
            }
        });
    });
});
//svi vozaci i vodici
function getStuffAllocation(selectId, selectedValue = null){
    $.ajax({
        url: '/../../functions/allocation.php',
        type: 'GET',
        dataType: 'json',
        data:{'getAllStuffAdd':1},
        success: function(response) {
            var data = response.data.data;
            var select = $('#'+selectId);
            select.empty();
            select.append('<option value="">Odaberite zaposlenog</option>');
            $.each(data, function(key, value) {
                var selected = (value.id == selectedValue) ? 'selected' : '';
                select.append('<option value="' + value.id + '"' + selected + '>' + value.name +'</option>');
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + errorThrown);
        }
    });

}
function getVehiclesSelect(selectId, selectedValue = null){
    $.ajax({
        url: '/../../functions/vehicles.php',
        type: 'GET',
        dataType: 'json',
        data:{
            'getAllVehicles':1,
            'status':true
        },
        success: function(response) {
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

function getToursSelect(selectId, selectedValue = null){
    $.ajax({
        url: '/../../functions/tours.php',
        type: 'GET',
        dataType: 'json',
        data:{'getAllTours':1},
        success: function(response) {
            var data = response.data.data;
            var select = $('#'+selectId);
            select.empty();
            select.append('<option value="">Odaberite turu</option>');
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


$(document).ready(function() {
    var currentPath = '/' + window.location.pathname.split('/')[1];
    $('.side-nav-menu a').each(function() {
        var linkUrl = $(this).attr('href');
        if (linkUrl && linkUrl === currentPath) {
            $(this).closest('li').addClass('active');
            $(this).parents('.dropdown').addClass('open');
        }
    });
});

function getBreakDownSubcategoryIdSelect(selectId, categoryId = null, selectedId = null) {
    $.ajax({
        url: '/../../functions/worksHistory.php',
        type: 'GET',
        dataType: 'json',
        data: {
            'getAllBreakDownCategory': 1
        },
        success: function (response) {
            var data = response.data;
            var select = $('#' + selectId);
            select.empty();
            select.append('<option value="">Odaberite potkategoriju</option>');

            $.each(data, function (key, value) {
                if (value.id == categoryId) {
                    var subcategories = value.subcategories;
                    $.each(subcategories, function (key, subcategory) {
                        var option = $('<option>', {
                            value: subcategory.id,
                            text: subcategory.name
                        });

                        if (subcategory.id == selectedId) {
                            option.prop('selected', true);
                        }

                        select.append(option);
                    });
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + errorThrown);
        }
    });
}
function getBreakDownCategoryIdSelect(selectId, selectedValue = null){
    $.ajax({
        url: '/../../functions/worksHistory.php',
        type: 'GET',
        dataType: 'json',
        data:{
            'getAllBreakDownCategory':1
        },
        success: function(response) {
            var  data= response.data;
            var select = $('#'+selectId);
            select.empty();
            select.append('<option value="">Odaberite kategoriju</option>');
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
function handlePaymentMethodChange(paymentMethod, priceCardElement, priceCacheElement) {
    var selectedOption = paymentMethod.val();
    priceCardElement.prop('disabled', true).addClass('disabled-input').val('');
    priceCacheElement.prop('disabled', true).addClass('disabled-input').val('');

    if (selectedOption === '1') {
        priceCardElement.prop('disabled', false).removeClass('disabled-input');
    } else if (selectedOption === '2') {
        priceCacheElement.prop('disabled', false).removeClass('disabled-input');
    } else if (selectedOption === '3') {
        priceCardElement.prop('disabled', false).removeClass('disabled-input');
        priceCacheElement.prop('disabled', false).removeClass('disabled-input');
    }
}


