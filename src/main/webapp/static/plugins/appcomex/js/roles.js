
/**
 * Mensajes
 */

function mensajeAgregado() { swal("Rol Agregado", "Se ha agregado el Rol exitosamente", "success") };
function mensajeErrorExiste() { sweetAlert("Error", "El rol ya existe", "error") };
function mensajeEditado() { swal("Rol Actualizado", "Se ha modificado el rol exitosamente", "success") };

function mensajeErrorNotFound() { sweetAlert("Error", "No se ha encontrado", "error") };
function mensajeErrorServidor() { sweetAlert("Error", "Ocurrio un error de servidor, intentelo nuevamente", "error") };

function mensajePrivilegiosPorRol() { swal("Rol Actualizado", "Se han actualizado los privilegios para el rol exitosamente", "success") };

/**
 * ***************
 */

/**
 * cargando roles al cargar la pagina
 */

$(document).ready(function () {
    $('#tabla-roles').DataTable();
    obtenerListaRoles();
});

/**
 * FUNCION AGREGAR ROL
 */



$('#agregar-rol').click(function (event) {


    if ($(".form-agregar-rol").validate()) {
        agregarRol();
    } else {

    }

});

$('#actualizar-rol').click(function (event) {

    if ($(".form-editar-rol").validate()) {
        actualizarRol();
    } else {

    }
});

function agregarRol() {

    var nombre = $('#nombre').val();

    var datos = {
        "nombre": nombre.toUpperCase(),
    };

    if (nombre.length >= 6 && nombre.length <= 255) {

        $.ajax({
            url: 'agregar-rol',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(datos),
            dataType: 'json',
            beforeSend: function () {
                $('#nombre').val('');
            },
            success: function (request) {
                if (request == 200) {
                    obtenerListaRoles();
                    $('#exampleModalCenterAgregar').modal('hide');
                    mensajeAgregado();
                } else if (request == 100) {
                    $('#exampleModalCenterAgregar').modal('hide');
                    mensajeErrorExiste();
                } else if (request == 500) {
                    $('#exampleModalCenterAgregar').modal('hide');
                    mensajeErrorServidor();
                }

            },
            error: function (request, status, error) {
                $('#exampleModalCenterAgregar').modal('hide');
                mensajeErrorServidor();
            },
            complete: function (resultado) {
                $('#preloader').fadeOut();
            }
        });
    }
};

/**
 * **************
 */

/**
 * FUNCION OBTENER LISTA ROLES
 */

function obtenerListaRoles() {

    $.ajax({
        url: "lista-roles",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {
            //$('#preloader').fadeIn();
        },
        success: function (request) {
            var resultado = JSON.stringify(request);
            var objeto = JSON.parse(resultado);
            var table = $('#tabla-roles').DataTable();
            var botones = "";
            table.clear().draw();
            for (i = 0; i < objeto.length; i++) {

                var btnAsignarPrivilegios = "<button type=\"button\" class=\"btn btn-info\" onClick=\"cargarPrivilegiosPorRol('" + objeto[i].token + "')\">Asignar Privilegios</button>";
                var btnEditar = "<button type=\"button\" class=\"btn btn-warning\" onClick=\"editarRol('" + objeto[i].token + "')\">Editar</button>";
                var btnEliminar = "<button type=\"button\" class=\"btn btn-danger\" onClick=\"eliminarRol('" + objeto[i].token + "')\">Eliminar</button>";
                botones = btnAsignarPrivilegios+"&nbsp"+btnEditar+"&nbsp"+btnEliminar;
                table.row.add([
					objeto[i].nombre,botones
					]).draw(false);

            }

        },
        error: function (request, status, error) {

        },
        complete: function (resultado) {
            //$('#preloader').fadeOut();

        }
    });
};



function editarRol(token) {

    cargarRol(token);
};

function cargarRol(token) {

    var href = token;

    $.ajax({
        url: "editar-rol/" + href,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {
            // $('#preloader').show(); //loader
        },
        success: function (request) {
            var resultado = JSON.stringify(request);
            var objeto = JSON.parse(resultado);
            $('#idEditar').val(String(objeto.idRol));
            $('#nombreEditar').val(objeto.nombre);
            $('#tokenEditar').val(objeto.token);

            $('#ModalEditarRol').modal('show');
        },
        error: function (request, status, error) {
            // $('#exampleModalCenterAgregar').modal('hide');
            mensajeErrorServidor();
        },
        complete: function (resultado) {
            // $('#preloader').hide();

        }
    });

};

