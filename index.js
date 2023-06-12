let sessionID; // Variable zur Speicherung der Session-ID

navigateTo(); // Aufruf der Funktion navigateTo()

function navigateTo(pageName) {
    if (pageName === undefined) {
        // Überprüfen, ob pageName definiert ist
        if (checkForLoggedIn()) {
            pageName = 'friends'; // Wenn der Benutzer eingeloggt ist, wird friends als pageName festgelegt
        } else {
            pageName = 'login'; // Wenn der Benutzer nicht eingeloggt ist, wird login als pageName festgelegt
        }
    }
    // Funktion zum Navigieren zur angegebenen Seite
}

function navigateTo(pageName='register') {
    // Funktion zum Navigieren zur angegebenen Seite, standardmäßig 'register'

    let includes = $('[data-include]');
    // Alle Elemente mit dem Attribut 'data-include' auswählen

    $.each(includes, function () {
        // Schleife über alle ausgewählten Elemente
        if($(this).data('include') !== 'navbar'){
            $(this).addClass('d-none');
        }
        // Elemente, deren 'data-include'-Attribut nicht 'navbar' ist, werden ausgeblendet

        if($(this).data('include') === pageName){
            $(this).removeClass('d-none');
        }
        // Das Element, dessen 'data-include'-Attribut dem angegebenen pageName entspricht, wird eingeblendet
    });

    $(this).addClass('active');
    // Das aktuelle Element wird mit der CSS-Klasse 'active' markiert

    $('div[data-include=' + pageName + ']').load('views/' + pageName + '.html');
    // Der Inhalt des Elements mit dem Attribut 'data-include' gleich dem angegebenen pageName wird aus der Datei 'views/pageName.html' geladen
}

function reloadMap(map, street, housenumber, city, country){
    // Funktion zum Neuladen der Karte mit den angegebenen Adressdaten

    const src = 'https://www.google.com/maps/embed/v1/place?q=' + street+ '+' + housenumber+ ',+' + city+ ',+' + country+ '&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8';
    // Die URL für die Karte wird basierend auf den angegebenen Adressdaten und dem Google Maps API-Schlüssel erstellt

    map.attr('src', src);
    // Die 'src'-Eigenschaft des Elements 'map' wird auf die erstellte URL gesetzt

    console.log(src);

    map[0].contentWindow.location.reload();
    // Die Karte wird neu geladen
}

function logout(){
    // Funktion zum Ausloggen des Benutzers
    sessionID = ''; // Die Session-ID wird geleert
    navigateTo('register'); // Der Benutzer wird zur Seite 'register' navigiert
}

function fillDropdownCountries(data, id) {
    // Funktion zum Ausfüllen eines Dropdown-Menüs mit Länderdaten

    const select = $(id);

    select.empty(); // Das Dropdown-Menü wird geleert

    for (let i = 0; i < data.length; i++) {
        $('<option>').val(data[i].name.common).text(data[i].name.common).appendTo(select);
        // Für jedes Land in den Daten wird eine Option im Dropdown-Menü erstellt und hinzugefügt
    }

    select.val('Germany'); // Das Standardland im Dropdown-Menü wird auf 'Germany' festgelegt
}

function checkForLoggedIn(){
    // Funktion zum Überprüfen, ob der Benutzer eingeloggt ist
    let sessionID = sessionStorage.getItem('sessionID');
    let username = sessionStorage.getItem('username');

    return !(sessionID === null || username === null);
    // Es wird überprüft, ob die Session-ID und der Benutzername in der sessionStorage vorhanden sind. Wenn einer der Werte null ist, gibt die Funktion false zurück, andernfalls true.
}

let map; // Variable zur Speicherung der Karte

async function initMap() {
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    // Die Map-Klasse aus der Google Maps-Bibliothek wird importiert

    map = new Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
    // Eine neue Karte wird erstellt und dem Element mit der ID 'map' zugewiesen

}

initMap(); // Die Funktion initMap() wird aufgerufen, um die Karte zu initialisieren

async function updateMap(data){
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    // Die Map-Klasse aus der Google Maps-Bibliothek wird importiert

    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 51.4332, lng: 7.6616 },
        zoom: 7
    });
    // Eine neue Karte wird erstellt und dem Element mit der ID 'map' zugewiesen

    for (const marker of data) {
        console.log(marker);
        new google.maps.Marker({
            position: {lat:marker.standort.breitengrad,lng:marker.standort.laengengrad},
            map,
            title: "Hello World!",
        });
        // Für jeden Marker in den Daten wird ein Marker auf der Karte platziert
    }

}

function getRandomInt(max) {
    // Funktion zum Generieren einer zufälligen Ganzzahl zwischen 0 und max
    return Math.floor(Math.random() * max);
}
