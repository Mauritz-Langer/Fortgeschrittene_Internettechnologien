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
        center: { lat: 40.674, lng: -73.945 },
        zoom: 12,
        styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
            },
        ],
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