function eliminarRol(token) {
    swal({
        title: "Eliminar Rol",
        text: "Se eliminar\u00e1 el rol, \u00BFDesea continuar?.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm) {
                accionEliminarRol(token);
            }
        });
};



function accionEliminarRol(token) {

    $.ajax({
        url: "eliminar-rol/" + token,
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {
            // $('#preloader').show(); //loader
        },
        success: function (request) {
            if (request == 200) {
                obtenerListaRoles();
                swal("Rol Borrado", "El rol ha sido eliminado", "success");

            } else if (request == 100) {
                mensajeErrorNotFound();
            } else if (request == 500) {
                mensajeErrorServidor();
            }
        },
        error: function (request, status, error) {
            // $('#exampleModalCenterAgregar').modal('hide');
            mensajeErrorServidor();
        },
        complete: function (resultado) {
            // $('#preloader').hide();

        }
    });
}

function actualizarRol() {

    var nombre = $('#nombreEditar').val();

    var datos = {
        "idRol": parseInt($('#idEditar').val()),
        "nombre": nombre.toUpperCase(),
        "token": $('#tokenEditar').val(),
    };

    if (nombre.length >= 6 && nombre.length <= 255) {

        $.ajax({
            url: 'actualizar-rol',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(datos),
            dataType: 'json',
            beforeSend: function () {
             $('#preloader').show();

            },
            success: function (request) {

                if (request == 200) {
                    obtenerListaRoles();
                    mensajeEditado();
                } else if (request == 100) {
                    mensajeErrorExiste();
                } else if (request == 500) {
                    mensajeErrorServidor();
                }


            },
            error: function (request, status, error) {
                $('#ModalEditarRol').modal('hide');
                $('#preloader').fadeOut();

                mensajeErrorServidor();
            },
            complete: function (resultado) {
                $('#nombre').val('');
                $('#ModalEditarRol').modal('hide');
                $('#preloader').fadeOut();
            }
        });
    }
};


function cargarPrivilegiosPorRol(token) {

    $('#ModalAsignarPrivilegios').modal('show');
    $('#tokenRol').val(token);
    ListaPrivilegiosDisponibles(token);
    ListaPrivilegiosAsignados(token);

};


function ListaPrivilegiosDisponibles(token) {

    $.ajax({
        url: "rol/lista-privilegios-disponibles/" + token,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {
            //$('#preloader').fadeIn();
        },
        success: function (request) {
            var resultado = JSON.stringify(request);
            var objeto = JSON.parse(resultado);
            $('#listaPrivilegiosDisponibles').empty();
            for (i = 0; i < objeto.length; i++) {

                var lista = "<option value=" + objeto[i].nombre + " name='privilegios-disponibles' title=" + objeto[i].nombre + ">" + objeto[i].nombre + "</option>";
                $('#listaPrivilegiosDisponibles').append(lista);

            }

        },
        error: function (request, status, error) {

        },
        complete: function (resultado) {
            //$('#preloader').fadeOut();

        }
    });

};

