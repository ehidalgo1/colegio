
$(document).ready(function(){
    $('#preloader').prop('hidden',true);

    llenarTablaAlumnos();
});

$('#btn-agregar-alumno').click(function(){

    llenarSelectCurso();
    $('#modal-agregar-alumno').modal('show');

});

function llenarSelectCurso(){

    $.ajax({
        url: '/obtener-cursos',
        type: 'get',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function(){

        },
        success: function(request){
            var respuesta = JSON.stringify(request)
            var objeto = JSON.parse(respuesta);
            var seleccione = "<option value=''>Seleccione</option>";
            var lista = "";
            $('#lista-curso').empty();
            $('#lista-curso').append(seleccione);
            for (let i = 0; i < objeto.length; i++) {

                lista = "<option value="+objeto[i].token+">"+objeto[i].numeroCurso+"</option>";
                
                $('#lista-curso').append(lista);
            }

        },
        error: function(){

        },
        complete: function(){

        }
    });
};

function llenarTablaAlumnos(){

    $.ajax({
        url: '/obtener-alumnos',
        type: 'get',
        beforeSend: function(){

        },
        success: function(request){
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            var lista = "";

            $('#tabla-alumnos').empty();

            for (let i = 0; i < objeto.length; i++) {
                
                lista = "<tr><td>"+objeto[i].nombre+"</td><td>"+objeto[i].apellidoP+"</td><td>"+objeto[i].curso.numeroCurso+"</td><tr>"
                
                $('#tabla-alumnos').prepend(lista);

            }

        },
        error: function(){

        },
        complete: function(){

        }
    });

};


$('.form-agregar-alumno').submit(function(event){
    event.preventDefault();

    var run = $('#run').val();
    var nombre = $('#nombre').val();
    var apellido_p = $('#apellido_p').val();
    var apellido_m = $('#apellido_m').val();
    var token_curso = $('#lista-curso').val();

    formData = new FormData();

    formData.append('run',run);
    formData.append('nombre',nombre.toUpperCase());
    formData.append('apellido_p',apellido_p.toUpperCase());
    formData.append('apellido_m',apellido_m.toUpperCase());
    formData.append('token_curso',token_curso);

    console.log('enviando datos')

    $.ajax({
        url: '/guardar-alumno',
        type: 'post',
        data: formData,
        beforeSend: function(){

        },
        success: function(request){
            
            llenarTablaAlumnos();
            $('#modal-agregar-alumno').modal('hide');
            

        },
        error: function(){
            console.log('error de ingreso')
        },
        complete: function(){
            $('#nombre').val('');
            $('#apellido_p').val('');
            $('#apellido_m').val('');
            $('#lista-curso').val('');
        },
        processData: false,
        contentType: false,
        cache: false

    });

});