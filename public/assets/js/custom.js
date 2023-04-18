$(document).ready(function () {
    $("#showVehicleFilter").click(function () {
        $("#filterVehicles").toggle();
    });
    $("#showPersonsFilter").click(function () {
        $("#filterPersons").toggle();
    });
    $("#showAllocationsFilter").click(function () {
        $("#filterAllocations").toggle();
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // Remove success message
        $(".alert").remove();
    });
});