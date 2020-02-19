function mensajeEnvioExitoMail() { swal("Recuperar contrase\u00F1a", "Hemos enviado un correo electronico a la direccion indicada", "success") };
function mensajeMailNotFound() { swal("Error", "La direccion de correo electronico no existe o el usuario no se encuentra registrado", "warning") };
function mensajeEnvioErrorMail() { swal("Error", "Ocurrio un error en el servidor, intentelo nuevamente", "error") };




$('#recuperar-contrasena').click(function (event) {
    event.preventDefault();

    $('#correo').val('');
    $('#modal-recuperar-contrasena').modal('show');

});

$('.form-recuperar-contrasena').submit(function (event) {
    event.preventDefault();

    if ($('#correo').val() != '') {

        var fd = new FormData;
        var correo = $('#correo').val();
        fd.append('correo_electronico', correo);

        $.ajax({
            url: 'recuperar-password-cuenta',
            type: 'POST',
            data: fd,
            beforeSend: function () {
                $('#preloader').show();
            },
            success: function (request) {

                if (request == 200) {
                    $('#modal-recuperar-contrasena').modal('hide');
                    mensajeEnvioExitoMail();
                }else if(request == 300){
                    $('#modal-recuperar-contrasena').modal('hide');
                    mensajeMailNotFound();
                }

            },
            error: function (request) {
                $('#preloader').fadeOut();
                mensajeEnvioErrorMail();
            },
            complete: function () {
                $('#preloader').fadeOut();
            },
            cache: false,
            contentType: false,
            processData: false

        });
    }
});


jQuery(".form-recuperar-contrasena").validate({
    ignore: [], errorClass: "invalid-feedback animated fadeInDown", errorElement: "div", errorPlacement: function (e, a) {
        jQuery(a).parents(".form-group > div").append(e)
    },
    highlight: function (e) {
        jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid")
    },
    success: function (e) {
        jQuery(e).closest(".form-group").removeClass("is-invalid"), jQuery(e).remove()
    },
    rules: {
        "correo": {
            required: !0,
            minlength: 6,
            maxlength: 255,
            email: !0
        },
    },
    messages: {
        "correo": {
            required: "Debe ingresar un correo electronico",
            minlength: "Debe contener al menos 6 caracteres",
            maxlength: "Debe contener como maximo 255 caracteres",
            email: "ingrese un formato correcto, ej. correo@corona.cl"
        },
    }
});