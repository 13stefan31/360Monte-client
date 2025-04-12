var reportType=$('#reportType').val();
$(document).ready(function() {
    var current_page=$('#current_page').val();
    var per_page=$('#per_page').val();
    if (reportType==1){
        var savedFilters = localStorage.getItem('weeklyInspectionsFilters');
        if (savedFilters) {
            savedFilters = JSON.parse(savedFilters);
            getAllVehicleInspectionsReports(savedFilters,current_page,per_page);
            var weekly_inspection_vehicle_id=$('#weekly_inspection_vehicle_id').val();

            var weekly_inspection_date=$('#weekly_inspection_date').val();
            $('#dateFilterId').val(weekly_inspection_date);
            getVehiclesSelect('vehicleFilterId',weekly_inspection_vehicle_id);


        } else {
            getAllVehicleInspectionsReports('',current_page,per_page);
        }
    }else{
        var savedFilters = localStorage.getItem('monthlyInspectionsFilters');
        if (savedFilters) {
            savedFilters = JSON.parse(savedFilters);
            getAllVehicleInspectionsReports(savedFilters,current_page,per_page);
            var monthly_inspection_vehicle_id=$('#monthly_inspection_vehicle_id').val();

            var monthly_inspection_date=$('#monthly_inspection_date').val();
            $('#dateFilterId').val(monthly_inspection_date);
            getVehiclesSelect('vehicleFilterId',monthly_inspection_vehicle_id);


        } else {
            getAllVehicleInspectionsReports('',current_page,per_page);
        }
    }

});


