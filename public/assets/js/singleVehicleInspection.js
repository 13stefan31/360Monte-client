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
                $('.surveyPersonName').html(data.reporter.name);
                $('.surveyeVehicle').html(data.vehicle.brand + ' ' + data.vehicle.model);
                $('#surveyeVehicleId').val(data.vehicle.id);
                $('#reportType').val(data.type);
                $('#inspectionId').val(data.id);

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

                const sortedGroups = Object.entries(grouped).sort((a, b) => {
                    const groupIdA = a[1][0].item.group_id;
                    const groupIdB = b[1][0].item.group_id;
                    return groupIdA - groupIdB;
                });

                sortedGroups.forEach(([groupName, groupItems]) => {
                    const groupId = groupItems[0].item.group_id;

                    let groupHtml = '';

                    if (groupId !== 0) {
                        groupHtml += `
            <div class="inspection-group mb-4">
                <h5 class="mb-3 border-bottom pb-1">${groupName}</h5>
        `;
                    }

                    var vehicleName = $('.surveyeVehicle').text();
                    $('#vehicleInfo').html(vehicleName);

                    groupItems.forEach(item => {
                        const label = item.item.label;
                        const comment = item.comment;

                        if (groupId === 0) {
                            groupHtml += `
                <div class="inspection-item-group0 mb-2" style="margin-left: 12px;">
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
    $('#updateInspectionButton').off('click').on('click', function () {

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
        let html = '';

                    var details = response.data.data.details;

        const groupedItems = {};
        details.forEach(item => {
            const groupName = item.item.group || '';
            if (!groupedItems[groupName]) groupedItems[groupName] = [];
            groupedItems[groupName].push(item);
        });

        const sortedGroups = Object.entries(groupedItems).sort((a, b) => {
            const groupIdA = a[1][0].item.group_id;
            const groupIdB = b[1][0].item.group_id;
            return groupIdA - groupIdB;
        });

        sortedGroups.forEach(([groupName, items]) => {
            html += `<div class="inspection-group mb-4">`;
            html += `<h5 class="mb-3">${groupName || ''}</h5>`;

            items.forEach(item => {
                const isDefaultChecked = item.correct ? 'checked' : '';
                const isHiddenStyle = item.item.group_id === 0 ? 'd-none' : 'd-flex';
                const comment = item.comment || '';

                html += `
            <div class="inspection-item p-2 border rounded mb-3">
                <div class="d-flex justify-content-between align-items-start flex-wrap">
                    <div class="label-section mb-2" style="flex: 1 1 300px;">
                         ${item.item.label} 
                    </div>
                    <div class="checkbox-section mb-2 ${isHiddenStyle} align-items-center" style="flex: 0 0 auto;">
                        <label class="me-2 mb-0">Ispravno:</label>
                        <input type="checkbox" name="isCorrect_${item.item.id}" ${isDefaultChecked} style="width: 30px; transform: scale(1.5);" />
                    </div>
                </div>
                <div class="comment-section mt-2">
                    <textarea name="comment_${item.item.id}" class="form-control" rows="2" style="height: 35px; overflow-y: hidden; resize: vertical;" placeholder="Komentar">${comment}</textarea>
                    <input type="hidden" name="itemId[]" value="${item.item.id}" />
                    <input type="hidden" name="id" value="${item.id}" />
                </div>
            </div>`;
            });

            html += `</div>`;
        });

        $('#inspectionTableContainer').html(html);

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
});
$('#inspectionUpdate').on('submit', function (e) {
    e.preventDefault();

    const vehicleId = $('#surveyeVehicleId').val();
    const type = $('#reportType').val();
    const inspectionId = $('#inspectionId').val();
    if (!vehicleId) {
        Swal.fire('Morate odabrati vozilo!', '', 'warning');
        return;
    }

    const dataToSend = {
        reportTypeId: type,
        vehicleId: vehicleId,
        data: [],
        inspectionId: inspectionId
    };

    let validationPassed = true;
    let firstInvalidComment = null;

    $('textarea').removeClass('is-invalid');
    $('.comment-error').remove();

    $('input[name="itemId[]"]').each(function () {
        const itemId = $(this).val();
        const isCorrect = $(`input[name="isCorrect_${itemId}"]`).is(':checked');
        const commentField = $(`textarea[name="comment_${itemId}"]`);
        const comment = commentField.val().trim();

        commentField.removeClass('is-invalid');
        commentField.next('.comment-error').remove();

        if (itemId == '23' && isCorrect && comment === '') {
            commentField.addClass('is-invalid');
            commentField.after(`<span class="text-danger comment-error">Stavka (Stanje km sata) mora biti popunjena</span>`);
            if (!firstInvalidComment) firstInvalidComment = commentField;
            validationPassed = false;
        }
        else if (itemId != '23' && !isCorrect && comment === '') {
            commentField.addClass('is-invalid');
            commentField.after(`<span class="text-danger comment-error">Unesite komentar za neispravnu stavku.</span>`);
            if (!firstInvalidComment) firstInvalidComment = commentField;
            validationPassed = false;
        }

        dataToSend.data.push({
            id: $(this).closest('.inspection-item').find('input[name="id"]').val(),
            itemId: parseInt(itemId),
            isCorrect: isCorrect,
            comment: comment || null
        });
    });

    if (!validationPassed) {
        firstInvalidComment.focus();
        return;
    }

    $.ajax({
        url: '/functions/vehicleInspection.php',
        type: 'PUT',
        data: {
            updateInspectionData: 1,
            data: dataToSend
        },
        dataType: 'json',
        success: function (response) {
            if (response.error) {
                $('#weeklyInspectionAddError').html(handleErrors(response.error)).focus();
                var errorElement = document.getElementById('weeklyInspectionAddError');
                errorElement.innerHTML = handleErrors(response.error);
                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                var data = response.data.data;
                var details = response.data.data.details;
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
                const sortedGroups = Object.entries(grouped).sort((a, b) => {
                    const groupIdA = a[1][0].item.group_id;
                    const groupIdB = b[1][0].item.group_id;
                    return groupIdA - groupIdB;
                });

                sortedGroups.forEach(([groupName, groupItems]) => {
                    const groupId = groupItems[0].item.group_id;
                    let groupHtml = '';

                    if (groupId !== 0) {
                        groupHtml += `
            <div class="inspection-group mb-4">
                <h5 class="mb-3 border-bottom pb-1">${groupName}</h5>
        `;
                    }

                    groupItems.forEach(item => {
                        const label = item.item.label;
                        const comment = item.comment;

                        if (groupId === 0) {
                            groupHtml += `
                <div class="inspection-item-group0 mb-2" style="margin-left: 12px;">
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


                $('#inspectionError').html(createSuccessMessage('Uspješan update!'));

                $('#updateInspectionForm').modal('hide');
                // $('#inspectionUpdate')[0].reset();
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
});

