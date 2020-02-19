


$(document).ready(function () {
    $('#seleccion-referencia').select2();
    obtenerListaReferenciaEmbarques();
    $('#transportista-inland').select2();
    obtenerListaTransportista();
    $('#compania-seguro').select2();
    obtListaCompaniaSeguro();
});

function mensajeErrorEmbarque() { sweetAlert("Embarque no cerrado", "El embarque seleccionado no se ha cerrado. Seleccione otro embarque", "warning") };
function mensajeErrorServidor() { sweetAlert("Error", "Error de servidor, intentelo nuevamente", "error") };


//funcion para cargar input selector lista de referencias
function obtenerListaReferenciaEmbarques() {

    $.ajax({
        url: "lista-referencia-embarques",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {

            $('#seleccion-referencia').empty();
            var opcion = "<option value='' class='form-control' selected>Seleccione</option>";

            for (let i = 0; i < request.length; i++) {

                $('#seleccion-referencia').append(opcion);
                opcion = "<option value=" + request[i] + " class='form-control'>" + request[i] + "</option>"

            }
        },
        error: function (status, request, error) {

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
            var seleccione = "<option value='' selected>Seleccione transportista</option>";

            $('#transportista-inland').empty();

            $('#transportista-inland').append(seleccione);

            for (let i = 0; i < objeto.length; i++) {
                lista = "<option value=" + objeto[i] + ">" + objeto[i] + "</option>"
                $('#transportista-inland').append(lista);

            }

        },
        error: function () {

        },
        complete: function () {

        }
    });
};


/**
 * INICIO DE FUNCIONES PARA MOSTRAR DETALLE DE EMBARQUE
 */


//funcion obtener estado de embarque seleccionado
function obtenerEstadoEmbarque(referencia) {

    $('#estado-embarque').val('');

    $.ajax({
        url: '/validar-estado-embarque/' + referencia,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            var arrayEnviado = ["Enviado", "Enviado", "Enviado", "Enviado"];

            var estadoEmbarque = "";

            if (objeto.length > 0) {

                if (JSON.stringify(arrayEnviado) == JSON.stringify(objeto)) {
                    estadoEmbarque = 'Cargo Cerrado';

                    $('#estado-embarque').css({
                        'color': 'limegreen',
                        'font-weight': 'bold'
                    });

                } else if (objeto.includes("Rechazado")) {
                    estadoEmbarque = 'Cargo Rechazado';

                    $('#estado-embarque').css({
                        'color': 'red',
                        'font-weight': 'bold'

                    });

                } else if (objeto.includes("Guardado")) {
                    estadoEmbarque = 'Pendiente env\u00EDo';

                    $('#estado-embarque').css({
                        'color': 'orange',
                        'font-weight': 'bold'

                    });

                } else if (objeto.includes("Enviado") && objeto.length<4) {

                    estadoEmbarque = 'Pendiente env\u00EDo';

                    $('#estado-embarque').css({
                        'color': 'orange',
                        'font-weight': 'bold'

                    });

                } else {
                    estadoEmbarque = 'No Guardado';
                    $('#estado-embarque').css({
                        'color': '#76838f',
                        'font-weight': 'bold'

                    });
                }

            } else {
                estadoEmbarque = 'No Guardado';
                $('#estado-embarque').css({
                    'color': '#76838f',
                    'font-weight': 'bold'

                });
            }

            $('#estado-embarque').val(estadoEmbarque);

            if (estadoEmbarque != 'No Guardado') {
                // enviarEstadoEmbarque(estadoEmbarque, blocString);

            }

        },
        error: function () {
            console.log('error funcion estado');
        },
        complete: function () {

        }
    });
};


/**
 * funcion que valida embarque cerrado con todas sus oc 
 * cargadas con invoice para luego mostrar el detalle del embarque
 */
function validarEmbarqueCerrado(referencia) {

    $.ajax({
        url: 'obtener-ordenes-compra-embarque/' + referencia,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {
            $('#preloader').show();
        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            var largo = objeto.length;
            var ocCargada = 0;

            for (let i = 0; i < objeto.length; i++) {
                if (objeto[i].estadoOrdenCompra) {
                    ocCargada = ocCargada + 1;
                }
            }

            //validando si se han validado todas las oc
            if (ocCargada == largo) {

                $('#detalle-embarque').attr('hidden', false);
                verDetalleFlete(referencia);
                verDetalleSeguro(referencia);
                verDetalleDerechos(referencia);
                verDetalleInland(referencia);
                verDetalleDescuentos(referencia);

            } else {

                mensajeErrorEmbarque();

            }
        },
        error: function () {
            $('#preloader').fadeOut();

        },
        complete: function () {
            $('#preloader').fadeOut();

        }
    });
};

//funcion redondear decimales
function redondeo(numero, decimales) {
    var flotante = parseFloat(numero);
    var resultado = Math.round(flotante * Math.pow(10, decimales)) / Math.pow(10, decimales);
    return resultado;
}