function getAllVehicleInspectionsReports(filters,current_page,per_page){
    $('#surveysTable tbody').html('<tr><td colspan="5" class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
    var data = {
        getAllInspectionReports:1,
        report_type:reportType,
        per_page:per_page,
        current_page:current_page
    };
    if (filters !== '') {
        data.reportDate = filters.dateFilterId;
        data.vehicleId = filters.vehicleFilterId;
    }


    $.ajax({
        url: '/../../functions/vehicleInspection.php',
        type:'GET',
        data:data,
        dataType: 'json',
        success: function(response) {
            $('#surveysTable tbody').empty();
            if (response.error) {
                $('#surveysError').html(handleErrors(response.error));
            } else {
                $('#surveysTable tbody').empty();
                var data = response.data.data;
                data.forEach(function(item) {

                        var newRow =
                            '<tr id="'+item.id+'">' +
                            '<td>' + item.reporter.name + '</td>' +
                            '<td>' +item.vehicle.brand+   ' ' +item.vehicle.model+'</td>' +
                            '<td>' + item.reporter.createdAt + '</td>' +
                            '<td><a class="btn btn-primary m-r-5 " href="/inspekcija-vozila/'+item.id+'/'+item.type+'"   ><i class="anticon anticon-plus"></i>Više detalja</a>' +
                            '<a class="btn btn-danger m-r-5 " href="javascript:void(0)" onclick="deleteVehicleInspections('+item.id+')"><i class="anticon anticon-delete"></i>Obriši</a></td>' +

                            '</tr>';
                        $('#surveysTable tbody').append(newRow);

                });
                var meta = response.data.meta;
                var paginationHTML = generatePagination(meta.totalItems, meta.itemsPerPage, meta.currentPage);
                $('#pagination').html(paginationHTML);

            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#surveysError').html(createWarningMessage(error));
        }
    });
}
$(document).on('click', '#saveSurveyResults', function(e) {
    e.preventDefault();
    var $btn = $(this);
    $btn.addClass('is-loading').prop('disabled', true);
    $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
    var type = $('#surveyType').val();
    var url = window.location.href;
    var token = url.substring(url.lastIndexOf('/') + 1);
    if (type==1){
        var surveyData = [];
        $('.employeeSurvey').each(function() {
            var $surveySection = $(this);
            var personId = $surveySection.find('.star-rating').data('id');
            var mark = $surveySection.find('input[name="rating-' + personId + '"]:checked').val();
            var comment = $surveySection.find('#comment-' + personId).val();

            var personSurveyData = {
                "targetId": parseInt(personId),
                "mark": parseInt(mark),
                "comment": comment
            };
            surveyData.push(personSurveyData);
        });
        var data = JSON.stringify({
            "surveyData": surveyData
        });
    }else if(type==2){
        var targetId = $('#vehicleId').val();

        var mark = $('input[name="vehicleRate"]:checked').val();
        var comment = $('#vehicleComment').val();
        var data = JSON.stringify({
            "surveyData": [{
                "targetId": parseInt(targetId),
                "mark": parseInt(mark),
                "comment": comment
            }]
        });
    }


    $.ajax({
        url: '/../../functions/survey.php',
        type:'post',
        data:   {
            'addSurveyVote': 1,
            'token':token,
            'data':data
        },
        success: function(response) {
            var dataParse = JSON.parse(response);
            if (dataParse.error) {
                $('#surveyError').html(handleErrors(dataParse.error));
            } else {
                // $('#surveyError').html(createSuccessMessage('Uspješno ste dodali novog zaposlenog na alokaciji'));
                var data = dataParse.data.data;
                $('#surveyError').html(createSuccessMessage('Uspješno ste glasali'));
                $('#surveyData').empty();


            }
        },  error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#surveyError').html(createErrorMessage(error));
        },
        complete:function (){
            $btn.removeClass('is-loading').prop('disabled', false);
            $btn.find('.anticon-loading').remove();
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
    getAllVehicleInspectionsReports(pageNumber,per_page);

}


$('#showWeeklyInspectionFilter').click(function(e) {
    e.preventDefault();
    getVehiclesSelect('vehicleFilterId');

    $("#filterWeeklyInspection").toggle();
});
$('#showMonthlyInspectionFilter').click(function(e) {
    e.preventDefault();
    getVehiclesSelect('vehicleFilterId');
    $("#filterMonthlyInspection").toggle();
});
$(document).on('click', '#weeklyInspectionsFilter', function() {

    var vehicleFilterId = $('#vehicleFilterId').val();
    var dateFilterId = $('#dateFilterId').val();
    var filters = {
        vehicleFilterId: vehicleFilterId,
        dateFilterId: dateFilterId,
    };
    localStorage.setItem('weeklyInspectionsFilters', JSON.stringify(filters));
    var current_page=1;
    var per_page=$('#per_page').val();
    getAllVehicleInspectionsReports(filters,current_page,per_page);
    $('#clearFilters').show();
});
$(document).on('click', '#monthlyInspectionsFilter', function() {

    var vehicleFilterId = $('#vehicleFilterId').val();
    var dateFilterId = $('#dateFilterId').val();
    var filters = {
        vehicleFilterId: vehicleFilterId,
        dateFilterId: dateFilterId,
    };
    localStorage.setItem('monthlyInspectionsFilters', JSON.stringify(filters));
    var current_page=1;
    var per_page=$('#per_page').val();
    getAllVehicleInspectionsReports(filters,current_page,per_page);
    $('#clearFiltersMonthly').show();
});
$('#clearFilters').on('click', function() {
    var per_page=$('#per_page').val();
    getAllVehicleInspectionsReports('',1,per_page);
    localStorage.removeItem('weeklyInspectionsFilters');

    $('#dateFilterId').val('');
    $('#vehicleFilterId').val('');
    $('#clearFilters').hide();
    $("#filterWeeklyInspection").hide();
});
$('#clearFiltersMonthly').on('click', function() {
    var per_page=$('#per_page').val();
    getAllVehicleInspectionsReports('',1,per_page);
    localStorage.removeItem('monthlyInspectionsFilters');

    $('#dateFilterId').val('');
    $('#vehicleFilterId').val('');
    $('#clearFilters').hide();
    $("#filterMonthlyInspection").hide();
});

$('#newWeeklyInspectionButton').click(function(e) {
    e.preventDefault();
    $('#inspectionAdd')[0].reset();
    $("#weeklyInspectionAddError").empty();

    getVehiclesSelect('vehicleNew');
    returnWeeklyInspectionData($('#reportType').val());
});


