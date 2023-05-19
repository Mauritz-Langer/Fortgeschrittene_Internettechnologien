$(document).ready(function () {
    $.validator.addMethod("securityquestion", function(value, element) {
        return $('#securityquestionlabel').attr('data-answer') === value;
    }, "Security question");
    // jQuery Validation Plugin
    $("#register").validate({
        // Specify validation rules
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
        // Specify validation error messages
        messages: {
            firstname:{
                required: 'Bitte geben Sie Ihren Vorname ein',
                minlength: 'Ihr Vorname muss 3 Zeichen lang sein'
            },
            surname:{
                required: 'Bitte geben Sie Ihren Nachname ein',
                minlength: 'Ihr Nachname muss 3 Zeichen lang sein'
            },
            email: {
                required: 'Bitte geben Sie Ihre E-Mail-Adresse ein',
                email: "Bitte geben Sie eine gültige E-Mail-Adresse  ein"
            },
            username: {
                required: 'Bitte geben Sie Ihre Benutzername ein',
                remote: 'Dieser Benutzername ist vergeben!'
            },
            password:{
                required: 'Bitte geben Sie Ihr Passwort ein',
                minlength: 'Ihr Passwort muss 8 Zeichen lang sein'
            },
            street:{
                required: 'Bitte geben Sie die Straße ein',
            },
            housenumber:{
                required: 'Bitte geben Sie die Hausnummer ein',
            },
            zip:{
                required: 'Bitte geben Sie Ihre Postleitzahl ein',
                minlength:5
            },
            city: {
                required: 'Bitte geben Sie Ihre Stadt ein',
            },
            phonenumber:{
                required: 'Bitte geben Sie Ihre Telefonnummer ein',
            },
            securityquestion:{
                required: 'Bitte lösen Sie die Sicherheitsfrage :)',
                securityquestion:'Ihre Lösung ist falsch'
            },
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
            //form.submit();
            registerUser(form);
        },
        // Bootstrap 5 error highlighting
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("is-invalid").removeClass("is-valid");
            $(element).nextAll('.valid-feedback').hide();
            $(element).nextAll('.invalid-feedback').show();
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).addClass("is-valid").removeClass("is-invalid");
            $(element).nextAll('.invalid-feedback').hide();
            $(element).nextAll('.valid-feedback').show();
        },
        errorElement: 'div',
        errorClass: 'invalid-feedback',
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    });

    // Validate fields on blur
    $('#register input').blur(function() {
        $(this).valid(); // Trigger validation for the current input field

        const iframe = $('#registerMap');
        street = $(this).val();
        console.log('changed');
        reloadMap(iframe,$('#inputStreetRegister').val(),$('#inputHouseNumberRegister').val(),$('#inputCityRegister').val(),$('#inputStateRegister').val()  )

    });
});
