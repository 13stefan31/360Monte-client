$(document).ready(function() {
    $('#surveysTable tbody').html('<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>');
    $.ajax({
        url: '/../../functions/survey.php',
        type:'GET',
        data:{
            getAllSurveys:1
        },
        dataType: 'json',
        success: function(response) {
            $('#surveysTable tbody').empty();
            if (response.error) {
                $('#surveysError').html(handleErrors(response.error));
            } else {
                var data = response.data.data;

                data.forEach(function(item) {
                    console.log(item)
                    var surveyItem='';
                    if (Array.isArray(item.surveyData)) {
                        item.surveyData.forEach(function (i, index) {
                            surveyItem += i.username;
                            if (index < item.surveyData.length - 1) {
                                surveyItem += ', ';
                            }
                        });
                    } else {
                        surveyItem = item.surveyData.brand + ' ' + item.surveyData.model + ' '+item.surveyData.registrationNumber;
                    }
                    var newRow =
                        '<tr id="'+item.id+'">' +
                        '<td>' + item.user.name + '</td>' +
                        '<td>'+surveyItem+'</td>' +
                        '<td>' + item.createdAt +'</td>' +
                        '<td><a class="btn btn-primary m-r-5 " href="/anketa/'+item.id+'"   ><i class="anticon anticon-plus"></i>Detalji</a></td>' +
                        '</tr>';
                    $('#surveysTable tbody').append(newRow);

                });

            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#surveysError').html(createWarningMessage(error));
        }
    });

});
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
            console.log(response)
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