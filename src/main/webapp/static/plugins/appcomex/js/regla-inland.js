function mensajeReglaAgregada() { swal("Regla Agregada", "Se ha agregado la regla exitosamente", "success") };
function mensajeReglaCopiada() { swal("Regla Agregada", "Se ha copiado la regla exitosamente", "success") };
function mensajeReglaErrorExiste() { sweetAlert("Error", "La regla ya existe", "error") };
function mensajeReglaErrorServidor() { sweetAlert("Error", "ocurrio un error de servidor, intentelo nuevamente", "error") };
function mensajeReglaEditada() { swal("Regla Modificada", "Se ha modificado la regla exitosamente", "success") };



$(document).ready(function(){
    $('#tabla-regla-inland').DataTable();
    obtenerListaReglaInland();
    obtenerListaOrigen();
    obtenerListaTransportista();
});


function obtenerListaReglaInland() {

    $.ajax({
        url: 'lista-regla-inland',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);
            var btnCopiar = "";
            var btnEditar = "";
            var btnEliminar = "";
            var lista = "";

            var desde = "";
            var hasta = "";

            var tipo="";
            var transportista = "";
            var origen = "";
            var destino = "";
            var diaDesde = "";
            var diaHasta = "";
            var mesDesde = "";
            var mesHasta = "";
            var fechaDesde = "";
            var fechaHasta = "";
            var montoNeto = "";
            var moneda = "";
            var botones = "";

            var table = $('#tabla-regla-inland').DataTable();

            table.clear().draw();

            for (let i = 0; i < objeto.length; i++) {

                desde = new Date(objeto[i].vigenciaDesde);
                desde.setDate(desde.getDate()+1);
                diaDesde = desde.getDate();
                mesDesde = desde.getMonth()+1;

                if (diaDesde<10) {
                    diaDesde = "0"+ diaDesde;
                }

                if (mesDesde<10) {
                    mesDesde = "0"+mesDesde;
                }

                fechaDesde = diaDesde+"/"+mesDesde+"/"+desde.getFullYear();

                hasta = new Date(objeto[i].vigenciaHasta);
                hasta.setDate(hasta.getDate()+1);

                diaHasta = hasta.getDate();
                mesHasta = hasta.getMonth()+1;

                if (diaHasta<10) {
                    diaHasta = "0"+diaHasta;
                }

                if (mesHasta<10) {
                    mesHasta = "0"+mesHasta;
                }

                fechaHasta = diaHasta+"/"+mesHasta+"/"+hasta.getFullYear();

                btnCopiar = "<button type='button' class='btn btn-info btn-xs' title='Copiar regla' onclick=\"copiarReglaInland('" + objeto[i].tokenRi + "')\"><i class='fa fa-copy'></i></button>"
                btnEditar = "<button type='button' class='btn btn-warning btn-xs' title='Editar regla' onclick=\"editarReglaInland('" + objeto[i].tokenRi + "')\"><i class='fa fa-edit'></i></button>";
                btnEliminar = "<button type='button' class='btn btn-danger btn-xs' title='Eliminar regla' onclick=\"eliminarReglaInland('" + objeto[i].tokenRi + "')\"><i class='fa fa-close'></i></button>";
                
                
                tipo = objeto[i].dirIndir;
                transportista = objeto[i].transportista;
                origen = objeto[i].puertoDestino.nombre;
                destino = objeto[i].destino;
                montoNeto = objeto[i].montoNeto;
                moneda = objeto[i].moneda;

                botones = btnCopiar+" "+btnEditar+" "+btnEliminar;


                table.row.add([
                    tipo,transportista,origen,destino,fechaDesde,fechaHasta,montoNeto,moneda,botones
                ]).draw(false);
                
            }


        },
        error: function () {

            console.log('error');
        },
        complete: function () {

        }
    });

};

function obtenerListaTransportista() {

    $.ajax({
        url: 'lista-transportista-inland',
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

            $('#transportista').empty();
            $('#transportistaCopiar').empty();
            $('#transportistaEditar').empty();

            $('#transportista').append(seleccione);
            $('#transportistaCopiar').append(seleccione);
            $('#transportistaEditar').append(seleccione);


            for (let i = 0; i < objeto.length; i++) {
                lista = "<option value=" + objeto[i] + ">" + objeto[i] + "</option>"

                $('#transportista').append(lista);
                $('#transportistaCopiar').append(lista);
                $('#transportistaEditar').append(lista);

            }

        },
        error: function () {

        },
        complete: function () {

        }
    });
};

