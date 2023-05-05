function register(event, form) {
    event.preventDefault(); // Prevent default form submission
    // Get the form data
    var formData = new FormData(form);
    var body = {
        loginName: formData.get('inputUsername'),
        passwort: {
            passwort: formData.get('inputPassword')
        },
        vorname: formData.get('inputName'),
        nachname: formData.get('inputSurname'),
        strasse: formData.get('inputStreet') + ' ' + formData.get('inputHouseNumber'),
        plz: formData.get('inputZip'),
        ort: formData.get('inputCity'),
        land: formData.get('inputState'),
        telefon: formData.get('inputPhone'),
        email: {
            adresse: formData.get('inputEmail')
        }
    }

    // Make the AJAX POST request
    $.ajax({
        url: 'https://fapfa.azurewebsites.net/FAPServer/service/fapservice/addUser',
        type: 'post',
        data: JSON.stringify(body),
        dataType: 'json',
        contentType: 'application/json',
        success: function(response) {

        },
        error: function(xhr, status, error) {
            // Handle error response
            console.log(xhr.responseText);
        }
    });
}

function login(event, form) {
    event.preventDefault(); // Prevent default form submission
    // Get the form data
    var formData = new FormData(form);
    var body = {
        loginName: formData.get('inputUsername'),
        passwort: {
            passwort: formData.get('inputPassword')
        }
    }

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
            },
        error: function(xhr, status, error) {
            // Handle error response
            console.log(xhr.responseText);
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
        success: function(response) {
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('sessionID')
            },
        error: function(xhr, status, error) {
            // Handle error response
            console.log(xhr.responseText);
        }
    });
}

function getStandortByAdress(event, form){

    event.preventDefault(); // Prevent default form submission
    // Get the form data
    var formData = new FormData(form);

    $.ajax({
        url: 'https://fapfa.azurewebsites.net/FAPServer/service/fapservice/getStandortPerAdresse',
        type: 'GET',
        data: {
            land: formData.get('inputState'),
            plz: formData.get('inputZip'),
            ort: formData.get('inputCity'),
            strasse: formData.get('inputStreet') + ' ' + formData.get('inputHouseNumber')
        },
        success: function(data) {
            setLocation(sessionStorage.getItem('username'), sessionStorage.getItem('sessionID'), data.breitengrad, data.laengengrad)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
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
        success: function(response) {
        },
        error: function(xhr, status, error) {
            // Handle error response
            console.log(xhr.responseText);
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
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
        }
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
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
        }
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
            reloadMap(iframe, street, houseNumber, city, country);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
            return ''
        }
    });
}