function verDetalleFlete(referencia) {

    $('#estado-flete').val('');
    $('#total-flete').val('');
    $('#tipo-cambio-flete').val('');
    $('#guardar-flete').attr('hidden', false);
    $('#reprocesar-regla-flete').attr('hidden', false);
    $('#guardar-flete').prop('disabled', false);
    $('#guardar-flete').addClass('btn-primary');
    $('#reprocesar-regla-flete').prop('disabled', false);
    $('#reprocesar-regla-flete').addClass('btn-info');

    $.ajax({
        url: 'ver-detalle-flete-embarque/' + referencia,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {

            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);
            var estado = "No guardado";

            if (objeto.length !== 0) {

                var total = 0;
                var tipoCambio = 0;
                var naviera = "";
                var header = "<th>Contenedor</th><th>OFT</th><th>DTHC</th><th>LTHC</th><th>BAF</th><th>ISPS</th>";
                $('#header-flete').html(header);


                var valorOFT = 0;
                var valorDTHC = 0;
                var valorLTHC = 0;
                var valorBAF = 0;
                var valorISPS = 0;
                var lista = 0;
                var tipoContenedor = "";
                var recargo = "";

                $('#tabla-flete').empty();

                var tipoContenedorAux = "";

                var contadorI = 0;


                for (let i = 0; i < objeto.length; i++) {
                    //variables de encabezado
                    if (objeto[i].detalleCydFlete.cydFlete.estado != null) {
                        estado = objeto[i].detalleCydFlete.cydFlete.estado;
                    }
                    total = objeto[i].detalleCydFlete.cydFlete.total;
                    tipoCambio = objeto[i].detalleCydFlete.cydFlete.tipoCambio;
                    naviera = objeto[i].detalleCydFlete.cydFlete.naviera;

                    total = addCommas(total);

                    //para detalle -->

                    tipoContenedor = objeto[i].detalleCydFlete.contenedor;
                    recargo = objeto[i].tipoRecargo;

                    switch (recargo) {
                        case "OFT":
                            valorOFT = objeto[i].monto + " " + objeto[i].moneda;
                            break;
                        case "DTHC":
                            valorDTHC = objeto[i].monto + " " + objeto[i].moneda;
                            break;
                        case "LTHC":
                            valorLTHC = objeto[i].monto + " " + objeto[i].moneda;
                            break;
                        case "BAF":
                            valorBAF = objeto[i].monto + " " + objeto[i].moneda;
                            break;
                        case "ISPS":
                            valorISPS = objeto[i].monto + " " + objeto[i].moneda;
                            break;
                    }

                    valorOFT = addCommas(valorOFT);
                    valorDTHC = addCommas(valorDTHC);
                    valorLTHC = addCommas(valorLTHC);
                    valorBAF = addCommas(valorBAF);
                    valorISPS = addCommas(valorISPS);


                    // naviera = objeto[i].naviera.nombreCompleto;

                    if ((i + 1) < objeto.length) {

                        contadorI = i + 1;

                        tipoContenedorAux = objeto[contadorI].detalleCydFlete.contenedor;

                        if (tipoContenedorAux != tipoContenedor) {

                            lista = "<tr><td>" + tipoContenedor + "</td><td>" + valorOFT + "</td><td>" + valorDTHC + "</td><td>" + valorLTHC + "</td><td>" + valorBAF + "</td><td>" + valorISPS + "</td></tr>";

                            $('#tabla-flete').append(lista);

                            valorOFT = 0;
                            valorDTHC = 0;
                            valorLTHC = 0;
                            valorBAF = 0;
                            valorISPS = 0;

                        }

                    } else {

                        lista = "<tr><td>" + tipoContenedor + "</td><td>" + valorOFT + "</td><td>" + valorDTHC + "</td><td>" + valorLTHC + "</td><td>" + valorBAF + "</td><td>" + valorISPS + "</td></tr>";

                        $('#tabla-flete').append(lista);
                    }

                }

                $('#estado-flete').val(estado);

                $('#total-flete').val('USD ' + total);
                $('#tipo-cambio-flete').val('CLP ' + tipoCambio);

                if (naviera != null) {
                    $('#naviera-flete').val(naviera);
                }
                if (estado == "Guardado") {

                    $('#estado-flete').css({
                        'color': 'limegreen'
                    });

                    $('#guardar-flete').prop('disabled', true);
                    $('#guardar-flete').removeClass('btn-primary');
                    $('#reprocesar-regla-flete').prop('disabled', true);
                    $('#reprocesar-regla-flete').removeClass('btn-info');

                } else if (estado == "Enviado") {
                    $('#guardar-flete').attr('hidden', true);
                    $('#reprocesar-regla-flete').attr('hidden', true);

                    $('#estado-flete').css({
                        'color': 'limegreen'
                    });

                } else if (estado == "Rechazado") {
                    $('#estado-flete').css({
                        'color': 'red'
                    });
                } else {

                }

                //end if validando si viene array construido
            } else {

                $('#estado-flete').val(estado);

            }
        },
        error: function (request, error, status) {

        },
        complete: function () {

        }
    });

};



//funcion para cargar la lista de seguro
function obtListaCompaniaSeguro() {
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

            $('#compania-seguro').empty();

            $('#compania-seguro').append(selDefault);

            for (let i = 0; i < objeto.length; i++) {

                lista = "<option value=" + objeto[i].idEmpresa + " >" + objeto[i].nombre + "</option>";

                $('#compania-seguro').append(lista);
            }


        },
        error: function () {
            console.log('error');

        },
        complete: function () {

        }
    });
};


