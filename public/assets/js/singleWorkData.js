$(document).ready(function() {
    var storedData;
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    var dataId = id.match(/\d+/)[0];
    $('#dataId').val(dataId) ;
    $.ajax({
        url: '/../../functions/singleWorkData.php',
        type:'GET',
        data:{getSingleWorkData:1,dataId:dataId},
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                $('#alertGetDailyData').html(handleErrors(response.error));
                $('.dailyDataDivCard').hide()
            } else {
                var data = response.data.data;
                console.log(data)
                storedData = response.data.data;

                $('.workDataVehicle').html(data.vehicle.brand + ' ' + data.vehicle.model+ ' ' + data.vehicle.year  + '<br/> Reg. oznaka: ' +data.vehicle.registrationNumber);
                $('.workBreakCategory').html(data.breakDownCategory.name);if (data.breakDownSubcategory !== null && data.breakDownSubcategory.name !== undefined) {
                    $('.workBreakSubcategory').html(data.breakDownSubcategory.name);
                } else {
                    $('.workBreakSubcategory').html('-');
                }

                $('.workBreakMileage').html(data.breakDownMilage + ' km');
                $('.workDataReportedBy').html(data.reportedBy.name);
                $('.workStarted').html(data.startingDate);
                $('.workEnding').html(data.endingDate);
                $('.mehanicPayMethod').html(data.mechanicPaymentMethod);
                $('.partsPayMethod').html(data.vehiclePartsPaymentMethod);
                $('.workDesc').html(data.description);
                $('.workBreakCreated').html(data.createdAt);
                $('.workCreatedBy').html(data.createdBy.name);

                var newRow =
                    '<tr><td rowspan="2" class="w-20">Iznos</td><td>Račun</td><td>Keš</td></tr>' +
                '<tr ><td>' + data.mechanicPricePayedOverAccount + '€' + '</td><td>' + data.mechanicPricePayedWithCache + ' €' + '</td></tr>';
                $('#mehanic-tabele tbody').append(newRow);

                var newRow2 =
                    '<tr><td rowspan="2" class="w-20">Iznos</td><td>Račun</td><td>Keš</td></tr>' +
                    '<tr ><td>' + data.vehiclePartsPricePayedOverAccount + '€' + '</td><td>' + data.vehiclePartsPricePayedWithCache + ' €' + '</td></tr>';
                $('#parts-tabele tbody').append(newRow2);

            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alertGetDailyData').html(createWarningMessage(error));
        },
        complete:function (){
            $('#loader-overlay').hide();
        }
    });



    $('#editWorkHistoryButton').click(function(e) {
        var formData = $('#workHistoryEdit').serialize();
        e.preventDefault();
        var $btn = $(this);
        $btn.addClass('is-loading').prop('disabled', true);
        $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
        $.ajax({
            url: '/../../functions/worksHistory.php',
            type:'put',
            data:  JSON.stringify({
                'editWorkHistory': 1,
                'data':formData
            }) ,
            success: function(response) {
                var dataParse = JSON.parse(response);
                if (dataParse.error){
                    $('#workHistoryEditError').html(handleErrors(dataParse.error));
                }else{
                    var updatedRowData = dataParse.data.data;
                    storedData = dataParse.data.data;
                    $('.workDataVehicle').html(updatedRowData.vehicle.brand + ' ' + updatedRowData.vehicle.model+ ' ' + updatedRowData.vehicle.year  + '<br/> Reg. oznaka: ' +updatedRowData.vehicle.registrationNumber);
                    $('.workBreakCategory').html(updatedRowData.breakDownCategory.name);if (updatedRowData.breakDownSubcategory !== null && updatedRowData.breakDownSubcategory.name !== undefined) {
                        $('.workBreakSubcategory').html(updatedRowData.breakDownSubcategory.name);
                    } else {
                        $('.workBreakSubcategory').html('-');
                    }

                    $('.workBreakMileage').html(updatedRowData.breakDownMilage + ' km');
                    $('.workStarted').html(updatedRowData.startingDate);
                    $('.workEnding').html(updatedRowData.endingDate);
                    $('.workDataReportedBy').html(updatedRowData.reportedBy.name);
                    $('.mehanicPayMethod').html(updatedRowData.mechanicPaymentMethod);
                    $('.partsPayMethod').html(updatedRowData.vehiclePartsPaymentMethod);
                    $('.workDesc').html(updatedRowData.description);
                    $('.workBreakCreated').html(updatedRowData.createdAt);
                    $('.workCreatedBy').html(updatedRowData.createdBy.name);

                    $('#mehanic-tabele tbody').empty();
                    var newRow =
                        '<tr><td rowspan="2" class="w-20">Iznos</td><td>Račun</td><td>Keš</td></tr>' +
                        '<tr ><td>' + updatedRowData.mechanicPricePayedOverAccount + '€' + '</td><td>' + updatedRowData.mechanicPricePayedWithCache + ' €' + '</td></tr>';
                    $('#mehanic-tabele tbody').append(newRow);
                    $('#parts-tabele tbody').empty();
                    var newRow2 =
                        '<tr><td rowspan="2" class="w-20">Iznos</td><td>Račun</td><td>Keš</td></tr>' +
                        '<tr ><td>' + updatedRowData.vehiclePartsPricePayedOverAccount + '€' + '</td><td>' + updatedRowData.vehiclePartsPricePayedWithCache + ' €' + '</td></tr>';
                    $('#parts-tabele tbody').append(newRow2);
                    $('#alertAddWorkHistory').html(createSuccessMessage('Uspješno ste izmijenili podatke!'));

                    $('#editWorkHistory').modal('hide');
                    $('#workHistoryEdit')[0].reset();
                }

            },  error: function(jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#workHistoryEditError').html(createErrorMessage(error));
            },
            complete:function (){
                $btn.removeClass('is-loading').prop('disabled', false);
                $btn.find('.anticon-loading').remove();
            }
        });
    });


    $('#changeWorkDataButton').on('click', function() {
        $('#workHistoryEditError').html('');
        $('#workIdEdit').val(storedData.id);
        getVehiclesSelect('vehicleEdit',storedData.vehicle.id);
        getStuffAllocation('reportedByEdit',storedData.reportedBy.id)
        getBreakDownCategoryIdSelect('workCategoryEdit',storedData.breakDownCategory.id);

        $('#descriptionEdit').val(storedData.description);
        $('#breakDownMileageEdit').val(storedData.breakDownMilage);
        $('#partsPriceCacheEdit').prop('disabled', false).removeClass('disabled-input').val('');
        $('#partsPriceCardEdit').prop('disabled', false).removeClass('disabled-input').val('');
        $('#mechanicPriceCacheEdit').prop('disabled', false).removeClass('disabled-input').val('');
        $('#mechanicPriceCardEdit').prop('disabled', false).removeClass('disabled-input').val('');

        if (storedData.mechanicPaymentMethod === 'Račun') {
            $('#mechanicPriceCacheEdit').prop('disabled', true).addClass('disabled-input').val('');
        } else if (storedData.mechanicPaymentMethod === 'Keš') {
            $('#mechanicPriceCardEdit').prop('disabled', true).addClass('disabled-input').val('');
        }

        if (storedData.vehiclePartsPaymentMethod === 'Račun') {
            $('#partsPriceCacheEdit').prop('disabled', true).addClass('disabled-input').val('');
        } else if (storedData.vehiclePartsPaymentMethod === 'Keš') {
            $('#partsPriceCardEdit').prop('disabled', true).addClass('disabled-input').val('');
        }

        if (storedData.vehiclePartsPricePayedOverAccount !== '' && storedData.vehiclePartsPricePayedOverAccount>0) {
            $('#partsPriceCardEdit').val(storedData.vehiclePartsPricePayedOverAccount);
        }

        if (storedData.vehiclePartsPricePayedWithCache !== '' && storedData.vehiclePartsPricePayedWithCache>0) {
            $('#partsPriceCacheEdit').val(storedData.vehiclePartsPricePayedWithCache);
        }

        if (storedData.mechanicPricePayedOverAccount !== '' && storedData.mechanicPricePayedOverAccount>0) {
            $('#mechanicPriceCardEdit').val(storedData.mechanicPricePayedOverAccount);
        }

        if (storedData.mechanicPricePayedWithCache !== '' && storedData.mechanicPricePayedWithCache>0) {
            $('#mechanicPriceCacheEdit').val(storedData.mechanicPricePayedWithCache);
        }

        $('#startingDateEdit').val(convertToDateInputFormat(storedData.startingDate));
        $('#endingDateEdit').val(convertToDateInputFormat(storedData.endingDate));

        $('#vehiclePartsPaymentMethodEdit option').each(function() {
            if ($(this).text() === storedData.vehiclePartsPaymentMethod) {
                $(this).prop('selected', true);
            }
        });
        $('#mechanicPaymentMethodEdit option').each(function() {
            if ($(this).text() === storedData.mechanicPaymentMethod) {
                $(this).prop('selected', true);
            }
        });
        getBreakDownSubcategoryIdSelect('workSubcategoryEdit', storedData.breakDownCategory.id, storedData.breakDownSubcategory ? storedData.breakDownSubcategory.id : null);

    });

});

function convertToDateInputFormat(dateString) {
    var parts = dateString.split('.');
    if (parts.length === 3) {
        return parts[2] + '-' + parts[1].padStart(2, '0') + '-' + parts[0].padStart(2, '0');
    }
    return dateString;
}

$(document).ready(function() {
    $('#workCategoryEdit').on('change', function () {
        var selectedCategoryId = $(this).val();
        if (selectedCategoryId) {
            getBreakDownSubcategoryIdSelect( 'workSubcategoryEdit',selectedCategoryId);
        } else {
            $('#workSubcategoryEdit').empty();
        }
    });

    $(document).on('change', '#vehiclePartsPaymentMethodEdit, #mechanicPaymentMethodEdit', function() {
        var selectedOption = $(this).val();
        var isVehicle = $(this).attr('id') === 'vehiclePartsPaymentMethodEdit';

        if (isVehicle) {
            handlePaymentMethodChange($(this), $('#partsPriceCardEdit'), $('#partsPriceCacheEdit'));
        } else {
            handlePaymentMethodChange($(this), $('#mechanicPriceCardEdit'), $('#mechanicPriceCacheEdit'));
        }
    });
});

