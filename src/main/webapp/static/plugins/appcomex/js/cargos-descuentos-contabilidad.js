
/*
* Cargos descuentos Contabilidad js
*/

$(document).ready(function () {
    obtenerListaReferenciaEmbarques();
    $('#seleccion-referencia').select2();
});

function mensajeErrorEmbarque() { sweetAlert("Embarque no cerrado", "El embarque seleccionado no se ha cerrado. Seleccione otro embarque", "warning") };
function mensajeEmbarqueNoGuardado() { sweetAlert("Atenci\u00F3n", "El embarque esta cerrado pero no se han calculado los cargos. Seleccione otro embarque") };



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



//funcion redondear decimales
function redondeo(numero, decimales) {
    var flotante = parseFloat(numero);
    var resultado = Math.round(flotante * Math.pow(10, decimales)) / Math.pow(10, decimales);
    return resultado;
};

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

//declarando los arreglos
var arrayestados = [];
var arrayObtenerEstado = [];
var arrayEnviado = ["Enviado", "Enviado", "Enviado", "Enviado", "Enviado"];


function listaEstados(estado) {
    arrayestados.push(estado);
    return arrayestados;
};



//obtengo estado de embarque
function obtenerEstadoEmbarque(nroEmbarque) {

    $('#estado-embarque').val('');

    $.ajax({
        url: '/validar-estado-embarque/' + nroEmbarque,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforesend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            var estadoEmbarque = "";

            arrayObtenerEstado = objeto;

            if (JSON.stringify(arrayEnviado) == JSON.stringify(objeto)) {
                estadoEmbarque = "Cargo Cerrado";

                estadoCargo = estadoEmbarque;

                $('#estado-embarque').css({
                    'color': 'limegreen'
                });

            } else if (objeto.includes("Rechazado")) {
                estadoEmbarque = "Cargo Rechazado";

                estadoCargo = estadoEmbarque;

                $('#estado-embarque').css({
                    'color': 'red'
                });
            } else {
                estadoEmbarque = "Pendiente env\u00EDo";

                estadoCargo = "Cargo Pendiente"

                $('#estado-embarque').css({
                    'color': 'orange'
                });
            }

            $('#estado-embarque').val(estadoEmbarque);


        },
        error: function () {
            console.log('error funcion estado');
        },
        complete: function () {

        }
    });
};


/**
 * enviar actual estado de embarque
 */
function enviarEstadoCargoModuloEmbarque(tipoCargo, estadoCargo, nroEmbarque) {

    var fd = new FormData();
    fd.append('estado_cargo', estadoCargo);
    fd.append('tipo_cargo', tipoCargo);

    $.ajax({
        url: 'guardar-estado-cargo-descuentos-embarque/' + nroEmbarque,
        type: 'POST',
        data: fd,
        beforesend: function () {

        },
        success: function (request) {
            if (request == 200) {
                console.log("Estado enviado ok, estado: " + estadoCargo);

                console.log(arrayObtenerEstado);

                if (JSON.stringify(arrayObtenerEstado) == JSON.stringify(arrayEnviado)) {
                    estadoCargo = "Cargo Cerrado";

                    enviarCargoCerrado(tipoCargo, estadoCargo, blocString);
                }


            } else if (request == 300) {
                console.log("embarque no encontrado");
            } else if (request == 500) {
                console.log("error de servidor al enviar el estado");
            }
        },
        error: function () {
            console.log("error de servidor al enviar el estado");
            $('#preloader').fadeOut();

        },
        complete: function () {
            $('#preloader').fadeOut();
        },
        cache: false,
        contentType: false,
        processData: false
    });
};

