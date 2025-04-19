$(document).ready(function() {
      getTours('');
});
function getTours(filters){
    var data = {
        getAllTours: 1
    };
    $.ajax({
        url: '/../../functions/tours.php',
        type:'GET',
        data:data,
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                $('#alert').append(createWarningMessage(response.error));
            } else {
                $('#tours-table tbody').empty();
                var data = response.data.data;
                $.each(data, function(index, row) {
                    $('#tours-table tbody').prepend('<tr id="'+row.id+'"><td>' + row.id + '</td><td>' + row.name + '</td></tr>');
                });
                $('#tours-table').DataTable({
                    searching: false,
                    lengthChange: false
                });
            }
        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alert').append(createWarningMessage(error));
        },
        complete:function (){
            $('#loader-overlay').hide();
        }
    });
}

