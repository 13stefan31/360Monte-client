$(document).ready(function() {
        var data = {
            getAllNotifications: 1
        };
        $('#notification-dropdown').html('<p><div class="spinner-border" role="status"><span class="sr-only">Učitavanje...</span></div></p>');
        $.ajax({
            url: '/../../functions/notifications.php',
            type:'POST',
            data:data,
            dataType: 'json',
            success: function(response) {
                var data = response.data.data;
                $('#notification-dropdown').html('');
                var unSeen=0;
                $.each(data, function(index, row) {
                    var seenClass='';
                    if (row.seen !== true) {
                        seenClass = 'newNotification';
                        unSeen++;
                    }
                    var notificationHTML=
                        `<a href="javascript:void(0)" data-link="` + row.link + `"  data-id="` + row.id + `" data-seen="` + row.seen + `"   class=" dropdown-item d-flex align-items-center p-15 border-bottom openNotification ` + seenClass + `">
                           <div class="avatar avatar-blue  avatar-icon mr-3">
                            <i class="anticon anticon-mail"></i>
                           
                        </div>
                        <div class="flex-grow-1 text-truncate">
                              <div class="text-dark" style="word-wrap: break-word;">`+row.notification_text+`</div>
                         </div>
                        </a>`;
                    $('#notification-dropdown').prepend(notificationHTML);
               });
                var moreBtton = '<button class="btn btn-default m-r-5 w-100">Više</button>';
                $('#notification-dropdown').append(moreBtton);
                if (unSeen>0){
                    $('.notificationIndicator').show();
                }
            }  ,
            error: function(jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#alert').append(createWarningMessage(error));
            }
        });

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
                console.log(response)
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
        var data = {
            markAsSeen: 1,
            notificationsIds:ids
        };
        $.ajax({
            url: '/../../functions/notifications.php',
            type:'POST',
            data:data,
            dataType: 'json',
            success: function(response) {
                console.log(response)
                if (response.status=200){
                    ids.forEach(function(id){
                        $("#notification-dropdown a[data-id='" + id + "']").removeClass("newNotification");
                    });
                }

            }  ,
            error: function(jqXHR) {
                var error = generateAjaxError(jqXHR);
                $('#alert').append(createWarningMessage(error));
            }
        });
    });
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
                <i class="anticon anticon-mail"></i>
            </div>
            <div class="flex-grow-1 text-truncate">
                  <div class="text-dark" style="word-wrap: break-word;">` + data.message + `</div>
             </div>
            </a>`;

            $('#notification-dropdown').prepend(notificationHTML);

            var toastHTML =
                `<a href=" ` + data.link + `">
          <div class="toast fade hide" data-delay="10000"> 
<!--          <div class="toast fade hide" > -->
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
            }, 10000);
            $('.notificationIndicator').show()
        }
});

