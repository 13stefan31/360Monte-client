$(document).ready(function () {
    var url = window.location.pathname;
    var parts = url.split('/');
    var id = parts[2];


    $('#surveyData').html('<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>');
    $.ajax({
        url: '/../../functions/vehicleInspection.php',
        type: 'GET',
        data: {
            getSingleVehicleInspection: 1,
            id: id
        },
        dataType: 'json',
        success: function (response) {
            $('#surveyData').empty();
            if (response.error) {
                $('#surveysError').html(handleErrors(response.error));
                $('.surveyDatacard').hide();
            } else {
                var data = response.data.data;
                var details = response.data.data.details;
                $('.surveyPersonName').html(data.reporter.name)
                $('.surveyeVehicle').html(data.vehicle.brand + ' ' + data.vehicle.model)

                details.forEach(function (item) {
                    var name = item.item.label;
                    var statusIcon = item.correct ? '<i class="anticon anticon-check"></i>' : '<i class="anticon anticon-close"></i>';
                    var comment = item.comment ? item.comment : '';

                    var row = `
        <tr>
            <td>${name}</td>
            <td>${statusIcon}</td>
            <td>${comment}</td>
        </tr>
    `;

                    $('#vehicleInspectionData tbody').append(row);
                });

            }
        },
        error: function (jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#surveysError').html(createWarningMessage(error));
        },
        complete: function () {
            $('#loader-overlay').hide();
        }
    });

});