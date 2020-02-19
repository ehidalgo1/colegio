function mensajeReglaAgregada() { swal("Regla Agregada", "Se ha agregado la regla exitosamente", "success") };
function mensajeReglaCopiada() { swal("Regla Agregada", "Se ha copiado la regla exitosamente", "success") };
function mensajeReglaErrorExiste() { sweetAlert("Error", "La regla ya existe", "error") };
function mensajeReglaErrorNotFound() { sweetAlert("Error", "La regla no se ha encontrado", "error") };
function mensajeReglaErrorServidor() { sweetAlert("Error", "ocurrio un error de servidor, intentelo nuevamente", "error") };
function mensajeReglaEditada() { swal("Regla Modificada", "Se ha modificado la regla exitosamente", "success") };



$(document).ready(function () {
    $('#tabla-regla-seguros').DataTable();
    obtListaReglaSeguros();
    obtListaEmpresaSeguro();
});


function obtListaReglaSeguros() {
    $.ajax({
        url: 'lista-regla-seguros',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            var empresaSeguro = "";
            var desde = "";
            var hasta = "";
            var diaDesde = "";
            var mesDesde = "";
            var diaHasta = "";
            var mesHasta = "";
            var fechaDesde = "";
            var fechaHasta = "";
            var porcentajePrima = "";
            var markUp = "";
            var valorPrimaMin = "";
            var botones = "";


            var btnCopiar = "";
            var btnEditar = "";
            var btnEliminar = "";

            var table = $('#tabla-regla-seguros').DataTable();

            table.clear().draw();

            for (let i = 0; i < objeto.length; i++) {

                desde = new Date(objeto[i].vigenciaDesde);
                desde.setDate(desde.getDate() + 2);

                diaDesde = desde.getDate();
                mesDesde = desde.getMonth() + 1;

                if (diaDesde < 10) {
                    diaDesde = "0" + diaDesde;
                }

                if (mesDesde < 10) {
                    mesDesde = "0" + mesDesde;
                }

                fechaDesde = diaDesde + "/" + mesDesde + "/" + desde.getFullYear();

                hasta = new Date(objeto[i].vigenciaHasta);
                hasta.setDate(hasta.getDate() + 2);

                diaHasta = hasta.getDate();
                mesHasta = hasta.getMonth()+1;

                if (diaHasta < 10) {
                    diaHasta = "0" + diaHasta;
                }

                if (mesHasta < 10) {
                    mesHasta = "0" + mesHasta;
                }

                fechaHasta = diaHasta + "/" + mesHasta + "/" + hasta.getFullYear();


                empresaSeguro = objeto[i].empresaSeguro.nombre;
                porcentajePrima = objeto[i].porcentajePrima;
                markUp = objeto[i].markUp;
                valorPrimaMin = objeto[i].valorPrimaMin;

                btnCopiar = "<button type='button' class='btn btn-info btn-xs' title='Copiar regla' onclick=\"copiarReglaSeguro('" + objeto[i].token + "')\"><i class='fa fa-copy'></i></button>"
                btnEditar = "<button type='button' class='btn btn-warning btn-xs' title='Editar regla' onclick=\"editarReglaSeguro('" + objeto[i].token + "')\"><i class='fa fa-edit'></i></button>";
                btnEliminar = "<button type='button' class='btn btn-danger btn-xs' title='Eliminar regla' onclick=\"eliminarReglaSeguro('" + objeto[i].token + "')\"><i class='fa fa-close'></i></button>";
                
                botones = btnCopiar+" "+btnEditar+" "+btnEliminar;

                table.row.add([
                    empresaSeguro,fechaDesde,fechaHasta,porcentajePrima,markUp,valorPrimaMin,botones
                ]).draw(false);

            }
        },
        error: function () {

        },
        complete: function () {

        }
    });
};


$('#btn-agregar-regla').click(function (event) {
    $('#modal-agregar-regla-seguro').modal('show');
});

function copiarReglaSeguro(token) {

    cargarDatosModalCopiar(token);
    $('#modal-copiar-regla-seguro').modal('show');


};

$('.form-copiar-regla-seguro').submit(function (event) {

    event.preventDefault();

    agregarReglaCopiada();

});