function verDetalleSeguro(blocString) {

    $('#estado-seguro').val('');
    $('#total-seguro').val('');
    $('#tipo-cambio-seguro').val('');
    $('#numero-certificado-seguro').val('');
    $('#datepicker-autoclose').val('');
    $('#compania-seguro').val('');
    $('#guardar-seguro').attr('hidden', false);
    $('#reprocesar-regla-seguro').attr('hidden', false);
    $('#guardar-seguro').prop('disabled', false);
    $('#guardar-seguro').addClass('btn-primary');
    $('#reprocesar-regla-seguro').prop('disabled', false);
    $('#reprocesar-regla-seguro').addClass('btn-info');
    $('#numero-certificado-seguro').prop('disabled', false);
    $('.fecha-certificado-seguro').prop('disabled', false);
    $('#numero-certificado-seguro').addClass('form-control');
    $('.fecha-certificado-seguro').addClass('form-control');
    $('#numero-certificado-seguro').removeClass('form-control-plaintext');
    $('.fecha-certificado-seguro').removeClass('form-control-plaintext');
    $('#numero-certificado-seguro').removeAttr('readonly');
    $('.fecha-certificado-seguro').removeAttr('readonly');
    $('.fecha-certificado-seguro').attr('id', 'datepicker-autoclose');
    $('.fecha-certificado-seguro').attr('disabled', false);


    $.ajax({
        url: 'ver-detalle-seguro-embarque/' + blocString,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);
            var estado = "No guardado";

            if (objeto.estado != null) {
                estado = objeto.estado;
            }

            var formatoFecha = "";

            if (objeto.length > 0) {


                if (objeto.fechaCertificado !== null) {

                    var fecha = new Date(objeto.fechaCertificado);
                    fecha.setDate(fecha.getDate() + 2);
                    var mes = fecha.getMonth() + 1;
                    formatoFecha = fecha.getDate() + "/" + mes + "/" + fecha.getFullYear();

                }

                $('#estado-seguro').val(estado);
                $('#total-seguro').val('USD ' + objeto.total);
                $('#tipo-cambio-seguro').val('CLP ' + objeto.tipoCambio);
                $('#numero-certificado-seguro').val(objeto.nroCertificado);
                $('.fecha-certificado-seguro').val(formatoFecha);
                $('#compania-seguro').val(objeto.companiaSeguro);


                if (estado == 'Guardado') {

                    $('#estado-seguro').css({
                        'color': 'limegreen'
                    });
                    $('#guardar-seguro').prop('disabled', true);
                    $('#guardar-seguro').removeClass('btn-primary');
                    $('#reprocesar-regla-seguro').prop('disabled', true);
                    $('#reprocesar-regla-seguro').removeClass('btn-info');
                    $('#numero-certificado-seguro').prop('disabled', true);
                    $('.fecha-certificado-seguro').prop('disabled', true);
                    $('.fecha-certificado-seguro').removeAttr('id');



                } else if (estado == 'Enviado') {

                    $('#estado-seguro').css({
                        'color': 'limegreen'
                    });
                    $('#guardar-seguro').attr('hidden', true);
                    $('#reprocesar-regla-seguro').attr('hidden', true);
                    $('#numero-certificado-seguro').attr('readonly', "readonly");
                    $('.fecha-certificado-seguro').attr('readonly', "readonly");
                    $('.fecha-certificado-seguro').attr('disabled', true);
                    $('#numero-certificado-seguro').removeClass('form-control');
                    $('.fecha-certificado-seguro').removeClass('form-control');
                    $('.fecha-certificado-seguro').removeAttr('id');
                    $('#numero-certificado-seguro').addClass('form-control-plaintext');
                    $('.fecha-certificado-seguro').addClass('form-control-plaintext');

                } else if (estado == 'Rechazado') {
                    $('#estado-seguro').css({
                        'color': 'red'
                    });
                } else {

                }

            } else {

                //objeto null (no guardado)

                $('#estado-seguro').val(estado);

            }

        },
        error: function () {
            console.log('error en seguro');
        },
        complete: function () {

        }
    });

};

function verDetalleDerechos(blocString) {

    $('#estado-derechos').val('')
    $('#total-derechos').val('');
    $('#tipo-cambio-derechos').val('');
    $('#compania-derechos').val('');

    $('#guardar-derechos').prop('disabled', false);
    $('#guardar-derechos').addClass('btn-primary');
    $('#guardar-derechos').attr('hidden', false);


    $.ajax({
        url: 'ver-detalle-derecho-embarque/' + blocString,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);
            var estado = "No guardado";

            if (objeto.length > 0) {

                $('#total-derechos').val('CLP ' + objeto.total);
                $('#tipo-cambio-derechos').val('N/A');
                $('#compania-derechos').val(objeto.companiaDerecho);
                $('#estado-derechos').val(estado);

                if (estado == 'Guardado') {

                    $('#estado-derechos').css({
                        'color': 'limegreen'
                    });

                    $('#guardar-derechos').prop('disabled', true);
                    $('#guardar-derechos').removeClass('btn-primary');

                } else if (estado == 'Enviado') {

                    $('#estado-derechos').css({
                        'color': 'limegreen'
                    });
                    $('#guardar-derechos').attr('hidden', true);

                } else if (estado == 'Rechazado') {

                    $('#estado-derechos').css({
                        'color': 'red'
                    });
                }

            } else {
                $('#estado-derechos').val(estado);
            }



        },
        error: function () {

        },
        complete: function () {

        }
    });
};