//enviar estado de cargo cerrado
function enviarCargoCerrado(tipoCargo, estadoCargo, blocString) {

    var fd = new FormData();
    fd.append('estado_cargo', estadoCargo);
    fd.append('tipo_cargo', tipoCargo);

    $.ajax({
        url: 'guardar-estado-cargo-descuentos-embarque/' + blocString,
        type: 'POST',
        data: fd,
        beforesend: function () {

        },
        success: function (request) {
            if (request == 200) {
                console.log("Se envio ok, estado: " + estadoCargo);

            } else if (request == 300) {
                console.log("embarque no encontrado");
            } else if (request == 500) {
                console.log("error de servidor al enviar el estado");
            }
        },
        error: function () {
            console.log("error de servidor al enviar el estado");
            $('#preloader').fadeOut();

        },
        complete: function () {
            $('#preloader').fadeOut();
        },
        cache: false,
        contentType: false,
        processData: false
    });
};


//ver detalle invoice y descuentos
function verDetalleInvoiceYDescuentosConta(blocString) {

    $('#total-invoice').val('');
    $('#total-invoice-convert').val('');
    $('#tipo-cambio-invoice').val('');
    $('#estado-invoice').val('');
    $('#total-descuentos').val('');
    $('#total-descuentos-convert').val('');
    $('#tipo-cambio-descuentos').val('');
    $('#estado-descuentos').val('');
    $('#enviar-invoice').attr('hidden', false);
    $('#enviar-descuentos').attr('hidden', false);
    $('#card-invoice').attr('hidden', false);
    $('#card-descuentos').attr('hidden', false);

    $.ajax({
        url: 'ver-detalle-invoice-embarque/' + blocString,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforesend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            if (objeto.length >= 1) {

                var totalSuma = 0;
                var descuentosSuma = 0;
                var estado = "";
                var onBoardDate = "";
                var montoInv = 0;
                var montoDesc = 0;


                for (let i = 0; i < objeto.length; i++) {

                    fecha = new Date(objeto[i].onBoardDate);
                    fecha.setDate(fecha.getDate() + 2);
                    var mes = fecha.getMonth() + 1;

                    if (mes < 10) {
                        mes = "0" + mes;
                    }

                    onBoardDate = fecha.getDate() + "/" + mes + "/" + fecha.getFullYear();

                    montoInv = redondeo(objeto[i].amount, 2);
                    montoDesc = redondeo(objeto[i].discountAmount, 2);

                    totalSuma = totalSuma + objeto[i].amount;
                    descuentosSuma = descuentosSuma + objeto[i].discountAmount;
                    estado = objeto[i].estado;

                    var detalleInvoice = "<tr><td>" + objeto[i].commercialInvoiceNumber + "</td><td>" + objeto[i].vendor + "</td><td>" + addCommas(montoInv) + "</td></tr>";
                    var detalleDescuento = "<tr><td>" + objeto[i].commercialInvoiceNumber + "</td><td>" + objeto[i].vendor + "</td><td>-" + addCommas(montoDesc) + "</td></tr>";

                    $('#tabla-invoice').append(detalleInvoice);
                    $('#tabla-descuentos').append(detalleDescuento);

                }

                $('#on-board-date').val(onBoardDate);

                var total = redondeo(totalSuma, 2);
                var descuentos = redondeo(descuentosSuma, 2);

                var tipoCambio = 766.7;
                var convertInv = total * tipoCambio;
                var totalConvertInv = redondeo(convertInv, 2);
                var convertDesc = descuentos * tipoCambio;
                var totalConvertDesc = redondeo(convertDesc, 2);

                if (estado == "Guardado") {
                    estado = "Pendiente env\u00EDo";

                    $('#estado-invoice').css({
                        'color': 'orange'
                    });
                    $('#estado-descuentos').css({
                        'color': 'orange'
                    });

                } else if (estado == 'Enviado') {

                    $('#enviar-invoice').attr('hidden', true);
                    $('#enviar-descuentos').attr('hidden', true);

                    $('#estado-invoice').css({
                        'color': 'limegreen'
                    });
                    $('#estado-descuentos').css({
                        'color': 'limegreen'
                    });

                } else if (estado == 'Rechazado') {
                    $('#enviar-invoice').attr('hidden', true);
                    $('#enviar-descuentos').attr('hidden', true);

                    $('#estado-invoice').css({
                        'color': 'red'
                    });
                    $('#estado-descuentos').css({
                        'color': 'red'
                    });
                }

                $('#estado-descuentos').val(estado);
                $('#total-invoice').val('USD ' + addCommas(total));
                $('#total-invoice-convert').val('CLP ' + addCommas(totalConvertInv));
                $('#tipo-cambio-invoice').val(tipoCambio);
                $('#estado-invoice').val(estado);
                $('#total-descuentos').val('USD -' + addCommas(descuentos));
                $('#total-descuentos-convert').val('CLP -' + addCommas(totalConvertDesc));
                $('#tipo-cambio-descuentos').val(tipoCambio);

            } else {
                $('#card-invoice').attr('hidden', true);
                $('#card-descuentos').attr('hidden', true);
            }

        },
        error: function () {

        },
        complete: function () {

        }
    });

};

