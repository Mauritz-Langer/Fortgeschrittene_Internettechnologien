let sessionID;

navigateTo();

function navigateTo(pageName='register') {
    let includes = $('[data-include]');
    $.each(includes, function () {
        if($(this).data('include') !== 'navbar'){
            $(this).addClass('d-none');
        }
        if($(this).data('include') === pageName){
            $(this).removeClass('d-none');
        }
    });
    $(this).addClass('active');
}


function logout(){
    sessionID = '';
    navigateTo('register');
}
