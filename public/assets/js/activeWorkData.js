$(document).ready(function() {
    var storedData;
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    var dataId = id.match(/\d+/)[0];
    $('#dataId').val(dataId) ;
    $.ajax({
        url: '/../../functions/worksHistory.php',
        type:'GET',
        data:{getActiveWorkData:1,id:dataId},
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                $('#alert').append(createWarningMessage(response.error));
            } else {
                $('#works-history-table tbody').empty();
                var data = response.data.data;
                console.log(data)
                if (data.length>0){
                    $.each(data, function(index, row) {
                        var workHistoryRow = '<tr class="work-history-row" id="' + row.id + '">' +
                            '<td>' + row.vehicle.brand + ' ' + row.vehicle.model + ' ' + row.vehicle.year + '</td>' +
                            '<td>' + row.reportedBy.name + '</td>' +
                            '<td>' + row.breakDownCategory.name + '</td>' +
                            '<td style="text-align:right">' + row.breakDownMilage + 'km</td>' +
                            '<td>' + row.startingDate + '</td>' +
                            '<td>' + row.endingDate + '</td>' +
                            '<td>' + row.mechanicPaymentMethod + '</td>' +
                            '<td>' + row.vehiclePartsPaymentMethod + '</td>' +
                            '<td>' + row.createdBy.name + '</td>' +
                            '<td>' + row.createdAt + '</td>' +
                            '<td  style="display: flex">' +
                            '<a class="btn btn-primary m-r-5 " href="/pregled-aktivnog-kvara-vozila/'+row.id+'"><i class="anticon anticon-plus"></i>Detalji</a>'
                            + '</td></tr>';

                        $('#works-history-table tbody').append(workHistoryRow );
                    });

                    var meta = response.data.meta;
                    var paginationHTML = generatePagination(meta.totalItems, meta.itemsPerPage, meta.currentPage);
                    $('#pagination').html(paginationHTML);
                }else{

                    $('#works-history-table').remove();
                    $('#alertActiveWorkHistory').html(createWarningMessage('Ne postoje aktivni kvarovi za vozilo id:' +dataId));
                }


            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alert').append(createWarningMessage(error));
        }
    });

});

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
        paginationHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="handlePageClick('+(currentPage-1)+')" tabindex="-1">Prethodna</a></li>';
    }
    for (var i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHTML += '<li class="page-item active"><a class="page-link" href="javascript:void(0)">' + i + '</a></li>';
        } else {
            paginationHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="handlePageClick('+i+')">' + i + '</a></li>';
        }
    }
    if (currentPage === totalPages) {
        paginationHTML += '<li class="page-item disabled"><a class="page-link" href="javascript:void(0)">Sledeća</a></li>';
    } else {
        paginationHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="handlePageClick('+(currentPage+1)+')">Sledeća</a></li>';
    }
    paginationHTML += '</ul></nav>';

    return paginationHTML;
}
function handlePageClick(pageNumber) {
    $('#current_page').val(pageNumber);
    var per_page=$('#per_page').val();
    var savedFilters = localStorage.getItem('worksHistoryFilters');
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getWorksHistory(savedFilters,pageNumber,per_page);
    } else {
        getWorksHistory('',pageNumber,per_page);
    }

}