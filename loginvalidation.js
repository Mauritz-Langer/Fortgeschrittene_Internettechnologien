$(document).ready(function () {
    // Funktion, die ausgeführt wird, wenn das Dokument vollständig geladen ist

    $("#loginForm").validate({
        // Verwendung des jQuery Validation Plugins für die Validierung des Formulars mit der ID 'loginForm'

        rules: {
            username: {
                required: true,
            },
            password:{
                required: true,
            }
        },
        // Festlegung der Validierungsregeln für die Felder 'username' und 'password'

        messages: {
            username: {
                required: 'Bitte geben Sie Ihren Benutzernamen ein',
            },
            password:{
                required: 'Bitte geben Sie Ihr Passwort ein',
            }
        },
        // Festlegung der Validierungsnachrichten für die Felder 'username' und 'password'

        submitHandler: function(form) {
            // Callback-Funktion, die aufgerufen wird, wenn das Formular erfolgreich validiert wurde und abgeschickt werden soll
            login(form); // Aufruf der Funktion 'login' mit dem übergebenen Formular
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

    $('#loginForm input').blur(function() {
        $(this).valid();
        // Validierung der Eingabefelder, wenn der Fokus verloren geht (on blur)
    });
});
