$(document).ready(function() {
    var url = window.location.href;
    var segments = url.split('/');
    var vacationId = segments[segments.length - 3];
    $('#vacationId').val(vacationId);

    $.ajax({
        url: '/../../functions/annualLeave.php',
        type: 'GET',
        data: { getSingleAnnualLeave: 1, vacationId: vacationId },
        dataType: 'json',
        success: function (response) {

            if (!response.success) {
                $('#alertGetAnnualLeave').html(handleErrors(response.error));
                $('.annualLeaveDivCard').hide();
            } else {
                var data = response.data.data;

                if (data.status!='Aktivan'){
                    $('#vacationChangeButton').remove()
                }
                $('.employee').html(data.userRequestedVacation.name);
                $('.daysNo').html(data.requestedDaysAmount);
                $('.status').html(data.status);
                $('.comment').html(data.comment);

                let datesHtml = '<p><strong>Dani:</strong></p>';
                let selectedDates = data.requestedDays.map(day => {
                    return formatDateForComparison(day.requestedDay);
                });
                datesHtml += data.requestedDays.map(day => {
                    let dateObj = new Date(day.requestedDay.split('.').reverse().join('-'));
                    let daysOfWeek = ["Nedelja", "Ponedeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"];
                    let dayOfWeek = daysOfWeek[dateObj.getDay()];

                    return `<p>${day.requestedDay} (${dayOfWeek})</p>`;
                }).join('');

                $('#vacation-dates').html(datesHtml);

                renderCalendar(selectedDates);
            }
        },
        error: function (jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alertGetAnnualLeave').html(createWarningMessage(error));
        },
        complete: function () {
            $('#loader-overlay').hide();
        }
    });

    function renderCalendar(selectedDates) {
        const calendarDiv = document.getElementById('calendar');
        const currentYear = new Date().getFullYear();

        calendarDiv.innerHTML = '';

        let monthsToDisplay = new Set();
        selectedDates.forEach(date => {
            let dateObj = new Date(date);
            let month = dateObj.getMonth();
            let year = dateObj.getFullYear();
            monthsToDisplay.add(`${year}-${month}`);
        });

        const monthsInSerbian = [
            "Januar", "Februar", "Mart", "April", "Maj", "Jun",
            "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
        ];

        const daysOfWeekShort = ["P", "U", "S", "Č", "P", "S", "N"];

        monthsToDisplay.forEach(monthYear => {
            const [year, month] = monthYear.split('-');
            const monthDiv = document.createElement('div');
            monthDiv.classList.add('month');

            const monthName = monthsInSerbian[parseInt(month)];
            const monthTitle = document.createElement('div');
            monthTitle.classList.add('month-title');
            monthTitle.innerText = `${monthName} ${year}`;
            monthDiv.appendChild(monthTitle);

            const weekDaysRow = document.createElement('div');
            weekDaysRow.classList.add('week-days-row');
            daysOfWeekShort.forEach(day => {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day-of-week');
                dayDiv.innerText = day;
                weekDaysRow.appendChild(dayDiv);
            });
            monthDiv.appendChild(weekDaysRow);

            const daysInMonth = new Date(year, parseInt(month) + 1, 0).getDate();
            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const startDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

            const calendarGrid = document.createElement('div');
            calendarGrid.classList.add('calendar-grid');
            for (let i = 0; i < startDay; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.classList.add('day', 'empty');
                calendarGrid.appendChild(emptyCell);
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');
                dayDiv.innerText = day;

                const dateStr = `${year}-${String(parseInt(month) + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                if (selectedDates.includes(dateStr)) {
                    dayDiv.classList.add('selected');
                }

                calendarGrid.appendChild(dayDiv);
            }

            monthDiv.appendChild(calendarGrid);
            calendarDiv.appendChild(monthDiv);
        });
    }



    function formatDate(date) {
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }

    function formatDateForComparison(date) {
        const [day, month, year] = date.split('.');
        return `${year}-${month}-${day}`;
    }




    $('#editVacationData').click(function(e) {
        e.preventDefault();
        $('#vacationDataChangeError').html('');
        var $btn = $(this);
        $btn.addClass('is-loading').prop('disabled', true);
        $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');

        let status = $('#statusChange').val();
        if (!status) {
            Swal.fire('Morate odabrati status!','','warning')
            $btn.removeClass('is-loading').prop('disabled', false);
            $btn.find('.anticon-loading').remove();
            return;
        }

        $.ajax({
            url: '/../../functions/annualLeave.php',
            type: 'put',
            data: JSON.stringify({
                'updateVacationData': 1,
                'data': {
                    'comment': $('#noteChange').val(),
                    'status': $('#statusChange').val(),
                    'vacationId': $('#vacationId').val()
                }

            }),
            success: function (response) {

                var dataParse = JSON.parse(response);

                if (dataParse.error) {
                    $('#vacation-modal').modal('hide');
                    $('#allocationDataChangeError').html('');
                    $('#annualLeaveAlert').html(handleErrors(dataParse.error));
                } else {
                    var data = dataParse.data.data;
                    $('#annualLeaveAlert').html(createSuccessMessage('Uspješno ste izmijenili zahtjev za slobodne dane!'));

                    $('.status').html(data.status  );
                    $('.comment').html(data.comment  );

                    $('#vacationChangeButton').remove()
                    $('#vacation-modal').modal('hide');
                    $('#allocationDataChangeError').html('');

                }
            }, error: function (jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#allocationDataChangeError').html(createErrorMessage(error));
            },
            complete: function () {
                $btn.removeClass('is-loading').prop('disabled', false);
                $btn.find('.anticon-loading').remove();
            }
        });

        // }
    });
});