function agregarReglaCopiada() {

    var markUp = $('#mark-upCopiar').val();
    var porcentajePrima = $('#porcentaje-primaCopiar').val();
    var valorPrimaMin = $('#valor-prima-minCopiar').val();
    var vigenciaDesde = $('#vigencia-desdeCopiar').val();
    var vigenciaHasta = $('#vigencia-hastaCopiar').val();
    var empresaSeguro = $('select[id=empresa-seguroCopiar]').val();

    var datos =
    {
        "markUp": markUp,
        "porcentajePrima": porcentajePrima,
        "valorPrimaMin": valorPrimaMin,
        "vigenciaDesde": vigenciaDesde,
        "vigenciaHasta": vigenciaHasta,
        "empresaSeguro": {
            "idEmpresa": empresaSeguro,
        }
    };

    if (markUp != '' && porcentajePrima != '' && valorPrimaMin != '' && vigenciaDesde != '' && vigenciaHasta != '' && empresaSeguro != '') {


        $.ajax({
            url: 'agregar-regla-seguro',
            type: 'POST',
            data: JSON.stringify(datos),
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function () {
                $('#preloader').show();
            },
            success: function (request) {

                if (request == 200) {
                    $('#modal-copiar-regla-seguro').modal('hide');
                    obtListaReglaSeguros();
                    mensajeReglaCopiada();
                } else if (request == 100) {
                    $('#modal-copiar-regla-seguro').modal('hide');
                    mensajeReglaErrorExiste();
                } else if (request == 500) {
                    $('#modal-copiar-regla-seguro').modal('hide');
                    obtListaReglaSeguros();
                    mensajeReglaErrorServidor();
                }

            },
            error: function () {
                $('#preloader').fadeOut();
                mensajeReglaErrorServidor();

            },
            complete: function () {
                $('#mark-upCopiar').val('');
                $('#porcentaje-primaCopiar').val('');
                $('#valor-prima-minCopiar').val('');
                $('#vigencia-desdeCopiar').val('');
                $('#vigencia-hastaCopiar').val('');
                $('select[id=empresa-seguroCopiar]').val('');

                $('#preloader').fadeOut();

            }
        });

    }//end if
}

function editarReglaSeguro(token) {
    cargarDatosModalEditar(token);
    $('#modal-editar-regla-seguro').modal('show');
    $('.form-editar-regla-seguro').submit(function (event) {
        event.preventDefault();
        actualizarReglaSeguro(token);

    });
};


function actualizarReglaSeguro(token) {

    var markUp = $('#mark-upEditar').val();
    var porcentajePrima = $('#porcentaje-primaEditar').val();
    var valorPrimaMin = $('#valor-prima-minEditar').val();
    var vigenciaDesde = $('#vigencia-desdeEditar').val();
    var vigenciaHasta = $('#vigencia-hastaEditar').val();
    var empresaSeguro = $('select[id=empresa-seguroEditar]').val();

    var datos =
    {
        "markUp": markUp,
        "porcentajePrima": porcentajePrima,
        "valorPrimaMin": valorPrimaMin,
        "vigenciaDesde": vigenciaDesde,
        "vigenciaHasta": vigenciaHasta,
        "empresaSeguro": {
            "idEmpresa": empresaSeguro,
        }
    };

    if (markUp != '' && porcentajePrima != '' && valorPrimaMin != '' && vigenciaDesde != '' && vigenciaHasta != '' && empresaSeguro != '') {


        $.ajax({
            url: 'editar-regla-seguro/' + token,
            type: 'POST',
            data: JSON.stringify(datos),
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function () {
                $('#preloader').show();

            },
            success: function (request) {

                if (request == 200) {
                    $('#modal-editar-regla-seguro').modal('hide');
                    obtListaReglaSeguros();
                    mensajeReglaEditada();
                } else if (request == 100) {
                    $('#modal-editar-regla-seguro').modal('hide');
                    mensajeReglaErrorExiste();
                } else if (request == 500) {
                    $('#modal-editar-regla-seguro').modal('hide');
                    obtListaReglaSeguros();
                    mensajeReglaErrorServidor();
                }

            },
            error: function () {

                $('#preloader').fadeOut();
                mensajeReglaErrorServidor();

            },
            complete: function () {
                $('#mark-upEditar').val('');
                $('#porcentaje-primaEditar').val('');
                $('#valor-prima-minEditar').val('');
                $('#vigencia-desdeEditar').val('');
                $('#vigencia-hastaEditar').val('');
                $('select[id=empresa-seguroEditar]').val('');

                $('#preloader').fadeOut();

            }
        });

    }//end if

};



