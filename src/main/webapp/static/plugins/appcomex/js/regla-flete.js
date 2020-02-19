function mensajeReglaAgregada() { swal("Regla Agregada", "Se ha agregado la regla exitosamente", "success") };
function mensajeReglaCopiada() { swal("Regla Agregada", "Se ha copiado la regla exitosamente", "success") };
function mensajeReglaError() { sweetAlert("Error", "La regla ya existe", "error") };
function mensajeReglaEditada() { swal("Regla Modificada", "Se ha modificado la regla exitosamente", "success") };
function mensajeReglaErrorServidor() { sweetAlert("Error", "ocurrio un error de servidor, intentelo nuevamente", "error") };



$(document).ready(function(){
    $('#tabla-regla-flete').DataTable();
    obtenerListaReglaFlete();
    obtenerListaNavieras();
    obtenerListaPuertoDestino();
    obtenerListaPuertoOrigen();
    obtenerListaTipoContenedor();
});


$('#btn-agregar-regla').click(function (event) {
    $('#modal-agregar-regla').modal('show');
});


function obtenerListaReglaFlete() {

    $.ajax({
        url: 'lista-regla-flete',
        type: 'GET',
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);
            var lista = "";
            var btnCopiar = "";
            var btnEliminar = "";
            var table = $('#tabla-regla-flete').DataTable();
            table.clear().draw();
            var naviera = "";
            var puertoOrigen = "";
            var puertoDestino = "";
            var tipoContenedor = "";
            var recargo = "";
            var valorNeto = "";
            var moneda = "";
            var transportista = "";
            var botones = "";
            var diaDesde = "";
            var diaHasta = "";
            var mesDesde = "";
            var mesHasta = "";

            for (let i = 0; i < objeto.length; i++) {

                var desde = new Date(objeto[i].vigenciaDesde);
                desde.setDate(desde.getDate()+1);
                diaDesde = desde.getDate();
                mesDesde = desde.getMonth()+1;

                if (diaDesde<10) {
                    diaDesde = "0"+diaDesde;
                }

                if (mesDesde<10) {
                    mesDesde = "0"+mesDesde;
                }

                var fechaDesde = diaDesde+"/"+mesDesde+"/"+desde.getFullYear();

                var hasta = new Date(objeto[i].vigenciaHasta);
                hasta.setDate(hasta.getDate()+1);
                diaHasta = hasta.getDate();
                mesHasta = hasta.getMonth()+1;

                if (diaHasta<10) {
                    diaHasta="0"+diaHasta;
                }

                if (mesHasta<10) {
                    mesHasta = "0"+mesHasta;
                }

                var fechaHasta = diaHasta+"/"+mesHasta+"/"+hasta.getFullYear();

                naviera = objeto[i].naviera.nombreNaviera;
                puertoOrigen = objeto[i].puertoOrigen.nombre;
                puertoDestino = objeto[i].puertoDestino.nombre;
                tipoContenedor = objeto[i].tipoContenedor.tipoContenedor;
                recargo = objeto[i].recargo;
                valorNeto = objeto[i].valorNeto;
                moneda = objeto[i].moneda;
                transportista = objeto[i].transportista;


                btnCopiar = "<button type='button' class='btn btn-info btn-xs' title='Copiar regla' onclick=\"copiarReglaFlete('" + objeto[i].token + "')\"><i class='fa fa-copy'></i></button>"
                btnEditar = "<button type='button' class='btn btn-warning btn-xs' title='Editar regla' onclick=\"editarReglaFlete('" + objeto[i].token + "')\"><i class='fa fa-edit'></i></button>";
                btnEliminar = "<button type='button' class='btn btn-danger btn-xs' title='Eliminar regla' onclick=\"eliminarReglaFlete('" + objeto[i].token + "')\"><i class='fa fa-close'></i></button>";
                
                botones = btnCopiar+" "+btnEditar+" "+btnEliminar;
                
                table.row.add([
                    naviera,puertoOrigen,puertoDestino,tipoContenedor,fechaDesde,fechaHasta,recargo,valorNeto,moneda,transportista,botones
                ]).draw(false);

            }

        },
        error: function () {

        },
        complete: function () {

        }

    });

};

