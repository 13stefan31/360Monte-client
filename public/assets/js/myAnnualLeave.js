$(document).ready(function () {
    var savedFilters = localStorage.getItem('vacationsFilters');
    var current_page = $('#current_page').val();
    var per_page = $('#per_page').val();
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getAllAnualLeav(savedFilters, current_page, per_page);
    } else {
        getAllAnualLeav('', current_page, per_page);
    }

    $('#showPersonsFilter').click(function (e) {
        e.preventDefault();
        getRoles('rolaFilterId');
    });

    $('#clearFilters').on('click', function () {
        var per_page = $('#per_page').val();
        getAllAnualLeav('', 1, per_page);
        localStorage.removeItem('vacationsFilters');
        $('#employeeSelect').val('');
        $('#statusFilter').val('');
        $('#clearFilters').hide();
        $('#filterAnnualLeave').hide();
    });
});

$(document).on('click', '#vacationFilter', function () {
    var name = $('#employeeSelect').val();
    var statusId = $('#statusFilter').val();
    var filters = {
        name: name,
        statusId: statusId
    };

    localStorage.setItem('vacationsFilters', JSON.stringify(filters));
    var current_page = 1;
    var per_page = $('#per_page').val();
    getAllAnualLeav(filters, current_page, per_page);
    $('#clearFilters').show();
});

function getAllAnualLeav(filters, current_page, per_page) {
    var data = {
        getMyAnualLeav: 1,
        per_page: per_page,
        current_page: current_page,
        userId: $('#loggedUser').val()
    };

    if (filters !== '') {
        data.name = filters.name;
        data.statusId = filters.statusId;
    }

    $('#all-vacations-table tbody').html('<tr><td colspan="5" class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
    $.ajax({
        url: '/../../functions/annualLeave.php',
        type: 'GET',
        data: data,
        dataType: 'json',
        success: function (response) {
            if (response.error) {
                $('#alert').append(createWarningMessage(response.error));
                $('#all-vacations-table tbody').html('');
            } else {

                $('#all-vacations-table tbody').empty();
                var data = response.data.data;
                $.each(data, function (index, row) {
                    var statusBadge = '';

                    if (row.status === 'Aktivan') {
                        statusBadge = '<span class="badge badge-pill badge-orange">Aktivan</span>';
                    } else if (row.status === 'Odbijen') {
                        statusBadge = '<span class="badge badge-pill badge-volcano">Odbijen</span>';
                    } else if (row.status === 'Odobren') {
                        statusBadge = '<span class="badge badge-pill badge-green">Odobren</span>';
                    }
                    $('#all-vacations-table tbody').append('<tr id="' + row.id + '">' +
                        '<td>' + row.userRequestedVacation.name + '</td>' +
                        '<td>' + statusBadge  + '</td>' +
                        '<td>' + row.requestedDaysAmount + '</td>' +
                        '<td><a href="/zahtjev-slobodni-dani/' + row.id + '/M/" class="btn btn-primary m-r-5">' +
                        '<i class="anticon anticon-plus"></i> Detalji</a></td></tr>'
                    );
                });

                var meta = response.data.meta;
                var paginationHTML = generatePagination(meta.totalItems, meta.itemsPerPage, meta.currentPage);
                $('#pagination').html(paginationHTML);
            }
        },
        error: function (jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alert').append(createWarningMessage(error));
            $('#all-vacations-table tbody').html('');
        }
    });
}

function generatePagination(totalItems, itemsPerPage, currentPage, onPageClick) {
    var totalPages = Math.ceil(totalItems / itemsPerPage);
    var startPage, endPage;

    if (totalPages <= 10) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    var paginationHTML = '<nav aria-label="Page navigation example"><ul class="pagination">';
    if (currentPage === 1) {
        paginationHTML += '<li class="page-item disabled"><a class="page-link" href="javascript:void(0)" tabindex="-1">Prethodna</a></li>';
    } else {
        paginationHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="handlePageClick(' + (currentPage - 1) + ')" tabindex="-1">Prethodna</a></li>';
    }
    for (var i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHTML += '<li class="page-item active"><a class="page-link" href="javascript:void(0)">' + i + '</a></li>';
        } else {
            paginationHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="handlePageClick(' + i + ')">' + i + '</a></li>';
        }
    }
    if (currentPage === totalPages) {
        paginationHTML += '<li class="page-item disabled"><a class="page-link" href="javascript:void(0)">Sledeća</a></li>';
    } else {
        paginationHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="handlePageClick(' + (currentPage + 1) + ')">Sledeća</a></li>';
    }
    paginationHTML += '</ul></nav>';

    return paginationHTML;
}

function handlePageClick(pageNumber) {
    $('#current_page').val(pageNumber);
    var per_page = $('#per_page').val();
    var savedFilters = localStorage.getItem('vacationsFilters');
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getAllAnualLeav(savedFilters, pageNumber, per_page);
    } else {
        getAllAnualLeav('', pageNumber, per_page);
    }

}

$("#showAnnualLeaveFilter").click(function () {
    $("#filterAnnualLeave").toggle();
});
const observer = new MutationObserver(function (mutationsList, observer) {
    let count = $('#dates-list li').length;

    if (count > 0) {
        $('#sendRequest').removeClass('d-none');
    } else {
        $('#sendRequest').addClass('d-none');
    }
});

observer.observe(document.getElementById('dates-list'), {childList: true});

$(document).on('click', '#sendRequest', function () {
    var selectedDates = [];

    $('#dates-list li').each(function () {
        selectedDates.push($(this).data('date'));
    });

    if (selectedDates.length === 0) {
        Swal.fire('Morate odabrati datume!','','warning') ;
        return;
    }

    $.ajax({
        url: '/../../functions/annualLeave.php',
        type: 'POST',
        data: {
            userId: $('#loggedUser').val(),
            dates: selectedDates
        },
        dataType: 'json',
        success: function (response) {

            if (!response.success) {
                Swal.fire(handleErrors(response.error), '', '')
            } else {
                Swal.fire('Uspješno ste poslali zahtjev.', '', 'success');

                var row = response.data.data;
                var statusBadge = '';

                if (row.status === 'Aktivan') {
                    statusBadge = '<span class="badge badge-pill badge-orange">Aktivan</span>';
                } else if (row.status === 'Odbijen') {
                    statusBadge = '<span class="badge badge-pill badge-volcano">Odbijen</span>';
                } else if (row.status === 'Odobren') {
                    statusBadge = '<span class="badge badge-pill badge-green">Odobren</span>';
                }
                var newRow = '<tr id="' + row.id + '">' +
                    '<td>' + row.userRequestedVacation.name + '</td>' +
                    '<td>' + statusBadge + '</td>' +
                    '<td>' + row.requestedDaysAmount + '</td>' +
                    '<td><a href="/zahtjev-slobodni-dani/' + row.id + '/M/" class="btn btn-primary m-r-5">' +
                    '<i class="anticon anticon-plus"></i> Detalji</a></td></tr>';

                $('#all-vacations-table tbody').prepend(newRow);

                $('#clearDates').removeClass('d-none');
                $('#sendRequest').addClass('d-none');
            }


        },
        error: function (jqXHR) {
            Swal.fire('Došlo je do greške prilikom slanja zahteva.','','error')
        }
    });
});