function ListaPrivilegiosAsignados(token) {

    $.ajax({
        url: "rol/lista-privilegios-asignados/" + token,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {
            //$('#preloader').fadeIn();
        },
        success: function (request) {
            var resultado = JSON.stringify(request);
            var objeto = JSON.parse(resultado);
            $('#listaPrivilegiosAsignados').empty();
            for (i = 0; i < objeto.length; i++) {

                var lista = "<option value=" + objeto[i].nombre + " name='privilegios-asignados' title=" + objeto[i].nombre + ">" + objeto[i].nombre + "</option>";
                $('#listaPrivilegiosAsignados').append(lista);

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

    var privilegioSeleccionado = document.getElementById('listaPrivilegiosDisponibles');

    if (privilegioSeleccionado.value != "") {
        var mostrarPrivilegio = "<option value=" + privilegioSeleccionado.value + " name='privilegios-asignados' title=" + privilegioSeleccionado.value + ">" + privilegioSeleccionado.value + "</option>";
        $('#listaPrivilegiosAsignados').append(mostrarPrivilegio);
        $("#listaPrivilegiosDisponibles option[value=" + privilegioSeleccionado.value + "]").remove();
    }

});

$('#asignado-to-disponible').click(function (event) {

    var privilegioSeleccionado = document.getElementById('listaPrivilegiosAsignados');

    if (privilegioSeleccionado.value != "") {
        var mostrarPrivilegio = "<option value=" + privilegioSeleccionado.value + " name='privilegios-disponibles' title=" + privilegioSeleccionado.value + ">" + privilegioSeleccionado.value + "</option>";
        $('#listaPrivilegiosDisponibles').append(mostrarPrivilegio);
        $("#listaPrivilegiosAsignados option[value=" + privilegioSeleccionado.value + "]").remove();
    }

});

$('#all-disponible-to-asignado').click(function (event) {

    var privilegioSeleccionado = document.getElementsByName('privilegios-disponibles');
    var mostrarPrivilegio = "";

    for (i = 0; i < privilegioSeleccionado.length; i++) {

        mostrarPrivilegio = "<option value=" + privilegioSeleccionado[i].value + " name='privilegios-asignados'>" + privilegioSeleccionado[i].value + "</option>";
        $('#listaPrivilegiosAsignados').append(mostrarPrivilegio);

    }

    $('#listaPrivilegiosDisponibles').empty();

});


$('#all-asignado-to-disponible').click(function (event) {

    var privilegioSeleccionado = document.getElementsByName('privilegios-asignados');
    var mostrarPrivilegio = "";

    for (i = 0; i < privilegioSeleccionado.length; i++) {

        mostrarPrivilegio = "<option value=" + privilegioSeleccionado[i].value + " name='privilegios-disponibles'>" + privilegioSeleccionado[i].value + "</option>";
        $('#listaPrivilegiosDisponibles').append(mostrarPrivilegio);

    }

    $('#listaPrivilegiosAsignados').empty();

});



function aceptarPrivilegiosRol() {
    var lista = document.getElementsByName('privilegios-asignados');
    var listaPrivilegios = "";

    for (i = 0; i < lista.length; i++) {
        listaPrivilegios = listaPrivilegios + "\"nombre\" : " + '"' + lista[i].value + '"' + "},{";
    }

    formatoJsonString = listaPrivilegios.substr(0, listaPrivilegios.length - 3);

    var datos = "[{" + formatoJsonString + "}]";

    var formatoJsonNormal = JSON.parse(datos);

    var token = document.getElementById('tokenRol');

    $.ajax({
        url: "/asignar-privilegios/rol/" + token.value,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formatoJsonNormal),
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            if (request == 200) {
                $('#ModalAsignarPrivilegios').modal('hide');
                mensajePrivilegiosPorRol();
            } else if (request == 100) {
                $('#ModalAsignarPrivilegios').modal('hide');
                mensajeErrorNotFound();
            } else if (request == 500) {
                $('#ModalAsignarPrivilegios').modal('hide');
                mensajeErrorServidor();
            }

        },
        error: function (request, status, error) {
            $('#ModalAsignarPrivilegios').modal('hide');
            mensajeErrorServidor();
        },
        complete: function (resultado) {
            //$('#preloader').fadeOut();

        }

    });
};

/**
 * VALIDACIONES
 */

jQuery(".form-agregar-rol").validate({
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
        "nombre": {
            required: !0,
            minlength: 6,
            maxlength: 255
        },
    },
    messages: {
        "nombre": {
            required: "Debe ingresar un nombre de rol",
            minlength: "Debe contener al menos 6 caracteres",
            maxlength: "Debe contener como maximo 255 caracteres"
        },
    }
});

jQuery(".form-editar-rol").validate({
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
        "nombreEditar": {
            required: !0,
            minlength: 6,
            maxlength: 255
        },
    },
    messages: {
        "nombreEditar": {
            required: "Debe ingresar un nombre de privilegio",
            minlength: "Debe contener al menos 6 caracteres",
            maxlength: "Debe contener como maximo 255 caracteres"
        },
    }
});
