$(document).ready(function() {
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
                $('#alertGetActiveData').html(handleErrors(response.error));
                $('.activeDataDivCard').hide()
            } else {
                var data = response.data.data;
                var $breadcrumbItem = $('#backLink');

                if ($breadcrumbItem.length) {
                    var updatedHref = '/aktivni-kvarovi-vozila/' + data.vehicle.id;

                    $breadcrumbItem.attr('href', updatedHref);
                }

                $('.workDataVehicle').html(data.vehicle.brand + ' ' + data.vehicle.model+ ' ' + data.vehicle.year  + '<br/> Reg. oznaka: ' +data.vehicle.registrationNumber);
                $('.workBreakCategory').html(data.breakDownCategory.name);if (data.breakDownSubcategory !== null && data.breakDownSubcategory.name !== undefined) {
                    $('.workBreakSubcategory').html(data.breakDownSubcategory.name);
                } else {
                    $('.workBreakSubcategory').html('-');
                }

                $('.workBreakMileage').html(data.breakDownMilage + ' km');
                $('.workStarted').html(data.startingDate);
                $('.workEnding').html(data.endingDate);
                $('.mehanicPayMethod').html(data.mechanicPaymentMethod);
                $('.partsPayMethod').html(data.vehiclePartsPaymentMethod);
                $('.workDesc').html(data.description);
                $('.workBreakCreated').html(data.createdAt);
                $('.workCreatedBy').html(data.createdBy.name);

                // var newRow =
                //     '<tr><td rowspan="2" class="w-20">Iznos</td><td>Račun</td><td>Keš</td></tr>' +
                // '<tr ><td>' + data.mechanicPricePayedOverAccount + '€' + '</td><td>' + data.mechanicPricePayedWithCache + ' €' + '</td></tr>';
                // $('#mehanic-tabele tbody').append(newRow);
                //
                // var newRow2 =
                //     '<tr><td rowspan="2" class="w-20">Iznos</td><td>Račun</td><td>Keš</td></tr>' +
                //     '<tr ><td>' + data.vehiclePartsPricePayedOverAccount + '€' + '</td><td>' + data.vehiclePartsPricePayedWithCache + ' €' + '</td></tr>';
                // $('#parts-tabele tbody').append(newRow2);

            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alertGetActiveData').html(createWarningMessage(error));
        },
        complete:function (){
            $('#loader-overlay').hide();
        }
    });

});


