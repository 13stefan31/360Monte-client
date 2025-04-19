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
    $('#newPersonButton').click(function () {
        $('.alert').remove();
    });


    $('.login').click(function (e) {
        e.preventDefault();
        var $btn = $(this);
        $btn.addClass('is-loading').prop('disabled', true);
        $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
        $.ajax({
            url: '/../../functions/user.php',
            type: 'POST',
            data: {
                'login': 1,
                'data': {
                    'email': $('#email').val(),
                    'password': $('#password').val()
                }
            },
            success: function (response) {
                var dataParse = JSON.parse(response);
                if (dataParse.success == false) {
                    $('#loginAlert').html(createWarningMessage(dataParse.error));
                } else {
                    var accessToken = dataParse.data.access_token;
                    var expiresIn = dataParse.data.expires_in;
                    var expirationTimeInMinutes = new Date().getTime() + (expiresIn * 60 * 1000);

                    var expirationDate = new Date(expirationTimeInMinutes);


                    document.cookie = 'token=' + accessToken + ';expires=' + expirationDate.toUTCString() + ';path=/';

                    var parts = accessToken.split('.');
                    var sub = JSON.parse(atob(parts[1])).sub;
                    document.cookie = "userid=" + sub;

                    window.location = '/pocetna';
                }

            }, error: function (jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#loginAlert').html(createErrorMessage(error));
            },
            complete: function () {
                $btn.removeClass('is-loading').prop('disabled', false);
                $btn.find('.anticon-loading').remove();
            }
        });
    });
    $('#logout').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/../../functions/user.php',
            type: 'POST',
            data: {
                'logout': 1
            },
            success: function (response) {
                var dataParse = JSON.parse(response);
                if (dataParse.success == false) {
                    alert('Doslo je do greske, pokusajte ponovo');
                } else {
                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    sessionStorage.clear();
                    localStorage.clear();
                    window.location = '/prijava';
                }

            }, error: function (jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#loginAlert').html(createErrorMessage(error));
            }
        });
    });

    $('#forgottenPassword').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/../../functions/user.php',
            type: 'POST',
            data: {
                'forgottenPassword': 1,
                'email': $('#email').val()
            },
            success: function (response) {
                var dataParse = JSON.parse(response);
                if (dataParse.error) {
                    $('#passwordResetError').html(handleErrors(dataParse.error));
                } else {
                    Swal.fire('Poslat vam je email za promjenu lozinke', '', 'success')
                }
            }, error: function (jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#passwordResetError').html(createErrorMessage(error));
            }
        });
    });
});

