function mensajeArgegado() { swal("Privilegio Agregado", "Se ha agregado el privilegio exitosamente", "success") };
function mensajeEditadoExito() { swal("Privilegio Actualizado", "Se ha modificado el privilegio exitosamente", "success") };
function mensajeErrorExiste() { swal("Error", "El privilegio ya existe", "error") };

function mensajeErrorNotFound() { sweetAlert("Error", "No se ha encontrado", "error") };
function mensajeErrorServidor() { sweetAlert("Error", "Ocurrio un error de servidor, intentelo nuevamente", "error") };



$(document).ready(function () {
    $('#tabla-privilegios').DataTable();
    obtenerListaPrivilegios();
});


$('#agregar-privilegio').click(function (event) {

    event.preventDefault();
    if ($(".form-agregar-privilegio").validate()) {
        agregarPrivilegio();
    } else {

    }
});


function agregarPrivilegio() {

    var nombre = $('#nombre').val();
    var comentario = $('#comentario').val();

    var datos = {
        "nombre": nombre.toUpperCase(),
        "comentario": comentario.toLowerCase()
    };

    if ((nombre.length >= 6 && nombre.length <= 255) && (comentario.length >= 6 && comentario.length <= 255)) {
        $.ajax({
            url: 'agregar-privilegio',
            type: "POST",
            data: JSON.stringify(datos),
            contentType: "application/json",
            dataType: 'json',
            beforeSend: function () {
                // $('#preloader').fadeIn();

            },
            success: function (request) {
                if (request == 200) {
                    obtenerListaPrivilegios();
                    $('#exampleModalCenterAgregar').modal('hide');
                    mensajeArgegado();
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
                // $('#preloader').fadeOut();

                $('#nombre').val('');
                $('#comentario').val('');
            }
        });
    }//end if
};


//FUNCION AGREGAR PRIVILEGIO AJAX



/**
 * FUNCION LISTA PRIVILEGIOS
 */

function obtenerListaPrivilegios() {

    $.ajax({
        url: "lista-privilegios",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {
            //$('#preloader').fadeIn();
        },
        success: function (request) {
            var resultado = JSON.stringify(request);
            var objeto = JSON.parse(resultado);
            //$('#tabla').empty();
            var table = $('#tabla-privilegios').DataTable();
            table.clear().draw();
            for (i = 0; i < objeto.length; i++) {

                var btnEditar = "<button type=\"button\" class=\"btn btn-warning\" onClick=\"editarPrivilegio('" + objeto[i].token + "')\">Editar</button>";
                var btnEliminar = "<button type=\"button\" class=\"btn btn-danger\" onClick=\"eliminarPrivilegio('" + objeto[i].token + "')\">Eliminar</button>";
                var botones = btnEditar + "&nbsp" + btnEliminar;

                var fila = "<tr><td>" + objeto[i].nombre + "</td><td>" + objeto[i].comentario + "</td><td>" + btnEditar + " " + btnEliminar + "</td></tr>";
                //$('#tabla').prepend(fila);
                table.row.add([
                    objeto[i].nombre, objeto[i].comentario, botones
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





/**
 * *************************
 */



/**
 * FUNCION CARGAR DATOS EDITAR
 */

function editarPrivilegio(token) {

    cargarPrivilegio(token);

    $('#actualizar-privilegio').click(function (event) {

        // event.preventDefault();
        if ($(".form-editar-privilegios").validate()) {
            actualizarPrivilegio(token);
        } else {

        }
    });

};

function cargarPrivilegio(token) {

    var href = token;

    $.ajax({
        url: "editar-privilegio/" + href,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {
            // $('#preloader').show(); //loader
        },
        success: function (request) {
            var resultado = JSON.stringify(request);
            var objeto = JSON.parse(resultado);
            $('#idEditar').val(String(objeto.idPrivilegio));
            $('#nombreEditar').val(objeto.nombre);
            $('#comentarioEditar').val(objeto.comentario);
            $('#tokenEditar').val(objeto.token);
            $('#ModalEditarPrivilegio').modal('show');
        },
        error: function (request, status, error) {
            // $('#exampleModalCenterAgregar').modal('hide');
            mensajeError();
        },
        complete: function (resultado) {
            // $('#preloader').hide();

        }
    });

};



/**
 * ACTUALIZAR PRIVILEGIO
 */

function actualizarPrivilegio(token) {

    var nombre = $('#nombreEditar').val();
    var comentario = $('#comentarioEditar').val();



    if ((nombre.length >= 6 && nombre.length <= 255) && (comentario.length >= 6 && comentario.length <= 255)) {


        var datos = {
            "idPrivilegio": $('#idEditar').val(),
            "comentario": comentario.toLowerCase(),
            "nombre": nombre.toUpperCase(),
            "token": $('#tokenEditar').val()
        };



        $.ajax({
            url: 'actualizar-privilegio/' + token,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(datos),
            dataType: 'json',
            beforeSend: function () {
                $('#preloader').show();
            },
            success: function (request) {
                if (request == 200) {
                    obtenerListaPrivilegios();
                    mensajeEditadoExito();
                } else if (request == 100) {
                    mensajeErrorExiste();

                } else if (request == 300) {
                    mensajeErrorNotFound();
                } else if (request == 500) {
                    
                    mensajeErrorServidor();
                }

            },
            error: function (request, status, error) {
                $('#ModalEditarPrivilegio').modal('hide');
                mensajeErrorServidor();
                $('#preloader').fadeOut();

            },
            complete: function (resultado) {
                $('#ModalEditarPrivilegio').modal('hide');
                $('#preloader').fadeOut();
                $('#nombre').val('');
                $('#comentario').val('');
            }
        });

    }//end if

};

function eliminarPrivilegio(token) {
    swal({
        title: "Eliminar Privilegio",
        text: "Se eliminar\u00e1 el privilegio, \u00BFDesea continuar?.",
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
                accionEliminarPrivilegio(token);
            }
        });
};

function accionEliminarPrivilegio(token) {
    $.ajax({
        url: "eliminar-privilegio/" + token,
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {
            // $('#preloader').show(); //loader
        },
        success: function (request) {
            if (request == 200) {
                obtenerListaPrivilegios();
                swal("Privilegio Borrado", "Se ha borrado el privilegio", "success");

            } else if (request == 100) {
                mensajeErrorNotFound();
            } else if (request == 500) {
                mensajeErrorServidor();
            }

        },
        error: function (request, status, error) {
            mensajeErrorServidor();
        },
        complete: function (resultado) {
            // $('#preloader').hide();

        }
    });

};

/**
 * 
 */


/**
 * VALIDACIONES
 */

jQuery(".form-agregar-privilegio").validate({
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
        "comentario": {
            required: !0,
            minlength: 6,
            maxlength: 255
        }
    },
    messages: {
        "nombre": {
            required: "Debe ingresar un nombre de privilegio",
            minlength: "Debe contener al menos 6 caracteres",
            maxlength: "Debe contener como maximo 255 caracteres"
        },
        "comentario": {
            required: "Debe ingresar un comentario de privilegio",
            minlength: "Debe contener al menos 6 caracteres",
            maxlength: "Debe contener como maximo 255 caracteres"
        }
    }
});

jQuery(".form-editar-privilegios").validate({
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
        "comentarioEditar": {
            required: !0,
            minlength: 6,
            maxlength: 255
        }
    },
    messages: {
        "nombreEditar": {
            required: "Debe ingresar un nombre de privilegio",
            minlength: "Debe contener al menos 6 caracteres",
            maxlength: "Debe contener como maximo 255 caracteres"
        },
        "comentarioEditar": {
            required: "Debe ingresar un comentario de privilegio",
            minlength: "Debe contener al menos 6 caracteres",
            maxlength: "Debe contener como maximo 255 caracteres"
        }
    }
});