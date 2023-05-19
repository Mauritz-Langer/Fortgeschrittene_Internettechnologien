let sessionID;

navigateTo();

function navigateTo(pageName) {
    if (pageName === undefined) {
        if (checkForLoggedIn()) {
            pageName = 'friends'
        } else {
            pageName = 'login'
        }
    }
}

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
    $('div[data-include=' + pageName + ']').load('views/' + pageName + '.html');
}

function reloadMap(map, street, housenumber,city, country){
    const src = 'https://www.google.com/maps/embed/v1/place?q=' + street+ '+' + housenumber+ ',+' + city+ ',+' + country+ '&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8';
    map.attr('src', src);
    console.log(src);
    map[0].contentWindow.location.reload();
}


function logout(){
    sessionID = '';
    navigateTo('register');
}

function fillDropdownCountries(data, id) {

    const select = $(id);

    select.empty();

    for (let i = 0; i < data.length; i++) {
        $('<option>').val(data[i].name.common).text(data[i].name.common).appendTo(select);
    }

    select.val('Germany')
}

function checkForLoggedIn(){
    let sessionID = sessionStorage.getItem('sessionID');
    let username = sessionStorage.getItem('username');

    return !(sessionID === null || username === null);
}

let map;

async function initMap() {
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });




}

initMap();


async function updateMap(data){
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");

    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 51.4332, lng: 7.6616 },
        zoom: 7
    });

    for (const marker of data) {
        console.log(marker);
        new google.maps.Marker({
            position: {lat:marker.standort.breitengrad,lng:marker.standort.laengengrad},
            map,
            title: "Hello World!",
        });
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