//svi vozaci i vodici
function getStuffAllocation(selectId, selectedValue = null) {
    $.ajax({
        url: '/../../functions/allocation.php',
        type: 'GET',
        dataType: 'json',
        data: {'getAllStuffAdd': 1},
        success: function (response) {
            var data = response.data.data;
            var select = $('#' + selectId);
            select.empty();
            select.append('<option value="">Odaberite zaposlenog</option>');
            $.each(data, function (key, value) {
                var selected = (value.id == selectedValue) ? 'selected' : '';
                select.append('<option value="' + value.id + '"' + selected + '>' + value.name + '</option>');
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

}
function getAllEmp(selectId, selectedValue = null) {
    $.ajax({
        url: '/../../functions/persons.php',
        type: 'GET',
        dataType: 'json',
        data: {'getAllPersons': 1},
        success: function (response) {
            var data = response.data.data;
            console.log(data)
            var select = $('#' + selectId);
            select.empty();
            select.append('<option value="">Odaberite zaposlenog</option>');
            $.each(data, function (key, value) {
                var selected = (value.id == selectedValue) ? 'selected' : '';
                select.append('<option value="' + value.id + '"' + selected + '>' + value.name + '</option>');
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

}
function getAvailableStuffAllocation(selectId, selectedValue = null,allocationDate=null) {
    $.ajax({
        url: '/../../functions/allocation.php',
        type: 'GET',
        dataType: 'json',
        data: {'getAvailableStuffAllocation': 1,allocationDate:allocationDate},
        success: function (response) {
            var data = response.data.data;
            var select = $('#' + selectId);
            select.empty();
            select.append('<option value="">Odaberite zaposlenog</option>');
            $.each(data, function (key, value) {
                var selected = (value.id == selectedValue) ? 'selected' : '';
                select.append('<option value="' + value.id + '"' + selected + '>' + value.name + '</option>');
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

}
//allvehicles flag da vrati sva readyToDrive vozila, nezavisno od statusa
function getVehiclesSelect(selectId, selectedValue = null,showOnWeb=null,allVehicles=false) {
    const requestData = {
        getAllVehicles: 1,
        showOnWeb: showOnWeb
    };

    if (allVehicles === false) {
        requestData.status = true;
    }
    $.ajax({
        url: '/../../functions/vehicles.php',
        type: 'GET',
        dataType: 'json',
        data: requestData,
        success: function (response) {
            var data = response.data.data;
            var select = $('#' + selectId);
            select.empty();
            select.append('<option value="">Odaberite vozilo</option>');
            $.each(data, function (key, value) {
                var selected = (value.id == selectedValue) ? 'selected' : '';
                select.append('<option value="' + value.id + '"' + selected + '>' + value.brand + ' ' + value.model + ' ' + value.year + '</option>');
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

}

function getToursSelect(selectId, selectedValue = null) {
    $.ajax({
        url: '/../../functions/tours.php',
        type: 'GET',
        dataType: 'json',
        data: {'getAllTours': 1},
        success: function (response) {
            var data = response.data.data;
            var select = $('#' + selectId);
            select.empty();
            select.append('<option value="">Odaberite turu</option>');
            $.each(data, function (key, value) {
                var selected = (value.id == selectedValue) ? 'selected' : '';
                select.append('<option value="' + value.id + '"' + selected + '>' + value.name + '</option>');
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
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


$(document).ready(function () {
    var currentPath = '/' + window.location.pathname.split('/')[1];
    $('.side-nav-menu a').each(function () {
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
        }
    });
}

function getBreakDownCategoryIdSelect(selectId, selectedValue = null) {
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
            select.append('<option value="">Odaberite kategoriju</option>');
            $.each(data, function (key, value) {
                var selected = (value.id == selectedValue) ? 'selected' : '';
                select.append('<option value="' + value.id + '"' + selected + '>' + value.name + '</option>');
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
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

function deleteVehicleInspections(id) {
    Swal.fire({
        title: 'Da li ste sigutni da želite da obrišete?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Obriši',
        denyButtonText: `Odustani`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/../../functions/vehicleInspection.php',
                type: 'delete',
                contentType: 'application/json',
                data: JSON.stringify({
                    deleteInspectionVehicleData: 1,
                    id: id
                }),
                success: function (response) {
                    var data = JSON.parse(response);
                    if (data.error) {
                        Swal.fire(data.error, '', 'error');
                    } else {
                        $('#' + data.data.data.id).remove();
                        Swal.fire('Uspješno obrisano', '', 'success');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                    var error = generateAjaxError(jqXHR);
                    Swal.fire(error, '', 'error');
                }
            });
        } else if (result.isDenied) {
        }
    })
}

function returnWeeklyInspectionData(type) {
    $.ajax({
        url: '/functions/vehicleInspection.php',
        type: 'GET',
        data: {
            'getInspectionAddData': 1,
            type: type
        },
        success: function (response) {
            var dataParse = JSON.parse(response);
            let html = '';
 console.log(response)
            dataParse.data.data.forEach(group => {
                html += `<div class="inspection-group mb-4">`;
                html += `<h5 class="mb-3">${group.reportItemGroupName || ''}</h5>`;

                    group.items.forEach(item => {
                        const isDefaultChecked = item.group_id === 0 ? 'checked' : '';
                        const isHiddenStyle = item.group_id === 0 ? 'd-none' : 'd-flex';

                        html += `
    <div class="inspection-item p-2 border rounded mb-3">
        <div class="d-flex justify-content-between align-items-start flex-wrap">
            <div class="label-section mb-2" style="flex: 1 1 300px;">
                 ${item.label} 
            </div>
            <div class="checkbox-section mb-2 ${isHiddenStyle} align-items-center"  style="flex: 0 0 auto;">
                <label class="me-2 mb-0">Ispravno:</label>
                <input type="checkbox" name="isCorrect_${item.id}" ${isDefaultChecked} style="width: 30px;transform: scale(1.5);" />
            </div>
        </div>
        <div class="comment-section mt-2">
            <textarea name="comment_${item.id}" class="form-control" rows="2" style="height: 35px;overflow-y: hidden; resize: vertical;" placeholder="Komentar"></textarea>
            <input type="hidden" name="itemId[]" value="${item.id}" />
        </div>
    </div>`;
                    });



                html += `</div>`;
            });





            $('#inspectionTableContainer').html(html);


        }, error: function (jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#weeklyInspectionAddError').html(createErrorMessage(error));
        }
    });
}

$('#inspectionAdd').on('submit', function (e) {
    e.preventDefault();
    const vehicleId = $('#vehicleNew').val();
    const type = $('#reportType').val();

    if (!vehicleId) {

        Swal.fire('Morate odabrati vozilo!', '', 'warning');
        return;
    }
    const dataToSend = {
        reportTypeId: type,
        vehicleId: vehicleId,
        data: []
    };

    $('input[name="itemId[]"]').each(function () {
        const itemId = $(this).val();
        const isCorrect = $(`input[name="isCorrect_${itemId}"]`).is(':checked');
        const comment = $(`textarea[name="comment_${itemId}"]`).val().trim() || null;

        dataToSend.data.push({
            itemId: parseInt(itemId),
            isCorrect: isCorrect,
            comment: comment
        });
    });


    $.ajax({
        url: '/functions/vehicleInspection.php',
        method: 'POST',
        data: {
            addInspectionData: 1,
            data: dataToSend
        },
        dataType: 'json',
        success: function (response) {
            if (response.error) {
                $('#weeklyInspectionAddError').html(handleErrors(response.error)).focus();
                var errorElement = document.getElementById('weeklyInspectionAddError');
                errorElement.innerHTML = handleErrors(response.error);
                errorElement.scrollIntoView({behavior: 'smooth', block: 'center'});

            } else {
                let item = response.data.data;
                if (item.type == 1) {
                    inspectionType = 'Nedeljni';
                } else if (item.type == 2) {
                    inspectionType = 'Mjesečni';
                }
                var singleVehicleInspection = $('#singleVehicleInspection').val();
                let newRow = '<tr id="' + item.id + '">' +
                    '<td>' + item.reporter.name + '</td>' +
                    '<td>' + item.vehicle.brand + ' ' + item.vehicle.model + '</td>' +
                    '<td>' + item.reporter.createdAt + '</td>';

                if (singleVehicleInspection == 1) {
                    newRow += '<td>' + inspectionType + '</td>';
                }

                newRow += '<td>' +
                    '<a class="btn btn-primary m-r-5" href="/inspekcija-vozila/' + item.id + '/1">' +
                    '<i class="anticon anticon-plus"></i> Više detalja</a> ' +
                    '<a class="btn btn-danger m-r-5" href="javascript:void(0)" onclick="deleteVehicleInspections(' + item.id + ')">' +
                    '<i class="anticon anticon-delete"></i> Obriši</a>' +
                    '</td>' +
                    '</tr>';

                $('#surveysTable tbody').prepend(newRow);
                $('#inspectionError').html(createSuccessMessage('Uspješan unos!'));

                $('#newWeeklyInspection').modal('hide');
                $('#inspectionAdd')[0].reset();
            }
        },
        error: function (xhr, status, error) {
        }
    });

});
$('#newWorkDataButton').click(function (e) {
    e.preventDefault();
    $('#workHisrtoryAdd')[0].reset();
    $("#workHistoryAddError").empty();

    var isSingleVehicleWorkAdd = $('#isSingleVehicleWorkAdd').val();
    if (isSingleVehicleWorkAdd == 1) {
        $('#partsPriceCache').prop('disabled', false).removeClass('disabled-input').val('');
        $('#partsPriceCard').prop('disabled', false).removeClass('disabled-input').val('');
        $('#mechanicPriceCache').prop('disabled', false).removeClass('disabled-input').val('');
        $('#mechanicPriceCard').prop('disabled', false).removeClass('disabled-input').val('');

        var selectedVehicleId = $('.vehicleId').val();
        getVehiclesSelect('vehicleNewWorks', selectedVehicleId);

    } else {

        getVehiclesSelect('vehicleNewWorks');
    }

    getBreakDownCategoryIdSelect('workCategory');
    getStuffAllocation('reportedBy');
});
$('#addNewWorkHistory').off('click').on('click', function (e) {
    e.preventDefault();
    var formData = $('#workHisrtoryAdd').serialize();
    var isSingleVehicleWorkAdd = $('#isSingleVehicleWorkAdd').val();
    if (isSingleVehicleWorkAdd == 1) {
        var vehicleValue = $('.vehicleId').val();
        formData += '&vehicleNewWorks=' + vehicleValue;
    }
    var validate = validateNewWork();
    if (validate) {
        var $btn = $(this);
        $btn.addClass('is-loading').prop('disabled', true);
        $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
        $.ajax({
            url: '/../../functions/worksHistory.php',
            type: 'POST',
            data: {
                'addNewWorkHistory': 1,
                'data': formData
            },
            success: function (response) {
                var dataParse = JSON.parse(response);
                if (dataParse.error) {
                    $('#workHistoryAddError').html(handleErrors(dataParse.error)).focus();
                    var errorElement = document.getElementById('workHistoryAddError');
                    errorElement.innerHTML = handleErrors(dataParse.error);
                    errorElement.scrollIntoView({behavior: 'smooth', block: 'center'});
                } else {
                    var isSingleVehicleWorkAdd = $('#isSingleVehicleWorkAdd').val();
                    if (isSingleVehicleWorkAdd != 1) {
                        var data = dataParse.data.data;
                        let finished;
                        if (data.isFinished) {
                            finished = 'DA';
                        } else {
                            finished = 'NE';
                        }
                        var newRow = $('<tr>').attr('id', data.id);
                        newRow.append($('<td>').text(data.vehicle.brand + ' ' + data.vehicle.model + ' ' + data.vehicle.year));
                        newRow.append($('<td>').text(data.reportedBy.name));
                        newRow.append($('<td>').text(data.breakDownCategory.name));
                        newRow.append($('<td style="text-align:right">').text(data.breakDownMilage + "km"));
                        newRow.append($('<td>').text(data.startingDate));
                        newRow.append($('<td>').text(data.endingDate));
                        newRow.append($('<td>').text(data.mechanicPaymentMethod));
                        newRow.append($('<td>').text(data.vehiclePartsPaymentMethod));
                        newRow.append($('<td class="text-center">').text(finished));
                        newRow.append($('<td>').text(data.createdBy.name));
                        newRow.append($('<td>').text(data.createdAt));
                        newRow.append($('<td style="display: flex">').html(
                            '<a class="btn btn-primary m-r-5 " href="/istorija-rada/' + data.id + '"><i class="anticon anticon-plus"></i>Detalji</a>'
                            + '<button class="btn btn-danger btn-sm m-r-5  " href="javascript:void(0)" onclick="deleteWorkHistory(' + data.id + ')"  ><i class="anticon anticon-delete"></i></button>'
                        ));

                        $('#works-history-table tbody').prepend(newRow);
                    }
                    $('#alertAddWorkHistory').html(createSuccessMessage('Uspješan unos!'));

                    $('#newWorkHistory').modal('hide');
                    $('#workHisrtoryAdd')[0].reset();


                }

            }, error: function (jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#workHistoryAddError').html(createErrorMessage(error));
            },
            complete: function () {

                $btn.removeClass('is-loading').prop('disabled', false);
                $btn.find('.anticon-loading').remove();
            }
        });
    }
});

function validateNewWork() {
    if ($('#startingDate').val().length === 0) {
        $('#workHistoryAddError').html(handleErrors('Morate unijeti datum početka'));
        return false;
    }
    if ($('#endingDate').val().length === 0) {
        $('#workHistoryAddError').html(handleErrors('Morate unijeti datum kraja'));
        return false;
    }
    return true;
}

$('#workCategory').on('change', function () {
    var selectedCategoryId = $(this).val();
    if (selectedCategoryId) {
        getBreakDownSubcategoryIdSelect( 'workSubcategory',selectedCategoryId);
    } else {
        $('#workSubcategory').empty();
    }
});

$('#vehiclePartsPaymentMethod, #mechanicPaymentMethod').on('change', function() {
    var selectedOption = $(this).val();
    var isVehicle = $(this).attr('id') === 'vehiclePartsPaymentMethod';

    if (isVehicle) {
        handlePaymentMethodChange($(this), $('#partsPriceCard'), $('#partsPriceCache'));
    } else {
        handlePaymentMethodChange($(this), $('#mechanicPriceCard'), $('#mechanicPriceCache'));
    }
});


$('#breakdownCatFilterId').on('change', function () {
    var selectedCategoryId = $(this).val();
    if (selectedCategoryId) {
        getBreakDownSubcategoryIdSelect( 'breakdownSubcatFilterId',selectedCategoryId);
    } else {
        $('#breakdownSubcatFilterId').empty();
    }
});

$(document).ready(function () {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href");

        $('#newWorkDataButton').hide();

        if (target === "#profile") {
            $('#worksTab').append($('#newWorkDataButton'));
            $('#newWorkDataButton').show();
        } else if (target === "#inspection") {
            $('#inspectionTab').append($('#newWorkDataButton'));
            $('#newWorkDataButton').show();
        }
    });

    if ($('#worksTab').length) {
        $('#worksTab').append($('#newWorkDataButton'));
        $('#newWorkDataButton').show();
    }
});