function cargarDatosModalEditar(token) {

    $.ajax({
        url: 'cargar-datos-regla-flete/' + token,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            $('#navieraEditar').val(objeto.naviera.idNaviera);
            $('#puerto-origenEditar').val(objeto.puertoOrigen.idPuertoOrg);
            $('#puerto-destinoEditar').val(objeto.puertoDestino.idPuertoDes);
            $('#tipo-contenedorEditar').val(objeto.tipoContenedor.idContenedor);
            $('#vigencia-desdeEditar').val(objeto.vigenciaDesde);
            $('#vigencia-hastaEditar').val(objeto.vigenciaHasta);
            $('#recargoEditar').val(objeto.recargo);
            $('#valor-netoEditar').val(objeto.valorNeto);
            $('#monedaEditar').val(objeto.moneda);
            $('#transportistaEditar').val(objeto.transportista);

        },
        error: function () {

        },
        complete: function () {

        }
    });

};

function cargarDatosModalCopiar(token) {

    $.ajax({
        url: 'cargar-datos-regla-flete/' + token,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            $('#navieraCopiar').val(objeto.naviera.idNaviera);
            $('#puerto-origenCopiar').val(objeto.puertoOrigen.idPuertoOrg);
            $('#puerto-destinoCopiar').val(objeto.puertoDestino.idPuertoDes);
            $('#tipo-contenedorCopiar').val(objeto.tipoContenedor.idContenedor);
            $('#recargoCopiar').val(objeto.recargo);
            $('#valor-netoCopiar').val(objeto.valorNeto);
            $('#monedaCopiar').val(objeto.moneda);
            $('#transportistaCopiar').val(objeto.transportista);


        },
        error: function () {

        },
        complete: function () {

        }
    });
}



$('#form-agregar-regla-flete').submit(function (event) {
    event.preventDefault();

    var moneda = $('select[id=moneda]').val();
    var recargo = $('select[id=recargo]').val();
    var valorNeto = parseInt($('#valor-neto').val());
    var vigenciaDesde = $('#vigencia-desde').val();
    var vigenciaHasta = $('#vigencia-hasta').val();
    var transportista = $('#transportista').val();
    var idPuertoDes = parseInt($('select[id=puerto-destino]').val());
    var idPuertoOrg = parseInt($('select[id=puerto-origen]').val());
    var idNaviera = parseInt($('select[id=naviera]').val());
    var idContenedor = parseInt($('select[id=tipo-contenedor]').val());


    var datos = {
        "moneda": moneda,
        "recargo": recargo,
        "valorNeto": valorNeto,
        "vigenciaDesde": vigenciaDesde,
        "vigenciaHasta": vigenciaHasta,
        "transportista": transportista.toUpperCase(),
        "puertoDestino": {
            "idPuertoDes": idPuertoDes
        },
        "puertoOrigen": {
            "idPuertoOrg": idPuertoOrg
        },
        "naviera": {
            "idNaviera": idNaviera
        },
        "tipoContenedor": {
            "idContenedor": idContenedor
        }
    }

    if (moneda != '' && recargo != '' && valorNeto != '' && vigenciaDesde != '' && vigenciaHasta != '' && transportista.length >= 6 && transportista.length <= 255 && idPuertoDes != '' && idPuertoOrg != '' && idNaviera != '' && idContenedor != '') {



        $.ajax({
            url: 'agregar-regla-flete',
            type: 'POST',
            data: JSON.stringify(datos),
            contentType: "application/json",
            dataType: 'json',
            beforeSend: function () {
                $('#preloader').show();

            },
            success: function (request) {

                if (request == 200) {
                    obtenerListaReglaFlete();
                    $('#modal-agregar-regla').modal('hide');
                    mensajeReglaAgregada();
                }else if(request == 100){
                    obtenerListaReglaFlete();
                    $('#modal-agregar-regla').modal('hide');
                    mensajeErrorExiste();
                }else if(request == 500){
                    obtenerListaReglaFlete();
                    $('#modal-agregar-regla').modal('hide');
                    
                }
            },
            error: function () {
                $('#preloader').fadeOut();
                $('#modal-agregar-regla').modal('hide');
                mensajeReglaErrorServidor();
            },
            complete: function () {

                //limpiando campos
                $('select[id=moneda]').val('');
                $('select[id=recargo]').val('');
                $('#valor-neto').val('');
                $('#vigencia-desde').val('');
                $('#vigencia-hasta').val('');
                $('#transportista').val('');
                $('select[id=puerto-destino]').val('');
                $('select[id=puerto-origen]').val('');
                $('select[id=naviera]').val('');
                $('select[id=tipo-contenedor]').val('');
                $('#preloader').fadeOut();

            }
        });

    }//end if
});

