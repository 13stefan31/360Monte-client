$(document).ready(function() {
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    var dataId = id.match(/\d+/)[0];
    $('#dataId').val(dataId) ;
    $.ajax({
        url: '/../../functions/singleDailyDataHistory.php',
        type:'GET',
        data:{getSingleDailyData:1,dataId:dataId},
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                $('#alertGetDailyData').html(handleErrors(response.error));
                $('.dailyDataDivCard').hide()
            } else {
                var data = response.data.data;
                $('#dataId').val(data.id);
                $('.dailyDataCreated').html(data.createdAt);
                $('.dailyDataFuelQ').html(data.fuel_quantity+'L');
                $('#qpChange').val(data.fuel_quantity);
                $('.dailyDataVehicle').html(data.vehicle.brand + ' ' + data.vehicle.model+ ' ' + data.vehicle.year  + '<br/> Reg. oznaka: ' +data.vehicle.registrationNumber);
                $('.dailyDataFuelP').html(data.fuel_price+'€');
                $('#fpChange').val(data.fuel_price);
                $('.dailyDataStartingM').html(data.starting_mileage+'km');
                $('#smChange').val(data.starting_mileage);
                $('.dailyDataEndingM').html(data.ending_mileage+'km');
                $('#emChange').val(data.ending_mileage  );
                $('.dailyDataDistance').html(data.daily_distance+'km');
                $('.dailyData').html(data.logDate);

                data.drivenBy.forEach(function(item) {
                    var newRow = '<tr id="'+item.id+'"><td><span class="badge badge-primary badge-dot m-r-10"></span>' + item.name + '</td></tr>';
                    $('#drivers-tabele tbody').append(newRow);
                });



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


    $('#editDailyData').click(function(e) {
        e.preventDefault();
        var $btn = $(this);
        $btn.addClass('is-loading').prop('disabled', true);
        $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');

        $.ajax({
            url: '/../../functions/singleDailyDataHistory.php',
            type: 'put',
            data: JSON.stringify({
                'updateDailyData': 1,
                'data': {
                    'dataId': $('#dataId').val(),
                    'startingMileage': $('#smChange').val(),
                    'endingMileage': $('#emChange').val(),
                    'fuelPrice': $('#fpChange').val(),
                    'fuelQuantity': $('#qpChange').val()
                }

            }),
            success: function (response) {
                var dataParse = JSON.parse(response);
                if (dataParse.error) {
                    $('#dailyDataChangeError').html(handleErrors(dataParse.error));
                } else {
                    var data = dataParse.data.data;
                    $('#dailyDataAlert').html(createSuccessMessage('Uspješno ste izmijenili podatke.'));
                    $('#dataId').val(data.id);
                    $('.dailyDataCreated').html(data.createdAt);
                    $('.dailyDataFuelQ').html(data.fuel_quantity+'L');
                    $('#qpChange').val(data.fuel_quantity);
                    $('.dailyDataVehicle').html(data.vehicle.brand + ' ' + data.vehicle.model  + ' Reg. oznaka: ' +data.vehicle.registrationNumber);
                    $('.dailyDataFuelP').html(data.fuel_price+'€');
                    $('#fpChange').val(data.fuel_price);
                    $('.dailyDataStartingM').html(data.starting_mileage+'km');
                    $('#smChange').val(data.starting_mileage);
                    $('.dailyDataEndingM').html(data.ending_mileage+'km');
                    $('#emChange').val(data.ending_mileage  );
                    $('.dailyDataDistance').html(data.daily_distance+'km');

                    $('#daily-data-change-modal').modal('hide');
                    $('#dailyDataChangeError').html('');




                }
            }, error: function (jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#dailyDataChangeError').html(createErrorMessage(error));
            },
            complete: function () {
                $btn.removeClass('is-loading').prop('disabled', false);
                $btn.find('.anticon-loading').remove();
            }
        });

    });



});

$('#changeDailyDataButton').on('click', function() {
    $('#dailyDataChangeError').html('');

});