function obtenerListaOrigen() {

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

            $('#origen').empty();
            $('#origenCopiar').empty();
            $('#origenEditar').empty();

            $('#origen').append(seleccione);
            $('#origenCopiar').append(seleccione);
            $('#origenEditar').append(seleccione);


            for (let i = 0; i < objeto.length; i++) {
                lista = "<option value=" + objeto[i].idPuertoDes + ">" + objeto[i].nombre + "</option>"

                $('#origen').append(lista);
                $('#origenCopiar').append(lista);
                $('#origenEditar').append(lista);

            }

        },
        error: function () {

        },
        complete: function () {

        }
    });

};

$('#btn-agregar-regla-inland').click(function (event) {
    $('#modal-agregar-regla-inland').modal('show');
});


$('.form-agregar-regla-inland').submit(function (event) {

    event.preventDefault();

    var direcIndirec = $('select[id="dir-indir"]').val();
    var origen = parseInt($('select[id="origen"]').val());
    var destino = $('select[id="destino"]').val();
    var moneda = $('select[id=moneda]').val();
    var montoNeto = parseInt($('#monto-neto').val());
    var transportista = $('select[id="transportista"]').val();
    var vigenciaDesde = $('#vigencia-desde').val();
    var vigenciaHasta = $('#vigencia-hasta').val();


    var datos = {
        "destino": destino,
        "dirIndir": direcIndirec,
        "moneda": moneda,
        "montoNeto": montoNeto,
        "transportista": transportista,
        "vigenciaDesde": vigenciaDesde,
        "vigenciaHasta": vigenciaHasta,
        "puertoDestino": {
            "idPuertoDes": origen,
        }
    }

    if (direcIndirec != '' && origen != '' && destino != '' && moneda != '' && montoNeto != '' && transportista != '' && vigenciaDesde != '' && vigenciaHasta != '') {

        $.ajax({
            url: 'agregar-regla-inland',
            type: 'POST',
            data: JSON.stringify(datos),
            contentType: "application/json",
            dataType: 'json',
            beforeSend: function () {
                $('#preloader').show();

            },
            success: function (request) {

                if (request == 200) {
                    $('#modal-agregar-regla-inland').modal('hide')
                    obtenerListaReglaInland();
                    mensajeReglaAgregada();
                } else if (request == 300) {
                    mensajeReglaErrorExiste();
                } else if (request == 500) {
                    mensajeReglaErrorServidor();
                } else {

                }


            },
            error: function () {
                $('#preloader').fadeOut();
                mensajeReglaErrorServidor();
            },
            complete: function () {
                $('select[id="dir-indir"]').val('');
                $('select[id="origen"]').val('');
                $('select[id="destino"]').val('');
                $('select[id=moneda]').val('');
                $('#monto-neto').val('');
                $('select[id="transportista"]').val('');
                $('#vigencia-desde').val('');
                $('#vigencia-hasta').val('');


                $('#preloader').fadeOut();

            }

        });

    }//end if

});

function copiarReglaInland(token) {
    $('#modal-copiar-regla-inland').modal('show');
    cargarDatosModalCopiar(token);

};



function cargarDatosModalCopiar(token) {

    $.ajax({
        url: 'cargar-datos-modal/' + token,
        type: 'GET',
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            $('#dir-indirCopiar').val(objeto.dirIndir);
            $('#origenCopiar').val(objeto.puertoDestino.idPuertoDes);
            $('#destinoCopiar').val(objeto.destino);
            $('#monedaCopiar').val(objeto.moneda);
            $('#monto-netoCopiar').val(objeto.montoNeto);
            $('#transportistaCopiar').val(objeto.transportista);

        },
        error: function () {

        },
        complete: function () {

        }
    });
};

