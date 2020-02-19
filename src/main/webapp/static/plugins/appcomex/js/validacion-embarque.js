
function mensajeArchivoNoValido() { sweetAlert("Error", "El archivo no corresponde al mapeo de una invoice", "error") };
function mensajeErrorServidor() { sweetAlert("Error", "Error de servidor, verifique el archivo e intentelo nuevamente", "error") };
function mensajeErrorExiste() { sweetAlert("Error", "Ya existe un archivo con el mismo identificador de invoice. Intente cargar otro archivo", "error") };


$(document).ready(function(){
    $('#seleccion-referencia').select2();
    obtenerListaReferenciaBlOc();
});



function obtenerListaReferenciaBlOc() {

    $.ajax({
        url: "lista-referencia-bl-oc",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        beforesend: function () {

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


$("#seleccion-referencia").change(function () {
    var seleccion = $('select[id=seleccion-referencia]').val();
    var estado = "";
    $('#estado-oc').empty();
    if (seleccion != 0) {
        estado = "<label class='col-form-label' style='color:limegreen;'><strong> Aprobada</strong></label>"
        $('#estado-oc').html(estado);
    } else {
        $('#estado-oc').empty();
    }
});

function tamanoByte(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

$('#file').change(function (event) {

    var nombre = $('#file').val();
    var extension = nombre.substring(nombre.length - 5, nombre.length);

    $('#datos-archivo').empty();

    if (extension != ".xlsx") {
        var error = "<div class='col-md-12'><div class='alert alert-danger alert-dismissible fade show'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Error:</strong> el archivo no cumple con el formato requerido</div></div>";
        $('#datos-archivo').append(error);
        $('#file').val('');
    }
});


$('#step-form-horizontal').submit(function (event) {

    event.preventDefault();
    var nombre = $('#file').val();
    var fd = new FormData();

    var referenciaEmbarque = $('select[id=seleccion-referencia]').val();

    var file_data = $('input[type="file"]')[0].files;

    // para varios archivos
    for (var i = 0; i < file_data.length; i++) {
        fd.append("file_1", file_data[i]);
    }

    fd.append("referencia", referenciaEmbarque);

    if (referenciaEmbarque.value != '' && nombre != '') {

        $.ajax({
            url: 'subir-archivo-invoice',
            type: "POST",
            data: fd,
            beforeSend: function (event, position, total, percentComplete) {
                $('#preloader').fadeIn();
            },
            success: function (request, status, error) {
                // funcion para trabjaar la respuesta

                $('#datos-archivo').empty();

                if (request == 200) {

                    var nombreArchivo = "<label style='color: limegreen;'><strong>Archivo cargado: </strong></label><label>" + nombre.substring(12) + "&nbsp;&nbsp;</label>";
                    $('#datos-archivo').append(nombreArchivo);

                    //llenando tabla resultado (METODO PENDIENTE)
                    // obtenerResultadoOcInvoice(recibe embarque);

                }else if(request == 150){

                    mensajeArchivoNoValido();

                } else if (request == 300) {
                    mensajeErrorExiste();
                    mensajeErrorExiste();
                } else if (request == 100) {
                    function mensajeErrorBlanco() { sweetAlert("Error", "El archivo " + nombre.substring(12) + " no corresponde al mapeo", "error") };
                    mensajeErrorBlanco();
                } else if (request == 500) {
                    mensajeErrorServidor();
                    
                }
            },
            error: function (request, status, error) {
                // quitar loader y control de error
                mensajeErrorServidor();
                $('#preloader').fadeOut();
                console.log("error de servidor");
            },
            complete: function (resultado) {

                $('#preloader').fadeOut();
            },
            cache: false,
            contentType: false,
            processData: false

        });
    }

});


//completar este metodo cuando se sepa la comparacion del sku contra que campo de la invoice
// function obtenerResultadoOcInvoice(embarque) {

//     $.ajax({
//         url: 'resultado-sku-oc-invoice/'+embarque.oc,
//         type: 'GET',
//         contentType: "application/json",
//         dataType: 'json',
//         beforeSend: function () {

//         },
//         success: function (request) {

//         },
//         error: function () {

//         },
//         complete: function () {

//         }
//     });

// };


// jQuery(".step-form-horizontal").validate({
//     ignore: [], errorClass: "invalid-feedback animated fadeInDown", errorElement: "div", errorPlacement: function (e, a) {
//         jQuery(a).parents(".form-group > div").append(e)
//     },
//     highlight: function (e) {
//         jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid")
//     },
//     success: function (e) {
//         jQuery(e).closest(".form-group").removeClass("is-invalid"), jQuery(e).remove()
//     },
//     rules: {
//         "seleccion-referencia": {
//             required: !0
//         },
//         "seleccion-invoice": {
//             required: !0
//         }
//     },
//     messages: {
//         "seleccion-referencia": {
//             required: "Debe seleccionar una referencia"
//         },
//         "seleccion-invoice": {
//             required: "Debe adjuntar un archivo"
//         }
//     }
// });