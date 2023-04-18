function createWarningMessage(message) {
    return '<div class="alert alert-warning">' +
        '<div class="d-flex align-items-center justify-content-start">' +
        '<span class="alert-icon">' +
        '<i class="anticon anticon-exclamation-o"></i>' +
        '</span>' +
        '<span>' + message + '</span>' +
        '</div>' +
        '</div>';
}

function createSuccessMessage(message) {
    return '<div class="alert alert-success">' +
        '<div class="d-flex align-items-center justify-content-start">' +
        '<span class="alert-icon">' +
        '<i class="anticon anticon-exclamation-o"></i>' +
        '</span>' +
        '<span>' + message + '</span>' +
        '</div>' +
        '</div>';
}

function createErrorMessage(message) {
    return '<div class="alert alert-danger">' +
        '<div class="d-flex align-items-center justify-content-start">' +
        '<span class="alert-icon">' +
        '<i class="anticon anticon-exclamation-o"></i>' +
        '</span>' +
        '<span>' + message + '</span>' +
        '</div>' +
        '</div>';
}