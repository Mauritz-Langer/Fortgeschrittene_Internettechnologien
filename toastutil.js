

function showToast(title, body){
    console.log(title + body);
    $('#toast-header').text(title);
    $('#toast-body').text(body);
    bootstrap.Toast.getOrCreateInstance($('#liveToast')).show();

}