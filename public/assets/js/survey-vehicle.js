$(document).ready(function() {
    var savedFilters = localStorage.getItem('allSurveysFilters');
    var current_page=$('#current_page').val();
    var per_page=$('#per_page').val();
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getAllSurveys(savedFilters,current_page,per_page);
    } else {
        getAllSurveys('',current_page,per_page);
    }

});
$(document).on('click', '#vehicleFilters', function() {
    var status = $('#statusFilter').val();
    var current_page=1;
    var per_page=$('#per_page').val();

    var filters = {
        status: status,
    };
    localStorage.setItem('allSurveysFilters', JSON.stringify(filters));

    getAllSurveys(filters,current_page,per_page,);
    $('#clearFilters').show();
});
$('#clearFilters').on('click', function() {
    var current_page=1;
    var per_page=$('#per_page').val();
    getAllSurveys('',current_page,per_page);
    localStorage.removeItem('allSurveysFilters');
    $('#statusFilter').val('');
    $('#clearFilters').hide();
    $('#filterVehicles').hide();
});

function getAllSurveys(filters,current_page,per_page){
    $('#surveysTable tbody').html('<tr><td colspan="5" class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
    var data = {
        getAllSurveysVehicle:1,
        per_page:per_page,
        current_page:current_page
    };
    if (filters !== '') {
        data.status= filters.status;
    }
    $.ajax({
        url: '/../../functions/survey-vehicle.php',
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
                    var surveyItem='';
                    var filled='';

                    if (item.type==3) {
                        if (item.status==1){
                            filled='Popunjena';
                        }else if(item.status==0){
                            filled='Nije popunjena';

                        }
                        var newRow =
                            '<tr id="'+item.id+'">' +
                            '<td>' + item.surveyData.brand + ' ' +item.surveyData.model+ ' ' + item.surveyData.registrationNumber+ ' ' + '</td>' +

                            '<td>' +item.user.name +'</td>' +
                            '<td>' +filled +'</td>' +
                            // '<td>' + item.createdAt +'</td>' +
                            // '<td><a class="btn btn-primary m-r-5 " href="/anketa/'+item.token+'"   ><i class="anticon anticon-plus"></i>Više detalja</a></td>' +
                            '</tr>';
                        $('#surveysTable tbody').append(newRow);
                    }
                    // else if (item.type==2) {
                    //     surveyItem='Vozilo -' +item.surveyData.brand + ' ' + item.surveyData.model + ' '+item.surveyData.registrationNumber ;
                    // }
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
    var savedFilters = localStorage.getItem('allSurveysFilters');
    if (savedFilters) {
        savedFilters = JSON.parse(savedFilters);
        getAllSurveys(savedFilters,pageNumber,per_page);
    } else {
        getAllSurveys('',pageNumber,per_page);
    }
}