function verDetalleInland(blocString) {

    $('#estado-inland').val('');
    $('#total-inland').val('');
    $('#tipo-cambio-inland').val('');
    $('#transportista-inland').val('');

    $('#guardar-inland').prop('disabled', false);
    $('#guardar-inland').addClass('btn-primary');
    $('#guardar-inland').attr('hidden', false);
    $('#reprocesar-regla-inland').prop('disabled', false);
    $('#reprocesar-regla-inland').addClass('btn-info');
    $('#reprocesar-regla-inland').attr('hidden', false);
    $('#transportista-inland').attr('readonly', false);
    $('#transportista-inland').attr('disabled', false);
    $('#transportista-inland').addClass('form-control');
    $('#transportista-inland').removeClass('form-control-plaintext');

    $.ajax({
        url: 'ver-detalle-inland-embarque/' + blocString,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);
            var estado = "No guardado";
            var lista = "";

            $('#tabla-inland').empty();


            if (objeto.length !== 0) {

                for (let i = 0; i < objeto.length; i++) {

                    lista = "<tr><td>" + objeto[i].nroContenedor + "</td><td>" + objeto[i].tipo + "</td><td>" + addCommas(objeto[i].monto) + "</td><td>" + objeto[i].moneda + "</td></tr>";

                    var headerInland = objeto[i].cydInland;

                    $('#tabla-inland').append(lista);

                }

                if (headerInland.estado != null) {
                    estado = headerInland.estado;
                }

                // $('#transportista-inland').val(headerInland.transportista);
                // $('#transportista-inland').select2().trigger('change');

                $('#total-inland').val('CLP ' + addCommas(headerInland.total));
                $('#tipo-cambio-inland').val(headerInland.tipoCambio);
                $('#estado-inland').val(estado);

                if (estado == 'Guardado') {

                    $('#estado-inland').css({
                        'color': 'limegreen'
                    });

                    $('#transportista-inland').select2('destroy');
                    $('#transportista-inland').prop('hidden', true);
                    $('#input-transportista-inland').val(headerInland.transportista);
                    $('#input-transportista-inland').prop('hidden', false);

                    $('#guardar-inland').prop('disabled', true);
                    $('#guardar-inland').removeClass('btn-primary');
                    $('#reprocesar-regla-inland').prop('disabled', true);
                    $('#reprocesar-regla-inland').removeClass('btn-info');
                    $('#transportista-inland').attr('readonly', true);
                    $('#transportista-inland').attr('disabled', true);



                } else if (estado == 'Enviado') {

                    $('#estado-inland').css({
                        'color': 'limegreen'
                    });

                    $('#transportista-inland').select2('destroy');
                    $('#transportista-inland').prop('hidden', true);
                    $('#input-transportista-inland').val(headerInland.transportista);
                    $('#input-transportista-inland').prop('hidden', false);
                    $('#guardar-inland').attr('hidden', true);
                    $('#reprocesar-regla-inland').attr('hidden', true);
                    $('#transportista-inland').attr('readonly', 'readonly');
                    $('#transportista-inland').attr('disabled', true);
                    $('#transportista-inland').removeClass('form-control');
                    $('#transportista-inland').addClass('form-control-plaintext');

                } else if (estado == 'Rechazado') {

                    $('#tabla-inland').empty();

                    var valorSeleccion = "INDIRECTO";

                    for (let i = 0; i < objeto.length; i++) {

                        valorSeleccion = "INDIRECTO";

                        if (objeto[i].tipo == 'INDIRECTO') {
                            valorSeleccion = 'DIRECTO'
                        }

                        lista = "<tr><td>" + objeto[i].nroContenedor + "</td><td><select id='seleccion-tipo-inland-" + i + "'><option value=" + objeto[i].tipo + " selected>" + objeto[i].tipo + "</option><option value=" + valorSeleccion + ">" + valorSeleccion + "</option></select></td><td>" + addCommas(objeto[i].monto) + "</td><td>" + objeto[i].moneda + "</td></tr>";

                        $('#tabla-inland').append(lista);

                    }

                    $('#input-transportista-inland').prop('hidden', true);
                    $('#transportista-inland').prop('hidden', false);
                    $('#transportista-inland').val(headerInland.transportista);
                    // $('#transportista-inland').select2().trigger('change');

                    $('#estado-inland').css({
                        'color': 'red'
                    });
                } else {

                }

            } else {
                $('#estado-inland').val(estado);
            }

        },
        error: function () {

        },
        complete: function () {

        }
    });
};


var listaContenedores = [];


function verDetalleDescuentos(blocString) {

    $('#total-descuentos').val('');
    $('#tipo-cambio-descuentos').val('');
    $('#estado-descuentos').val('');


    $.ajax({
        url: 'ver-detalle-invoice-embarque/' + blocString,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            if (objeto != null) {

                var descuento = 0;
                var onBoardDate = "";
                var fecha;
                var total = 0;
                var descRound = 0;

                for (let i = 0; i < objeto.length; i++) {
                    descuento = objeto[i].discountAmount;
                    descRound = redondeo(descuento, 2);
                    total = descuento + objeto[i].discountAmount;
                    total = addCommas(total);
                    descuento = addCommas(descuento);
                    fecha = new Date(objeto[i].onBoardDate);
                    fecha.setDate(fecha.getDate() + 2);
                    var mes = fecha.getMonth() + 1;

                    if (mes < 10) {
                        mes = "0" + mes;
                    }

                    listaContenedores.push(objeto[i].containerNumber);

                    onBoardDate = fecha.getDate() + "/" + mes + "/" + fecha.getFullYear();

                    var detalleDescuento = "<tr><td>" + objeto[i].commercialInvoiceNumber + "</td><td>" + objeto[i].vendor + "</td><td>-" + addCommas(descRound) + " USD</td></tr>";
                    $('#tabla-descuentos').append(detalleDescuento);
                }

                $('#total-descuentos').val('USD -' + total);
                $('#tipo-cambio-descuentos').val('N/A');
                $('#on-board-date').val(onBoardDate);

            }

        },
        error: function () {

        },
        complete: function () {

        }
    });
};



