$(document).ready(function() {
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    var allocationId = id.match(/\d+/)[0];
    $('#allocationId').val(allocationId)
    // $('#alertGetAllocation').html('<div class="spinner-border mb-2" role="status"><span class="sr-only">Loading...</span></div>');
    $.ajax({
        url: '/../../functions/allocation.php',
        type:'GET',
        data:{getSingleAllocation:1,allocationId:allocationId},
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                $('#alertGetAllocation').html(handleErrors(response.error));
                $('.allocationDivCard').hide()
            } else {
                var data = response.data.data;
                if (data.status==1){
                    var status ='<span class="badge badge-pill badge-cyan  font-size-15">Kompletirano</span>';
                }else  if (data.status==0){
                    var status ='<span class="badge badge-pill badge-red font-size-15">Na čekanju</span>';
                }
                $('.allocationStatus').html(status);
                $('.allocationDate').html(data.allocationDate);
                $('.allocationTour').html(data.tour.name);
                $('.allocationVehicle').html(data.vehicle.brand + ' ' + data.vehicle.model  );
                $('.allocationVehicleRegNo').html(data.vehicle.registrationNumber  );
                $('.allocationVehicleSeatsNo').html(data.vehicle.numberOfSeats  );
                $('.allocationNote').html(data.note  );
                $('#noteChange').html(data.note  );

                var date = data.allocationDate;
                var dateComponents = date.split('.');
                var year = dateComponents[2];
                var month = dateComponents[1];
                var day = dateComponents[0];

                var formattedDate = year + '-' + month + '-' + day;
                $('#dateChange').val(formattedDate);

                getVehiclesSelect('vehicleChange',data.vehicle.id);
                getToursSelect('tourChange',data.tour.id);

            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alertGetAllocation').html(createWarningMessage(error));
        },
        complete:function (){
            $('#loader-overlay').hide();
        }
    });

    $.ajax({
        url: '/../../functions/allocation.php',
        type:'GET',
        data:{getAllAllocationStuff:1,allocationId:allocationId},
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                $('#allocationAlert').html(handleErrors(data.error));
            } else {
                response.data.data.forEach(function(item) {
                    var adminButton='';
                    var confirmAllocation='';

                    var allocationEditRoles = $("#allocationEditRoles").val();
                    var allocationUpdateRoles = $("#allocationUpdateRoles").val();
                    var authRole = $("#authRole").val();
                    var loggedUser = $("#loggedUser").val();

                    const authUserEmail = document.getElementById("authUserEmail").value;
                    const overrideEmails = JSON.parse(document.getElementById("overrideEmails").value);


                    // if ((item.statusId == 0 && (allocationEditRoles.indexOf(authRole) !== -1 || overrideEmails.includes(authUserEmail)))) {

                        if (item.statusId == 0 && allocationEditRoles.indexOf(authRole) !== -1){
                        adminButton = '<button type="button" class="btn btn-primary m-r-5 stuff-edit" data-allocationid="'+item.allocation.id+'" data-stuffid="'+item.id+'" data-allocationstuffid="'+item.employee.id+'" data-allocationstuffposition="'+item.allocationPosition+'" data-toggle="modal" id="editEmpAllocationButton" data-target="#allocation-edit-person-modal">' +
                            ' <i class="anticon anticon-edit"></i> </button>' +
                            '<button class="btn btn-danger m-r-5 stuff-delete"  data-allocationid="' + item.allocation.id + '" data-allocationstuffid="' + item.id + '"data-allocationstuffname="' + item.employee.name + '"><i class="anticon anticon-delete"></i></button>';

                    }
                    if ((item.statusId == 1 && (allocationUpdateRoles.indexOf(authRole) !== -1 || overrideEmails.includes(authUserEmail)))) {

                        // if (item.statusId == 1 && allocationUpdateRoles.indexOf(authRole) !== -1){
                        adminButton = '<button type="button" class="btn btn-primary m-r-5 stuff-edit" data-allocationid="'+item.allocation.id+'" data-stuffid="'+item.id+'" data-allocationstuffid="'+item.employee.id+'" data-allocationstuffposition="'+item.allocationPosition+'" data-toggle="modal" id="editEmpAllocationButton" data-target="#allocation-edit-person-modal">' +
                            ' <i class="anticon anticon-edit"></i> </button>' +
                            '<button class="btn btn-danger m-r-5 stuff-delete"  data-allocationid="' + item.allocation.id + '" data-allocationstuffid="' + item.id + '"data-allocationstuffname="' + item.employee.name + '"><i class="anticon anticon-delete"></i></button>';

                    }

                    if (item.statusId == 0 && loggedUser == item.employee.id) {
                        confirmAllocation = '&nbsp;<button class="btn btn-icon btn-success btn-rounded  update-status" data-allocationstuffstatus="' + item.statusId + '" data-allocationstuffid="' + item.id + '" data-allocationid="' + item.allocation.id + '"   > <i class="anticon anticon-check"></i></button>';
                    }
                    var newRow = '<tr id="'+item.id+'"><td class="stuffPosition">' + item.allocationPositionName + '</td><td class="stuffName">' + item.employee.name + '</td>' +
                        '<td class="stuffStatus">' + item.status + confirmAllocation + '</td><td>'+ adminButton + '</td></tr>';
                    $('#allocation-stuff-tabele tbody').append(newRow);

                });
            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#allocationAlert').html(createWarningMessage(error));
        }
    });

    $('#editAllocationData').click(function(e) {
        e.preventDefault();
        // var validated = validateUpdateUser();
        // var validated = true;
        // if (validated) {
            var $btn = $(this);
            $btn.addClass('is-loading').prop('disabled', true);
            $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');

            const date = new Date($('#dateChange').val());
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1;
            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const formattedToday = dd + '.' + mm + '.' + yyyy;
            $.ajax({
                url: '/../../functions/allocation.php',
                type: 'put',
                data: JSON.stringify({
                    'updateAllocationData': 1,
                    'data': {
                        'allocationId': allocationId,
                        'allocationDate': formattedToday,
                        'vehicleId': $('#vehicleChange').val(),
                        'note': $('#noteChange').val(),
                        'tourId': $('#tourChange').val()
                    }

                }),
                success: function (response) {
                    var dataParse = JSON.parse(response);
                    if (dataParse.error) {
                        $('#allocationDataChangeError').html(handleErrors(dataParse.error));
                    } else {
                        var data = dataParse.data.data;
                        $('#allocationAlert').html(createSuccessMessage('Uspješno ste izmijenili podatke o alokaciji'));
                        $('.allocationDate').html(data.allocationDate);
                        $('.allocationTour').html(data.tour.name);
                        $('.allocationVehicle').html(data.vehicle.brand + ' ' + data.vehicle.model);
                        $('.allocationVehicleRegNo').html(data.vehicle.registrationNumber);
                        $('.allocationVehicleSeatsNo').html(data.vehicle.numberOfSeats);
                        $('.allocationNote').html(data.note  );

                        $('#vehicle-date-change-modal').modal('hide');
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

    $('#addEmpAllocationButton').click(function(e) {
        e.preventDefault();
        $('#allocationPersonAddError').html("");
        var allocationDate = $(".allocationDate").text().trim();
        getStuffPositionAllocation('empPositionAddAllocation');
        getAvailableStuffAllocation('empAddAllocation',null,allocationDate);
    });

    $('#addEmpAllocation').click(function(e) {
        e.preventDefault();
       var allocationId= $('#allocationId').val();
       var allocationDate = $(".allocationDate").text().trim();
        // var validated = validateNewStaff();
        // var validated = true;
        // if (validated){
            var $btn = $(this);
            $btn.addClass('is-loading').prop('disabled', true);
            $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
            $.ajax({
                url: '/../../functions/allocation.php',
                type:'post',
                data:   {
                    'addAllocationStuff': 1,
                    'data':{
                        'allocationId': allocationId,
                        'allocationDate': allocationDate,
                        'employeeId': $('#empAddAllocation').val(),
                        'allocationStuffPositionId': $('#empPositionAddAllocation').val(),
                    }
                },
                success: function(response) {
                    var dataParse = JSON.parse(response);
                    if (dataParse.error) {
                        $('#allocationPersonAddError').html(handleErrors(dataParse.error));
                    } else {
                        $('#allocationAlert').html(createSuccessMessage('Uspješno ste dodali novog zaposlenog na alokaciji'));
                        var data = dataParse.data.data;
                        // if (data.statusId == 0) {
                        //     // var actionHtml = '<button class="btn btn-icon btn-primary btn-rounded btn-tone update-status" data-allocationstuffstatus="' + item.statusId + '" data-allocationstuffid="' + item.id + '" data-allocationid="' + item.allocation.id + '" data-toggle="modal" id="updatePersonAllocationStatusButton" data-target="#allocation-status-update-person-modal"> <i class="anticon anticon-check"></i></button>';
                        //     var actionHtml = '&nbsp;<button class="btn btn-icon btn-success btn-rounded  update-status" data-allocationstuffstatus="' + data.statusId + '" data-allocationstuffid="' + data.id + '" data-allocationid="' + data.allocation.id + '"   > <i class="anticon anticon-check"></i></button>';
                        // }else{
                        //     var actionHtml='';
                        // }

                        var newRow = '<tr id="'+data.id+'"><td class="stuffPosition">' + data.allocationPositionName + '</td><td class="stuffName">' + data.employee.name + '</td>' +
                        '<td>' + data.status+ '</td><td>' +
                        // '<td>' + data.status+ actionHtml+ '</td><td>' +
                            ' <button type="button" class="btn btn-primary m-r-5 stuff-edit"  data-allocationid = "'+data.allocation.id+'" data-stuffid="'+data.id+'" data-allocationstuffid="'+data.employee.id+'" data-allocationstuffposition="'+data.allocationPosition+'" data-toggle="modal" id="editEmpAllocationButton" data-target="#allocation-edit-person-modal">\n' +
                            ' <i class="anticon anticon-edit"></i>' +
                            '</button> ' +
                            '<button class="btn btn-danger m-r-5 stuff-delete"  data-allocationid="'+data.allocation.id+'" data-allocationstuffid="'+data.id+'" data-allocationstuffname="'+data.employee.name+'"><i class="anticon anticon-delete"></i></button></td></tr>';
                        $('#allocation-stuff-tabele tbody').append(newRow);
                        $('#allocation-add-person-modal').modal('hide');

                    }
                },  error: function(jqXHR) {
                    var error = generateAjaxError(jqXHR);
                    $('#allocationPersonAddError').html(createErrorMessage(error));
                },
                complete:function (){
                    $btn.removeClass('is-loading').prop('disabled', false);
                    $btn.find('.anticon-loading').remove();
                }
            });

        // }
    });

    // $('#updatePersonStatusAllocation').click(function(e) {
    //     e.preventDefault();
    //     var validated = validateStatusChange();
    //     // var validated = true;
    //     if (validated){
    //         var $btn = $(this);
    //         $btn.addClass('is-loading').prop('disabled', true);
    //         $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
    //         $.ajax({
    //             url: '/../../functions/allocation.php',
    //             type:'put',
    //             data:  JSON.stringify({
    //                 'updateAllocationStuffStatus': 1,
    //                 'data':{
    //                     'allocationId': $('#allocationId').val(),
    //                     'allocationStuffId': $('#allocationStuffId').val(),
    //                     'statusId': $('#empStatusAllocation').val()
    //                 }
    //
    //             }),
    //             success: function(response) {
    //                 var dataParse = JSON.parse(response);
    //                 // console.log(response)
    //                 if (dataParse.error) {
    //                     $('#updatePersonAllocationStatusError').html(handleErrors(dataParse.error));
    //                 } else {
    //                     var data = dataParse.data.data;
    //                     $('#allocationAlert').html(createSuccessMessage('Uspješno ste izmijenili status'));
    //                     $('#'+data.id).find('.stuffStatus').html(data.status + '' +
    //                         '<button class="btn btn-icon btn-primary btn-rounded btn-tone update-status" data-allocationstuffstatus="'+data.statusId+'" data-allocationstuffid="'+data.id+'" data-allocationid="'+data.allocation.id+'" data-toggle="modal" id="updatePersonAllocationStatusButton" data-target="#allocation-status-update-person-modal">' +
    //                         '<i class="anticon anticon-edit"></i>' +
    //                         '</button>');
    //                     if (data.allocation.status==1){
    //                         var status ='<span class="badge badge-pill badge-cyan font-size-15">Confirmed</span>';
    //                     }else  if (data.allocation.status==0){
    //                         var status ='<span class="badge badge-pill badge-red font-size-15">Pending</span>';
    //                     }
    //                     $('.allocationStatus').html(status);
    //
    //                     $('#allocation-status-update-person-modal').modal('hide');
    //                     $('#allocationStuffId').val('')
    //                     $('#allocationId').val('')
    //                     $('#empStatusAllocation').val('')
    //
    //                 }
    //             },  error: function(jqXHR) {
    //                 var error = generateAjaxError(jqXHR);
    //                 $('#updatePersonAllocationStatusError').html(createErrorMessage(error));
    //             },
    //         complete:function (){
    //             $btn.removeClass('is-loading').prop('disabled', false);
    //             $btn.find('.anticon-loading').remove();
    //         }
    //         });
    //
    //     }
    // });

    $('#updateEmpAllocation').click(function(e) {
        e.preventDefault();
        // var validated = validateNewStaff();
       // var validated = true;
       //  if (validated){
            var $btn = $(this);
            $btn.addClass('is-loading').prop('disabled', true);
            $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');

            $.ajax({
                url: '/../../functions/allocation.php',
                type:'put',
                data:  JSON.stringify({
                    'updateEmpAllocation': 1,
                    'data':{
                        'allocationStuffId': $('#stuffId').val(),
                        'allocationId': $('#allocationId').val(),
                        'employeeId': $('#empEditAllocation').val(),
                        'allocationStuffPositionId': $('#empPositionEditAllocation').val(),
                        // 'statusId': $('#empStatusAllocation').val()
                        'statusId': 0
                    }

                }),
                success: function(response) {
                    var dataParse = JSON.parse(response);
                    if (dataParse.error) {
                        $('#allocationPersonEditError').html(handleErrors(dataParse.error));
                    } else {
                        var data = dataParse.data.data;
                        $('#allocationAlert').html(createSuccessMessage('Uspješno ste izmijenili zaposlenog'));

                        $("#allocation-stuff-tabele").find("#"+data.id).remove();
                      /*  if (data.statusId == 0) {
                            var actionHtml = '&nbsp;<button class="btn btn-icon btn-success btn-rounded  update-status" data-allocationstuffstatus="' + data.statusId + '" data-allocationstuffid="' + data.id + '" data-allocationid="' + data.allocation.id + '"   > <i class="anticon anticon-check"></i></button>';
                        }else{
                            var actionHtml='';
                        }*/

                        var newRow = '<tr id="'+data.id+'"><td>' + data.allocationPositionName + '</td><td>' + data.employee.name + '</td><td>' + data.status+' ' +
                            // actionHtml+
                            '</td><td>' +
                            ' <button type="button" class="btn btn-primary m-r-5" data-toggle="modal" id="editEmpAllocationButton" data-target="#allocation-edit-person-modal">\n' +
                            ' <i class="anticon anticon-edit"></i>' +
                            '</button> ' +
                            '<button class="btn btn-danger m-r-5 stuff-delete"  data-allocationid="'+data.allocation.id+'" data-allocationstuffid="'+data.id+'" data-allocationstuffname="'+data.employee.name+'"><i class="anticon anticon-delete"></i></button></td></tr>';
                        $('#allocation-stuff-tabele tbody').append(newRow);

                        $('#allocation-edit-person-modal').modal('hide');

                    }
                },  error: function(jqXHR) {
                    var error = generateAjaxError(jqXHR);
                    $('#updatePersonAllocationStatusError').html(createErrorMessage(error));
                },
            complete:function (){
                $btn.removeClass('is-loading').prop('disabled', false);
                $btn.find('.anticon-loading').remove();
            }
            });

        // }
    });
});

// $(document).on('click', '.update-status', function() {
//     var allocationStuffId = $(this).data('allocationstuffid');
//     var allocationStatus = $(this).data('allocationstuffstatus');
//     var allocationId = $(this).data('allocationid');
//     $('#allocationStuffId').val(allocationStuffId)
//     $('#allocationId').val(allocationId)
//     $('#empStatusAllocation').val(allocationStatus)
// });
$(document).on('click', '.update-status', function(e) {
    e.preventDefault();
    var allocationStuffId = $(this).data('allocationstuffid');
    var allocationId = $(this).data('allocationid');
    Swal.fire({
        title: 'Da li ste sigurni da želite da prihvatite alokaciju?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Prihvati',
        denyButtonText: `Zatvori`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/../../functions/allocation.php',
                type:'put',
                data:  JSON.stringify({
                    'updateAllocationStuffStatus': 1,
                    'data':{
                        'allocationId': allocationId,
                        'allocationStuffId': allocationStuffId,
                        'statusId': 3
                    }

                }),
                success: function(response) {
                    var dataParse = JSON.parse(response);
                    if (dataParse.error) {
                        alert(dataParse.error);
                        // $('#allocationDataChangeError').html(handleErrors(dataParse.error));
                    } else {
                        var data = dataParse.data.data;
                        Swal.fire('Alokacija prihvaćena!', '', 'success')
                        $('#allocationAlert').html(createSuccessMessage('Uspješno ste izmijenili status'));
                        if (data.statusId == 0) {
                            var actionHtml = '&nbsp;<button class="btn btn-icon btn-success btn-rounded  update-status" data-allocationstuffstatus="' + item.statusId + '" data-allocationstuffid="' + item.id + '" data-allocationid="' + item.allocation.id + '"   > <i class="anticon anticon-check"></i></button>';
                        }else{
                            var actionHtml='';
                        }
                        $('#'+data.id).find('.stuffStatus').html(data.status + actionHtml);
                        if (data.allocation.status==1){
                            var status ='<span class="badge badge-pill badge-cyan font-size-15">Prihvaćeno</span>';
                        }else  if (data.allocation.status==0){
                            var status ='<span class="badge badge-pill badge-red font-size-15">Na čekanju</span>';
                        }
                        $('.allocationStatus').html(status);

                        // $('#allocation-status-update-person-modal').modal('hide');
                        $('#allocationStuffId').val('')
                        $('#allocationId').val('')
                        $('#empStatusAllocation').val('')

                    }
                },  error: function(jqXHR) {
                    var error = generateAjaxError(jqXHR);
                    // alert(error);
                    Swal.fire(error, '', 'error')
                    // $('#allocationDataChangeError').html(createErrorMessage(error));
                }
            });


        } else if (result.isDenied) {   }
    })


        //  if (confirm('Da li ste sigurni da želite da potvrdite dodijeljenu alokaciju?')) {
        //     $.ajax({
        //         url: '/../../functions/allocation.php',
        //         type:'put',
        //         data:  JSON.stringify({
        //             'updateAllocationStuffStatus': 1,
        //             'data':{
        //                 'allocationId': allocationId,
        //                 'allocationStuffId': allocationStuffId,
        //                 'statusId': 3
        //             }
        //
        //         }),
        //         success: function(response) {
        //             var dataParse = JSON.parse(response);
        //             if (dataParse.error) {
        //                 alert(dataParse.error);
        //                 // $('#allocationDataChangeError').html(handleErrors(dataParse.error));
        //             } else {
        //                 var data = dataParse.data.data;
        //                 $('#allocationAlert').html(createSuccessMessage('Uspješno ste izmijenili status'));
        //                 if (data.statusId == 0) {
        //                     var actionHtml = '&nbsp;<button class="btn btn-icon btn-success btn-rounded  update-status" data-allocationstuffstatus="' + item.statusId + '" data-allocationstuffid="' + item.id + '" data-allocationid="' + item.allocation.id + '"   > <i class="anticon anticon-check"></i></button>';
        //                 }else{
        //                     var actionHtml='';
        //                 }
        //
        //
        //                 $('#'+data.id).find('.stuffStatus').html(data.status + actionHtml);
        //                 if (data.allocation.status==1){
        //                     var status ='<span class="badge badge-pill badge-cyan font-size-15">Confirmed</span>';
        //                 }else  if (data.allocation.status==0){
        //                     var status ='<span class="badge badge-pill badge-red font-size-15">Pending</span>';
        //                 }
        //                 $('.allocationStatus').html(status);
        //
        //                 // $('#allocation-status-update-person-modal').modal('hide');
        //                 $('#allocationStuffId').val('')
        //                 $('#allocationId').val('')
        //                 $('#empStatusAllocation').val('')
        //
        //             }
        //         },  error: function(jqXHR) {
        //             var error = generateAjaxError(jqXHR);
        //             alert(error);
        //             // $('#allocationDataChangeError').html(createErrorMessage(error));
        //         }
        //     });
        //
        // }
});

$(document).on('click', '.stuff-delete', function() {
    var allocationStuffId = $(this).data('allocationstuffid');
    var allocationStuffName = $(this).data('allocationstuffname');
    var allocationId = $(this).data('allocationid');
    Swal.fire({
        title: 'Da li ste sigutni da želite da uklonite ' + allocationStuffName + ' ?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Ukloni',
        denyButtonText: `Odustani`,
        customClass: {
            confirmButton: 'btn-delete',
            denyButton: 'btn-cancel'
        },
        buttonsStyling: false
    }).then((result) => {
        if (result.isConfirmed) {

            var $btn = $(this);
            $btn.addClass('is-loading').prop('disabled', true);
            $btn.prepend('<i class="anticon anticon-loading m-r-5"></i>');
            // var validated = validateUpdateUser();
            $.ajax({
                url: '/../../functions/allocation.php',
                type: 'delete',
                contentType: 'application/json',
                data: JSON.stringify({
                    deleteAllocation: 1
                    , allocationStuffId: allocationStuffId
                    , allocationId: allocationId
                }),
                success: function(response) {
                    var data = JSON.parse(response);
                    if (data.error){
                        // $('#allocationAlert').html(createWarningMessage(data.error));
                        Swal.fire( data.error,'','error');
                    }else{
                        $('#'+data.data.data.id).remove();
                        Swal.fire('Uspješno ste uklonili osobu '+data.data.data.employee.name,'','success');
                        // $('#allocationAlert').html(createSuccessMessage('Uspješno ste uklonili osobu '+data.data.data.employee.name));
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {

                    var error = generateAjaxError(jqXHR);
                    // $('#allocationAlert').html(createErrorMessage(error));
                    Swal.fire( error,'','error');
                },
                complete:function (){
                    $btn.removeClass('is-loading').prop('disabled', false);
                    $btn.find('.anticon-loading').remove();
                }
            });
        } else if (result.isDenied) {   }
    })
});
$(document).on('click', '.stuff-edit', function() {
    var stuffId = $(this).data('stuffid');
    var allocationId = $(this).data('allocationid');
    var allocationStuffId = $(this).data('allocationstuffid');
    var allocationstuffposition = $(this).data('allocationstuffposition');


    $('#stuffId').val(stuffId);
    $('#allocationId').val(allocationId);
    getStuffPositionAllocation('empPositionEditAllocation',allocationstuffposition);

    var allocationDate = $(".allocationDate").text().trim();
    getAvailableStuffAllocation('empEditAllocation',allocationStuffId,allocationDate);
});
function getStuffPositionAllocation(selectId, selectedValue = null){
    $.ajax({
        url: '/../../functions/allocation.php',
        type: 'GET',
        dataType: 'json',
        data:{'getAllStuffPositions':1},
        success: function(response) {
            var data = response.data.data;
            var select = $('#'+selectId);
            select.empty();
            select.append('<option value="">Odaberite poziciju</option>');
            $.each(data, function(key, value) {
                var selected = (value.id == selectedValue) ? 'selected' : '';
                select.append('<option value="' + value.id + '"' + selected + '>' + value.name +'</option>');
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });

}


// function validateStatusChange() {
//     const selectedValue = $('#empStatusAllocation').val();
//     const errorMessage = $('#empStatusAllocation').next('p');
//
//     if (selectedValue === '') {
//         errorMessage.text('Odaberite status'); // Display error message
//         return false;
//     }
//         errorMessage.text('');
//     return true;
// }

$('#changeAllocationDataButton').on('click', function() {
    $('#allocationDataChangeError').html('');

});