function editarReglaFlete(token) {

    cargarDatosModalEditar(token);
    $('#modal-editar-regla').modal('show');
    $('#form-editar-regla-flete').submit(function (event) {
        event.preventDefault();
        actualizarDatosReglaFlete(token);
    });

};

function copiarReglaFlete(token) {
    cargarDatosModalCopiar(token);
    $('#modal-copiar-regla').modal('show');

};

$('#form-copiar-regla-flete').submit(function (event) {
    event.preventDefault();
    copiarDatosReglaFlete();




});

function actualizarDatosReglaFlete(token) {

    event.preventDefault();

    var moneda = $('select[id=monedaEditar]').val();
    var recargo = $('select[id=recargoEditar]').val();
    var valorNeto = parseInt($('#valor-netoEditar').val());
    var vigenciaDesde = $('#vigencia-desdeEditar').val();
    var vigenciaHasta = $('#vigencia-hastaEditar').val();
    var transportista = $('#transportistaEditar').val();
    var idPuertoDes = parseInt($('select[id=puerto-destinoEditar]').val());
    var idPuertoOrg = parseInt($('select[id=puerto-origenEditar]').val());
    var idNaviera = parseInt($('select[id=navieraEditar]').val());
    var idContenedor = parseInt($('select[id=tipo-contenedorEditar]').val());

    var datos = {
        "moneda": moneda,
        "recargo": recargo,
        "valorNeto": valorNeto,
        "vigenciaDesde": vigenciaDesde,
        "vigenciaHasta": vigenciaHasta,
        "transportista": transportista.toUpperCase(),
        "puertoDestino": {
            "idPuertoDes": idPuertoDes
        },
        "puertoOrigen": {
            "idPuertoOrg": idPuertoOrg
        },
        "naviera": {
            "idNaviera": idNaviera
        },
        "tipoContenedor": {
            "idContenedor": idContenedor
        }
    }

    if (moneda != '' && recargo != '' && valorNeto != '' && vigenciaDesde != '' && vigenciaHasta != '' && transportista.length >= 6 && transportista.length <= 255 && idPuertoDes != '' && idPuertoOrg != '' && idNaviera != '' && idContenedor != '') {

        $.ajax({
            url: 'editar-regla-flete/' + token,
            type: 'POST',
            data: JSON.stringify(datos),
            contentType: "application/json",
            dataType: 'json',
            beforeSend: function () {
                $('#preloader').show();

            },
            success: function (request) {

                if (request == 200) {
                    $('#modal-editar-regla').modal('hide');
                    obtenerListaReglaFlete();
                    mensajeReglaEditada();
                } else if (request == 100) {
                    $('#modal-editar-regla').modal('hide');
                    mensajeErrorExiste();
                } else if (request == 300) {
                    $('#modal-editar-regla').modal('hide');
                    mensajeErrorNotFound();
                } else if (request == 500) {
                    $('#modal-editar-regla').modal('hide');
                    mensajeErrorServidor();
                }

            },
            error: function () {
                $('#preloader').fadeOut();
                mensajeErrorServidor();

            },
            complete: function () {
                //limpiando campos
                $('select[id=monedaEditar]').val(0);
                $('select[id=recargoEditar]').val(0);
                $('#valor-netoEditar').val('');
                $('#vigencia-desdeEditar').val('');
                $('#vigencia-hastaEditar').val('');
                $('#transportistaEditar').val('');
                $('select[id=puerto-destinoEditar]').val(0);
                $('select[id=puerto-origenEditar]').val(0);
                $('select[id=navieraEditar]').val(0);
                $('select[id=tipo-contenedorEditar]').val(0);
                $('#preloader').fadeOut();

            }
        });

    }//end if

};

