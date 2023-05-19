$(document).ready(function () {
    $("#loginForm").validate({
        rules: {
            username: {
                required: true,
            },
            password:{
                required: true,
            }
        },
        messages: {
            username: {
                required: 'Bitte geben Sie Ihre Benutzername ein',
            },
            password:{
                required: 'Bitte geben Sie Ihr Passwort ein',
            }
        },
        submitHandler: function(form) {
            //form.submit();
            login(form);
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

    $('#loginForm input').blur(function() {
        $(this).valid();
    });
});
