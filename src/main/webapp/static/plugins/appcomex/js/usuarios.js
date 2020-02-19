
/**
 * Mensajes
 */
function mensajeAgregadoUsuario() { swal("Usuario Agregado", "Se ha agregado el usuario exitosamente", "success") };
function mensajeErrorExiste() { sweetAlert("Error", "El usuario ya existe", "error") };
function mensajeUsuarioModificado() { swal("Usuario Modificado", "Se ha modificado el usuario exitosamente", "success") };
function mensajeUsuarioHabilitado() { swal("Usuario Habilitado", "Se ha habilitado el usuario exitosamente", "success") };
function mensajeUsuarioDeshabilitado() { swal("Usuario Deshabilitado", "Se ha deshabilitado el usuario exitosamente", "success") };
function mensajeErrorNotFound() { sweetAlert("Error", "No se ha encontrado", "error") };
function mensajeErrorServidor() { sweetAlert("Error", "Ocurrio un error de servidor, intentelo nuevamente", "error") };
function mensajeRolesPorUsuario() { swal("Usuario Actualizado", "Se han actualizado los roles del usuario exitosamente", "success") };


/**
 * ******************
 */

/**
 * cargando usuarios al cargar la pagina
 */
$(document).ready(function () {
    $('#tabla-usuarios').DataTable();
    obtenerListaUsuarios();
});


$('#agregar-usuario').click(function (event) {

    event.preventDefault();

    // event.preventDefault();
    if ($(".form-agregar-usuario").validate()) {
        agregarUsuario();
    } else {

    }
});


//FUNCION AGREGAR USUARIO
function agregarUsuario() {

    var usuario = $('#usuario').val();
    var nombre = $('#nombre').val();

    var datos = {
        "usuario": usuario.toLowerCase(),
        "nombre": nombre.toUpperCase()
    };

    if ((usuario.includes("@") && (usuario.length >= 6 && usuario.length <= 255) && (nombre.length >= 6 && nombre.length <= 255))) {

        $.ajax({
            url: 'agregar-usuarios',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(datos),
            dataType: 'json',
            beforeSend: function () {
                //$('#preloader').fadeIn(500); //loader

            },
            success: function (request) {

                if (request == 200) {
                    obtenerListaUsuarios();
                    $('#exampleModalCenterAgregar').modal('hide');
                    mensajeAgregadoUsuario();
                } else if (request == 100) {
                    $('#exampleModalCenterAgregar').modal('hide');
                    mensajeErrorExiste();
                } else if (request == 500) {
                    mensajeErrorServidor();
                }

            },
            error: function (request, status, error) {
                $('#exampleModalCenterAgregar').modal('hide');
                mensajeErrorServidor();
            },
            complete: function (resultado) {
                $('#usuario').val('');
                $('#nombre').val('');
            }
        });

    }
};




/**
 * FUNCION LISTA USUARIOS
 */

function obtenerListaUsuarios() {

    $.ajax({
        url: "lista-usuarios",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {
        },
        success: function (request) {
            var resultado = JSON.stringify(request);
            var objeto = JSON.parse(resultado);

            var usuario = "";
            var nombre = "";
            var botones = "";

            var table = $('#tabla-usuarios').DataTable();
            table.clear().draw();

            for (i = 0; i < objeto.length; i++) {

                var btnAsignarRoles = "<button type=\"button\" class=\"btn btn-info\" onClick=\"cargarRolesPorUsuario('" + objeto[i].token + "')\">Asignar Roles</button>";
                var btnEditar = "<button type=\"button\" class=\"btn btn-warning\" onClick=\"editarUsuario('" + objeto[i].token + "')\">Editar</button>";
                var btnDeshabilitar = "";
                var btnHabilitar = "";

                usuario = objeto[i].usuario;
                nombre = objeto[i].nombre;

                if (objeto[i].estado == "DESHABILITADO") {


                    btnHabilitar = "<button type=\"button\" class=\"btn btn-success\" onClick=\"habilitarUsuario('" + objeto[i].token + "')\">Habilitar</button>";
                    usuario = usuario.fontcolor("C0C0C0");
                    nombre = nombre.fontcolor("C0C0C0");

                    botones = btnAsignarRoles+" "+btnEditar+" "+btnHabilitar;

                } else {

                    btnDeshabilitar = "<button type=\"button\" class=\"btn btn-danger\" onClick=\"deshabilitarUsuario('" + objeto[i].token + "')\">Deshabilitar</button>";
                    botones = btnAsignarRoles+" "+btnEditar+" "+btnDeshabilitar;
                }

                //agregando usuarios a la tabla
                table.row.add([
                    usuario,nombre,botones
                ]).draw(false);

            }

        },
        error: function (request, status, error) {
            alert();
        },
        complete: function (resultado) {
            $('#preloader').fadeOut(500);

        }
    });
};


function cargarRolesPorUsuario(token) {
    $('#ModalAsignarRoles').modal('show');
    $('#tokenUsuario').val(token);
    RolesAsignados(token);
    RolesDisponibles(token);
};