function copiarDatosReglaFlete() {

    var moneda = $('select[id=monedaCopiar]').val();
    var recargo = $('select[id=recargoCopiar]').val();
    var valorNeto = parseInt($('#valor-netoCopiar').val());
    var vigenciaDesde = $('#vigencia-desdeCopiar').val();
    var vigenciaHasta = $('#vigencia-hastaCopiar').val();
    var transportista = $('#transportistaCopiar').val();
    var idPuertoDes = parseInt($('select[id=puerto-destinoCopiar]').val());
    var idPuertoOrg = parseInt($('select[id=puerto-origenCopiar]').val());
    var idNaviera = parseInt($('select[id=navieraCopiar]').val());
    var idContenedor = parseInt($('select[id=tipo-contenedorCopiar]').val());

    var datos = {
        "moneda": moneda,
        "recargo": recargo,
        "valorNeto": valorNeto,
        "vigenciaDesde": vigenciaDesde,
        "vigenciaHasta": vigenciaHasta,
        "transportista": transportista,
        "puertoDestino": {
            "idPuertoDes": idPuertoDes
        },
        "puertoOrigen": {
            "idPuertoOrg": idPuertoOrg
        },
        "naviera": {
            "idNaviera": idNaviera
        },
        "tipoContenedor": {
            "idContenedor": idContenedor
        }
    }


    if (moneda != 0 && recargo != 0 && valorNeto > 0 && vigenciaDesde != '' && vigenciaHasta != '' && transportista != '' && idPuertoDes != 0 && idPuertoOrg != 0 && idNaviera != 0 && idContenedor != 0) {

        //limpiando campos
        $('select[id=monedaCopiar]').val(0);
        $('select[id=recargoCopiar]').val(0);
        $('#valor-netoCopiar').val('');
        $('#vigencia-desdeCopiar').val('');
        $('#vigencia-hastaCopiar').val('');
        $('#transportistaCopiar').val('');
        $('select[id=puerto-destinoCopiar]').val(0);
        $('select[id=puerto-origenCopiar]').val(0);
        $('select[id=navieraCopiar]').val(0);
        $('select[id=tipo-contenedorCopiar]').val(0);

        $.ajax({
            url: 'agregar-regla-flete/',
            type: 'POST',
            data: JSON.stringify(datos),
            contentType: "application/json",
            dataType: 'json',
            beforeSend: function () {
                $('#preloader').show();
            },
            success: function (request) {

                if (request == 200) {
                    obtenerListaReglaFlete();
                    $('#modal-copiar-regla').modal('hide');
                    mensajeReglaCopiada();
                } else if (request == 100) {
                    obtenerListaReglaFlete();
                    $('#modal-copiar-regla').modal('hide');
                    mensajeReglaError();
                }


            },
            error: function () {
                $('#preloader').fadeOut();
                mensajeReglaErrorServidor();

            },
            complete: function () {
                $('#preloader').fadeOut();

            }
        });

    }//end if
};


function eliminarReglaFlete(token) {
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
                accionEliminarReglaFlete(token);
            }
        });
};

function accionEliminarReglaFlete(token) {

    $.ajax({
        url: 'eliminar-regla-flete/' + token,
        type: 'POST',
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {
            $('#preloader').show();
        },
        success: function () {
            obtenerListaReglaFlete();
            swal("Regla Borrada", "La regla ha sido eliminada", "success");
        },
        error: function () {
            $('#preloader').fadeOut();
            mensajeReglaErrorServidor();
        },
        complete: function () {
            $('#preloader').fadeOut();

        }
    });
};


