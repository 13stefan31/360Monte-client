var selectedDates = [];
var calendarInitialized = false;
var calendar;
$(document).ready(function() {

    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
    moment.locale('sr-latn');

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if ($(e.target).attr('href') === '#tab-calendar' && !calendarInitialized) {
            initializeCalendar();
            calendarInitialized = true;
        }
    });


    $('#dates-list').on('click', '.remove-date', function() {
        var dateToRemove = $(this).data('date');
        removeSelectedDate(dateToRemove);
        updateDateList();
    });



});
function clearSelectedDates() {
    selectedDates = [];
    updateDateList();

    if (typeof calendar !== 'undefined' && calendar) {
        calendar.getEvents().forEach(event => event.remove());
    }

    $('#removeSelected').addClass('d-none');

    $('#clearDates').addClass('d-none');
}
function updateDateList() {
    moment.locale('sr');

    $('#dates-list').empty();
    selectedDates.forEach(function(date) {
        var displayDate = moment(date).format('DD.MM.YYYY');
        var dayOfWeek = moment(date).format('dddd');

        $('#dates-list').append(
            '<li data-date="' + date + '">' + displayDate + ' (' + dayOfWeek + ')' +
            ' <button class="remove-date btn btn-icon btn-hover btn-sm btn-rounded" data-date="' + date + '">' +
            '<i class="anticon anticon-delete"></i></button></li>'
        );
    });
}
function initializeCalendar() {
    var calendarEl = $('#calendar')[0];

    if (!calendar) {
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'sr-latn',
            firstDay: 1,
            selectable: true,
            buttonText: {
                today: 'Danas',
                month: 'Mesec',
                week: 'Nedelja',
                day: 'Dan'
            },
            longPressDelay: 500,
            select: function(info) {
                var startDate = moment(info.startStr).startOf('day');
                var endDate = moment(info.endStr).startOf('day');

                if (endDate.isBefore(startDate)) {
                    endDate.add(1, 'days');
                }

                var currentDate = startDate.clone();
                var newSelectedDates = [];

                while (currentDate.isBefore(endDate)) {
                    newSelectedDates.push(currentDate.format('YYYY-MM-DD'));
                    currentDate.add(1, 'days');
                }

                var totalSelected = selectedDates.length + newSelectedDates.length;
                if (totalSelected > 7) {
                    Swal.fire('Možete izabrati maksimalno 7 dana.', '', 'warning');
                    return;
                }

                newSelectedDates.forEach(function(selectedDate) {
                    if (selectedDates.includes(selectedDate)) {
                        removeSelectedDate(selectedDate);
                    } else {
                        addSelectedDate(selectedDate);
                    }
                });

                selectedDates.sort();
                updateDateList();
            },
            eventClick: function(info) {
                var selectedDate = info.event.startStr;
                removeSelectedDate(selectedDate);
            }
        });
        calendar.render();
    }
}

function addSelectedDate(selectedDate) {

    $('#clearDates').addClass('d-none');
    $('#sendRequest').removeClass('d-none');
    $('.alert-warning').remove();
    selectedDates.push(selectedDate);

    calendar.addEvent({
        title: 'Odabrano',
        start: selectedDate,
        end: selectedDate,
        allDay: true,
        backgroundColor: '#3f87f5',
        borderColor: '#3f87f5'
    });

    var displayDate = moment(selectedDate).format('DD.MM.YYYY');
    $('#dates-list').append(
        '<li data-date="' + selectedDate + '">' + displayDate +
        ' <button class="remove-date btn btn-icon btn-hover btn-sm btn-rounded" data-date="' + selectedDate + '"><i class="anticon anticon-delete"></i></button></li>'
    );
}

function removeSelectedDate(dateToRemove) {
    $('.alert-warning').remove();
    selectedDates = selectedDates.filter(function(date) {
        return date !== dateToRemove;
    });

    var event = calendar.getEvents().find(function(evt) {
        return evt.startStr === dateToRemove;
    });
    if (event) {
        event.remove();
    }

    $('#dates-list li').filter(function() {
        return $(this).data('date') === dateToRemove;
    }).remove();

    $('#clearDates').addClass('d-none');
}