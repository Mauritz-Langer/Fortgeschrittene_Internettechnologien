$(document).ready(function () {

    // jQuery Validation Plugin
    $("#setLocation").validate({
        // Specify validation rules
        rules: {
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
            phonenumber:{
                required: true,
            },
            city: {
                required: true,
            }
        },
        // Specify validation error messages
        messages: {
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
            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
            //form.submit();
            getStandortByAdress(form);

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
    $('#setLocation input').blur(function() {
        $(this).valid(); // Trigger validation for the current input field
        const iframe = $('#editMap');
        street = $(this).val();
        console.log('changed');
        reloadMap(iframe,$('#inputStreet').val(),$('#inputHouseNumber').val(),$('#inputCity').val(),$('#inputState').val()  )
    });
});