function RolesAsignados(token) {

    $.ajax({
        url: "lista-roles-asignados/usuario/" + token,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {
            //$('#preloader').fadeIn();
        },
        success: function (request) {
            var resultado = JSON.stringify(request);
            var objeto = JSON.parse(resultado);
            $('#listaRolesAsignados').empty();
            for (i = 0; i < objeto.length; i++) {

                var lista = "<option value=" + objeto[i].nombre + " name='roles-asignados' title=" + objeto[i].nombre + ">" + objeto[i].nombre + "</option>";
                $('#listaRolesAsignados').append(lista);

            }
        },
        error: function (request, status, error) {

        },
        complete: function (resultado) {
            //$('#preloader').fadeOut();

        }
    });
};

function RolesDisponibles(token) {

    $.ajax({
        url: "lista-roles-disponibles/usuario/" + token,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {
            //$('#preloader').fadeIn();
        },
        success: function (request) {
            var resultado = JSON.stringify(request);
            var objeto = JSON.parse(resultado);
            $('#listaRolesDisponibles').empty();
            for (i = 0; i < objeto.length; i++) {

                var lista = "<option value=" + objeto[i].nombre + " name='roles-disponibles' title=" + objeto[i].nombre + ">" + objeto[i].nombre + "</option>";
                $('#listaRolesDisponibles').append(lista);

            }
        },
        error: function (request, status, error) {

        },
        complete: function (resultado) {
            //$('#preloader').fadeOut();

        }
    });
};



$('#disponible-to-asignado').click(function (event) {

    var rolSeleccionado = document.getElementById('listaRolesDisponibles');

    if (rolSeleccionado.value != "") {
        mostrarRol = "<option value=" + rolSeleccionado.value + " name='roles-asignados' title=" + rolSeleccionado.value + ">" + rolSeleccionado.value + "</option>";
        $('#listaRolesAsignados').append(mostrarRol);
        $("#listaRolesDisponibles option[value=" + rolSeleccionado.value + "]").remove();
    }

});

$('#asignado-to-disponible').click(function (event) {

    var rolSeleccionado = document.getElementById('listaRolesAsignados');

    if (rolSeleccionado.value != "") {
        mostrarRol = "<option value=" + rolSeleccionado.value + " name='roles-disponibles' title=" + rolSeleccionado.value + ">" + rolSeleccionado.value + "</option>";
        $('#listaRolesDisponibles').append(mostrarRol);
        $("#listaRolesAsignados option[value=" + rolSeleccionado.value + "]").remove();
    }

});

$('#all-disponible-to-asignado').click(function (event) {

    var rolSeleccionado = document.getElementsByName('roles-disponibles');

    for (i = 0; i < rolSeleccionado.length; i++) {

        mostrarRol = "<option value=" + rolSeleccionado[i].value + " name='roles-asignados'>" + rolSeleccionado[i].value + "</option>";
        $('#listaRolesAsignados').append(mostrarRol);

    }

    $('#listaRolesDisponibles').empty();

});


$('#all-asignado-to-disponible').click(function (event) {

    var rolSeleccionado = document.getElementsByName('roles-asignados');
    var mostrarRol = "";

    for (i = 0; i < rolSeleccionado.length; i++) {

        mostrarRol = "<option value=" + rolSeleccionado[i].value + " name='roles-disponibles'>" + rolSeleccionado[i].value + "</option>";
        $('#listaRolesDisponibles').append(mostrarRol);

    }

    $('#listaRolesAsignados').empty();

});



function aceptarRolesUsuario() {
    var lista = document.getElementsByName('roles-asignados');
    var listaRoles = "";

    for (i = 0; i < lista.length; i++) {
        listaRoles = listaRoles + "\"nombre\" : " + '"' + lista[i].value + '"' + "},{";
    }

    formatoJsonString = listaRoles.substr(0, listaRoles.length - 3);

    var datos = "[{" + formatoJsonString + "}]";

    var formatoJsonNormal = JSON.parse(datos);

    var token = document.getElementById('tokenUsuario');

    $.ajax({
        url: "/asignar-roles/usuario/" + token.value,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formatoJsonNormal),
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            if (request == 200) {
                $('#ModalAsignarRoles').modal('hide');
                mensajeRolesPorUsuario();
            } else if (request == 100) {
                $('#ModalAsignarRoles').modal('hide');
                mensajeErrorNotFound();
            } else if (request == 500) {
                $('#ModalAsignarRoles').modal('hide');
                mensajeErrorServidor();
            }


        },
        error: function (request, status, error) {
            $('#ModalAsignarRoles').modal('hide');
            mensajeErrorServidor();
        },
        complete: function (resultado) {
            //$('#preloader').fadeOut();

        }

    });
};

function editarUsuario(token) {

    cargarDatosUsuario(token);
    $('#guardar-cambios-usuario').click(function (event) {
        actualizarDatosUsuario(token);
    });

}

function cargarDatosUsuario(token) {

    $.ajax({
        url: 'obtener-usuario/' + token,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var resultado = JSON.stringify(request);
            var objeto = JSON.parse(resultado);
            $('#usuarioEditar').val(objeto.usuario);
            $('#nombreEditar').val(objeto.nombre);
            $('#ModalEditarUsuario').modal('show');
        },
        error: function () {

        },
        complete: function () {

        }

    });
}