$('.form-copiar-regla-inland').submit(function (event) {

    event.preventDefault();

    var direcIndirec = $('select[id="dir-indirCopiar"]').val();
    var origen = parseInt($('select[id="origenCopiar"]').val());
    var destino = $('select[id="destinoCopiar"]').val();
    var moneda = $('select[id=monedaCopiar]').val();
    var montoNeto = parseInt($('#monto-netoCopiar').val());
    var transportista = $('select[id="transportistaCopiar"]').val();
    var vigenciaDesde = $('#vigencia-desdeCopiar').val();
    var vigenciaHasta = $('#vigencia-hastaCopiar').val();


    var datos = {
        "destino": destino,
        "dirIndir": direcIndirec,
        "moneda": moneda,
        "montoNeto": montoNeto,
        "transportista": transportista,
        "vigenciaDesde": vigenciaDesde,
        "vigenciaHasta": vigenciaHasta,
        "puertoDestino": {
            "idPuertoDes": origen,
        }
    }

    if (direcIndirec != '' && origen != '' && destino != '' && moneda != '' && montoNeto != '' && transportista != '' && vigenciaDesde != '' && vigenciaHasta != '') {

        $.ajax({
            url: 'agregar-regla-inland',
            type: 'POST',
            data: JSON.stringify(datos),
            contentType: "application/json",
            dataType: 'json',
            beforeSend: function () {
                $('#preloader').show();

            },
            success: function (request) {
                if (request == 200) {
                    $('#modal-copiar-regla-inland').modal('hide')
                    obtenerListaReglaInland();
                    mensajeReglaAgregada();
                } else if (request == 300) {
                    mensajeReglaErrorExiste();
                } else if (request == 500) {
                    mensajeReglaErrorServidor();
                } else {

                }

            },
            error: function () {
                $('#preloader').fadeOut();
                mensajeReglaErrorServidor();

            },
            complete: function () {
                $('select[id="dir-indirCopiar"]').val('');
                $('select[id="origenCopiar"]').val('');
                $('select[id="destinoCopiar"]').val('');
                $('select[id=monedaCopiar]').val('');
                $('#monto-netoCopiar').val('');
                $('select[id="transportistaCopiar"]').val('');
                $('#vigencia-desdeCopiar').val('');
                $('#vigencia-hastaCopiar').val('');

                $('#preloader').fadeOut();

            }

        });

    }//end if
});

function cargarDatosModalEditar(token) {

    $.ajax({
        url: 'cargar-datos-modal/' + token,
        type: 'GET',
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            $('#dir-indirEditar').val(objeto.dirIndir);
            $('#origenEditar').val(objeto.puertoDestino.idPuertoDes);
            $('#destinoEditar').val(objeto.destino);
            $('#monedaEditar').val(objeto.moneda);
            $('#monto-netoEditar').val(objeto.montoNeto);
            $('#transportistaEditar').val(objeto.transportista);
            $('#vigencia-desdeEditar').val(objeto.vigenciaDesde);
            $('#vigencia-hastaEditar').val(objeto.vigenciaHasta);

        },
        error: function () {

        },
        complete: function () {

        }
    });
};


function editarReglaInland(token) {
    $('#modal-editar-regla-inland').modal('show');
    cargarDatosModalEditar(token);

    $('.form-editar-regla-inland').submit(function (event) {

        event.preventDefault();

        actualizarDatosReglaInland(token);

    });
};


