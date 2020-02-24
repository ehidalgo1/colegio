
$(document).ready(function () {

    obtenerListaProfesores();

});

$('#btn-agregar-profesor').click(function () {
    obtenerListaRamos();
    obtenerListaCursos();
    $('#modal-agregar-profesor').modal('show');
});


function obtenerListaRamos() {

    $.ajax({
        url: '/obtener-lista-ramos',
        type: 'GET',
        beforeSend: function () {

        },
        success: function (request) {
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            var lista = "";
            var defecto = "<option value=''>Seleccione ramo</option>";

            $('#especialidad').empty();
            $('#especialidad').append(defecto);

            for (let i = 0; i < objeto.length; i++) {

                lista = "<option value="+objeto[i].nombre+">" + objeto[i].nombre + "</option>";

                $('#especialidad').append(lista);
            }

        },
        error: function () {

        },
        complete: function () {

        }
    });

};

function obtenerListaCursos(){
    $.ajax({
        url: '/obtener-cursos',
        type: 'GET',
        contentType: '',
        dataType: '',
        beforeSend: function(){

        },
        success: function(request){
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            var lista = "<option value=''>Seleccione curso</option>";
            $('#curso').empty(lista);
            $('#curso').append(lista);

            for (let i = 0; i < objeto.length; i++) {
                lista = "<option value="+objeto[i].token+">"+objeto[i].numeroCurso+"</option>";

                $('#curso').append(lista);
            }
        },
        error: function(){

        },
        complete: function(){

        }
    });
}


function obtenerListaProfesores() {

    $.ajax({
        url: '/obtener-profesores',
        type: 'get',
        beforeSend: function () {

        },
        success: function (request) {

            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            var lista = "";

            $('#tabla-profesor').empty();
            for (let i = 0; i < objeto.length; i++) {

                lista = "<tr><td>" + objeto[i].nombre + "</td><td>" + objeto[i].apellido + "</td><td>" + objeto[i].especialidad + "</td><td>" + objeto[i].usuario + "</td><td>" + objeto[i].password + "</td><td>"+objeto[i].curso.numeroCurso+"</td></tr>";

                $('#tabla-profesor').prepend(lista);

            }

        },
        error: function () {

        },
        complete: function () {

        },

    });

};

$('#form-agregar-profesor').submit(function (event) {
    event.preventDefault();

    var run = $('#run').val();
    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val();
    var usuario = $('#usuario').val();
    var password = $('#password').val();
    var especialidad = $('#especialidad').val();
    var tokenCurso = $('#curso').val();

    var profesor = {
        'run': run.toUpperCase(),
        'nombre': nombre.toUpperCase(),
        'apellido': apellido.toUpperCase(),
        'especialidad': especialidad.toUpperCase(),
        'usuario': usuario.toUpperCase(),
        'password': password,
        'curso': {
            'token': tokenCurso
        }
    };

    $.ajax({
        url: '/guardar-profesor',
        type: 'post',
        data: JSON.stringify(profesor),
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (request) {

            if (request === 200) {

                obtenerListaProfesores();
                $('#modal-agregar-profesor').modal('hide');
            } else if (request === 100) {
                $('#modal-agregar-profesor').modal('hide');
            }

        },
        error: function () {
            $('#modal-agregar-profesor').modal('hide');
        },
        complete: function () {
            $('#nombre').val('');
            $('#apellido').val('');
            $('#usuario').val('');
            $('#password').val('');
            $('#especialidad').val('');
        },

    });
});