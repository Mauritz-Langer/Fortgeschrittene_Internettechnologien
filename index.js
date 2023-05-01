let sessionID;

navigateTo();

function navigateTo(pageName='register') {
    var includes = $('[data-include]');
    $(this).addClass('active');
    $.each(includes, function () {
        if($(this).data('include') !== 'navbar'){
            $(this).addClass('d-none');
        }
        if($(this).data('include') === pageName)
            $(this).removeClass('d-none');
    });
}


function logout(){
    sessionID = '';
    navigateTo('register');
}