function obtenerListaNavieras() {

    $.ajax({
        url: 'lista-navieras',
        type: 'GET',
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);
            var lista = "";
            var seleccione = "<option value='' selected>Seleccione</option>";

            $('#naviera').empty();
            $('#navieraCopiar').empty();
            $('#navieraEditar').empty();
            $('#naviera').append(seleccione);
            $('#navieraCopiar').append(seleccione);
            $('#navieraEditar').append(seleccione);

            for (let i = 0; i < objeto.length; i++) {
                lista = "<option value=" + objeto[i].idNaviera + ">" + objeto[i].nombreNaviera + "</option>"
                $('#naviera').append(lista);
                $('#navieraCopiar').append(lista);
                $('#navieraEditar').append(lista);
            }


        },
        error: function () {

        },
        complete: function () {

        }
    });
};

function obtenerListaPuertoOrigen() {

    $.ajax({
        url: 'lista-puerto-origen',
        type: 'GET',
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);
            var lista = "";
            var seleccione = "<option value='' selected>Seleccione</option>";

            $('#puerto-origen').empty();
            $('#puerto-origenCopiar').empty();
            $('#puerto-origenEditar').empty();
            $('#puerto-origen').append(seleccione);
            $('#puerto-origenCopiar').append(seleccione);
            $('#puerto-origenEditar').append(seleccione);

            for (let i = 0; i < objeto.length; i++) {
                lista = "<option value=" + objeto[i].idPuertoOrg + ">" + objeto[i].nombre + "</option>"

                $('#puerto-origen').append(lista);
                $('#puerto-origenCopiar').append(lista);
                $('#puerto-origenEditar').append(lista);
            }


        },
        error: function () {

        },
        complete: function () {

        }
    });
};

function obtenerListaPuertoDestino() {

    $.ajax({
        url: 'lista-puerto-destino',
        type: 'GET',
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);
            var lista = "";
            var seleccione = "<option value='' selected>Seleccione</option>";

            $('#puerto-destino').empty();
            $('#puerto-destinoCopiar').empty();
            $('#puerto-destinoEditar').empty();
            $('#puerto-destino').append(seleccione);
            $('#puerto-destinoCopiar').append(seleccione);
            $('#puerto-destinoEditar').append(seleccione);

            for (let i = 0; i < objeto.length; i++) {
                lista = "<option value=" + objeto[i].idPuertoDes + ">" + objeto[i].nombre + "</option>"

                $('#puerto-destino').append(lista);
                $('#puerto-destinoCopiar').append(lista);
                $('#puerto-destinoEditar').append(lista);

            }

        },
        error: function () {

        },
        complete: function () {

        }
    });
};

function obtenerListaTipoContenedor() {

    $.ajax({
        url: 'lista-tipo-contenedor',
        type: 'GET',
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);
            var lista = "";
            var seleccione = "<option value='' selected>Seleccione</option>";

            $('#tipo-contenedor').empty();
            $('#tipo-contenedorCopiar').empty();
            $('#tipo-contenedorEditar').empty();
            $('#tipo-contenedor').append(seleccione);
            $('#tipo-contenedorCopiar').append(seleccione);
            $('#tipo-contenedorEditar').append(seleccione);

            for (let i = 0; i < objeto.length; i++) {
                lista = "<option value=" + objeto[i].idContenedor + ">" + objeto[i].tipoContenedor + "</option>"

                $('#tipo-contenedor').append(lista);
                $('#tipo-contenedorCopiar').append(lista);
                $('#tipo-contenedorEditar').append(lista);

            }

        },
        error: function () {

        },
        complete: function () {

        }
    });
};


jQuery(".form-agregar-regla-flete").validate({
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
        "moneda": {
            required: !0
        },
        "recargo": {
            required: !0
        },
        "valor-neto": {
            required: !0,
            digits: !0
        },
        "vigencia-desde": {
            required: !0
        },
        "vigencia-hasta": {
            required: !0
        },
        "transportista": {
            required: !0,
            minlength: 6,
            maxlength: 255
        },
        "puerto-origen": {
            required: !0
        },
        "puerto-destino": {
            required: !0
        },
        "naviera": {
            required: !0
        },
        "tipo-contenedor": {
            required: !0
        }
    },
    messages: {
        "moneda": {
            required: "Seleccione una moneda"
        },
        "recargo": {
            required: "Seleccione un recargo"
        },
        "valor-neto": {
            required: "Ingrese un valor neto",
            digits: "Ingrese numeros positivos"
        },
        "vigencia-desde": {
            required: "Ingrese una vigencia"
        },
        "vigencia-hasta": {
            required: "Ingrese una vigencia"
        },
        "transportista": {
            required: "Ingrese un transportista",
            minlength: "Debe contener al menos 6 caracteres",
            maxlength: "Debe contener 255 caracteres como máximo"
        },
        "puerto-origen": {
            required: "Seleccione un puerto"
        },
        "puerto-destino": {
            required: "Seleccione un puerto"
        },
        "naviera": {
            required: "Seleccione una naviera"
        },
        "tipo-contenedor": {
            required: "Seleccione un tipo de contenedor"
        }
    }
});

