
$(document).ready(function(){
    $('#preloader').prop('hidden',true);

    llenarTablaAlumnos();
    llenarSelectCurso();
});

$('#btn-agregar-alumno').click(function(){

    
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
                $('#lista-curso-editar').append(lista);
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

            var btnEditar = "";
            var btnEliminar = "";

            var lista = "";

            $('#tabla-alumnos').empty();

            for (let i = 0; i < objeto.length; i++) {

                btnEditar = "<button class='btn btn-secondary' onclick=\"editarAlumno('"+objeto[i].token+"')\">Editar</button>";
                btnEliminar = "<button class='btn btn-danger' onclick=\"mensajeEliminarAlumno('"+objeto[i].token+"')\">Eliminar</button>";
                
                lista = "<tr><td>"+objeto[i].nombre+"</td><td>"+objeto[i].apellidoP+"</td><td>"+objeto[i].curso.numeroCurso+"</td><td>"+btnEditar+" "+btnEliminar+"</td></tr>";
                
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


function editarAlumno(token){

    $.ajax({
        url: 'obtener-datos-alumno/'+token,
        type: 'get',
        beforeSend: function(){

        },
        success: function(request){
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            $('#run-editar').val(objeto.run);
            $('#nombre-editar').val(objeto.nombre);
            $('#apellido_p-editar').val(objeto.apellidoP);
            $('#apellido_m-editar').val(objeto.apellidoM);
            $('#lista-curso-editar').val(objeto.curso.token);

            $('#btn-form-editar-alumno').attr('onClick',"guardarCambiosAlumno('"+objeto.token+"')");

            $('#modal-editar-alumno').modal('show');

        },
        error: function(){

        },
        complete: function(){

        }
    });

};


function guardarCambiosAlumno(token){

    var run = $('#run-editar').val();
    var nombre = $('#nombre-editar').val();
    var apellidoP = $('#apellido_p-editar').val();
    var apellidoM = $('#apellido_m-editar').val();
    var tokenCurso = $('#lista-curso-editar').val();

    var alumno = {
        'run' : run.toUpperCase(),
        'nombre' : nombre.toUpperCase(),
        'apellidoP' : apellidoP.toUpperCase(),
        'apellidoM' : apellidoM.toUpperCase(),
        'curso': {
            'token': tokenCurso
        }
    }

    if((run.length>8 && run.length<11) && run.includes("-") && nombre.length>=3 && apellidoP.length>3 && apellidoM.length>3 && tokenCurso !== ''){

    $.ajax({
        url: 'guardar-cambios-alumno/'+token,
        type: 'post',
        data: JSON.stringify(alumno),
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function(){

        },
        success: function(request){
            
            if(request===200){

                console.log('Se guardo correctamente');

                llenarTablaAlumnos();
                $('#modal-editar-alumno').modal('hide');


            }
           
        },
        error: function(){

            console.log('error al guardar cambios');

        },
        complete: function(){

        }
    });

}//end if

};