



$(document).ready(function () {
    $('#tabla-seguimiento-embarques').DataTable();
    obtListaSeguimientoEmbarques();
    $('#seleccion-proveedor').select2();
    obtenerListaProveedores();

});

function obtenerListaProveedores() {

    $.ajax({
        url: 'lista-proveedores-embarque',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);
            var selectDefault = "<option value='' selected>Seleccione proveedor</option>";

            $('#seleccion-proveedor').empty();
            $('#seleccion-proveedor').append(selectDefault);

            for (let i = 0; i < objeto.length; i++) {

                var proveedor = objeto[i].nombre;
                var proveedor = proveedor.replace(/ /gi, "-");


                var lista = "<option value=" + proveedor + ">" + objeto[i].nombre + "</option>";
                $('#seleccion-proveedor').append(lista);
            }

        },
        error: function () {

        },
        complete: function () {

        }
    });

};

function calcularFechaDeadlineCargosDescuentos(fecha) {

    fecha = new Date(fecha);
    var fecha_actual = new Date();
    fecha.setDate(fecha.getDate() + 4);

    var resta = fecha.getTime() - fecha_actual.getTime();
    var calculo = Math.round(resta / (1000 * 60 * 60 * 24));
    var dias = calculo;

    return dias;
};

function calcularFechaDeadlineInvoice(fecha) {

    fecha = new Date(fecha);
    var fecha_actual = new Date();
    fecha.setDate(fecha.getDate() + 10);

    var resta = fecha.getTime() - fecha_actual.getTime();
    var calculo = Math.round(resta / (1000 * 60 * 60 * 24));

    var dias = calculo;

    return dias;
};