/**
 * ver detalle flete
 */

function verDetalleFleteConta(blocString) {

    $('#estado-flete').val('');
    $('#total-flete').val('');
    $('#total-flete-convert').val('');
    $('#tipo-cambio-flete').val('');
    $('#naviera-flete').val('');
    $('#enviar-flete').attr('hidden', false);
    $('#rechazar-flete').attr('hidden', false);
    $('#card-flete').attr('hidden', false);

    $.ajax({
        url: 'ver-detalle-flete-embarque/' + blocString,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforesend: function () {

        },
        success: function (request) {

            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);
            var estado = "";
            var total = 0;
            var totalConvert = 0;
            var tipoCambio = 0;
            var naviera = "";
            var header = "";

            if (objeto.length > 0) {

                header = "<th>Contenedor</th><th>OFT</th><th>DTHC</th><th>LTHC</th><th>BAF</th><th>ISPS</th>";
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

                totalConvert = total * tipoCambio;

                $('#total-flete').val('USD ' + addCommas(total));
                $('#total-flete-convert').val('CLP ' + addCommas(totalConvert));
                $('#tipo-cambio-flete').val('CLP ' + tipoCambio);

                if (naviera != null) {
                    $('#naviera-flete').val(naviera);
                }
                if (estado == 'Guardado') {

                    estado = 'Pendiente env\u00EDo';

                    $('#estado-flete').css({
                        'color': 'orange'
                    });

                    $('#guardar-flete').prop('disabled', true);
                    $('#guardar-flete').removeClass('btn-primary');
                    $('#reprocesar-regla-flete').prop('disabled', true);
                    $('#reprocesar-regla-flete').removeClass('btn-info');

                } else if (estado == "Enviado") {

                    $('#enviar-flete').attr('hidden', true);
                    $('#rechazar-flete').attr('hidden', true);

                    $('#estado-flete').css({
                        'color': 'limegreen'
                    });

                } else if (estado == 'Rechazado') {

                    $('#estado-flete').css({
                        'color': 'red'
                    });

                    $('#rechazar-flete').attr('hidden',true);
                    $('#enviar-flete').attr('hidden',true);

                }

                $('#estado-flete').val(estado);

                //end if validando si viene array construido
            } else {

                $('#estado-flete').val(estado);

            }

        },
        error: function () {
            // $('#card-flete').attr('hidden', true);
            console.log('error');

        },
        complete: function () {

        }
    });
};

/**
 * ver detalle seguro
 */