//funcion para ver el detalle de embarque
$('.form-ver-detalle-embarque').submit(function (event) {
    event.preventDefault();


    $('#transportista-inland').select2();

    //referencia selección bl-oc
    var referencia = $('#seleccion-referencia').val();

    if (referencia != '') {

        //valida estado de embarque cerrado para mostrar detalle
        validarEmbarqueCerrado(referencia);
        //pinta el estado de embarque en encabezado
        obtenerEstadoEmbarque(referencia);
        //pinta el numero de embarque en encabezado

        $.ajax({
            url: 'ver-detalle-encabezado-embarque/' + referencia,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function () {

            },
            success: function (request) {
                var respuesta = JSON.stringify(request);
                var objeto = JSON.parse(respuesta);

                $('#origen-embarque').val(objeto.origen);
                $('#naviera-flete').val(objeto.naviera);

            },
            error: function () {
                console.log('error');

            },
            complete: function () {

            }

        });

        $('#numero-embarque').val(referencia);

    }
});


//funcion quitar detalle al cambiar la seleccion de referencia
$('#seleccion-referencia').change(function (event) {
    $('#detalle-embarque').attr('hidden', true);

});


/**
 * FIN DE FUNCIONES PARA MOSTRAR DETALLE DE EMBARQUE
 */



function enviarEstadoEmbarque(estadoCargo, referencia) {

    var tipoCargo = "";
    var fd = new FormData();
    fd.append('estado_cargo', estadoCargo);
    fd.append('tipo_cargo', tipoCargo);

    $.ajax({
        url: 'guardar-estado-cargo-descuentos-embarque/' + referencia,
        type: 'POST',
        data: fd,
        beforeSend: function () {

        },
        success: function (request) {
            if (request == 200) {

                //se envia el estado del embarque

            } else if (request == 300) {
                console.log("embarque no encontrado");
            } else if (request == 500) {
                console.log("error de servidor al enviar el estado");
            }
        },
        error: function () {
            console.log("error de servidor al enviar el estado");
        },
        complete: function () {

        },
        cache: false,
        contentType: false,
        processData: false
    });
};


//funcion actualiza estado embarque para cada cargo al pinchar btn guardar
function actualizarEstadoEmbarque(referencia) {

    $('#estado-embarque').val('');

    $.ajax({
        url: '/validar-estado-embarque/' + referencia,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            var arrayEnviado = ["Enviado", "Enviado", "Enviado", "Enviado", "Enviado"];

            var estadoEmbarque = "";

            if (JSON.stringify(arrayEnviado) == JSON.stringify(objeto)) {
                estadoEmbarque = 'Cargo Cerrado';

                $('#estado-embarque').css({
                    'color': 'limegreen',
                    'font-weight': 'bold'
                });

            } else if (objeto.includes("Rechazado")) {
                estadoEmbarque = 'Cargo Rechazado';

                $('#estado-embarque').css({
                    'color': 'red',
                    'font-weight': 'bold'

                });
            } else {
                estadoEmbarque = 'Pendiente env\u00EDo';

                $('#estado-embarque').css({
                    'color': 'orange',
                    'font-weight': 'bold'

                });
            }

            $('#estado-embarque').val(estadoEmbarque);
            enviarEstadoEmbarque(estadoEmbarque, referencia);

            if (estadoEmbarque != 'No Guardado') {
                // enviarEstadoEmbarque(estadoEmbarque, blocString);

            }

        },
        error: function () {
            console.log('error funcion estado');
            $('#preloader').fadeOut();
        },
        complete: function () {
            $('#preloader').fadeOut();

        }
    });
};


/**
 * FUNCIONES PARA ENVIAR Y REPROCESAR
 */

var listaDetalleFlete = [];