jQuery(".form-copiar-regla-flete").validate({
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
        "monedaCopiar": {
            required: !0
        },
        "recargoCopiar": {
            required: !0
        },
        "valor-netoCopiar": {
            required: !0,
            digits: !0
        },
        "vigencia-desdeCopiar": {
            required: !0
        },
        "vigencia-hastaCopiar": {
            required: !0
        },
        "transportistaCopiar": {
            required: !0,
            minlength: 6,
            maxlength: 255
        },
        "puerto-origenCopiar": {
            required: !0
        },
        "puerto-destinoCopiar": {
            required: !0
        },
        "navieraCopiar": {
            required: !0
        },
        "tipo-contenedorCopiar": {
            required: !0
        }
    },
    messages: {
        "monedaCopiar": {
            required: "Seleccione una moneda"
        },
        "recargoCopiar": {
            required: "Seleccione un recargo"
        },
        "valor-netoCopiar": {
            required: "Ingrese un valor neto",
            digits: "Ingrese numeros positivos"
        },
        "vigencia-desdeCopiar": {
            required: "Ingrese una vigencia"
        },
        "vigencia-hastaCopiar": {
            required: "Ingrese una vigencia"
        },
        "transportistaCopiar": {
            required: "Ingrese un transportista",
            minlength: "Debe contener al menos 3 caracteres",
            maxlength: "Debe contener 255 caracteres como máximo"
        },
        "puerto-origenCopiar": {
            required: "Seleccione un puerto"
        },
        "puerto-destinoCopiar": {
            required: "Seleccione un puerto"
        },
        "navieraCopiar": {
            required: "Seleccione una naviera"
        },
        "tipo-contenedorCopiar": {
            required: "Seleccione un tipo de contenedor"
        }
    }
});


jQuery(".form-editar-regla-flete").validate({
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
        "monedaEditar": {
            required: !0
        },
        "recargoEditar": {
            required: !0
        },
        "valor-netoEditar": {
            required: !0,
            digits: !0
        },
        "vigencia-desdeEditar": {
            required: !0
        },
        "vigencia-hastaEditar": {
            required: !0
        },
        "transportistaEditar": {
            required: !0,
            minlength: 6,
            maxlength: 255
        },
        "puerto-origenEditar": {
            required: !0
        },
        "puerto-destinoEditar": {
            required: !0
        },
        "navieraEditar": {
            required: !0
        },
        "tipo-contenedorEditar": {
            required: !0
        }
    },
    messages: {
        "monedaEditar": {
            required: "Seleccione una moneda"
        },
        "recargoEditar": {
            required: "Seleccione un recargo"
        },
        "valor-netoEditar": {
            required: "Ingrese un valor neto",
            digits: "Ingrese numeros positivos"
        },
        "vigencia-desdeEditar": {
            required: "Ingrese una vigencia"
        },
        "vigencia-hastaEditar": {
            required: "Ingrese una vigencia"
        },
        "transportistaEditar": {
            required: "Ingrese un transportista",
            minlength: "Debe contener al menos 3 caracteres",
            maxlength: "Debe contener 255 caracteres como máximo"
        },
        "puerto-origenEditar": {
            required: "Seleccione un puerto"
        },
        "puerto-destinoEditar": {
            required: "Seleccione un puerto"
        },
        "navieraEditar": {
            required: "Seleccione una naviera"
        },
        "tipo-contenedorEditar": {
            required: "Seleccione un tipo de contenedor"
        }
    }
});