function verDetalleSeguroConta(blocString) {

    $('#estado-seguro').val('');
    $('#total-seguro').val('');
    $('#total-seguro-convert').val('');
    $('#tipo-cambio-seguro').val('');
    $('#numero-certificado-seguro').val('');
    $('#fecha-certificado-seguro').val('');
    $('#compania-seguro').val('');
    $('#enviar-seguro').attr('hidden', false);
    $('#rechazar-seguro').attr('hidden', false);
    $('#card-seguro').attr('hidden', false);

    $.ajax({
        url: 'ver-detalle-seguro-embarque/' + blocString,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforesend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            if (objeto.estado != null) {


                var fecha = new Date(objeto.fechaCertificado);
                fecha.setDate(fecha.getDate() + 2);
                var mes = fecha.getMonth() + 1;
                var formatoFecha = fecha.getDate() + "/" + mes + "/" + fecha.getFullYear();

                var total = redondeo(objeto.total, 2);
                var tipoCambio = objeto.tipoCambio;
                var convert = total * tipoCambio;
                var convertTotal = redondeo(convert, 2);
                var estado = objeto.estado;

                listaEstados(estado);

                if (estado == "Guardado") {
                    estado = "Pendiente env\u00EDo";

                    $('#estado-seguro').css({
                        'color': 'orange'
                    });

                } else if (estado == 'Enviado') {

                    $('#enviar-seguro').attr('hidden', true);
                    $('#rechazar-seguro').attr('hidden', true);

                    $('#estado-seguro').css({
                        'color': 'limegreen'
                    });

                } else if (estado == 'Rechazado') {

                    $('#enviar-seguro').attr('hidden', true);
                    $('#rechazar-seguro').attr('hidden', true);

                    $('#estado-seguro').css({
                        'color': 'red'
                    });
                }


                $('#estado-seguro').val(estado);
                $('#total-seguro').val('USD ' + total);
                $('#total-seguro-convert').val('CLP ' + convertTotal);
                $('#tipo-cambio-seguro').val('CLP ' + tipoCambio);
                $('#numero-certificado-seguro').val(objeto.nroCertificado);
                $('#fecha-certificado-seguro').val(formatoFecha);
                $('#compania-seguro').val(objeto.companiaSeguro);



            } else {
                $('#card-seguro').attr('hidden', true);
            }


        },
        error: function () {

        },
        complete: function () {

        }
    });

};

/*
 *ver detalle derechos 
 */
function verDetalleDerechosConta(blocString) {

    $('#estado-derechos').val('')
    $('#total-derechos').val('');
    $('#total-derechos-convert').val('');
    $('#tipo-cambio-derechos').val('');
    $('#compania-derechos').val('');
    $('#enviar-derechos').attr('hidden', false);
    $('#rechazar-derechos').attr('hidden', false);
    $('#card-derechos').attr('hidden', false);

    $.ajax({
        url: 'ver-detalle-derecho-embarque/' + blocString,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforesend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            if (objeto.estado != null) {


                var total = objeto.total;
                var tipoCambio = 766.7;
                var convert = total / tipoCambio;
                var convertTotal = redondeo(convert, 2);
                var estado = objeto.estado;

                listaEstados(estado);

                if (estado == "Guardado") {
                    estado = "Pendiente env\u00EDo";

                    $('#estado-derechos').css({
                        'color': 'orange'
                    });
                } else if (estado == 'Enviado') {

                    $('#estado-derechos').css({
                        'color': 'limegreen'
                    });

                    $('#enviar-derechos').attr('hidden', true);
                    $('#rechazar-derechos').attr('hidden', true);

                } else if (estado == 'Rechazado') {
                    $('#estado-derechos').css({
                        'color': 'red'
                    });

                    $('#enviar-derechos').attr('hidden', true);
                    $('#rechazar-derechos').attr('hidden', true);
                }

                $('#total-derechos').val('CLP ' + total);
                $('#total-derechos-convert').val('USD ' + convertTotal);
                $('#tipo-cambio-derechos').val(tipoCambio);
                $('#compania-derechos').val(objeto.companiaDerecho);
                $('#estado-derechos').val(estado);

            } else {
                $('#card-derechos').attr('hidden', true);

            }

        },
        error: function () {

        },
        complete: function () {

        }
    });
};


/**
 * ver detalle inland
 */