function obtListaEmpresaSeguro() {
    $.ajax({
        url: 'lista-empresa-seguro',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);
            var lista = "";
            var selDefault = "<option value='' selected>Seleccione</option>";

            $('#empresa-seguro').empty();
            $('#empresa-seguroCopiar').empty();
            $('#empresa-seguroEditar').empty();

            $('#empresa-seguro').append(selDefault);
            $('#empresa-seguroCopiar').append(selDefault);
            $('#empresa-seguroEditar').append(selDefault);

            for (let i = 0; i < objeto.length; i++) {
                lista = "<option value=" + objeto[i].idEmpresa + " >" + objeto[i].nombre + "</option>";

                $('#empresa-seguro').append(lista);
                $('#empresa-seguroCopiar').append(lista);
                $('#empresa-seguroEditar').append(lista);
            }


        },
        error: function () {
            console.log('error');

        },
        complete: function () {

        }
    });
};

$('.form-agregar-regla-seguro').submit(function (event) {
    event.preventDefault();

    var markUp = $('#mark-up').val();
    var porcentajePrima = $('#porcentaje-prima').val();
    var valorPrimaMin = $('#valor-prima-min').val();
    var vigenciaDesde = $('#vigencia-desde').val();
    var vigenciaHasta = $('#vigencia-hasta').val();
    var empresaSeguro = $('select[id=empresa-seguro]').val();

    var datos =
    {
        "markUp": markUp,
        "porcentajePrima": porcentajePrima,
        "valorPrimaMin": valorPrimaMin,
        "vigenciaDesde": vigenciaDesde,
        "vigenciaHasta": vigenciaHasta,
        "empresaSeguro": {
            "idEmpresa": empresaSeguro,
        }
    };

    if (markUp != '' && porcentajePrima != '' && valorPrimaMin != '' && vigenciaDesde != '' && vigenciaHasta != '' && empresaSeguro != '') {


        $.ajax({
            url: 'agregar-regla-seguro',
            type: 'POST',
            data: JSON.stringify(datos),
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function () {
                $('#preloader').show();

            },
            success: function (request) {

                if (request == 200) {
                    $('#modal-agregar-regla-seguro').modal('hide');
                    obtListaReglaSeguros();
                    mensajeReglaAgregada();
                } else if (request == 100) {
                    $('#modal-agregar-regla-seguro').modal('hide');
                    mensajeReglaErrorExiste();
                } else if (request == 500) {
                    $('#modal-agregar-regla-seguro').modal('hide');
                    obtListaReglaSeguros();
                    mensajeReglaErrorServidor();
                }

            },
            error: function () {
                $('#preloader').fadeOut();
                mensajeReglaErrorServidor();

            },
            complete: function () {
                $('#mark-up').val('');
                $('#porcentaje-prima').val('');
                $('#valor-prima-min').val('');
                $('#vigencia-desde').val('');
                $('#vigencia-hasta').val('');
                $('select[id=empresa-seguro]').val('');

                $('#preloader').fadeOut();

            }
        });

    }//end if

});

function cargarDatosModalCopiar(token) {

    $.ajax({
        url: 'obtener-regla-seguro/' + token,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            $('#mark-upCopiar').val(objeto.markUp);
            $('#porcentaje-primaCopiar').val(objeto.porcentajePrima);
            $('#valor-prima-minCopiar').val(objeto.valorPrimaMin);
            $('select[id=empresa-seguroCopiar]').val(objeto.empresaSeguro.idEmpresa);

        },
        error: function () {

        },
        complete: function () {

        }
    });
};

function cargarDatosModalEditar(token) {

    $.ajax({
        url: 'obtener-regla-seguro/' + token,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            $('#mark-upEditar').val(objeto.markUp);
            $('#porcentaje-primaEditar').val(objeto.porcentajePrima);
            $('#valor-prima-minEditar').val(objeto.valorPrimaMin);
            $('#vigencia-desdeEditar').val(objeto.vigenciaDesde);
            $('#vigencia-hastaEditar').val(objeto.vigenciaHasta);
            $('select[id=empresa-seguroEditar]').val(objeto.empresaSeguro.idEmpresa);

        },
        error: function () {

        },
        complete: function () {

        }
    });

};

