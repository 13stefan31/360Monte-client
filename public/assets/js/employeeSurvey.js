$(document).ready(function() {
    var url = window.location.href;
    var token = url.substring(url.lastIndexOf('/') + 1);
    $('#surveyData').html('<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>');
    $.ajax({
        url: '/../../functions/survey.php',
        type:'GET',
        data:{
            getSingleSurvey:1
            ,token:token
        },
        dataType: 'json',
        success: function(response) {
            $('#surveyData').empty();
            if (response.error) {
                $('#surveyError').html(handleErrors(response.error));
            } else {
                var data = response.data.data;
                // if (loggedUser != null && loggedUser!=data.user.id ){
                //
                //     $('#surveyError').html('Možete odgovoriti samo na svoje ankete');
                // }else{
                    if (data.status == 1) {
                        $('#surveyError').html(handleErrors('Anketa je već popunjena'));
                        $(".backHome").show();

                    } else {
                        if (data.type == 1) {
                            data.surveyData.forEach(function (item) {
                                var personSurvey = '<div class="card-body employeeSurvey">' +
                                    '<div class="form-group">\n' +
                                    '<div class="alert alert-danger markErrorDiv" style="display: none"><p class="markError"></p> </div>' +
                                    '<label class="font-weight-semibold" for="password">Ocijenite zaposlenog <b>' + item.username + '</b>:</label>' +
                                    '<div class="star-rating m-t-5" data-id="' + item.userId + '">' +
                                    '<input type="radio" id="star3-5-' + item.userId + '" name="rating-' + item.userId + '" value="5" /><label for="star3-5-' + item.userId + '" title="5 star"></label>' +
                                    '<input type="radio" id="star3-4-' + item.userId + '" name="rating-' + item.userId + '" value="4"/><label for="star3-4-' + item.userId + '" title="4 star"></label>' +
                                    '<input type="radio" id="star3-3-' + item.userId + '" name="rating-' + item.userId + '" value="3"/><label for="star3-3-' + item.userId + '" title="3 star"></label>' +
                                    '<input type="radio" id="star3-2-' + item.userId + '" name="rating-' + item.userId + '" value="2"/><label for="star3-2-' + item.userId + '" title="2 star"></label>' +
                                    '<input type="radio" id="star3-1-' + item.userId + '" name="rating-' + item.userId + '" value="1"/><label for="star3-1-' + item.userId + '" title="1 star"></label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="form-group rating-comment" style="display: none;">' + // Hidden by default
                                    '<label class="font-weight-semibold" for="password">Obrazložite odgovor:</label>' +
                                    '<input type="text" class="form-control" id="comment-' + item.userId + '" placeholder="Obrazložite odgovor">' +
                                    '</div>' +
                                    '</div>';
                                $('#surveyData').append(personSurvey);
                            });
                        } else if (data.type == 2) {
                            var vehicleSurvey = '<div class="form-group"><div class="alert alert-danger markErrorDiv" style="display: none"><p class="markError"></p> </div>' +
                                '<label class="font-weight-semibold">Ocijenite vozilo ' + data.surveyData.brand + ' ' + data.surveyData.model + ' ' + data.surveyData.registrationNumber + ':</label>' +
                                '<div class="star-rating m-t-5">' +
                                '<input type="radio" id="star3-5" name="vehicleRate" value="5" /><label for="star3-5" title="5 star"></label>' +
                                '<input type="radio" id="star3-4" name="vehicleRate" value="4" /><label for="star3-4" title="4 star"></label>' +
                                '<input type="radio" id="star3-3" name="vehicleRate" value="3" /><label for="star3-3" title="3 star"></label>' +
                                '<input type="radio" id="star3-2" name="vehicleRate" value="2" /><label for="star3-2" title="2 star"></label>' +
                                '<input type="radio" id="star3-1" name="vehicleRate" value="1" /><label for="star3-1" title="1 star"></label>' +
                                '</div>' +
                                '</div>' +
                                '<div class="form-group comment-input" style="display: none;">' +
                                '<label class="font-weight-semibold">Obrazložite odgovor:</label>' +
                                '<input type="text" class="form-control" id="vehicleComment" placeholder="Obrazložite odgovor">' +
                                '</div>';


                            $('#surveyData').append(vehicleSurvey);
                            $('#surveyData').append('<input  hidden="" value="' + data.surveyData.vehicleId + '" id="vehicleId">');
                        }
                        $('#surveyData').append('<input  hidden="" value="' + data.type + '" id="surveyType">');
                        $('#surveyData').append(' <div class="form-group">' +
                            '<div class="d-flex align-items-center justify-content-between">' +
                            '<button class="btn btn-primary" id="saveSurveyResults">Potvrdite</button> </div> </div>');
                // }


                }
            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#surveyError').html(createWarningMessage(error));
            $(".backHome").show();
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
        var isValid = 0;
        $('.employeeSurvey').each(function() {
            var $surveySection = $(this);
            var personId = $surveySection.find('.star-rating').data('id');
            var mark = $surveySection.find('input[name="rating-' + personId + '"]:checked').val();
            var comment = $surveySection.find('#comment-' + personId).val();
            if (!mark) {
                isValid++;
                $surveySection.find('.markError').text('Morate dati ocjenu.');
                $surveySection.find('.markErrorDiv').show();
            } else {
                $surveySection.find('.markErrorDiv').hide();
                $surveySection.find('.markError').text('');
                if (mark <= 4 && comment.trim() === '') {
                    isValid++;
                    $surveySection.find('.markError').text('Morate obrazložiti ocjenu.');
                    $surveySection.find('.markErrorDiv').show();
                }
            }
            var personSurveyData = {
                "targetId": parseInt(personId),
                "mark": parseInt(mark),
                "comment": comment
            };
            surveyData.push(personSurveyData);
        });

        if (isValid > 0) {
            $btn.removeClass('is-loading').prop('disabled', false);
            $btn.find('.anticon-loading').remove();
            return;
        }
        var data = JSON.stringify({
            "surveyData": surveyData
        });
    }else if(type==2){
        var targetId = $('#vehicleId').val();
        var mark = $('input[name="vehicleRate"]:checked').val();
        var comment = $('#vehicleComment').val();

        var isValid = 0;
        if (!mark) {
            isValid++;
            $('.markError').text('Morate dati ocjenu.');
            $('.markErrorDiv').show();
        } else {
            $('.markErrorDiv').hide();
            $('.markError').text('');
            if (mark <= 4 && comment.trim() === '') {
                isValid++;
                $('.markError').text('Morate obrazložiti ocjenu.');
                $('.markErrorDiv').show();
            }
        }
        if (isValid > 0) {
            $btn.removeClass('is-loading').prop('disabled', false);
            $btn.find('.anticon-loading').remove();
            return;
        }

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
                $(".backHome").show();


            }
        },  error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#surveyError').html(createErrorMessage(error));
            $(".backHome").show();
        },
        complete:function (){
            $btn.removeClass('is-loading').prop('disabled', false);
            $btn.find('.anticon-loading').remove();
        }
    });



});
$('#surveyData').on('click', '.star-rating input[type="radio"]', function() {
    var rating = $(this).val();
    var commentDiv = $(this).closest('.employeeSurvey').find('.rating-comment');
    if (rating <= 4) {
        commentDiv.show();
    } else {
        commentDiv.hide();
    }
});

// Trigger the show/hide behavior on vehicle rating click
$('#surveyData').on('click', '.star-rating input[type="radio"]', function() {
    var rating = $(this).val();
    var commentInput = $(this).closest('.form-group').next('.comment-input')


    if (rating <= 4) {
        commentInput.show();
    } else {
        commentInput.hide();
    }
});
