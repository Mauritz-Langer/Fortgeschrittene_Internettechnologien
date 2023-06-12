$(document).ready(function () {
    // Funktion, die ausgeführt wird, wenn das Dokument vollständig geladen ist

    $.validator.addMethod("securityquestion", function(value, element) {
        // Benutzerdefinierte Validierungsmethode für die Sicherheitsfrage

        return $('#securityquestionlabel').attr('data-answer') === value;
        // Überprüfung, ob die eingegebene Antwort mit der hinterlegten Antwort übereinstimmt
    }, "Security question");
    // Hinzufügen der Validierungsmethode für die Sicherheitsfrage zum jQuery Validation Plugin

    $("#register").validate({
        // Verwendung des jQuery Validation Plugins für die Validierung des Formulars mit der ID 'register'

        rules: {
            firstname:{
                required: true,
                minlength: 3
            },
            surname:{
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            username: {
                required: true,
                remote: {
                    url: "https://fapfa.azurewebsites.net/FAPServer/service/fapservice/checkLoginName?id="+$('inputUsernameRegister').val(),
                    type: "get",
                    dataFilter: function(data) {
                        var json = JSON.parse(data);
                        console.log(json);
                        return json.ergebnis; // convert boolean to string
                    }
                }
            },
            password:{
                required: true,
                minlength: 8
            },
            street:{
                required: true,
            },
            housenumber:{
                required: true,
            },
            zip:{
                required: true,
                minlength:5
            },
            city: {
                required: true,
            },
            phonenumber:{
                required: true,
            },
            securityquestion:{
                required: true,
                securityquestion:true
            },
        },
        // Festlegung der Validierungsregeln für die verschiedenen Felder im Formular

        messages: {
            firstname:{
                required: 'Bitte geben Sie Ihren Vornamen ein',
                minlength: 'Ihr Vorname muss mindestens 3 Zeichen lang sein'
            },
            surname:{
                required: 'Bitte geben Sie Ihren Nachnamen ein',
                minlength: 'Ihr Nachname muss mindestens 3 Zeichen lang sein'
            },
            email: {
                required: 'Bitte geben Sie Ihre E-Mail-Adresse ein',
                email: "Bitte geben Sie eine gültige E-Mail-Adresse ein"
            },
            username: {
                required: 'Bitte geben Sie Ihren Benutzernamen ein',
                remote: 'Dieser Benutzername ist bereits vergeben!'
            },
            password:{
                required: 'Bitte geben Sie Ihr Passwort ein',
                minlength: 'Ihr Passwort muss mindestens 8 Zeichen lang sein'
            },
            street:{
                required: 'Bitte geben Sie die Straße ein',
            },
            housenumber:{
                required: 'Bitte geben Sie die Hausnummer ein',
            },
            zip:{
                required: 'Bitte geben Sie Ihre Postleitzahl ein',
                minlength: 'Ihre Postleitzahl muss mindestens 5 Zeichen lang sein'
            },
            city: {
                required: 'Bitte geben Sie Ihre Stadt ein',
            },
            phonenumber:{
                required: 'Bitte geben Sie Ihre Telefonnummer ein',
            },
            securityquestion:{
                required: 'Bitte beantworten Sie die Sicherheitsfrage',
                securityquestion:'Ihre Antwort ist falsch'
            },
        },
        // Festlegung der Validierungsnachrichten für die verschiedenen Felder im Formular

        submitHandler: function(form) {
            // Callback-Funktion, die aufgerufen wird, wenn das Formular erfolgreich validiert wurde und abgeschickt werden soll
            registerUser(form); // Aufruf der Funktion 'registerUser' mit dem übergebenen Formular
        },

        // Bootstrap 5 error highlighting
        highlight: function (element, errorClass, validClass) {
            // Funktion zum Hervorheben von Fehlern im Bootstrap 5-Stil

            $(element).addClass("is-invalid").removeClass("is-valid");
            // Das aktuelle Element wird mit der CSS-Klasse 'is-invalid' markiert und die CSS-Klasse 'is-valid' wird entfernt

            $(element).nextAll('.valid-feedback').hide();
            $(element).nextAll('.invalid-feedback').show();
            // Die Feedback-Elemente für gültige und ungültige Eingaben werden angezeigt bzw. ausgeblendet
        },

        unhighlight: function (element, errorClass, validClass) {
            // Funktion zum Aufheben der Hervorhebung von Fehlern im Bootstrap 5-Stil

            $(element).addClass("is-valid").removeClass("is-invalid");
            // Das aktuelle Element wird mit der CSS-Klasse 'is-valid' markiert und die CSS-Klasse 'is-invalid' wird entfernt

            $(element).nextAll('.invalid-feedback').hide();
            $(element).nextAll('.valid-feedback').show();
            // Die Feedback-Elemente für ungültige und gültige Eingaben werden angezeigt bzw. ausgeblendet
        },

        errorElement: 'div',
        // Das Element, das zur Anzeige der Fehler verwendet wird, wird auf 'div' festgelegt

        errorClass: 'invalid-feedback',
        // Die CSS-Klasse für Fehlermeldungen wird auf 'invalid-feedback' festgelegt

        errorPlacement: function (error, element) {
            // Funktion zum Platzieren der Fehlermeldung

            error.insertAfter(element);
            // Die Fehlermeldung wird nach dem Eingabeelement eingefügt
        }
    });

    // Validate fields on blur
    $('#register input').blur(function() {
        // Funktion, die ausgeführt wird, wenn der Fokus von einem Eingabefeld verloren geht (on blur)

        $(this).valid();
        // Überprüfung der Gültigkeit des aktuellen Eingabefelds

        const iframe = $('#registerMap');
        street = $(this).val();
        console.log('changed');
        // Aktualisierung der Karte mit den neuen Adressinformationen

        reloadMap(iframe,$('#inputStreetRegister').val(),$('#inputHouseNumberRegister').val(),$('#inputCityRegister').val(),$('#inputStateRegister').val()  );
        // Funktion zum Neuladen der Karte mit den aktualisierten Adressinformationen
    });
});
