
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
            $('#curso').empty();
            $('#cursoeditar').empty();
            $('#curso').append(seleccione);
            $('#cursoeditar').append(lista);
            for (let i = 0; i < objeto.length; i++) {

                lista = "<option value="+objeto[i].token+">"+objeto[i].numeroCurso+"</option>";
                
                $('#curso').append(lista);
                $('#cursoeditar').append(lista);
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
    var token_curso = $('#curso').val();

    formData = new FormData();

    formData.append('run',run);
    formData.append('nombre',nombre.toUpperCase());
    formData.append('apellido_p',apellido_p.toUpperCase());
    formData.append('apellido_m',apellido_m.toUpperCase());
    formData.append('token_curso',token_curso);

    console.log('enviando datos')

    if((run.length>8 && run.length<11) && run.includes("-") && nombre.length>=3 && apellido_p.length>3 && apellido_m.length>3 && token_curso !== ''){

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

}//end if

});


function editarAlumno(token){

    cargarDatosAlumno(token);

};


function cargarDatosAlumno(token){

    $.ajax({
        url: 'obtener-datos-alumno/'+token,
        type: 'get',
        beforeSend: function(){

        },
        success: function(request){
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            $('#runeditar').val(objeto.run);
            $('#nombreeditar').val(objeto.nombre);
            $('#apellido_peditar').val(objeto.apellidoP);
            $('#apellido_meditar').val(objeto.apellidoM);
            $('#cursoeditar').val(objeto.curso.token);

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

    var run = $('#runeditar').val();
    var nombre = $('#nombreeditar').val();
    var apellidoP = $('#apellido_peditar').val();
    var apellidoM = $('#apellido_meditar').val();
    var tokenCurso = $('#lista-cursoeditar').val();

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

function mensajeEliminarAlumno(token) {
    swal({
        title: "Eliminar alumno",
        text: "Se eliminar\u00e1 el alumno, \u00BFDesea continuar?.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm) {
                accionEliminarAlumno(token);
            }
        });
};

function accionEliminarAlumno(token){

    $.ajax({
        url: 'eliminar-alumno/'+token,
        type: 'post',
        beforeSend: function(){

        },
        success: function(request){

            if (request===200) {
                llenarTablaAlumnos();
                swal("Alumno Borrado", "Se ha eliminado el alumno", "success");
            }

        },
        error: function(){

        },
        complete: function(){

        }

    });

};


$('.form-agregar-alumno').validate({
    rules: {
      run: {
          required: true,
          minlength: 9,
          maxlength: 10
      },

      nombre: {
          required: true,
          minlength: 3,
          maxlength: 30
      },
      apellido_p: {
          required: true,
          minlength: 3,
          maxlength: 30
      },
      apellido_m: {
          required: true,
          minlength: 3,
          maxlength: 30
      },
      curso: {
        required: true,
      }
    },
    messages: {
      run: {
          required: "Ingrese el RUN",
          minlength: "Debe contener a lo menos 9 digitos",
          maxlength: "No debe exeder los 10 digitos"
      },

      nombre: {
          required: "Ingrese nombre",
          minlength: "Debe contener a lo menos 3 caracteres",
          maxlength: "Debe contener a lo mas 30 caracteres"
      },
      apellido_p: {
          required: "Ingrese apellido paterno",
          minlength: "Debe contener a lo menos 3 caracteres",
          maxlength: "Debe contener a lo mas 30 caracteres"
      },
      apellido_m: {
          required: "Ingrese apellido materno",
          minlength: "Debe contener a lo menos 3 caracteres",
          maxlength: "Debe contener a lo mas 30 caracteres"
      },
      curso: {
        required: "Seleccione un curso",
      }
  },
});


$('.form-editar-alumno').validate({
    rules: {
      runeditar: {
          required: true,
          minlength: 9,
          maxlength: 10
      },

      nombreeditar: {
          required: true,
          minlength: 3,
          maxlength: 30
      },
      apellido_peditar: {
          required: true,
          minlength: 3,
          maxlength: 30
      },
      apellido_meditar: {
          required: true,
          minlength: 3,
          maxlength: 30
      },
      cursoeditar: {
        required: true,
      }
    },
    messages: {
      runeditar: {
          required: "Ingrese el RUN",
          minlength: "Debe contener a lo menos 9 digitos",
          maxlength: "No debe exeder los 10 digitos"
      },

      nombreeditar: {
          required: "Ingrese nombre",
          minlength: "Debe contener a lo menos 3 caracteres",
          maxlength: "Debe contener a lo mas 30 caracteres"
      },
      apellido_peditar: {
          required: "Ingrese apellido paterno",
          minlength: "Debe contener a lo menos 3 caracteres",
          maxlength: "Debe contener a lo mas 30 caracteres"
      },
      apellido_meditar: {
          required: "Ingrese apellido materno",
          minlength: "Debe contener a lo menos 3 caracteres",
          maxlength: "Debe contener a lo mas 30 caracteres"
      },
      cursoeditar: {
        required: "Seleccione un curso",
      }
  },
});