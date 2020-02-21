

function obtenerAlumnosPorCurso(){

    $.ajax({
        url: '/obtener-alumnos-por-curso',
        type: 'GET',
        beforeSend: function(){
            
        },
        success: function(request){
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(objeto);

            var lista = "";
            var btnInformeNotas = "";
            var btnInformePersonalidad = "";

            $('#tabla-mis-alumnos').empty();

            for (let i = 0; i < objeto.length; i++) {

                btnInformeNotas = "<a class='btn btn-success' href='/informe-notas/"+objeto[i].token+"'></a>";
                btnInformePersonalidad = "<a class='btn btn-info' href='/informe-personalidad/"+objeto[i].token+"'></a>";
               
                lista = "<tr><td>"+objeto[i].nombre+"</td><td>"+objeto[i].apellidoP+"</td><td>"+objeto[i].apellidoM+"</td><td>"+btnInformeNotas+" "+btnInformePersonalidad+"</td></tr>";
                
                $('#tabla-mis-alumnos').append(lista);
            }
        },
        error: function(){

        },
        complete: function(){
            
        }
    });

};