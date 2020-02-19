function mensajeUsuarioExiste() { sweetAlert("Error", "El usuario ya existe", "error") };
function mensajeErrorServidor() { sweetAlert("Error", "Ocurrio un error de servidor, intentelo nuevamente", "error") };



function mensajeAgregadoUsuario() {
    swal({
        title: "Usuario Agregado",
        text: "Se ha registrado el usuario exitosamente",
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


//FUNCION AGREGAR USUARIO
$('.form-registro-usuario').submit(function (event) {
    event.preventDefault();

    var nombre = $('#txtNombre').val();
    var appellido = $('#txtApellido').val();
    var usuario = $('#txtUsuario').val();
    var password = $('#txtPassword').val();

    var fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('apellido', appellido);
    fd.append('usuario', usuario);
    fd.append('password', password);

    if ((usuario.includes("@") && (usuario.length >= 6 && usuario.length <= 255) && (nombre.length >= 6 && nombre.length <= 255))) {

        $.ajax({
            url: 'agregar-usuario-registro',
            type: "POST",
            data: fd,
            beforeSend: function () {
                $('#preloader').show(); //loader
            },
            success: function (request) {

                if (request == 200) {
                    mensajeAgregadoUsuario();
                } else if (request == 300) {
                    mensajeUsuarioExiste();
                } else if (request == 500) {
                    mensajeErrorServidor();
                }

            },
            error: function (request, status, error) {
                $('#preloader').fadeOut();
            },
            complete: function () {
                $('#txtNombre').val('');
                $('#txtAppellido').val('');
                $('#txtUsuario').val('');
                $('#txtPassword').val('');
                $('#preloader').fadeOut();
            },
            cache: false,
            contentType: false,
            processData: false

        });

    }

});