function verDetalleInlandConta(blocString) {

    $('#estado-inland').val('')
    $('#total-inland').val('');
    $('#total-inland-convert').val('');
    $('#tipo-cambio-inland').val('');
    $('#transportista-inland').val('');

    $('#enviar-inland').attr('hidden', false);
    $('#rechazar-inland').attr('hidden', false);
    $('#card-inland').attr('hidden', false);

    $.ajax({
        url: 'ver-detalle-inland-embarque/' + blocString,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforesend: function () {

        },
        success: function (request) {

            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);
            var estado = "No guardado";
            var lista = "";
            var total = 0;
            var convertTotal = 0;

            $('#tabla-inland').empty();


            if (objeto.length !== 0) {

                for (let i = 0; i < objeto.length; i++) {

                    lista = "<tr><td>" + objeto[i].nroContenedor + "</td><td>" + objeto[i].tipo + "</td><td>" + addCommas(objeto[i].monto) + "</td><td>" + objeto[i].moneda + "</td></tr>";

                    var headerInland = objeto[i].cydInland;

                    total = headerInland.total;

                    $('#tabla-inland').append(lista);

                }

                if (headerInland.estado !== null && headerInland.estado !== '') {
                    estado = headerInland.estado;
                }

                // $('#transportista-inland').val(headerInland.transportista);
                // $('#transportista-inland').select2().trigger('change');


                if (estado == "Guardado") {

                    estado = "Pendiente env\u00EDo";
                    $('#estado-inland').css({
                        'color': 'orange'
                    });

                } else if (estado == 'Enviado') {

                    $('#estado-inland').css({
                        'color': 'limegreen'
                    });

                    $('#enviar-inland').attr('hidden', true);
                    $('#rechazar-inland').attr('hidden', true);

                } else if (estado == 'Rechazado') {

                    $('#estado-inland').css({
                        'color': 'red'
                    });

                    $('#enviar-inland').attr('hidden', true);
                    $('#rechazar-inland').attr('hidden', true);
                }

                convertTotal = total / headerInland.tipoCambio;

                $('#estado-inland').val(estado);
                $('#total-inland').val('CLP ' + addCommas(total));
                $('#tipo-cambio-inland').val(headerInland.tipoCambio);
                $('#total-inland-convert').val('USD ' + addCommas(convertTotal));
                $('#transportista-inland').val(headerInland.transportista);


            } else {

                // $('#card-inland').attr('hidden', true);
            }

        },
        error: function () {

        },
        complete: function () {

        }
    });
};

/**
 * ver detalle todos cargos
 */
$('#seleccion-referencia').change(function (event) {

    var seleccionReferencia = $(this).val();

    if (seleccionReferencia !== '') {


        $('#detalle-embarque').attr('hidden', true);
        $('#header-detalle-embarque').attr('hidden', true);


        var blOc = $('select[id=seleccion-referencia]').val();
        var blocString = "" + blOc + "";

        arrayestados = [];

    }

});



/**
 * mostrar detalle todos cargos
 */
function mostrarDetalleCargosDescuentos() {

    if (arrayestados.length == 4) {

        $('#detalle-embarque').attr('hidden', false);
        $('#header-detalle-embarque').attr('hidden', false);

        if (arrayestados.includes('Rechazado')) {
            $('#detalle-embarque').attr('hidden', false);
            $('#header-detalle-embarque').attr('hidden', false);
            $('#estado-embarque').val("Cargo rechazado");
            $('#estado-embarque').css({
                'color': 'red',
                'font-weight': 'bold'
            });

        } else if (arrayestados.includes('Guardado')) {
            $('#detalle-embarque').attr('hidden', false);
            $('#header-detalle-embarque').attr('hidden', false);
            $('#estado-embarque').val("Pendiente env\u00EDo");
            $('#estado-embarque').css({
                'color': 'orange',
                'font-weight': 'bold'
            });

        } else {
            $('#detalle-embarque').attr('hidden', false);
            $('#header-detalle-embarque').attr('hidden', false);
            $('#estado-embarque').val("Cargo cerrado");
            $('#estado-embarque').css({
                'color': 'limegreen',
                'font-weight': 'bold'
            });

        }

    } else {

        mensajeEmbarqueNoGuardado();

    }

};


/**
 * valida embarque cerrado
 */