$('#reprocesar-regla-flete').click(function () {

    var referencia = $('#seleccion-referencia').val();

    $('#total-flete').val('');
    $('#tipo-cambio-flete').val('');
    $('#guardar-flete').attr('hidden', false);
    $('#reprocesar-regla-flete').attr('hidden', false);
    $('#guardar-flete').prop('disabled', false);
    $('#guardar-flete').addClass('btn-primary');
    $('#reprocesar-regla-flete').prop('disabled', false);
    $('#reprocesar-regla-flete').addClass('btn-info');

    $.ajax({
        url: 'reprocesar-flete-embarque/' + referencia,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {
            $('#preloader').show();
        },
        success: function (request) {

            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            //asignando los valores a la listaDetalleFlete
            listaDetalleFlete = objeto;

            var tipoCambio = 771.50;

            if (objeto != null) {

                var total = 0;
                var naviera = "";
                var recargo = "";
                var tipoContenedor = "";

                var valorOFT = 0;
                var valorDTHC = 0;
                var valorLTHC = 0;
                var valorBAF = 0;
                var valorISPS = 0;
                var lista = 0;

                $('#tabla-flete').empty();

                var tipoContenedorAux = "";

                var contadorI = 0;


                for (let i = 0; i < objeto.length; i++) {

                    tipoContenedor = objeto[i].detalleCydFlete.contenedor;

                    recargo = objeto[i].tipoRecargo;

                    switch (recargo) {
                        case "OFT":
                            valorOFT = listaDetalleFlete[i].monto + " " + listaDetalleFlete[i].moneda;
                            break;
                        case "DTHC":
                            valorDTHC = listaDetalleFlete[i].monto + " " + listaDetalleFlete[i].moneda;
                            break;
                        case "LTHC":
                            valorLTHC = listaDetalleFlete[i].monto + " " + listaDetalleFlete[i].moneda;
                            break;
                        case "BAF":
                            valorBAF = listaDetalleFlete[i].monto + " " + listaDetalleFlete[i].moneda;
                            break;
                        case "ISPS":
                            valorISPS = listaDetalleFlete[i].monto + " " + listaDetalleFlete[i].moneda;
                            break;
                    }

                    //convierte valor en CLP a USD dependiendo tipo de cambio
                    monto = objeto[i].monto;

                    if (objeto[i].moneda == 'CLP') {
                        monto = monto / tipoCambio;
                    }

                    //sumando monto
                    total = total + monto;

                    // naviera = objeto[i].naviera.nombreCompleto;

                    if ((i + 1) < objeto.length) {

                        contadorI = i + 1;

                        tipoContenedorAux = objeto[contadorI].detalleCydFlete.contenedor;

                        if (tipoContenedorAux != tipoContenedor) {

                            lista = "<tr><td>" + tipoContenedor + "</td><td>" + addCommas(valorOFT) + "</td><td>" + addCommas(valorDTHC) + "</td><td>" + addCommas(valorLTHC) + "</td><td>" + addCommas(valorBAF) + "</td><td>" + addCommas(valorISPS) + "</td></tr>";

                            $('#tabla-flete').append(lista);

                            valorOFT = 0;
                            valorDTHC = 0;
                            valorLTHC = 0;
                            valorBAF = 0;
                            valorISPS = 0;

                        }

                    } else {

                        lista = "<tr><td>" + tipoContenedor + "</td><td>" + addCommas(valorOFT) + "</td><td>" + addCommas(valorDTHC) + "</td><td>" + addCommas(valorLTHC) + "</td><td>" + addCommas(valorBAF) + "</td><td>" + addCommas(valorISPS) + "</td></tr>";

                        $('#tabla-flete').append(lista);
                    }

                }

                total = redondeo(total, 2);
                total = addCommas(total);

                $('#total-flete').val('USD ' + total);
                $('#tipo-cambio-flete').val('CLP ' + tipoCambio);

            }
        },
        error: function (request, error, status) {
            $('#preloader').fadeOut();
            mensajeErrorServidor();
        },
        complete: function () {
            $('#preloader').fadeOut();

        }
    });
});


$('#transportista-inland').change(function () {

    //limpiando los campos
    $('#tabla-inland').empty();
    $('#total-inland').val('');
    $('#tipo-cambio-inland').val('');

});

var listaDetalleInland = [];

$('#reprocesar-regla-inland').click(function (event) {

    var nroEmbarque = $('#seleccion-referencia').val();
    var transportista = $('#transportista-inland').val();

    if (transportista != '') {

        $.ajax({
            url: 'reprocesar-inland-embarque/' + nroEmbarque + "/" + transportista,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'JSON',
            beforeSend: function () {
                $('#preloader').show();
            },
            success: function (request) {
                var respuesta = JSON.stringify(request);
                var objeto = JSON.parse(respuesta);

                //asignando el array a variable detalleInland
                listaDetalleInland = objeto;


                var lista = "";
                var total = 0;
                var moneda = 0;
                var monto = 0;

                $('#tabla-inland').empty();
                $('#total-inland').val('');
                var tipoCambio = 787.7;

                var valorSeleccion = "";

                for (let i = 0; i < objeto.length; i++) {

                    moneda = objeto[i].moneda;
                    monto = objeto[i].monto;

                    valorSeleccion = "INDIRECTO";

                    if (objeto[i].tipo == "INDIRECTO") {
                        valorSeleccion = "DIRECTO";
                    }

                    lista = "<tr><td>" + objeto[i].nroContenedor + "</td><td><select id='seleccion-tipo-inland-" + i + "'><option value=" + objeto[i].tipo + " selected>" + objeto[i].tipo + "</option><option value=" + valorSeleccion + ">" + valorSeleccion + "</option></select></td><td>" + addCommas(monto) + "</td><td>" + moneda + "</td></tr>";


                    if (moneda === 'USD') {
                        monto = monto * tipoCambio;
                    }

                    total = total + monto;

                    $('#tabla-inland').append(lista);

                }

                var valorTotal = addCommas(total);

                $('#total-inland').val("CLP " + valorTotal);
                $('#tipo-cambio-inland').val("CLP " + tipoCambio);

            },
            error: function () {
                $('#preloader').fadeOut();
            },
            complete: function () {
                $('#preloader').fadeOut();
            }

        });

    } else {

    }


});

