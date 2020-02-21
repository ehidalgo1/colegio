
$(document).ready(function(){

    obtenerListaProfesores();

});

$('#btn-agregar-profesor').click(function(){
$('#modal-agregar-profesor').modal('show');
});


function obtenerListaProfesores(){

    $.ajax({
        url: '/obtener-profesores',
        type: 'get',
        beforeSend: function(){

        },
        success: function(request){

            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            var lista = "";

            $('#tabla-profesor').empty();
            for (let i = 0; i < objeto.length; i++) {
                
                lista = "<tr><td>"+objeto[i].nombre+"</td><td>"+objeto[i].apellido+"</td><td>"+objeto[i].usuario+"</td><td>"+objeto[i].especialidad+"</td><td>"+objeto[i].password+"</td></tr>";
                
                $('#tabla-profesor').prepend(lista);

            }

        },
        error: function(){

        },
        complete: function(){

        },

    });

};

$('#form-agregar-profesor').submit(function(event){
    event.preventDefault();

    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val();
    var usuario = $('#usuario').val();
    var password = $('#password').val();
    var especialidad = $('#especialidad').val();

    var profesor = {
        'nombre' : nombre,
        'apellido':apellido,
        'especialidad':especialidad,
        'usuario':usuario,
        'password':password
    };
    
    $.ajax({
        url: '/guardar-profesor',
        type: 'post',
        data: JSON.stringify(profesor),
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function(){

        },
        success: function(request){

            if(request===200){

                obtenerListaProfesores();
                $('#modal-agregar-profesor').modal('hide');
            }else if(request===100){
                $('#modal-agregar-profesor').modal('hide');
            }

        },
        error: function(){
            $('#modal-agregar-profesor').modal('hide');
        },
        complete: function(){
            $('#nombre').val('');
            $('#apellido').val('');
            $('#usuario').val('');
            $('#password').val('');
            $('#especialidad').val('');
        },

    });
});