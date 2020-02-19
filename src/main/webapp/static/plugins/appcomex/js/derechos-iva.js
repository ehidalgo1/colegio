




$(document).ready(function(){
    $('#seleccion-referencia').select2();
    obtenerListaReferenciaEmbarques();
});


//funcion para cargar input selector lista de referencias
function obtenerListaReferenciaEmbarques() {

    $.ajax({
        url: "lista-referencia-embarques-derecho-iva",
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

function tamanoByte(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

$('#file').change(function (event) {

    var nombre = $('#file').val();
    var extension = nombre.substring(nombre.length - 5, nombre.length);
    var peso = this.files[0].size;
    var nombreArchivo = "<div class='col-md-12'><label>Archivo: " + nombre.substring(12) + "</label></div>";
    var pesoArchivo = "<div class='col-md-12'><label>Peso: " + tamanoByte(peso) + "</label></div>";

    $('#datos-archivo-derechos-iva').empty();

    if (extension == ".xlsx") {
        $('#datos-archivo-derechos-iva').append(nombreArchivo);
        $('#datos-archivo-derechos-iva').append(pesoArchivo);
    } else {
        var error = "<div class='col-md-12'><div class='alert alert-danger alert-dismissible fade show'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Error:</strong> el archivo no cumple con el formato requerido</div></div>";

        $('#datos-archivo-derechos-iva').append(error);
        $('#file').val('');
    }

});

$('#step-form-horizontal').submit(function (event) {

    event.preventDefault();
    var fd = new FormData();

    var variableInput = document.getElementById('file');
    var selecReferencia = $('select[id=seleccion-referencia]').val();

    // para varios archivos
    var file_data = $('input[type="file"]')[0].files;
    for (var i = 0; i < file_data.length; i++) {
        fd.append("file_1", file_data[i]);
    }
    
    fd.append("referencia_embarque", selecReferencia[1]);

    if (variableInput.value != '') {

        $.ajax({
            url: 'subir-archivo-derechos-iva',
            type: "POST",
            data: fd,
            beforeSend: function () {
                // iniciar loader
                $('#preloader').fadeIn();
            },
            success: function (request) {
                if (request == 200) {
                    $('#file').val('');
                    $('#datos-archivo').empty();
                    mensajeArgegado();
                } else if (request == 100) {
                    $('#file').val('');
                    $('#datos-archivo').empty();
                    mensajeArchivoVacio();
                } else if (request == 500) {
                    $('#file').val('');
                    $('#datos-archivo').empty();
                    mensajeErrorServidor();
                }

            },
            error: function (request, status, error) {
                // quitar loader y control de error
                $('#file').val('');
                $('#datos-archivo').empty();
                $('#preloader').fadeOut();
                mensajeErrorServidor();
            },
            complete: function (resultado) {
                // quitar loader
                $('#preloader').fadeOut();

            },
            cache: false,
            contentType: false,
            processData: false

        });
    }

});