//enviar estado flete y actualizar estado de cargo embarque
$('.form-flete').submit(function (event) {
    event.preventDefault();

    var estado = "Guardado";
    var naviera = $('#naviera-flete').val();
    var tipoCambio = $('#tipo-cambio-flete').val();
    var total = $('#total-flete').val();

    var parteTc = tipoCambio.split(" ");
    var valorTipoCambio = parteTc[1];

    var parteTot = total.split(" ");
    var valorTotal = parteTot[1];
    valorTotal = valorTotal.replace(/,/g, "");

    var cydFleteNuevo = {
        "idCydFlete": 1,
        "estado": estado,
        "naviera": naviera,
        "tipoCambio": parseFloat(valorTipoCambio),
        "token": "cydfle",
        "total": parseFloat(valorTotal),
    };

    var flete = JSON.stringify(cydFleteNuevo);
    var objetoFlete = JSON.parse(flete);

    for (let i = 0; i < listaDetalleFlete.length; i++) {

        listaDetalleFlete[i].detalleCydFlete.cydFlete = objetoFlete;
        listaDetalleFlete[i].detalleCydFlete.token = "algo";

    }

    //referencia selección bl-oc
    var referencia = $('#seleccion-referencia').val();

    if (valorTotal !== '' && tipoCambio !== '') {

        $.ajax({
            url: 'guardar-cyd-flete-embarque/' + referencia,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(listaDetalleFlete),
            dataType: 'json',
            beforeSend: function () {
                $('#preloader').show();
            },
            success: function (request) {

                if (request == 200) {

                    var estado = "Guardado";

                    $('#estado-flete').css({
                        'color': 'limegreen'
                    });
                    $('#estado-flete').val(estado);
                    $('#guardar-flete').prop('disabled', true);
                    $('#guardar-flete').removeClass('btn-primary');
                    $('#reprocesar-regla-flete').prop('disabled', true);
                    $('#reprocesar-regla-flete').removeClass('btn-info');

                    actualizarEstadoEmbarque(referencia);

                } else if (request == 100) {
                    console.log('no se encontro el embarque');
                } else if (request == 500) {
                    console.log('error de servidor');

                }

            },
            error: function () {
                $('#preloader').fadeOut();
                console.log('error al enviar flete');
            },
            complete: function () {
                $('#preloader').fadeOut();
            }

        });

    }

});

$('#compania-seguro').change(function () {

    $('#total-seguro').val('');
    $('#tipo-cambio-seguro').val('');
    $('#tabla-seguro').empty();

});


//reprocesar regla seguro
$('#reprocesar-regla-seguro').click(function () {

    var nroEmbarque = $('#numero-embarque').val();

    var compSeguro = $('#compania-seguro').val();

    var idCompaniaSeguro = parseInt(compSeguro);

    if (compSeguro !== '') {



        $.ajax({
            url: 'reprocesar-seguro-embarque/' + nroEmbarque + '/' + idCompaniaSeguro,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'JSON',
            beforeSend: function () {
                $('#preloader').show();
            },
            success: function (request) {
                var respuesta = JSON.stringify(request);
                var objeto = JSON.parse(respuesta);

                console.log(objeto);

                if (objeto.length !== 0) {


                }



            },
            error: function () {
                $('#preloader').fadeOut();
            },
            complete() {
                $('#preloader').fadeOut();
            }
        });

    }//end if

});


//enviar estado seguro y actualizar estado de cargo embarque
$('.form-seguro').submit(function (event) {
    event.preventDefault();

    var referencia = $('#seleccion-referencia').val();

    var nroCertificado = $('#numero-certificado-seguro').val();
    var fecha = $('.fecha-certificado-seguro').val();
    var total = $('#total-seguro').val();

    if (nroCertificado !== '' && fecha !== '' && total !== '') {

        var parte = fecha.split("/");
        var dia = parte[0];
        var mes = parte[1];
        var anio = parte[2];
        var fechaReal = mes + "/" + dia + "/" + anio;
        var fechaCertificado = new Date(fechaReal);

        //referencia selección embarque

        var datos = {
            "estado": "Guardado",
            "total": 600.5,
            "companiaSeguro": "CHUBB SEGUROS S.A.",
            "fechaCertificado": fechaCertificado,
            "nroCertificado": nroCertificado,
            "tipoCambio": 779.1
        }

        $.ajax({
            url: 'guardar-cyd-seguro-embarque/' + referencia,
            type: 'POST',
            data: JSON.stringify(datos),
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function () {
                $('#preloader').show();
            },
            success: function (request) {

                if (request == 200) {

                    var estado = "Guardado";

                    $('#estado-seguro').css({
                        'color': 'limegreen'
                    });

                    $('#estado-seguro').val(estado);
                    $('#numero-certificado-seguro').prop('disabled', true);
                    $('.fecha-certificado-seguro').prop('disabled', true);

                    $('#guardar-seguro').prop('disabled', true);
                    $('#guardar-seguro').removeClass('btn-primary');
                    $('#reprocesar-regla-seguro').prop('disabled', true);
                    $('#reprocesar-regla-seguro').removeClass('btn-info');

                    actualizarEstadoEmbarque(referencia);


                } else if (request == 100) {
                    console.log('no se ha encontrado el embarque');
                } else if (request == 500) {
                    console.log('error de servidor');
                }

            },
            error: function () {
                console.log('error de servidor en cargo seguro');
                $('#preloader').fadeOut();

            },
            complete: function () {
                $('#preloader').fadeOut();

            }

        });


    }//end if

});

