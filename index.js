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

function reloadMap(map, street, houseNumber, city, country){
    street = street.replace(/\s+/g, '+')
    var src = 'https://www.google.com/maps/embed/v1/place?q='+ street +'+'+ houseNumber +',+'+ city +',+'+ country +'&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'
// set the new src attribute
    map.attr('src', src);

// reload the iframe
    map[0].contentWindow.location.reload();
}


function logout(){
    sessionID = '';
    navigateTo('register');
}

function fillDropdownCountries(data, id) {

    var select = $(id);

    select.empty();

    for (var i = 0; i < data.length; i++) {
        $('<option>').val(data[i].name.common).text(data[i].name.common).appendTo(select);
    }

    select.val('Germany')
}
