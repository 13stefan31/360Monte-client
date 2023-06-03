$(document).ready(function() {
    var url = window.location.href;
    var token = url.substring(url.lastIndexOf('/') + 1);
    $('#surveyData').html('<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>');
    $.ajax({
        url: '/../../functions/survey.php',
        type:'GET',
        data:{
            getSingleSurvey:1,
            token:token
        },
        dataType: 'json',
        success: function(response) {
            $('#surveyData').empty();
            if (response.error) {
                $('#surveysError').html(handleErrors(response.error));
                $('.surveyDatacard').hide();
            } else {
                var data = response.data.data;
                var surveyTypeP='';
                var surveyTypeS='';
                var emptySurvey='';
                if (data.type==1) {
                    surveyTypeP='Saradnici';
                    surveyTypeS='Saradnik';
                    emptySurvey='Na komentar i ocjenu čekaju sledeći saradnici:';
                //
                // } else if (data.type==2) {
                //     surveyTypeP=surveyTypeS='Vozilo';
                //     emptySurvey='Na komentar i ocjenu čeka sledeće vozilo:';
                }

                $('.surveyPersonName').html(data.user.name)
                $('.surveyType').html(surveyTypeP)
                if (data.status==0){
                    if (data.type==1) {
                        var wait = '';
                        for (var i = 0; i < data.surveyData.length; i++) {
                            wait += data.surveyData[i].username;
                            if (i < data.surveyData.length - 1) {
                                wait += ', ';
                            }
                        }
                    }
                    // else if (data.type==2) {
                    //     surveyTypeP=surveyTypeS='Vozilo';
                    //     emptySurvey='Na komentar i ocjenu čeka sledeće vozilo:';
                    // }

                    var newRow =
                        '  <div class="card">' +
                        '    <div class="card-header employeeSurveyName">' +
                        '      <h4 class="card-title ">Anketa još uvijek nije popunjena. '+emptySurvey+'</h4>' +
                        '    </div>' +
                        '    <div class="card-body">' +
                        '      <span>'+wait+'</span>' +
                        '    </div>' +
                        '    <br>' +
                        '  </div>';
                    $('.surveyData').append(newRow);

                    $('.surveyTime').html('-')
                }else{
                    data.result.forEach(function(item) {
                        $('.surveyTime').html(item.createdAt);
                        // var rating = Math.round(item.rating);
                        //
                        // var starRatingHTML = '<div class="star-rating m-t-5">';
                        //
                        // for (var i = 1; i <= 5; i++) {
                        //     if (i <= rating) {
                        //         starRatingHTML +=
                        //             '<input type="radio " checked /><label class="star-selected" for="star' +
                        //             item.id +
                        //             '-' +
                        //             i +
                        //             '" title="' +
                        //             i +
                        //             ' star"></label>';
                        //     } else {
                        //         starRatingHTML +=
                        //             '<input type="radio"  /><label class="star-unselected" for="star' +
                        //             item.id +
                        //             '-' +
                        //             i +
                        //             '" title="' +
                        //             i +
                        //             ' star"></label>';
                        //     }
                        // }

                        // starRatingHTML += '</div>';

                        var newRow =
                            '  <div class="card">' +
                            '    <div class="card-header employeeSurveyName">' +
                            '      <h4 class="card-title ">' +
                            surveyTypeS +
                            ': <span> ' +
                            item.target.name +
                            '</span></h4>' +
                            '    </div>' +
                            '    <div class="card-header">' +
                            '      <h4 class="card-title">Ocjena:  <span>' +
                            item.rating +
                            '</span></h4>' +
                            '    </div>' +
                            '    <div class="card-header">' +
                            '      <h4 class="card-title">Komentar</h4>' +
                            '      <span>' +
                            item.comment +
                            '</span>' +
                            '    </div>' +
                            '    <br>' +
                            '  </div>';

                        $('.surveyData').append(newRow);
                    });



                }
            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#surveysError').html(createWarningMessage(error));
        },
        complete:function (){
            $('#loader-overlay').hide();
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