function validarEmbarqueCerrado(nroEmbarque) {

    $.ajax({
        url: 'obtener-ordenes-compra-embarque/' + nroEmbarque,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

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

                $('#preloader').show();
                mostrarDetalleCargosDescuentos();
                $('#preloader').fadeOut();

            } else {

                mensajeErrorEmbarque();

            }
        },
        error: function () {

        },
        complete: function () {

        }
    });
};

/**
 * ver detalle embarque
 */
$('.form-ver-detalle-embarque').submit(function (event) {
    event.preventDefault();

    $('#estado-embarque').val('');
    var nroEmbarque = $('#seleccion-referencia').val();

    if (nroEmbarque != '') {

        obtenerEstadoEmbarque(nroEmbarque);
        validarEmbarqueCerrado(nroEmbarque);

        $.ajax({
            url: 'ver-detalle-encabezado-embarque/' + nroEmbarque,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function () {

            },
            success: function (request) {
                var respuesta = JSON.stringify(request);
                var objeto = JSON.parse(respuesta);

                $('#origen-embarque').val(objeto.origen);
                $('#numero-embarque').val(nroEmbarque);

                //adicionado momentaneamente.. borrar estas dos lineas cuando se haya completado correctamente los cargos desde comex
                $('#detalle-embarque').attr('hidden', false);
                $('#header-detalle-embarque').attr('hidden', false);

                verDetalleInvoiceYDescuentosConta(nroEmbarque);
                verDetalleFleteConta(nroEmbarque);
                verDetalleSeguroConta(nroEmbarque);
                verDetalleDerechosConta(nroEmbarque);
                verDetalleInlandConta(nroEmbarque);

            },
            error: function () {
                console.log('error');

            },
            complete: function () {

            }

        });
    }

});


/**
 * enviar datos invoice
 */
$('.form-invoice').submit(function (event) {
    event.preventDefault();

    //no mover este preloader
    $('#preloader').show();

    var nroEmbarque = $('#seleccion-referencia').val();

    var totalInvoice = $('#total-invoice').val();
    var totalDescto = $('#total-descuentos').val();
    var estado = "Enviado";
    var tipoCargo = "Invoice";

    var datos = {
        "estado": estado,
        "amount": parseInt(totalInvoice),
        "discountAmount": parseInt(totalDescto)
    }

    $.ajax({
        url: 'guardar-invoice-contabilidad-embarque/' + nroEmbarque,
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        dataType: 'json',
        beforesend: function () {
            $('#preloader').show();
        },
        success: function (request) {
            if (request == 200) {

                $('#estado-invoice').val('Enviado');
                $('#enviar-invoice').attr('hidden', true);
                $('#estado-invoice').css({
                    'color': 'limegreen'
                });

            } else if (request == 100) {
                console.log('embarque no encontrado');
            } else if (request == 300) {
                console.log('Invoice no ha sido cargada');
            } else if (request == 500) {
                console.log('error de servidor');
            }

            obtenerEstadoEmbarque(nroEmbarque);
            enviarEstadoCargoModuloEmbarque(tipoCargo, estado, nroEmbarque);


        },
        error: function () {
            console.log('error de servidor');
            $('#preloader').fadeOut();

        },
        complete: function () {

        }
    });

});


/**
 * esta funcion solo hace efecto javascript. El estado de descuentos se envia junto con la invoice
 * */
$('.form-descuentos').submit(function (event) {
    event.preventDefault();

    $('#preloader').show();

    $('#enviar-descuentos').attr('hidden', true);
    $('#estado-descuentos').val('Enviado');
    $('#estado-descuentos').css({
        'color': 'limegreen'
    });

    $('#preloader').fadeOut();

});

