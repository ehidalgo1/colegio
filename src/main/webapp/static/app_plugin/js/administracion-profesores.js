
$(document).ready(function () {

    obtenerListaProfesores();
    obtenerListaRamos();
    obtenerListaCursos();

});

$('#btn-agregar-profesor').click(function () {
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
                $('#especialidad-editar').append(lista);
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
                $('#curso-editar').append(lista);

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
            var btnEditar = "";
            var btnEliminar = "";

            $('#tabla-profesor').empty();
            for (let i = 0; i < objeto.length; i++) {

                btnEditar = "<button class='btn btn-secondary' onclick=\"editarProfesor('"+objeto[i].token+"')\">Editar</button>";
                btnEliminar = "<button class='btn btn-danger' onclick=\"mensajeEliminarProfesor('"+objeto[i].token+"')\">Eliminar</button>";

                lista = "<tr><td>" + objeto[i].nombre + "</td><td>" + objeto[i].apellido + "</td><td>" + objeto[i].especialidad + "</td><td>" + objeto[i].usuario + "</td><td>" + objeto[i].password + "</td><td>"+objeto[i].curso.numeroCurso+"</td><td>"+ btnEditar +" "+btnEliminar+"</td></tr>";

                $('#tabla-profesor').prepend(lista);

            }

        },
        error: function () {

        },
        complete: function () {

        },

    });

};

function editarProfesor(token){

    $.ajax({
        url: 'obtener-datos-profesor/'+token,
        type: 'get',
        beforeSend: function(){

        },
        success: function(request){
            var respuesta = JSON.stringify(request);
            var objeto = JSON.parse(respuesta);

            $('#run-editar').val(objeto.run);
            $('#nombre-editar').val(objeto.nombre);
            $('#apellido-editar').val(objeto.apellido);
            $('#usuario-editar').val(objeto.usuario);
            $('#especialidad-editar').val(objeto.especialidad);
            $('#curso-editar').val(objeto.curso.token);

            $('#btn-form-editar-profesor').attr('onClick',"guardarCambiosProfesor('"+objeto.token+"')");

            $('#modal-editar-profesor').modal('show');

        },
        error: function(){

        },
        complete: function(){

        }
    });


};

function guardarCambiosProfesor(token){

    var run = $('#run-editar').val();
    var nombre = $('#nombre-editar').val();
    var apellido = $('#apellido-editar').val();
    var usuario = $('#usuario-editar').val();
    var especialidad = $('#especialidad-editar').val();
    var tokenCurso = $('#curso-editar').val();
    var nombreRol = $('#rol-editar').val();


    var profesor = {
        'run': run.toUpperCase(),
        'nombre': nombre.toUpperCase(),
        'apellido': apellido.toUpperCase(),
        'especialidad': especialidad.toUpperCase(),
        'usuario': usuario.toUpperCase(),
        'curso': {
            'token': tokenCurso
        },
        'rol':{
            'nombreRol':nombreRol
        }
    };


    if((run.length>8 && run.length<11) && nombre.length>=3 && apellido.length>=3 && usuario.length>=6 && curso!=='' && especialidad!=='' && nombreRol!==''){

    $.ajax({
        url: 'guardar-cambios-profesor/'+token,
        type: 'post',
        data: JSON.stringify(profesor),
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function(){

        },
        success: function(request){

            if(request===200){

                obtenerListaProfesores();

                console.log('se han guardado los cambios');

                $('#modal-editar-profesor').modal('hide');
            }
        },
        error: function(){
            console.log('error al guardar datos');
        },
        complete: function(){
            
        }
    });

}//end if

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
    var nombreRol = $('#rol').val();

    var profesor = {
        'run': run.toUpperCase(),
        'nombre': nombre.toUpperCase(),
        'apellido': apellido.toUpperCase(),
        'especialidad': especialidad.toUpperCase(),
        'usuario': usuario.toUpperCase(),
        'password': password,
        'curso': {
            'token': tokenCurso
        },
        'rol':{
            'nombreRol':nombreRol
        }
    };

    if((run.length>8 && run.length<11) && run.includes("-") && nombre.length>=3 && apellido.length>=3 && usuario.length>=6 && curso!=='' && especialidad!=='' && nombreRol!==''){

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

}//end if

});

function mensajeEliminarProfesor(token) {
    swal({
        title: "Eliminar profesor",
        text: "Se eliminar\u00e1 el profesor, \u00BFDesea continuar?.",
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
                accionEliminarProfesor(token);
            }
        });
};

function accionEliminarProfesor(token){

    $.ajax({
        url: 'eliminar-profesor/'+token,
        type: 'post',
        beforeSend: function(){

        },
        success: function(request){

            if (request===200) {
                obtenerListaProfesores();
                swal("Profesor Borrado", "Se ha eliminado el profesor", "success");
            }

        },
        error: function(){

        },
        complete: function(){

        }

    });

};


$('.form-agregar-profesor').validate({
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
      apellido: {
          required: true,
          minlength: 3,
          maxlength: 30
      },
      usuario: {
          required: true,
          minlength: 8,
          maxlength: 30,
          email: true,
      },
      especialidad:{
          required: true
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
      apellido: {
          required: "Ingrese el apellido",
          minlength: "Debe contener a lo menos 3 caracteres",
          maxlength: "Debe contener a lo mas 30 caracteres"
      },
      usuario: {
        required: "Ingrese el usuario",
        minlength: "Debe contener 8 caracteres como minimo",
        maxlength: "Debe contener 30 caracteres como maximo",
        email: "El usuario no cumple con el formato (exemplo@colegio.cl)",
    },
    especialidad:{
        required: "Seleccione la especialidad"
      },
      curso: {
        required: "Seleccione un curso",
      }
  },
});