function eliminarReglaSeguro(token) {
    swal({
        title: "Eliminar Regla",
        text: "Se eliminar\u00e1 la regla, \u00BFDesea continuar?.",
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
                accionEliminarReglaSeguro(token);
            }
        });
};


function accionEliminarReglaSeguro(token) {

    $.ajax({
        url: 'eliminar-regla-seguro/' + token,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {
            $('#preloader').show();
        },
        success: function (request) {
            if (request == 200) {
                obtListaReglaSeguros();
                swal("Regla Borrada", "La regla ha sido eliminada", "success");

            } else if (request == 100) {
                mensajeReglaErrorNotFound();
            } else if (request == 500) {
                mensajeReglaErrorServidor();
            }

        },
        error: function () {
            mensajeReglaErrorServidor();
            $('#preloader').fadeOut();

        },
        complete: function () {
            $('#preloader').fadeOut();
        }
    });
};


jQuery(".form-agregar-regla-seguro").validate({
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
        "empresa-seguro": {
            required: !0
        },
        "porcentaje-prima": {
            required: !0,
            number: !0
        },
        "mark-up": {
            required: !0,
            number: !0
        },
        "vigencia-desde": {
            required: !0
        },
        "vigencia-hasta": {
            required: !0
        },
        "valor-prima-min": {
            required: !0,
            number: !0
        }
    },
    messages: {
        "empresa-seguro": {
            required: "Debe seleccionar una empresa"
        },
        "porcentaje-prima": {
            required: "Debe ingresar un valor",
            number: "Solo se permiten enteros"
        },
        "mark-up": {
            required: "Debe ingresar un valor",
            number: "Solo se permiten enteros"
        },
        "vigencia-desde": {
            required: "Debe ingresar una fecha"
        },
        "vigencia-hasta": {
            required: "Debe ingresar una fecha"
        },
        "valor-prima-min": {
            required: "Debe ingresar un valor",
            number: "Solo se permiten enteros"
        }
    }
});


jQuery(".form-copiar-regla-seguro").validate({
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
        "empresa-seguroCopiar": {
            required: !0
        },
        "porcentaje-primaCopiar": {
            required: !0,
            number: !0
        },
        "mark-upCopiar": {
            required: !0,
            number: !0
        },
        "vigencia-desdeCopiar": {
            required: !0
        },
        "vigencia-hastaCopiar": {
            required: !0
        },
        "valor-prima-minCopiar": {
            required: !0,
            number: !0
        }
    },
    messages: {
        "empresa-seguroCopiar": {
            required: "Debe seleccionar una empresa"
        },
        "porcentaje-primaCopiar": {
            required: "Debe ingresar un valor",
            number: "Solo se permiten enteros"
        },
        "mark-upCopiar": {
            required: "Debe ingresar un valor",
            number: "Solo se permiten enteros"
        },
        "vigencia-desdeCopiar": {
            required: "Debe ingresar una fecha"
        },
        "vigencia-hastaCopiar": {
            required: "Debe ingresar una fecha"
        },
        "valor-prima-minCopiar": {
            required: "Debe ingresar un valor",
            number: "Solo se permiten enteros"
        }
    }
});

jQuery(".form-editar-regla-seguro").validate({
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
        "empresa-seguroEditar": {
            required: !0
        },
        "porcentaje-primaEditar": {
            required: !0,
            number: !0
        },
        "mark-upEditar": {
            required: !0,
            number: !0
        },
        "vigencia-desdeEditar": {
            required: !0
        },
        "vigencia-hastaEditar": {
            required: !0
        },
        "valor-prima-minEditar": {
            required: !0,
            number: !0
        }
    },
    messages: {
        "empresa-seguroEditar": {
            required: "Debe seleccionar una empresa"
        },
        "porcentaje-primaEditar": {
            required: "Debe ingresar un valor",
            number: "Solo se permiten enteros"
        },
        "mark-upEditar": {
            required: "Debe ingresar un valor",
            number: "Solo se permiten enteros"
        },
        "vigencia-desdeEditar": {
            required: "Debe ingresar una fecha"
        },
        "vigencia-hastaEditar": {
            required: "Debe ingresar una fecha"
        },
        "valor-prima-minEditar": {
            required: "Debe ingresar un valor",
            number: "Solo se permiten enteros"
        }
    }
});