/**
 * Envia Flete
* */
function enviarDatosFlete(estado) {

    var naviera = $('#naviera-flete').val();
    var total = $('#total-flete').val();
    var tipoCambio = $('#tipo-cambio-flete').val();
    var datos = {
        "estado": estado,
        "naviera": naviera,
        "total": parseInt(total),
        "tipoCambio": parseInt(tipoCambio)
    }

    var nroEmbarque = $('#seleccion-referencia').val();
    var tipoCargo = "Flete";

    $.ajax({
        url: 'guardar-cyd-flete-contabilidad-embarque/' + nroEmbarque,
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        dataType: 'json',
        beforesend: function () {
            
        },
        success: function (request) {
            if (request == 200) {

                obtenerEstadoEmbarque(nroEmbarque);
                enviarEstadoCargoModuloEmbarque(tipoCargo, estado, nroEmbarque);

                $('#estado-flete').val(estado);
                $('#enviar-flete').attr('hidden', true);
                $('#rechazar-flete').attr('hidden', true);

            } else if (request == 100) {
                console.log('embarque no encontrado');
            } else if (request == 300) {
                console.log('flete no encontrado');
            } else if (request == 500) {
                console.log('error de servidor');
            }


        },
        error: function () {
            console.log('error de servidor');
            $('#preloader').fadeOut();
        },
        complete: function () {

        }
    });

};


//envia seguro
function enviarDatosSeguro(estado) {

    var nroCertificado = $('#numero-certificado-seguro').val();
    var fecha = $('#fecha-certificado-seguro').val();
    var total = $('#total-seguro').val();
    var tipoCambio = $('#tipo-cambio-seguro').val();
    var companiaSeguro = $('#compania-seguro').val();

    var parte = fecha.split("/");
    var dia = parte[0];
    var mes = parte[1];
    var anio = parte[2];
    var fechaReal = mes + "/" + dia + "/" + anio;
    var fechaCertificado = new Date(fechaReal);



    var blOc = $('select[id=seleccion-referencia]').val();
    var blocString = "" + blOc + "";
    var tipoCargo = "Seguro";

    var datos = {
        "estado": estado,
        "total": parseInt(total),
        "companiaSeguro": companiaSeguro,
        "fechaCertificado": fechaCertificado,
        "nroCertificado": nroCertificado,
        "tipoCambio": parseInt(tipoCambio)
    }

    $.ajax({
        url: 'guardar-cyd-seguro-contabilidad-embarque/' + blocString,
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        dataType: 'json',
        beforesend: function () {

        },
        success: function (request) {

            if (request == 200) {

                $('#estado-seguro').val(estado);
                $('#enviar-seguro').attr('hidden', true);
                $('#rechazar-seguro').attr('hidden', true);

                obtenerEstadoEmbarque(blocString);
                enviarEstadoCargoModuloEmbarque(tipoCargo, estado, blocString);


            } else if (request == 300) {
                console.log('seguro no encontrado');

            } else if (request == 100) {
                console.log('Embarque no encontrado');
            } else if (request == 500) {
                console.log('error de servidor');
            }

        },
        error: function () {
            console.log('error de servidor');
            $('#preloader').fadeOut();


        },
        complete: function () {

        }
    });

};

