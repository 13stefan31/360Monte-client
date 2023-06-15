$(document).ready(function() {
    getStuffAllocation('employeeSelectReport')
    getToursSelect('toursSelectReport')
    $(document).ajaxStop(function() {
        $('#loader-overlay').hide();
    });
});

$(document).on('click', '#generateReport', function(e) {
    e.preventDefault();
    $('#reportMessage').empty();
    var errorInputs = [];
    var errorMessage= "Morate odabrati";
    var employee = $('#employeeSelectReport').val();

    var tour = $('#toursSelectReport').val();
    if (tour==''){
        errorInputs.push('turu');
    }
    if (employee==''){
        errorInputs.push('zaposlenog');
    }
    const dateFrom = $('#dateFromReport').val();
    if (dateFrom) {
        date_from = new Date(dateFrom);
        const yyyy = date_from.getFullYear();
        let mm = date_from.getMonth() + 1;
        let dd = date_from.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        date_from = dd + '.' + mm + '.' + yyyy;
    }else{
        date_from =null;
    }

    const dateTo = $('#dateToReport').val();
    if (dateTo) {
        date_to = new Date(dateTo);
        const yyyy = date_to.getFullYear();
        let mm = date_to.getMonth() + 1;
        let dd = date_to.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        date_to = dd + '.' + mm + '.' + yyyy;
    }else {
        date_to=null;
    }
    if (errorInputs.length > 0) {
        var errorMessage = 'Morate odabrati ' + errorInputs.join(', ');
        Swal.fire(errorMessage,'','warning')
    } else {

        $.ajax({
            url: '/../../functions/report.php',
            type:'post',
            data:{
                userId: employee,
                tourId: tour,
                fromDate: date_from,
                toDate: date_to,
                generateReport:1
            },
            dataType: 'json',
            success: function(response) {
                if (response.status==200){
                    var data = response.data.data;
                    $('#reportMessage').append(createSuccessMessage('Izvještaj vam je uspješno poslat na email adresu!'));
                }else{
                    $('#reportMessage').append(createWarningMessage('Za kombinaciju unešenih parametara ne postoje podaci'));
                }
            }  ,
            error: function(jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#reportMessage').append(createWarningMessage(error));
            }
        });
    }

});

