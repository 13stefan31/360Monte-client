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
            console.log(response);
            $('#surveyData').empty();
            if (response.error) {
                $('#surveysError').html(handleErrors(response.error));
                $('.surveyDatacard').hide();
            } else {
                var data = response.data.data;
                var details = response.data.data.details;
                $('.surveyPersonName').html(data.reporter.name)
                $('.surveyeVehicle').html(data.vehicle.brand + ' ' + data.vehicle.model)

                const grouped = {};

                details.forEach(item => {
                    const group = item.item.group || '';
                    if (!grouped[group]) {
                        grouped[group] = [];
                    }
                    grouped[group].push(item);
                });

                const container = $('#inspectionResults');
                container.empty();

                Object.keys(grouped).forEach(groupName => {
                    const groupItems = grouped[groupName];
                    const groupId = groupItems[0].item.group_id;

                    let groupHtml = '';

                    if (groupId !== 0) {
                        groupHtml += `
            <div class="inspection-group mb-4 ">
                <h5 class="mb-3 border-bottom pb-1">${groupName}</h5>
        `;
                    }

                    groupItems.forEach(item => {
                        const label = item.item.label;
                        const comment = item.comment;

                        if (groupId === 0) {
                            groupHtml += `
                <div class="inspection-item-group0 mb-2 " style="margin-left: 12px;">
                    ${label}${comment ? `: <strong>${comment}</strong>` : ''} 
                </div>
            `;
                        } else {
                            const correctIcon = item.correct
                                ? '<span class="badge badge-pill badge-green" style="margin-right: 20px">Ispravno</span>'
                                : '<span class="badge badge-pill badge-volcano" style="margin-right: 20px">Neispravno</span>';

                            groupHtml += `
                <div class="inspection-item mb-3 p-10">
                    <div class="d-flex justify-content-between align-items-center">
                        ${label} 
                        ${correctIcon}
                    </div>
                    ${comment ? `<div class="text-muted small mt-1">Komentar: ${comment}</div>` : ''}
                </div>
            `;
                        }
                    });

                    if (groupId !== 0) {
                        groupHtml += `</div>`;
                    }

                    container.append(groupHtml);
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