$(document).ready(function () {
    // Warten, bis das Dokument vollständig geladen ist

    // Verwendung des jQuery Validation Plugins
    $("#setLocation").validate({
        // Festlegen der Validierungsregeln
        rules: {
            street:{
                required: true,
            },
            housenumber:{
                required: true,
            },
            zip:{
                required: true,
                minlength: 5
            },
            phonenumber:{
                required: true,
            },
            city: {
                required: true,
            }
        },
        // Festlegen von Validierungsfehlermeldungen
        messages: {
            street:{
                required: 'Bitte geben Sie die Straße ein',
            },
            housenumber:{
                required: 'Bitte geben Sie die Hausnummer ein',
            },
            zip:{
                required: 'Bitte geben Sie Ihre Postleitzahl ein',
                minlength: 5
            },
            city: {
                required: 'Bitte geben Sie Ihre Stadt ein',
            }
        },
        // Stellen Sie sicher, dass das Formular an das im "action"-Attribut des Formulars definierte Ziel gesendet wird, wenn es gültig ist
        submitHandler: function(form) {
            getStandortByAdress(form); // Funktion zum Abrufen des Standorts anhand der Adresse aufrufen

        },
        // Fehlerhafte Eingabefelder werden in Bootstrap 5 markiert
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("is-invalid").removeClass("is-valid"); // Hinzufügen der CSS-Klassen für Fehlermarkierung
            $(element).nextAll('.valid-feedback').hide(); // Verstecken der Validierungsbestätigung
            $(element).nextAll('.invalid-feedback').show(); // Anzeigen der Fehlermeldung
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).addClass("is-valid").removeClass("is-invalid"); // Hinzufügen der CSS-Klassen für Gültigkeitsmarkierung
            $(element).nextAll('.invalid-feedback').hide(); // Verstecken der Fehlermeldung
            $(element).nextAll('.valid-feedback').show(); // Anzeigen der Validierungsbestätigung
        },
        errorElement: 'div',
        errorClass: 'invalid-feedback',
        errorPlacement: function (error, element) {
            error.insertAfter(element); // Einfügen der Fehlermeldung nach dem Eingabefeld
        }
    });

    // Validierung der Felder beim Verlassen des Eingabefelds
    $('#setLocation input').blur(function() {
        $(this).valid(); // Auslösen der Validierung für das aktuelle Eingabefeld
        const iframe = $('#editMap');
        street = $(this).val();
        console.log('changed');
        reloadMap(iframe, $('#inputStreet').val(), $('#inputHouseNumber').val(), $('#inputCity').val(), $('#inputState').val());
        // Funktion zum Neuladen der Karte aufrufen und die aktuellen Werte der Eingabefelder übergeben
    });
});