function actualizarDatosUsuario(token) {

    var usuario = $('#usuarioEditar').val();
    var nombre = $('#nombreEditar').val();

    if ((usuario.length >= 6 && usuario.length <= 255) && (nombre.length >= 6 && nombre.length <= 255)) {

        var datos = {
            "usuario": usuario.toLowerCase(),
            "nombre": nombre.toUpperCase()
        };

        $.ajax({
            url: 'actualizar-usuario/' + token,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            dataType: 'json',
            beforeSend: function () {
                $('#preloader').show();
            },
            success: function (request) {
                if (request == 200) {
                    obtenerListaUsuarios();
                    mensajeUsuarioModificado();
                } else if (request == 300) {
                    mensajeErrorNotFound();
                } else if (request == 500) {
                    mensajeErrorServidor();
                }

            },
            error: function () {
                $('#ModalEditarUsuario').modal('hide');
                mensajeErrorServidor();
            },
            complete: function () {
                $('#usuarioEditar').val('');
                $('#nombreEditar').val('');
                $('#ModalEditarUsuario').modal('hide');
                $('#preloader').show();
                

            }

        });
    }
};


function deshabilitarUsuario(token) {
    swal({
        title: "Deshabilitar Usuario",
        text: "Se deshabilitar\u00e1 el usuario, \u00BFDesea continuar?.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Deshabilitar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm) {
                accionDeshabilitarUsuario(token);
            }
        });
};


function accionDeshabilitarUsuario(token) {

    $.ajax({
        url: 'deshabilitar-usuario/' + token,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {
            $('#preloader').show();
        },
        success: function (request) {
            if (request == 200) {
                obtenerListaUsuarios();
                $('#ModalEditarUsuario').modal('hide');
                swal("Usuario Deshabilitado", "El usuario ha sido deshabilitado", "success");

            } else if (request == 100) {
                $('#ModalEditarUsuario').modal('hide');
                mensajeErrorNotFound();
            } else if (request == 500) {
                $('#ModalEditarUsuario').modal('hide');
                mensajeErrorServidor();
            }

        },
        error: function () {
            $('#ModalEditarUsuario').modal('hide');
            mensajeErrorServidor();
            $('#preloader').fadeOut();

        },
        complete: function () {
            $('#preloader').fadeOut();

        }

    });
};

function habilitarUsuario(token) {

    $.ajax({
        url: 'habilitar-usuario/' + token,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {
            $('#preloader').show();

        },
        success: function (request) {
            if (request == 200) {
                obtenerListaUsuarios();
                $('#ModalEditarUsuario').modal('hide');
                mensajeUsuarioHabilitado();

            } else if (request == 100) {
                $('#ModalEditarUsuario').modal('hide');
                mensajeErrorNotFound();
            } else if (request == 500) {
                $('#ModalEditarUsuario').modal('hide');
                mensajeErrorServidor();
            }

        },
        error: function () {
            $('#ModalEditarUsuario').modal('hide');
            mensajeErrorServidor();
            $('#preloader').fadeOut();

        },
        complete: function () {
            $('#preloader').fadeOut();

        }

    });
};


$('#exportar-excel').click(function (event) {

    $.ajax({
        url: 'exportar-usuarios-excel',
        type: 'GET',
        beforeSend: function () {

        },
        success: function (request) {
            console.log("exito");

        },
        error: function () {
            console.log("error");
        },
        complete: function () {

        }
    });
});

jQuery(".form-agregar-usuario").validate({
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
        "usuario": {
            required: !0,
            minlength: 6,
            maxlength: 255,
            email: !0
        },
        "nombre": {
            required: !0,
            minlength: 6,
            maxlength: 255
        }
    },
    messages: {
        "usuario": {
            required: "Debe ingresar un usuario",
            minlength: "Debe contener al menos 6 caracteres",
            maxlength: "Debe contener como maximo 255 caracteres",
            email: "El usuario no cumple con el formato correcto. Ej: usuario@dominio.cl"
        },
        "nombre": {
            required: "Debe ingresar un nombre",
            minlength: "Debe contener al menos 6 caracteres",
            maxlength: "Debe contener como maximo 255 caracteres"
        }
    }
});

jQuery(".form-editar-usuario").validate({
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
        "usuarioEditar": {
            required: !0,
            minlength: 6,
            maxlength: 255,
            email: !0
        },
        "nombreEditar": {
            required: !0,
            minlength: 6,
            maxlength: 255
        }
    },
    messages: {
        "usuarioEditar": {
            required: "Debe ingresar un usuario",
            minlength: "Debe contener al menos 6 caracteres",
            maxlength: "Debe contener como maximo 255 caracteres",
            email: "El usuario no cumple con el formato correcto. Ej: usuario@dominio.cl"
        },
        "nombreEditar": {
            required: "Debe ingresar un nombre",
            minlength: "Debe contener al menos 6 caracteres",
            maxlength: "Debe contener como maximo 255 caracteres"
        }
    }
});