//envia derechos
function enviarDatosDerechos(estado) {

    var blOc = $('select[id=seleccion-referencia]').val();
    var blocString = "" + blOc + "";

    var total = $('#total-derechos').val();
    var companiaDerecho = $('#compania-derechos').val();
    var tipoCargo = "Derechos";

    var datos = {
        "estado": estado,
        "total": parseInt(total),
        "companiaDerecho": companiaDerecho
    }

    $.ajax({
        url: 'guardar-cyd-derecho-contabilidad-embarque/' + blocString,
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        dataType: 'json',
        beforesend: function () {


        },
        success: function (request) {

            if (request == 200) {

                $('#estado-derechos').val('' + estado);

                $('#enviar-derechos').attr('hidden', true);
                $('#rechazar-derechos').attr('hidden', true);

                obtenerEstadoEmbarque(blocString);
                enviarEstadoCargoModuloEmbarque(tipoCargo, estado, blocString);



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

        }
    });

};


//envia inland
function enviarDatosInland(estado) {

    var nroEmbarque = $('#seleccion-referencia').val();
    var transportista = $('#transportista-inland').val();
    var total = $('#total-inland').val();
    var tipoCambio = $('#tipo-cambio-inland').val();
    var tipoCargo = "Inland";


    var datos = {
        "estado": estado,
        "tipoCambio": parseInt(tipoCambio),
        "total": parseInt(total),
        "transportista": transportista
    }

    $.ajax({
        url: 'guardar-cyd-inland-contabilidad-embarque/' + nroEmbarque,
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        dataType: 'json',
        beforesend: function () {
            
        },
        success: function (request) {

            if (request == 200) {

                $('#estado-inland').val('' + estado);
                $('#enviar-inland').attr('hidden', true);
                $('#rechazar-inland').attr('hidden', true);

                obtenerEstadoEmbarque(nroEmbarque);
                enviarEstadoCargoModuloEmbarque(tipoCargo, estado, nroEmbarque);



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

        }
    });
};


//asigna estado y envia
$('.form-flete').submit(function (event) {
    event.preventDefault();

    $('#preloader').show();

    var estado = "Enviado";

    enviarDatosFlete(estado);

    $('#estado-flete').css({
        'color': 'limegreen'
    });


});

//consulta antes de rechazar
$('#rechazar-flete').click(function (event) {

    swal({
        title: "Rechazar Cargo",
        text: "Se rechazar\u00e1 el cargo Flete, \u00BFDesea continuar?.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Rechazar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: true,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm) {
                accionRechazarCargoFlete();
            }
        });

});

//envia estado rechazado
function accionRechazarCargoFlete() {

    $('#preloader').show();

    var estado = "Rechazado";

    enviarDatosFlete(estado);

    $('#estado-flete').css({
        'color': 'red'
    });

};

//asigna estado y envia
$('.form-seguro').submit(function (event) {
    event.preventDefault();

    $('#preloader').show();

    var estado = "Enviado";

    enviarDatosSeguro(estado);

    $('#estado-seguro').css({
        'color': 'limegreen'
    });



});

//consulta antes de rechazar
$('#rechazar-seguro').click(function (event) {

    swal({
        title: "Rechazar Cargo",
        text: "Se rechazar\u00e1 el cargo Seguro, \u00BFDesea continuar?.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Rechazar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: true,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm) {
                accionRechazarCargoSeguro();
            }
        });

});

//envia estado rechazado
function accionRechazarCargoSeguro() {

    $('#preloader').show();

    var estado = "Rechazado"

    enviarDatosSeguro(estado);

    $('#estado-seguro').css({
        'color': 'red'
    });

};


//asigna estado y envia
$('.form-derechos').submit(function (event) {
    event.preventDefault();

    $('#preloader').show();

    var estado = "Enviado";

    enviarDatosDerechos(estado);

    $('#estado-derechos').css({
        'color': 'limegreen'
    });


});



//consulta antes de rechazar cargo
$('#rechazar-derechos').click(function (event) {
    swal({
        title: "Rechazar Cargo",
        text: "Se rechazar\u00e1 el cargo Derechos, \u00BFDesea continuar?.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Rechazar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: true,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm) {
                accionRechazarCargoDerechos();
            }
        });

});

//rechazar cargo derechos
function accionRechazarCargoDerechos() {
    $('#preloader').show();

    var estado = "Rechazado";

    enviarDatosDerechos(estado);

    $('#estado-derechos').css({
        'color': 'red'
    });

};

//asigna estado y envia
$('.form-inland').submit(function (event) {
    event.preventDefault();

    $('#preloader').show();

    var estado = "Enviado";
    
    enviarDatosInland(estado);

    $('#estado-inland').css({
        'color': 'limegreen'
    });


});

//envia estado rechazado
function accionRechazarCargoInland() {

    $('#preloader').show();

    var estado = "Rechazado";

    enviarDatosInland(estado);

    $('#estado-inland').css({
        'color': 'red'
    });
};

//pregunta si desea rechazar
$('#rechazar-inland').click(function (event) {

    swal({
        title: "Rechazar Cargo",
        text: "Se rechazar\u00e1 el cargo Inland, \u00BFDesea continuar?.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Rechazar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: true,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm) {
                accionRechazarCargoInland();
            }
        });

});


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