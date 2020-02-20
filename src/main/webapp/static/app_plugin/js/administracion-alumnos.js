
$(document).ready(function(){
    $('#preloader').prop('hidden',true);
});

$('#btn-agregar-alumno').click(function(){

    llenarSelectCurso();
    $('#modal-agregar-alumno').modal().show();

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

// function llenarTablaAlumnos(){

//     $.ajax({
//         url: ''
//     });

// };


$('.form-agregar-alumno').submit(function(event){
    event.preventDefault();

    var p_nombre = $('#p_nombre').val();
    var s_nombre = $('#s_nombre').val();
    var apellido_p = $('#apellido_p').val();
    var apellido_m = $('#apellido_m').val();
    var token_curso = $('#lista-curso').val();

    formData = new FormData();

    formData.append('p_nombre',p_nombre);
    formData.append('s_nombre',s_nombre);
    formData.append('apellido_p',apellido_p);
    formData.append('apellido_m',apellido_m);
    formData.append('token_curso',token_curso);

    console.log('enviando datos')

    $.ajax({
        url: '/guardar-alumno',
        type: 'post',
        data: formData,
        beforeSend: function(){

        },
        success: function(request){
            
            $('#modal-agregar-alumno').modal().hide();
            

        },
        error: function(){
            console.log('error de ingreso')
        },
        complete: function(){

        },
        processData: false,
        contentType: false,
        cache: false

    });

});