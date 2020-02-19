function mensajeArgegado() { swal("Archivo Agregado", "Se ha agregado el archivo exitosamente", "success") };
function mensajeArchivoVacio() { swal("Error", "No se ha recibido el archivo", "error") };
function mensajeErrorServidor() { sweetAlert("Error", "ocurrio un error de servidor, intentelo nuevamente", "error") };




/**
 * calcula peso archivo
 */

function tamanoByte(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


/**
 * muestra peso archivo
 */
$('#file').change(function (event) {

    var nombre = $('#file').val();
    var extension = nombre.substring(nombre.length - 5, nombre.length);
    var peso = this.files[0].size;
    var nombreArchivo = "<div class='col-md-12'><label>Archivo: " + nombre.substring(12) + "</label></div>";
    var pesoArchivo = "<div class='col-md-12'><label>Peso: " + tamanoByte(peso) + "</label></div>";

    $('#datos-archivo').empty();

    if (extension == ".xlsx") {
        $('#datos-archivo').append(nombreArchivo);
        $('#datos-archivo').append(pesoArchivo);
    } else {
        var error = "<div class='col-md-12'><div class='alert alert-danger alert-dismissible fade show'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Error:</strong> el archivo no cumple con el formato requerido</div></div>";

        $('#datos-archivo').append(error);
        $('#file').val('');
    }

});


/**
 * Sube archivo ftp y muestra resultado de carga
 */
$('.form-carga-ftp').submit(function (event) {
    event.preventDefault();

    var fd = new FormData();

    var variableInput = document.getElementById('file');

    // para varios archivos
    var file_data = $('input[type="file"]')[0].files;
    for (var i = 0; i < file_data.length; i++) {
        fd.append("file_1", file_data[i]);
    }

    if (variableInput.value != '') {

        $.ajax({
            url: 'subir-archivo-ftp',
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


jQuery(".form-carga-ftp").validate({
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
        "file": {
            required: !0
        }
    },
    messages: {
        "file": {
            required: "El archivo es requerido"
        }
    }
});




