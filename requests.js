function registerUser(form) {
    //event.preventDefault(); // Prevent default form submission
    // Get the form data
    let formData = new FormData(form);
    let body = {
        loginName: formData.get('username'),
        passwort: {
            passwort: formData.get('password')
        },
        vorname: formData.get('firstname'),
        nachname: formData.get('surname'),
        strasse: formData.get('street') + ' ' + formData.get('housenumber'),
        plz: formData.get('zip'),
        ort: formData.get('city'),
        land: formData.get('inputStateRegister'),
        telefon: formData.get('phonenumber'),
        email: {
            adresse: formData.get('email')
        }
    };

    console.log(body);

    // Make the AJAX POST request
    $.ajax({
        url: 'https://fapfa.azurewebsites.net/FAPServer/service/fapservice/addUser',
        type: 'post',
        data: JSON.stringify(body),
        dataType: 'json',
        contentType: 'application/json',
        success: function() {
            showToast('Registrieren', `Herzlichen Willkommen ${formData.get('firstname')} ${formData.get('surname')}`)
            navigateTo('login')
        },
        error: function() {
            showToast('Registrieren', 'Registrierung fehlgeschlagen!')
        }
    });
}

function login(form) {
    // Get the form data
    let formData = new FormData(form);
    let body = {
        loginName: formData.get('username'),
        passwort: {
            passwort: formData.get('password')
        }
    };

    console.log(body);

    // Make the AJAX POST request
    $.ajax({
        url: 'https://fapfa.azurewebsites.net/FAPServer/service/fapservice/login',
        type: 'post',
        data: JSON.stringify(body),
        dataType: 'json',
        contentType: 'application/json',
        success: function(response) {
            sessionStorage.setItem('username', body.loginName)
            sessionStorage.setItem('sessionID', response.sessionID)
            showToast('Login', 'Du bist jetzt eingeloggt!')
            navigateTo('edit')
            $('div[data-include="navbar"]').load('views/navbar.html');
        },
        error: function(xhr) {
            showToast('Login', xhr.responseText);
        }
    });

}

function logout(loginName, sitzung) {
    // Get the form data
    const body = {
        loginName: loginName,
        sitzung: sitzung
    };

    // Make the AJAX POST request
    $.ajax({
        url: 'https://fapfa.azurewebsites.net/FAPServer/service/fapservice/logout',
        type: 'post',
        data: JSON.stringify(body),
        dataType: 'json',
        contentType: 'application/json',
        success: function() {
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('sessionID')
            showToast('Abmelden', 'Du bist abgelmeldet!')
            navigateTo('login')
            $('div[data-include="navbar"]').load('views/navbar.html');
        },
        error: function(xhr) {
            showToast('Abmelden', xhr.responseText);
        }
    });
}

function getStandortByAdress( form){
    // Get the form data
    const formData = new FormData(form);

    $.ajax({
        url: 'https://fapfa.azurewebsites.net/FAPServer/service/fapservice/getStandortPerAdresse',
        type: 'GET',
        data: {
            land: formData.get('inputState'),
            plz: formData.get('zip'),
            ort: formData.get('city'),
            strasse: formData.get('street') + ' ' + formData.get('housenumber')
        },
        success: function(data) {
            setLocation(sessionStorage.getItem('username'), sessionStorage.getItem('sessionID'), data.breitengrad, data.laengengrad)
        },
        error: function() {
        }
    });
}

function setLocation(loginName, sitzung, breitengrad, laengengrad){

    const body = {
        loginName: loginName,
        sitzung: sitzung,
        standort: {
            breitengrad: breitengrad,
            laengengrad: laengengrad
        }
    };

    $.ajax({
        url: 'https://fapfa.azurewebsites.net/FAPServer/service/fapservice/setStandort',
        type: 'put',
        data: JSON.stringify(body),
        dataType: 'json',
        contentType: 'application/json',
        success: function() {
            showToast('Standort erfassen', 'Dein neuer Standort wurde erfolgreich erfasst!');
        },
        error: function(xhr) {
            showToast('Standort erfassen', xhr.responseText);
        }
    });
}

function getUsers(loginName, sitzung){

    $.ajax({
        url: 'https://fapfa.azurewebsites.net/FAPServer/service/fapservice/getBenutzer',
        type: 'GET',
        data: {
            login: loginName,
            session: sitzung
        },
        success: function(data) {
            fillDropdown(data)
            fillTable(JSON.parse(sessionStorage.getItem('storedUsers')))
        },
        error: function() {}
    });
}

function getAllCountries(id){
    $.ajax({
        url: 'https://restcountries.com/v3.1/all',
        type: 'GET',
        data: {
            fields: 'name'
        },
        dataType: 'json',
        success: function(data) {
            fillDropdownCountries(data, id)
        },
        error: function() {}
    });
}

function getCityFromPostalCode(postalCode, id, iframe){
    $.ajax({
        url: 'https://fapfa.azurewebsites.net/FAPServer/service/fapservice/getOrt',
        type: 'GET',
        data: {
            postalcode: postalCode
        },
        dataType: 'json',
        success: function(data) {
            city = data.name
            $(id).val(city)
            reloadMap(iframe);
        },
        error: function() {}
    });
}

function getLocationByUsername(username, callback){
    console.log(username.loginName);
    let session = sessionStorage.getItem('sessionID');
    let id = sessionStorage.getItem('username');
    //console.log(id + session + username);
        $.ajax({
            url: 'https://fapfa.azurewebsites.net/FAPServer/service/fapservice/getStandort',
            type: 'GET',
            data: {
                login:id,
                id:username.loginName,
                session:session
            },
            dataType: 'json',
            success: function(data) {
                console.log(data);
                username.standort = data.standort;
                console.log(username);
                callback(username);
            },
            error: function() {}
        });
}