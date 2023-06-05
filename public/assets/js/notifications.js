var page = 1;
var perPage = 10;
var loaderElement = $('<div class="loader" style="display: flex; justify-content: center; align-items: center;">' +
    '<div class="centered-loader" role="status"><span class="sr-only">Učitavanje...</span></div>' +
    '</div>');


$(document).ready(function() {
    getAllNotification(page);
});

$('#notification-dropdown').on('click', '.load-more', function(e) {
    e.stopPropagation();
    $(this).remove();
    page++;
    getAllNotification(page);
});

function getAllNotification(page) {
    var data = {
        getAllNotifications: 1,
        page: page
    };

    $('#notification-dropdown').append(loaderElement);
    $.ajax({
        url: '/../../functions/notifications.php',
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function(response) {
            loaderElement.remove();

            var data = response.data.data;
            var unSeen = 0;
            $.each(data, function(index, row) {
                var seenClass = '';
                if (row.seen !== true) {
                    seenClass = 'newNotification';
                    unSeen++;
                }
                var notificationHTML =
                    `<a href="javascript:void(0)" data-link="` + row.link + `"  data-id="` + row.id + `" data-seen="` + row.seen + `"   class=" dropdown-item d-flex align-items-center p-15 border-bottom openNotification ` + seenClass + `">
                       <div class="avatar avatar-blue  avatar-icon mr-3">
                        <i class="anticon anticon-car"></i>
                       
                    </div>
                    <div class="flex-grow-1 text-truncate">
                          <div class="text-dark" style="word-wrap: break-word;">` + row.notification_text + `</div>
                     </div>
                    </a>`;
                $('#notification-dropdown').append(notificationHTML);
            });

            var lastPage = response.data.meta.lastPage;
            var totalItems = response.data.meta.totalItems;
            if (page < lastPage && totalItems > page * perPage) {
                var moreButton = '<button class="btn btn-primary btn-tone m-r-5 w-100 load-more pt-3 pb-3">Prikaži više</button>';
                $('#notification-dropdown').append(moreButton);
            }else  {var noNotificationsMessage = '<div style="display: flex; justify-content: center; align-items: center; ">' +
                '<div style="text-align: center;">Nema više notifikacija</div>' +
                '</div>';

                $('#notification-dropdown').append(noNotificationsMessage);
            }
            if (unSeen > 0) {
                $('.notificationIndicator').show();
            }
        },
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alert').append(createWarningMessage(error));
        }
    });
}


$(document).on('click', '.openNotification', function() {

    var link = $(this).data('link');
    var id = $(this).data('id');
    var data = {
        markAsRead: 1,
        id:id
    };
    $.ajax({
        url: '/../../functions/notifications.php',
        type:'POST',
        data:data,
        dataType: 'json',
        success: function(response) {
            if (response.status==200){
                window.location.href=link;
            }else{
                alert('Došlo je do greške')
            }

        }  ,
        error: function(jqXHR) {
            var error = generateAjaxError(jqXHR);
            $('#alert').append(createWarningMessage(error));
        }
    });
});

$(document).one('click', '#showNotifications', function() {
    $('.notificationIndicator').hide()
    var ids = [];
    $("#notification-dropdown a[data-seen='false']").each(function(){
        ids.push($(this).data("id"));
    });

    if (ids.length > 0) {
        var data = {
            markAsSeen: 1,
            notificationsIds: ids
        };
        $.ajax({
            url: '/../../functions/notifications.php',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (response) {
                if (response.status = 200) {
                    ids.forEach(function (id) {
                        $("#notification-dropdown a[data-id='" + id + "']").removeClass("newNotification");
                    });
                }

            },
            error: function (jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#alert').append(createWarningMessage(error));
            }
        });
    }
});



    Pusher.logToConsole = true;

    const pusher = new Pusher('1ec54917425c7550b851', {
    userAuthentication: {
    endpoint: "/pusher/user-auth",
    transport: "ajax",
    params: {},
    headers: {
    'Authorization': 'Bearer ' + 'stefan123454378324234'
},
    paramsProvider: null,
    headersProvider: null,
    customHandler: null
},
    cluster: 'eu'
});

    pusher.signin();

    var channel = pusher.subscribe('360monte-app');
    channel.bind('360monte-event', function(data) {
        var loggedId = $('#loggedUserId').val();
        if (loggedId == data.userId) {
            var notificationHTML =
                `<a href="javascript:void(0)" data-link="` + data.link + `"  data-id="` + data.notificationId + `" data-seen="` + data.isSeen + `"   class=" dropdown-item d-flex align-items-center p-15 border-bottom openNotification newNotification">
            <div class="avatar avatar-blue avatar-icon mr-3">
                <i class="anticon anticon-car"></i>
            </div>
            <div class="flex-grow-1 text-truncate">
                  <div class="text-dark" style="word-wrap: break-word;">` + data.message + `</div>
             </div>
            </a>`;

            $('#notification-dropdown').prepend(notificationHTML);

            var toastHTML =
                `<a href="javascript:void(0)" data-link="` + data.link + `"  data-id="` + data.notificationId + `" data-seen="` + data.isSeen + `"   class="openNotification">
                 
          <div class="toast fade hide" data-delay="10000000"> 
            <div class="toast-header">
              <i class="anticon anticon-info-circle text-primary m-r-5"></i>
              <strong class="mr-auto">` + (data.title ? data.title : '') + `</strong>
              <button type="button" class="ml-2 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="toast-body">
              ` + data.message + `
            </div>
          </div>
        </a>`

            $('#notification-toast').append(toastHTML)
            $('#notification-toast .toast').toast('show');
            setTimeout(function () {
                $('#notification-toast .toast:first-child').remove();
            }, 10000000);
            $('.notificationIndicator').show()
        }
});