function obtListaSeguimientoEmbarques() {

    $.ajax({
        url: 'lista-seguimiento-embarque',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {
            $('#preloader').show();
        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            var diaEdt = "";
            var diaEta = "";
            var mesEtd = "";
            var mesEta = "";
            var fecha_etd = "";
            var fecha_eta = "";
            var proveedor = "";
            var formatoFechaEtd = "";
            var formatoFechaEta = "";

            var nroEmbarque = "";
            var proveedor = "";

            var totalOrdenesCompra = "";
            var totalOc = "";
            var contOcValida = 0;

            var deadlineInvoice = "";
            var deadlineCargosDescuentos = "";

            var checkBoxInvoice = "";
            var checkBoxAsn = "";
            var checkBoxCargosDescuentos = "";
            var unidadesRecepcion = "";
            var btnDetalle = "";
            var estadoEmbarque = "";

            var listaEmbarques = [];
            var listaOrdenCompra = [];

            var tabla = $('#tabla-seguimiento-embarques').DataTable();
            tabla.clear().draw();

            for (let i = 0; i < objeto.length; i++) {

                //Fechas inicial y final
                fecha_etd = new Date(objeto[i].etd);
                fecha_eta = new Date(objeto[i].eta);

                nroEmbarque = objeto[i].nroEmbarque;

                proveedor = objeto[i].proveedor;


                fecha_etd.setDate(fecha_etd.getDate() + 2);
                fecha_eta.setDate(fecha_eta.getDate() + 2);

                diaEdt = fecha_etd.getDate();
                diaEta = fecha_eta.getDate();

                mesEtd = fecha_etd.getMonth() + 1;
                mesEta = fecha_eta.getMonth() + 1;

                if (diaEdt < 10) {
                    diaEdt = "0" + diaEdt;
                }

                if (diaEta < 10) {
                    diaEta = "0" + diaEta;
                }

                if (mesEtd < 10) {
                    mesEtd = "0" + mesEtd;
                }

                if (mesEta < 10) {
                    mesEta = "0" + mesEta;
                }

                //dando formato a fecha
                formatoFechaEtd = diaEdt + "/" + mesEtd + "/" + fecha_etd.getFullYear();
                formatoFechaEta = diaEta + "/" + mesEta + "/" + fecha_eta.getFullYear();

                //consultando si no contiene el embarque (para no repetir);
                if (!listaEmbarques.includes(nroEmbarque)) {

                    //metodo para calcular deadline, retorna cantidad de dias
                    if (calcularFechaDeadlineInvoice(fecha_etd) > 3) {
                        deadlineInvoice = "<span class='label deadline-verde btn-rounded' id='deadline-invoice-" + i + "'>" + calcularFechaDeadlineInvoice(fecha_etd) + "</span>";
                    } else if (calcularFechaDeadlineInvoice(fecha_etd) > 1) {
                        deadlineInvoice = "<span class='label deadline-amarillo btn-rounded' id='deadline-invoice-" + i + "'>" + calcularFechaDeadlineInvoice(fecha_etd) + "</span>";
                    } else {
                        deadlineInvoice = "<span class='label deadline-rojo btn-rounded' id='deadline-invoice-" + i + "'>" + calcularFechaDeadlineInvoice(fecha_etd) + "</span>";
                    }

                    if (calcularFechaDeadlineCargosDescuentos(fecha_eta) > 3) {
                        deadlineCargosDescuentos = "<span class='label deadline-verde btn-rounded' id='deadline-cargosydescuentos-" + i + "'>" + calcularFechaDeadlineCargosDescuentos(fecha_eta) + "</span>";
                    } else if (calcularFechaDeadlineCargosDescuentos(fecha_eta) > 1) {
                        deadlineCargosDescuentos = "<span class='label deadline-amarillo btn-rounded' id='deadline-cargosydescuentos-" + i + "'>" + calcularFechaDeadlineCargosDescuentos(fecha_eta) + "</span>";
                    } else {
                        deadlineCargosDescuentos = "<span class='label deadline-rojo btn-rounded' id='deadline-cargosydescuentos-" + i + "'>" + calcularFechaDeadlineCargosDescuentos(fecha_eta) + "</span>";
                    }

                    btnDetalle = "<button type=\"button\" class=\"btn btn-sm btn-info\" onClick=\"verDetalleEmbarque('" + objeto[i].nroEmbarque + "')\"><i class='fa fa-info-circle'></i></button>";


                    totalOc = objeto[i].ordenCompras.length;
                    listaOrdenCompra = objeto[i].ordenCompras;

                    //contando las ordenes de compra validados
                    for (let j = 0; j < listaOrdenCompra.length; j++) {

                        if (listaOrdenCompra[j].estadoOrdenCompra) {
                            contOcValida = contOcValida + 1;
                        }
                    }

                    //validando estado de embarque

                    if (contOcValida == totalOc) {
                        estadoEmbarque = "Embarque Cerrado";
                        deadlineInvoice = "";
                        checkBoxInvoice = "<input type='checkbox' name='invoice' value='true' disabled checked>";
                        checkBoxAsn = "<input type='checkbox' name='asn' value='true' disabled checked>";
                    } else {

                        estadoEmbarque = "Pendiente CI";
                        checkBoxInvoice = "<input type='checkbox' name='invoice' value='true' disabled>";
                        checkBoxAsn = "<input type='checkbox' name='asn' value='true' disabled>";
                    }

                    //validando estado cargos y descuentos

                    var estado = objeto[i].estadoCargosDescuentos;

                    if(estado!=null){
                        estadoEmbarque = estado;
                    }
                    
                    if (estado == 'Cargo Rechazado') {
                        estadoEmbarque = estado;
                    } else if (estado == 'Cargo Cerrado') {
                        estadoEmbarque = estado;
                        deadlineCargosDescuentos = "";
                        checkBoxCargosDescuentos = "<input type='checkbox' name='cargosydescuentos' value='true' disabled checked>"

                    } else {
                        checkBoxCargosDescuentos = "<input type='checkbox' name='cargosydescuentos' value='true' disabled>"
                    }

                    totalOrdenesCompra = contOcValida + "/" + totalOc;

                    //reseteando valor contador orden de compra validada para inicializarlo nuevamente en 0
                    contOcValida = 0;

                    tabla.row.add([
                        nroEmbarque, totalOrdenesCompra, proveedor, formatoFechaEtd, formatoFechaEta, deadlineInvoice, checkBoxInvoice, checkBoxAsn, deadlineCargosDescuentos, checkBoxCargosDescuentos, unidadesRecepcion, estadoEmbarque, btnDetalle
                    ]).draw(false);

                    //agregando a la lista
                    listaEmbarques.push(nroEmbarque);
                }

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



function obtenerOrdenesCompra(nroEmbarque) {

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

            var listadoOc = "";
            var estado = "";

            var lb = "<label><strong>Embarque: " + nroEmbarque + "</strong></label>";
            $('#lb-nro-embarque').empty();
            $('#lb-nro-embarque').append(lb);
            $('#detalle-oc-embarque').empty();
            for (let i = 0; i < objeto.length; i++) {

                if (objeto[i].estadoOrdenCompra) {
                    estado = "<input type='checkbox' name='valido' value='true' checked disabled>";
                } else {
                    estado = "<input type='checkbox' name='valido' value='false' disabled>";
                }

                listadoOc = "<tr><td>" + objeto[i].nroOrdenCompra + "</td><td>" + estado + "</td></tr>";

                $('#detalle-oc-embarque').append(listadoOc);
            }
        },
        error: function () {

        },
        complete: function () {
            $('#preloader').hide();
        }
    });
};


function verDetalleEmbarque(nroEmbarque) {

    obtenerOrdenesCompra(nroEmbarque);
    $('#modal-detalle-embarque').modal('show');

};


$('#form-busqueda-embarques').submit(function (event) {
    event.preventDefault();

    var inputEmbarque = $('#numero-embarque').val();
    var inputProveedor = $('#seleccion-proveedor').val();
    var inputFechaDesde = $('#fecha-desde').val();
    var inputFechaHasta = $('#fecha-hasta').val();
    var parteFechaDesde = inputFechaDesde.split("/");
    var formatoFechaDesde = parteFechaDesde[1] + "/" + parteFechaDesde[0] + "/" + parteFechaDesde[2];

    var parteFechaHasta = inputFechaHasta.split("/");
    var formatoFechaHasta = parteFechaHasta[1] + "/" + parteFechaHasta[0] + "/" + parteFechaHasta[2];

    var fechaDesde = new Date(formatoFechaDesde);
    var fechaHasta = new Date(formatoFechaHasta);

    $.ajax({
        url: 'lista-embarques-seguimiento-embarque',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

            $('#preloader').show();
        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);


            //variable para fechas

            var diaEdt = "";
            var diaEta = "";
            var mesEtd = "";
            var mesEta = "";
            var fechaEtd = "";
            var fechaEta = "";
            var nuevaFechaEtd = "";
            var nuevaFechaEta = "";
            var fecha_etd = "";
            var fecha_eta = "";
            var proveedor = "";
            var formatoFechaEtd = "";
            var formatoFechaEta = "";

            //

            var nroEmbarque = "";
            var proveedor = "";
            var valorProveedorConcat = "";

            var totalOrdenesCompra = "";
            var totalOc = "";
            var contOcValida = 0;

            var deadlineInvoice = "";
            var deadlineCargosDescuentos = "";

            var checkBoxInvoice = "";
            var checkBoxAsn = "";
            var checkBoxCargosDescuentos = "";
            var unidadesRecepcion = "";
            var btnDetalle = "";
            var estadoEmbarque = "";

            var listaEmbarques = [];
            var listaOrdenCompra = [];

            var tabla = $('#tabla-seguimiento-embarques').DataTable();
            tabla.clear().draw();

            for (let i = 0; i < objeto.length; i++) {

                //Fechas inicial y final
                fechaEtd = objeto[i].etd;
                nuevaFechaEtd = fechaEtd.replace(/-/gi, "/");
                fechaEta = objeto[i].eta;
                nuevaFechaEta = fechaEta.replace(/-/gi, "/");

                fecha_etd = new Date(nuevaFechaEtd);
                fecha_eta = new Date(nuevaFechaEta);

                nroEmbarque = objeto[i].nroEmbarque;

                proveedor = objeto[i].proveedor;
                valorProveedorConcat = proveedor.replace(/ /gi, "-");


                fecha_etd.setDate(fecha_etd.getDate() + 1);
                fecha_eta.setDate(fecha_eta.getDate() + 1);

                diaEdt = fecha_etd.getDate();
                diaEta = fecha_eta.getDate();

                mesEtd = fecha_etd.getMonth() + 1;
                mesEta = fecha_eta.getMonth() + 1;

                if (diaEdt < 10) {
                    diaEdt = "0" + diaEdt;
                }

                if (diaEta < 10) {
                    diaEta = "0" + diaEta;
                }

                if (mesEtd < 10) {
                    mesEtd = "0" + mesEtd;
                }

                if (mesEta < 10) {
                    mesEta = "0" + mesEta;
                }

                //dando formato a fecha
                formatoFechaEtd = diaEdt + "/" + mesEtd + "/" + fecha_etd.getFullYear();
                formatoFechaEta = diaEta + "/" + mesEta + "/" + fecha_eta.getFullYear();

                //consultando si no contiene el embarque (para no repetir);
                if (!listaEmbarques.includes(nroEmbarque)) {

                    //metodo para calcular deadline, retorna cantidad de dias
                    if (calcularFechaDeadlineInvoice(fecha_etd) > 3) {
                        deadlineInvoice = "<span class='label deadline-verde btn-rounded' id='deadline-invoice-" + i + "'>" + calcularFechaDeadlineInvoice(fecha_etd) + "</span>";
                    } else if (calcularFechaDeadlineInvoice(fecha_etd) > 1) {
                        deadlineInvoice = "<span class='label deadline-amarillo btn-rounded' id='deadline-invoice-" + i + "'>" + calcularFechaDeadlineInvoice(fecha_etd) + "</span>";
                    } else {
                        deadlineInvoice = "<span class='label deadline-rojo btn-rounded' id='deadline-invoice-" + i + "'>" + calcularFechaDeadlineInvoice(fecha_etd) + "</span>";
                    }

                    if (calcularFechaDeadlineCargosDescuentos(fecha_eta) > 3) {
                        deadlineCargosDescuentos = "<span class='label deadline-verde btn-rounded' id='deadline-cargosydescuentos-" + i + "'>" + calcularFechaDeadlineCargosDescuentos(fecha_eta) + "</span>";
                    } else if (calcularFechaDeadlineCargosDescuentos(fecha_eta) > 1) {
                        deadlineCargosDescuentos = "<span class='label deadline-amarillo btn-rounded' id='deadline-cargosydescuentos-" + i + "'>" + calcularFechaDeadlineCargosDescuentos(fecha_eta) + "</span>";
                    } else {
                        deadlineCargosDescuentos = "<span class='label deadline-rojo btn-rounded' id='deadline-cargosydescuentos-" + i + "'>" + calcularFechaDeadlineCargosDescuentos(fecha_eta) + "</span>";
                    }

                    btnDetalle = "<button type=\"button\" class=\"btn btn-sm btn-info\" onClick=\"verDetalleEmbarque('" + objeto[i].nroEmbarque + "')\"><i class='fa fa-info-circle'></i></button>";


                    totalOc = objeto[i].ordenCompras.length;
                    listaOrdenCompra = objeto[i].ordenCompras;

                    //contando las ordenes de compra validados
                    for (let j = 0; j < listaOrdenCompra.length; j++) {

                        if (listaOrdenCompra[j].estadoOrdenCompra) {
                            contOcValida = contOcValida + 1;
                        }
                    }

                    //validando estado de embarque

                    if (contOcValida == totalOc) {
                        estadoEmbarque = "Embarque Cerrado";
                        deadlineInvoice = "";
                        checkBoxInvoice = "<input type='checkbox' name='invoice' value='true' disabled checked>";
                        checkBoxAsn = "<input type='checkbox' name='asn' value='true' disabled checked>";
                    } else {

                        estadoEmbarque = "Pendiente CI";
                        checkBoxInvoice = "<input type='checkbox' name='invoice' value='true' disabled>";
                        checkBoxAsn = "<input type='checkbox' name='asn' value='true' disabled>";
                    }

                    //validando estado cargos y descuentos

                    var estado = objeto[i].estadoCargosDescuentos;

                    if (estado == 'Pendiente env\u00EDo') {
                        estadoEmbarque = "Cargo Pendiente";
                    } else if (estado == 'Cargo Rechazado') {
                        estadoEmbarque = estado;
                    } else if (estado == 'Cargo Cerrado') {
                        estadoEmbarque = estado;
                        deadlineCargosDescuentos = "";
                        checkBoxCargosDescuentos = "<input type='checkbox' name='cargosydescuentos' value='true' disabled checked>"

                    } else {
                        checkBoxCargosDescuentos = "<input type='checkbox' name='cargosydescuentos' value='true' disabled>"
                    }

                    totalOrdenesCompra = contOcValida + "/" + totalOc;

                    //reseteando valor contador orden de compra validada para inicializarlo nuevamente en 0
                    contOcValida = 0;


                    /**
                     * Realizando busquedas
                     */
                    
                    if ((nroEmbarque.indexOf(inputEmbarque) !== -1) && (inputProveedor == '') && (inputFechaDesde == '') && (inputFechaHasta == '')) {

                        //entrando busqueda por embarque
                        tabla.row.add([
                            nroEmbarque, totalOrdenesCompra, proveedor, formatoFechaEtd, formatoFechaEta, deadlineInvoice, checkBoxInvoice, checkBoxAsn, deadlineCargosDescuentos, checkBoxCargosDescuentos, unidadesRecepcion, estadoEmbarque, btnDetalle
                        ]).draw(false);

                    } else if ((inputProveedor == valorProveedorConcat) && (inputEmbarque == '') && (inputFechaDesde == '') && (inputFechaHasta == '')) {

                        //entrando busqueda por proveedor
                        tabla.row.add([
                            nroEmbarque, totalOrdenesCompra, proveedor, formatoFechaEtd, formatoFechaEta, deadlineInvoice, checkBoxInvoice, checkBoxAsn, deadlineCargosDescuentos, checkBoxCargosDescuentos, unidadesRecepcion, estadoEmbarque, btnDetalle
                        ]).draw(false);

                    } else if ((fecha_etd >= fechaDesde) && (fecha_etd <= fechaHasta) && (inputEmbarque == '') && (inputProveedor == '')) {

                        //entrando busqueda por rango fecha desde - hasta
                        tabla.row.add([
                            nroEmbarque, totalOrdenesCompra, proveedor, formatoFechaEtd, formatoFechaEta, deadlineInvoice, checkBoxInvoice, checkBoxAsn, deadlineCargosDescuentos, checkBoxCargosDescuentos, unidadesRecepcion, estadoEmbarque, btnDetalle
                        ]).draw(false);

                    } else if ((nroEmbarque.indexOf(inputEmbarque) !== -1) && (inputProveedor == valorProveedorConcat) && (inputFechaDesde == '') && (inputFechaHasta == '')) {

                        //entrando busqueda por embarque y proveedor
                        tabla.row.add([
                            nroEmbarque, totalOrdenesCompra, proveedor, formatoFechaEtd, formatoFechaEta, deadlineInvoice, checkBoxInvoice, checkBoxAsn, deadlineCargosDescuentos, checkBoxCargosDescuentos, unidadesRecepcion, estadoEmbarque, btnDetalle
                        ]).draw(false);

                    } else if ((inputProveedor == valorProveedorConcat) && (fecha_etd >= fechaDesde) && (fecha_etd <= fechaHasta) && (inputEmbarque == '')) {

                        //entrando busqueda por proveedor y rango fecha desde - hasta
                        tabla.row.add([
                            nroEmbarque, totalOrdenesCompra, proveedor, formatoFechaEtd, formatoFechaEta, deadlineInvoice, checkBoxInvoice, checkBoxAsn, deadlineCargosDescuentos, checkBoxCargosDescuentos, unidadesRecepcion, estadoEmbarque, btnDetalle
                        ]).draw(false);

                    } else if ((nroEmbarque.indexOf(inputEmbarque) !== -1) && (fecha_etd >= fechaDesde) && (fecha_etd <= fechaHasta) && (inputProveedor == '')) {

                        //entrando busqueda por embarque y rango fecha desde - hasta
                        tabla.row.add([
                            nroEmbarque, totalOrdenesCompra, proveedor, formatoFechaEtd, formatoFechaEta, deadlineInvoice, checkBoxInvoice, checkBoxAsn, deadlineCargosDescuentos, checkBoxCargosDescuentos, unidadesRecepcion, estadoEmbarque, btnDetalle
                        ]).draw(false);

                    } else if ((nroEmbarque.indexOf(inputEmbarque) !== -1) && (inputProveedor == valorProveedorConcat) && (fecha_etd >= fechaDesde) && (fecha_etd <= fechaHasta)) {

                        //entrando busqueda por todos los campos
                        tabla.row.add([
                            nroEmbarque, totalOrdenesCompra, proveedor, formatoFechaEtd, formatoFechaEta, deadlineInvoice, checkBoxInvoice, checkBoxAsn, deadlineCargosDescuentos, checkBoxCargosDescuentos, unidadesRecepcion, estadoEmbarque, btnDetalle
                        ]).draw(false);

                    }





                    //agregando a la lista
                    listaEmbarques.push(nroEmbarque);
                }

            }

        },
        error: function () {
            $('#preloader').fadeOut();
        },
        complete: function () {
            $('#preloader').fadeOut();
        }
    });
});



function calcularFechaDeadlineCargosDescuentos(fecha) {

    fecha = new Date(fecha);
    var fecha_actual = new Date();
    fecha.setDate(fecha.getDate() + 4);

    var resta = fecha.getTime() - fecha_actual.getTime();
    var calculo = Math.round(resta / (1000 * 60 * 60 * 24));
    var dias = calculo;

    return dias;
};

function calcularFechaDeadlineInvoice(fecha) {

    fecha = new Date(fecha);
    var fecha_actual = new Date();
    fecha.setDate(fecha.getDate() + 10);

    var resta = fecha.getTime() - fecha_actual.getTime();
    var calculo = Math.round(resta / (1000 * 60 * 60 * 24));

    var dias = calculo;

    return dias;
};