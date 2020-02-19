
function mensajePasswordActualizada() { swal("Cambio de contraseu\u00f1a", "Se ha actualizado la contrase\u00f1a", "success") };


function mensajePasswordActualizada() {
    swal({
        title: "Cambio de contraseu\u00f1a",
        text: "Se ha actualizado la contrase\u00f1a",
        type: "success",
        confirmButtonText: "Iniciar sesi\u00F3n",
        closeOnConfirm: true,
    },
        function (isConfirm) {
            if (isConfirm) {
                redirigirLogin();
            }
        });
};

function redirigirLogin() {
    var url = "/login";
    $(location).attr('href', url);
};


function mensajeErrorPassword() { swal("Error", "Ocurrio un error al intentar cambiar la contrase\u00f1a", "error") };
function mensajeErrorServidor() { sweetAlert("Error", "ocurrio un error de servidor, intentelo nuevamente", "error") };
function mensajeErrorPasswordNoCoincide() { sweetAlert("Error", "Las contrase\u00f1as no coinciden", "error") };


$('.form-cambiar-password').submit(function (event) {
    event.preventDefault();

    var token = $('#token').val();
    var newpassword = $('#new-password').val();
    var confirmpassword = $('#conf-password').val();

    if ((newpassword.length >= 6 && newpassword.length <= 255) & (confirmpassword.length >= 6 && confirmpassword.length <= 255)) {

        var datos = {
            "token": token,
            "password": newpassword
        }

        if (newpassword == confirmpassword) {

            $.ajax({
                url: 'cambiar-password-usuario',
                type: 'POST',
                data: JSON.stringify(datos),
                contentType: 'application/json',
                dataType: 'json',
                beforeSend: function () {
                    $('#preloader').show();
                },
                success: function (request) {
                    if (request == 200) {
                        $('#modal-cambiar-password').modal('hide');
                        mensajePasswordActualizada();
                    } else if (request == 500) {
                        $('#modal-cambiar-password').modal('hide');
                        mensajeErrorServidor();
                    } else {
                        $('#modal-cambiar-password').modal('hide');
                        mensajeErrorPassword();
                    }
                },
                error: function () {
                    mensajeErrorServidor();
                    $('#preloader').fadeOut();
                },
                complete: function () {
                    $('#conf-password').val('');
                    $('#new-password').val('');
                    $('#preloader').fadeOut();
                }

            });

        } else {
            mensajeErrorPasswordNoCoincide();
        }
    }
});

jQuery(".form-cambiar-password").validate({
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
        "new-password": {
            required: !0,
            minlength: 6,
            maxlength: 255
        },
        "conf-password": {
            required: !0,
            minlength: 6,
            maxlength: 255
        }
    },
    messages: {
        "new-password": {
            required: "Ingrese nueva contrase\u00f1a",
            minlength: "Debe contener al menos 6 caracteres",
            maxlength: "Debe contener como maximo 255 caracteres"
        },
        "conf-password": {
            required: "Ingrese nueva contrase\u00f1a",
            minlength: "Debe contener al menos 6 caracteres",
            maxlength: "Debe contener como maximo 255 caracteres"
        }
    }
});