//enviar estado derechos y actualizar estado de cargo embarque
$('.form-derechos').submit(function (event) {
    event.preventDefault();

    //referencia seleccion bl-oc
    var referencia = $('#seleccion-referencia').val();

    var datos = {
        "estado": "Guardado",
        "tipoCambio": 0,
        "total": 5000,
        "companiaDerecho": "TESORERIA GENERAL DE LA REPUBLICA"
    }

    $.ajax({
        url: 'guardar-cyd-derecho-embarque/' + referencia,
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {

            if (request == 200) {

                var estado = "Guardado";

                $('#estado-derechos').css({
                    'color': 'limegreen',
                });

                $('#estado-derechos').val(estado);
                $('#total-derechos').val('CLP 5000');
                $('#tipo-cambio-derechos').val('N/A');
                $('#compania-derechos').val('TESORERIA GENERAL DE LA REPUBLICA');

                $('#guardar-derechos').prop('disabled', true);
                $('#guardar-derechos').removeClass('btn-primary');

                actualizarEstadoEmbarque(referencia);


            } else if (request == 100) {
                console.log('no se ha encontrado el embarque');

            } else if (request == 500) {
                console.log('error de servidor');

            }

        },
        error: function () {
            console.log('error de servidor');

        },
        complete: function () {

        }
    });
});


//enviar estado inland y actualizar estado de cargo embarque
$('.form-inland').submit(function (event) {
    event.preventDefault();

    //referencia seleccion bl-oc
    var referencia = $('#seleccion-referencia').val();




    var valorTotal = $('#total-inland').val();
    var transportista = $('#transportista-inland').val();

    if (transportista != '' && valorTotal !== '') {

        var parteTotal = valorTotal.split(" ");
        var total = parteTotal[1];
        total = total.replace(/,/gi, "");
        var valorTipoCambio = $('#tipo-cambio-inland').val();
        var parteTipoCambio = valorTipoCambio.split(" ");
        var tipoCambio = parteTipoCambio[1];


        var datos = {
            "estado": "Guardado",
            "tipoCambio": parseFloat(tipoCambio),
            "total": parseFloat(total),
            "transportista": transportista
        }

        var formatoJson = JSON.stringify(datos);
        var objeto = JSON.parse(formatoJson);

        for (let i = 0; i < listaDetalleInland.length; i++) {
            listaDetalleInland[i].cydInland = objeto;
            listaDetalleInland[i].tipo = $("#seleccion-tipo-inland-" + i + "").val();
        }

        $.ajax({
            url: 'guardar-cyd-inland-embarque/' + referencia,
            type: 'POST',
            data: JSON.stringify(listaDetalleInland),
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function () {
                $('#preloader').show();
            },
            success: function (request) {

                if (request == 200) {

                    var estado = "Guardado";

                    $('#estado-inland').css({
                        'color': 'limegreen'
                    });

                    $('#estado-inland').val(estado);
                    $('#total-inland').val(valorTotal);
                    $('#tipo-cambio-inland').val(valorTipoCambio);
                    $('#transportista-inland').attr('readonly', true);
                    $('#transportista-inland').select2('destroy');
                    $('#transportista-inland').prop('hidden', true);
                    $('#input-transportista-inland').val(transportista);
                    $('#input-transportista-inland').prop('hidden', false);

                    $('#reprocesar-regla-inland').prop('disabled', true);
                    $('#reprocesar-regla-inland').removeClass('btn-info');
                    $('#guardar-inland').prop('disabled', true);
                    $('#guardar-inland').removeClass('btn-primary');

                    for (let i = 0; i < listaDetalleInland.length; i++) {
                        $("#seleccion-tipo-inland-" + i + "").attr('readonly', 'readonly');
                        $("#seleccion-tipo-inland-" + i + "").attr('disabled', true);
                        $("#seleccion-tipo-inland-" + i + "").addClass('form-control-plaintext');
                    }

                    actualizarEstadoEmbarque(referencia);


                } else if (request == 100) {
                    console.log('no se ha encontrado el embarque');


                } else if (request == 500) {
                    console.log('error de servidor');

                }

            },
            error: function () {
                console.log('error de servidor');
                $('#preloader').fadeOut();

            },
            complete: function () {
                $('#preloader').fadeOut();

            }
        });
    }//end if
});


function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

//jquery


jQuery(".form-ver-detalle-embarque").validate({
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
        "seleccion-referencia": {
            required: !0
        }
    },
    messages: {
        "seleccion-referencia": {
            required: "Seleccione una referencia"
        }
    }
});

jQuery(".form-seguro").validate({
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
        "numero-certificado-seguro": {
            required: !0,
            number: !0
        },
        "fecha-certificado-seguro": {
            required: !0,
        },
        "compania-seguro": {
            required: !0
        }
    },
    messages: {
        "numero-certificado-seguro": {
            required: "Ingrese un n\u00FAmero de certificado",
            number: "Solo se permiten n\u00FAmeros"
        },
        "fecha-certificado-seguro": {
            required: "Ingrese una fecha"
        },
        "compania-seguro": {
            required: "Seleccione una compa\u00F1\u00EDa"
        }
    }
});

jQuery(".form-inland").validate({
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
        "transportista-inland": {
            required: !0,
        }
    },
    messages: {
        "transportista-inland": {
            required: "Seleccione un transportista",
        }
    }
});
