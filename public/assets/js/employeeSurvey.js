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
                        $('.surveyData').empty();

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
                        }else if (data.type==3){
                            $.ajax({
                                url: '/../../functions/worksHistory.php',
                                type:'GET',
                                data:{getActiveWorkData:1,id:data.surveyData.vehicleId},
                                dataType: 'json',
                                success: function(response) {
                                    if (response.error) {
                                        $('#activeWorkMessage').append(createWarningMessage(response.error));
                                    } else {
                                        $('#breakdownSurveyInfo tbody').empty();
                                        var data = response.data.data;
                                        if (data.length>0){
                                            $.each(data, function(index, row) {
                                                var workHistoryRow = '<tr>' +
                                                    '<td>' + row.breakDownCategory.name + '</td>' +
                                                    '<td>' + row.breakDownSubcategory.name + '</td>'+
                                                    '<td class="tdMax">' + row.description + '</td>' +
                                                     '</tr>';

                                                $('#breakdownSurveyInfo tbody').append(workHistoryRow );
                                            });

                                        }else{
                                            $('#breakdownSurveyInfo tbody').empty();
                                            $('#breakdownSurveyInfo thead').remove();
                                            $('#breakdownSurveyInfo').html(createWarningMessage('Ne postoje aktivni kvarovi za vozilo'));
                                        }


                                    }
                                }  ,
                                error: function(jqXHR) {
                                    var error = generateAjaxError(jqXHR);
                                    $('#alert').append(createWarningMessage(error));
                                }
                            });


                            var vehicleSurvey = '<div class="form-group m-t-30"><div class="alert alert-danger markErrorDiv" style="display: none"><p class="markError"></p> </div>' +
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

                            $('#breakdownSurveyData').append(vehicleSurvey);
                            $('#breakdownSurveyData').append('<input  hidden="" value="' + data.surveyData.vehicleId + '" id="vehicleId">');
                        }else if (data.type == 4) {
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

                                    // Dodaj checkbox ispod zvezdica
                                    '<div class="form-group m-t-10">' +
                                    '<input type="checkbox" id="no-collab-' + item.userId + '" class="no-collab" data-id="' + item.userId + '"/>' +
                                    '<label for="no-collab-' + item.userId + '" class="ml-2">Nismo sarađivali</label>' +
                                    '</div>' +

                                    '<div class="form-group rating-comment" style="display: none;">' + // Hidden by default
                                    '<label class="font-weight-semibold" for="password">Obrazložite odgovor:</label>' +
                                    '<input type="text" class="form-control" id="comment-' + item.userId + '" placeholder="Obrazložite odgovor">' +
                                    '</div>' +
                                    '</div>';

                                $('#surveyData').append(personSurvey);
                            });
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
            Swal.fire("Morate dati sve ocjene!",'','warning')
            $btn.removeClass('is-loading').prop('disabled', false);
            $btn.find('.anticon-loading').remove();
            return;
        }
        var data = JSON.stringify({
            "surveyData": surveyData
        });
    }else if(type==2 || type==3){
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
            Swal.fire("Morate dati sve ocjene!",'','warning')
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
    }else  if (type == 4) {
        var surveyData = [];
        var isValid = 0;

        $('.employeeSurvey').each(function() {
            var $surveySection = $(this);
            var personId = $surveySection.find('.star-rating').data('id');
            var noCollabChecked = $surveySection.find('.no-collab[data-id="' + personId + '"]').is(':checked');

            if (noCollabChecked) {
                surveyData.push({
                    "targetId": parseInt(personId),
                    "mark": 0,
                    "comment": ""
                });
                return;
            }

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

            if (mark) {
                surveyData.push({
                    "targetId": parseInt(personId),
                    "mark": parseInt(mark),
                    "comment": comment
                });
            }
        });

        if (isValid > 0) {
            Swal.fire("Morate dati sve ocjene!",'','warning')
            $btn.removeClass('is-loading').prop('disabled', false);
            $btn.find('.anticon-loading').remove();
            return;
        }

        var data = JSON.stringify({
            "surveyData": surveyData
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
                $('#surveyError').html(createSuccessMessage('Uspješno ste glasali'));
                $('#surveyData').empty();
                $('.surveyData').empty();
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
    var surveySection = $(this).closest('.employeeSurvey');
    var commentDiv = surveySection.find('.rating-comment');
    var markErrorDiv = surveySection.find('.markErrorDiv');

    if (rating <= 4) {
        commentDiv.show();
    } else {
        commentDiv.hide();
    }

    markErrorDiv.hide();
});


$('#surveyData, #breakdownSurveyData').on('click', '.star-rating input[type="radio"]', function() {
    var rating = $(this).val();
    var commentInput = $(this).closest('.form-group').next('.comment-input')


    if (rating <= 4) {
        commentInput.show();
    } else {
        commentInput.hide();
    }
});

$(document).on('change', '.no-collab', function() {
    var userId = $(this).data('id');
    var starRatingDiv = $('.star-rating[data-id="' + userId + '"]');
    var starRatingInputs = $('input[name="rating-' + userId + '"]');
    var commentInput = starRatingDiv.closest('.employeeSurvey').find('.rating-comment');
    var markErrorDiv = starRatingDiv.closest('.employeeSurvey').find('.markErrorDiv');

    if ($(this).is(':checked')) {
        starRatingDiv.hide();
        starRatingInputs.prop('checked', false).prop('disabled', true);
        commentInput.hide().find('input').val('');
        markErrorDiv.hide();
    } else {
        starRatingDiv.show();
        starRatingInputs.prop('disabled', false);
        commentInput.hide();
    }
});