function actualizarDatosReglaInland(token) {

    var direcIndirec = $('select[id="dir-indirEditar"]').val();
    var origen = parseInt($('select[id="origenEditar"]').val());
    var destino = $('select[id="destinoEditar"]').val();
    var moneda = $('select[id=monedaEditar]').val();
    var montoNeto = parseInt($('#monto-netoEditar').val());
    var transportista = $('select[id="transportistaEditar"]').val();
    var vigenciaDesde = $('#vigencia-desdeEditar').val();
    var vigenciaHasta = $('#vigencia-hastaEditar').val();


    var datos = {
        "tokenRi": token,
        "destino": destino,
        "dirIndir": direcIndirec,
        "moneda": moneda,
        "montoNeto": montoNeto,
        "transportista": transportista,
        "vigenciaDesde": vigenciaDesde,
        "vigenciaHasta": vigenciaHasta,
        "puertoDestino": {
            "idPuertoDes": origen,
        }
    }

    if (direcIndirec != '' && origen != '' && destino != '' && moneda != '' && montoNeto != '' && transportista != '' && vigenciaDesde != '' && vigenciaHasta != '') {

        $.ajax({
            url: 'regla-inland-actualizar-datos',
            type: 'POST',
            data: JSON.stringify(datos),
            contentType: "application/json",
            dataType: 'json',
            beforeSend: function () {

                $('#preloader').show();

            },
            success: function (request) {
                if (request == 200) {
                    $('#modal-editar-regla-inland').modal('hide');
                    obtenerListaReglaInland();
                    mensajeReglaEditada();
                } else if (request == 100) {
                    $('#modal-editar-regla-inland').modal('hide');
                    mensajeReglaErrorExiste();
                } else if (request == 500) {
                    $('#modal-editar-regla-inland').modal('hide');
                    mensajeReglaErrorServidor();
                }



            },
            error: function () {
                $('#preloader').fadeOut();
                $('#modal-editar-regla-inland').modal('hide');
                mensajeReglaErrorServidor();

            },
            complete: function () {
                $('select[id="dir-indirEditar"]').val('');
                $('select[id="origenEditar"]').val('');
                $('select[id="destinoEditar"]').val('');
                $('select[id=monedaEditar]').val('');
                $('#monto-netoEditar').val('');
                $('select[id="transportistaEditar"]').val('');
                $('#vigencia-desdeEditar').val('');
                $('#vigencia-hastaEditar').val('');

                $('#preloader').fadeOut();

            }
        });
    }//end if
};


function eliminarReglaInland(token) {
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
                accionEliminarReglaInland(token);
            }
        });
};

function accionEliminarReglaInland(token) {

    $.ajax({
        url: 'eliminar-regla-inland/' + token,
        type: 'post',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {
            $('preloader').show();
        },
        success: function (request) {
            if (request == 200) {
                obtenerListaReglaInland();
                swal("Regla Borrada", "La regla ha sido eliminada", "success");
            } else if (request == 500) {
                mensajeReglaErrorServidor();
            } else {

            }
        },
        error: function () {
            mensajeReglaErrorServidor();
            $('preloader').fadeOut();
        },
        complete: function () {
            $('preloader').fadeOut();
        }
    });
};



jQuery(".form-agregar-regla-inland").validate({
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
        "dir-indir": {
            required: !0
        },
        "monto-neto": {
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
        },
        "origen": {
            required: !0
        },
        "destino": {
            required: !0
        }
    },
    messages: {
        "moneda": {
            required: "Seleccione una moneda"
        },
        "dir-indir": {
            required: "Seleccione un tipo"
        },
        "monto-neto": {
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
            required: "Ingrese un transportista"
        },
        "origen": {
            required: "Seleccione un origen"
        },
        "destino": {
            required: "Seleccione un destino"
        }
    }
});

jQuery(".form-copiar-regla-inland").validate({
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
        "dir-indirCopiar": {
            required: !0
        },
        "monto-netoCopiar": {
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
        },
        "origenCopiar": {
            required: !0
        },
        "destinoCopiar": {
            required: !0
        }
    },
    messages: {
        "monedaCopiar": {
            required: "Seleccione una moneda"
        },
        "dir-indirCopiar": {
            required: "Seleccione un tipo"
        },
        "monto-netoCopiar": {
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
            required: "Ingrese un transportista"
        },
        "origenCopiar": {
            required: "Seleccione un origen"
        },
        "destinoCopiar": {
            required: "Seleccione un destino"
        }
    }
});

jQuery(".form-editar-regla-inland").validate({
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
        "dir-indirEditar": {
            required: !0
        },
        "monto-netoEditar": {
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
        },
        "origenEditar": {
            required: !0
        },
        "destinoEditar": {
            required: !0
        }
    },
    messages: {
        "monedaEditar": {
            required: "Seleccione una moneda"
        },
        "dir-indirEditar": {
            required: "Seleccione un tipo"
        },
        "monto-netoEditar": {
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
            required: "Ingrese un transportista"
        },
        "origenEditar": {
            required: "Seleccione un origen"
        },
        "destinoEditar": {
            required: "Seleccione un destino"
        }
    }
});